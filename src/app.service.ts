import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService  {
  helloWorld(): string {
    console.log("HELLO WORLD");
    return "Hello World!";
  }
}