import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
 

    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'PUT,POST,GET,DELETE,OPTIONS,PATCH'
    );


    next();
};
