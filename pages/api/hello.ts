import {NextApiRequest, NextApiResponse} from "next";
import * as vision from "@google-cloud/vision";

export default async function processImage(req: NextApiRequest, res: NextApiResponse) {
  const client = new vision.ImageAnnotatorClient();
  const [results] = await client.labelDetection("");
  const labels = results.labelAnnotations;
  console.log("labels:");
  if (!labels) return;
  labels.forEach(label => console.log(label.description));
  res.status(200);
}
