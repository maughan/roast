import {NextApiRequest, NextApiResponse} from "next";
import * as vision from "@google-cloud/vision";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // const client = new vision.ImageAnnotatorClient();
    // const [results] = await client.labelDetection("");
    // const labels = results.labelAnnotations;
    // console.log("labels:");
    // if (!labels) return;
    // labels.forEach(label => console.log(label.description));
    return res.status(200).json({hello: "world"});
  }
}
