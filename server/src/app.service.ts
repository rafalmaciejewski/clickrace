/* eslint-disable @typescript-eslint/no-magic-numbers */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { Socket } from 'socket.io';
import * as FixedArray from 'fixed-array';
import * as uniq from 'lodash.uniq';
import { AppGateway } from './app.gateway';
import { RaceStatus } from './types';

const SCORE_SYNC_INTERVAL = 500;
const ANTI_CHEAT_INTERVAL = 2000;
const RACE_DURATION = 40000;
const RACE_START_TIMEOUT = 5000;

@Injectable()
export class AppService {
  private players = new Map<Socket, string>();
  private admin: Socket = null;
  private scores = new Map<string, number>();
  private clickTimestampsBySocket = new Map<Socket, any>();
  private race: RaceStatus = {
    finished: false,
    initialized: false,
    started: false,
    startDate: null,
    finishDate: null,
  };

  constructor(
    @Inject(forwardRef(() => AppGateway)) private readonly gateway: AppGateway,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  connect(socket: Socket): void {
    if (!this.admin) {
      this.setAdmin(socket);
    }
  }

  join(socket: Socket, playerName: string): void {
    this.players.set(socket, playerName);
    this.gateway.server.emit('player-joined', playerName);
  }

  async quit(socket: Socket): Promise<void> {
    if (this.players.has(socket)) {
      const playerName = this.players.get(socket);
      this.gateway.server.emit('player-quit', playerName);
      this.players.delete(socket);
    }
    if (socket === this.admin) {
      const socketIds = await this.gateway.server.allSockets();
      this.admin = null;
      const firstSocketId = socketIds.values().next().value;
      if (firstSocketId) {
        this.setAdmin(this.gateway.server.of('/').sockets.get(firstSocketId));
      } else {
        this.restartRace();
      }
    }
  }

  setAdmin(socket: Socket): void {
    this.admin = socket;
    socket.emit('admin');
  }

  replaceAdmin(socket: Socket): void {
    this.admin.emit('withdraw-admin-role');
    this.setAdmin(socket);
  }

  isAdmin(socket: Socket): boolean {
    return this.admin === socket;
  }

  isRaceFinished(): boolean {
    return this.race.finished;
  }

  playerExists(playerName: string): boolean {
    return [...this.players.values()].includes(playerName);
  }

  registerClick(socket: Socket, timestamp: number): void {
    if (this.race.started && !this.race.finished) {
      const playerName = this.players.get(socket);
      const score = this.scores.get(playerName) || 0;
      this.scores.set(playerName, score + 1);
      const registeredClicks = this.clickTimestampsBySocket.get(socket) || new FixedArray(50);
      registeredClicks.push(timestamp);
      this.clickTimestampsBySocket.set(socket, registeredClicks);
    }
  }

  initializeRace(): void {
    const now = Date.now();
    this.race.initialized = true;
    this.race.startDate = now + RACE_START_TIMEOUT;
    this.race.finishDate = now + RACE_START_TIMEOUT + RACE_DURATION;
    this.gateway.server.emit('race-initialized', {
      startDate: this.race.startDate,
      finishDate: this.race.finishDate,
    });
    this.schedulerRegistry.addTimeout(
      'start-timeout',
      setTimeout(this.startRace.bind(this), RACE_START_TIMEOUT),
    );
  }

  startRace(): void {
    this.schedulerRegistry.deleteTimeout('start-timeout');
    this.race.started = true;
    this.gateway.server.emit('race-started');
    this.schedulerRegistry.addTimeout(
      'race-timeout',
      setTimeout(this.finishRace.bind(this), RACE_DURATION),
    );
  }

  finishRace(): void {
    this.schedulerRegistry.deleteTimeout('race-timeout');
    this.race.finished = true;
    this.gateway.server.emit('race-finished', this.getScores());
  }

  restartRace(): void {
    this.schedulerRegistry.getTimeouts().forEach((timeoutName) => {
      if (timeoutName) {
        this.schedulerRegistry.deleteTimeout(timeoutName);
      }
    });
    this.race = {
      finished: false,
      initialized: false,
      started: false,
      startDate: null,
      finishDate: null,
    };
    this.scores.clear();
    this.gateway.server.emit('race-restarted');
  }

  @Interval(SCORE_SYNC_INTERVAL)
  syncScores(): void {
    if (this.race.started && !this.race.finished) {
      this.gateway.server.emit('sync-scores', this.getScores());
    }
  }

  @Interval(ANTI_CHEAT_INTERVAL)
  antiCheat(): void {
    this.clickTimestampsBySocket.forEach((timestamps, socket) => {
      if (timestamps.length() < 50) {
        return;
      }
      const intervals = timestamps.values().reduce((result, cur, idx, arr) => {
        const next = arr[idx + 1];
        if (!next) {
          return result;
        }
        return [...result, next - cur];
      }, []);
      if (uniq(intervals).length < 4) {
        socket.emit('you-cheated');
        const playerName = this.players.get(socket);
        if (playerName) {
          this.scores.delete(playerName);
        }
        this.quit(socket);
      }
    });
  }

  getRaceStatus(): RaceStatus {
    return this.race;
  }

  getPlayerNames(): string[] {
    return [...this.players.values()];
  }

  getScores = (): Record<string, number> =>
    [...this.scores].reduce(
      (result, [playerName, score]) => ({
        ...result,
        [playerName]: score,
      }),
      {},
    );
}
