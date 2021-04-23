import * as vision from "@google-cloud/vision";
import {HttpException, withCatch} from "../../lib/http";

const client = new vision.default.ImageAnnotatorClient();

export default withCatch(async (req, res) => {
  if (req.method !== "POST") {
    throw new HttpException(405, "You must POST to this route.");
  }
  const [results] = await client.faceDetection(Buffer.from(req.body));
  console.log("labels:");
  console.log(results);

  res.json(results);
});
