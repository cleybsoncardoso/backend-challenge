import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyNotFoundException extends HttpException {
  constructor(message?) {
    super(message || 'Company not found', HttpStatus.NOT_FOUND);
  }
}
