import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const query = req.query;
    req['pagination'] = {
      page: query.page ? parseInt(query.page as string, 10) : 1,
      limit: query.limit ? parseInt(query.limit as string, 10) : 10,
    };
    next();
  }
}