import express from 'express'

export const badRequest = (res: express.Response, err: string) =>
    res.status(400).json({
        error: err
    });


export const internalServerError = (res: express.Response, err: Error) =>
    res.status(500).json({
        error: err.message
    });


export const notFound = (res: express.Response) => res.sendStatus(404);
export const ok = (res: express.Response) => res.sendStatus(200);
