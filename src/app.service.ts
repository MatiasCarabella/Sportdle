import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService  {
  ping(): string {
    console.log("Sportdle salutes you! (づ｡◕‿‿◕｡)づ");
    return "Sportdle salutes you (づ｡◕‿‿◕｡)づ";
  }
}