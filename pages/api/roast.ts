import * as vision from "@google-cloud/vision";
import {HttpException, withCatch} from "../../lib/http";

const client = new vision.ImageAnnotatorClient();

export default withCatch(async (req, res) => {
  console.log("BRUH LOL");

  if (req.method !== "POST") {
    throw new HttpException(405, "You must POST to this route.");
  }

  const [results] = await client.faceDetection(Buffer.from(req.body, "base64"));
  console.log("labels:");
  console.log(results);

  if (!results.labelAnnotations) {
    throw new HttpException(500, "Could not find any info for this image");
  }

  res.json(results.labelAnnotations);
});
