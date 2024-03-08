// validation.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export function validationMiddleware(dtoClass: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const dto = req.body;


    const errors = await validate(plainToClass(dtoClass, dto));
    if (errors.length > 0) {
      console.log(errors[0].constraints.isNotEmpty);

      const errorMessage = errors
        .map((error: ValidationError) => {
          console.log(error.constraints)
          return error?.constraints?.isNotEmpty;})
        .join(', ');
      console.log(errorMessage)
      throw new HttpException(errorMessage, 400);
    }
    next();
  };
}
