import * as vision from "@google-cloud/vision";
import {HttpException, withCatch} from "../../lib/http";
import multiparty from "multiparty";

const client = new vision.default.ImageAnnotatorClient();

const form = new multiparty.Form();

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

  const [results] = await client.faceDetection(body);

  console.log("labels:");
  console.log(results);

  res.json(results);
});
