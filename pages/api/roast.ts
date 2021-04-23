import {NextApiRequest, NextApiResponse} from "next";
import * as vision from "@google-cloud/vision";
import {HttpException, withCatch} from "../../lib/http";

const client = new vision.ImageAnnotatorClient();

export default withCatch(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    throw new HttpException(405, "You must POST to this route.");
  }

  const [results] = await client.faceDetection("");
  const labels = results.labelAnnotations;
  console.log("labels:");
  if (!labels) return;

  res.json(labels);
});
