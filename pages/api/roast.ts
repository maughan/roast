import * as vision from "@google-cloud/vision";
import {HttpException, withCatch} from "../../lib/http";

const client = new vision.default.ImageAnnotatorClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withCatch(async (req, res) => {
  if (req.method !== "POST") {
    throw new HttpException(405, "You must POST to this route.");
  }

  let body = "";
  for await (const chunk of req) body += chunk;

  console.log(body);

  // const [results] = await client.faceDetection(req.body);

  // console.log("labels:");
  // console.log(results);

  // res.json(results);
});
