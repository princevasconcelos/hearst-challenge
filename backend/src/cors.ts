import { Request, Response, NextFunction } from 'express';

export default (_: Request, res: Response, next: NextFunction) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
    next()
}