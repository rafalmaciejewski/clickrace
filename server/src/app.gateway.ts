import { forwardRef, Inject, Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway({ transports: ['websocket'] })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger(AppGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(@Inject(forwardRef(() => AppService)) private readonly appService: AppService) {}

  handleConnection(socket: Socket): void {
    this.logger.log('socket connected');
    this.appService.connect(socket);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    this.logger.log('socket disconnect');
    await this.appService.quit(socket);
  }

  @SubscribeMessage('join')
  onJoin(socket: Socket, playerName: string): WsResponse {
    if (this.appService.playerExists(playerName)) {
      return {
        event: 'name-in-use',
        data: null,
      };
    }
    this.appService.join(socket, playerName);
    return {
      event: 'joined',
      data: null,
    };
  }

  @SubscribeMessage('start-race')
  onStartRace(socket: Socket): WsResponse {
    if (!this.appService.isAdmin(socket)) {
      return {
        event: 'unauthorized',
        data: null,
      };
    }
    this.appService.initializeRace();
  }

  @SubscribeMessage('click')
  onClick(socket: Socket, timestamp: number): void {
    this.appService.registerClick(socket, timestamp);
  }

  @SubscribeMessage('restart-race')
  onNewRace(socket: Socket): WsResponse {
    if (!this.appService.isAdmin(socket)) {
      return {
        event: 'unauthorized',
        data: null,
      };
    }
    if (this.appService.isRaceFinished()) {
      this.appService.restartRace();
    }
  }

  @SubscribeMessage('super-secret-code')
  onSuperSecretCode(socket: Socket, code: string): void {
    if (process.env.SUPER_SECRET_CODE === code) {
      this.appService.replaceAdmin(socket);
    }
  }
}
