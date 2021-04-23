import {NextApiHandler} from "next";

export type Middleware = (handler: NextApiHandler) => NextApiHandler;

export const withCatch: Middleware = handler => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      if (e instanceof HttpException) {
        return res.status(e.code).json({message: e.message});
      }

      res.status(500).json({message: e.message});
    }
  };
};

export class HttpException extends Error {
  constructor(public readonly code: number, message: string) {
    super(message);
  }
}
