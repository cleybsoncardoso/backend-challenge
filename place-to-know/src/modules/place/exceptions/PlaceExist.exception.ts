import { HttpException, HttpStatus } from '@nestjs/common';

export class PlaceExistException extends HttpException {
  constructor(message?) {
    super(message || 'Place already exist', HttpStatus.BAD_REQUEST);
  }
}
