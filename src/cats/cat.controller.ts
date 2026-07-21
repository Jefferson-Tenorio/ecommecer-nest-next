import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    // Isso deve funcionar se as importações estiverem corretas
    console.log('Método:', request.method); // GET
    console.log('URL:', request.url); // /cats
    console.log('Headers:', request.headers);
    return 'This action returns all cats';
  }
}
