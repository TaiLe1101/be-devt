import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from 'src/classes/api-response.class';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            next();
        } catch (err: any) {
            if (err instanceof HttpException) {
                const status = err.getStatus();
                return res
                    .status(status)
                    .json(new ApiResponse(status, err.message));
            }

            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiResponse(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        'Internal server error',
                    ),
                );
        }
    }
}
