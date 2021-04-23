import {NextApiRequest, NextApiResponse} from "next";
import * as vision from "@google-cloud/vision";
import {HttpException, withCatch} from "../../lib/http";

const client = new vision.ImageAnnotatorClient();

export default withCatch(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    throw new HttpException(405, "You must POST to this route.");
  }
  const buffer = req.body;
  const [results] = await client.faceDetection(buffer);
  console.log("labels:");
  console.log(results);

  if (!results.labelAnnotations) {
    throw new HttpException(500, "Could not find any info for this image");
  }

  res.json(results.labelAnnotations);
});