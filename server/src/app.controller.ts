import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('race')
  async getState(): Promise<unknown> {
    return {
      race: this.appService.getRaceStatus(),
      players: this.appService.getPlayerNames(),
      scoreboard: this.appService.getScores(),
    };
  }
}
