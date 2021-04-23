import * as vision from "@google-cloud/vision";
import {HttpException, withCatch} from "../../lib/http";
import {IncomingForm} from "formidable";

const client = new vision.default.ImageAnnotatorClient();

export const config = {
  api: {bodyParser: false},
};

export default withCatch(async (req, res) => {
  if (req.method !== "POST") {
    throw new HttpException(405, "You must POST to this route.");
  }

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({fields, files});
    });
  });

  console.log(data);

  res.json("OK");

  // const [results] = await client.faceDetection(req.body);

  // console.log("labels:");
  // console.log(results);

  // res.json(results);
});
