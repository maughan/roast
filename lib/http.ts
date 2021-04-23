import {NextApiHandler} from "next";

export const withCatch = (handler: NextApiHandler): NextApiHandler => {
  console.log("with catch created");

  return async (req, res) => {
    console.log("req");

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
