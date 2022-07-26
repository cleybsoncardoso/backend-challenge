import { HttpException, HttpStatus } from '@nestjs/common';

export class PlaceNotFoundException extends HttpException {
  constructor(message?) {
    super(message || 'Place not found', HttpStatus.NOT_FOUND);
  }
}
