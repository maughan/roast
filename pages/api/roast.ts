import * as vision from "@google-cloud/vision";
import {HttpException, withCatch} from "../../lib/http";
import {IncomingForm} from "formidable";

const client = new vision.ImageAnnotatorClient();

export const config = {
  api: {bodyParser: false},
};

export default withCatch(async (req, res) => {
  if (req.method !== "POST") {
    throw new HttpException(405, "You must POST to this route.");
  }

  const form = new IncomingForm();

<<<<<<< HEAD
  form.parse(req, async (err, fields, files) => {
=======
  form.parse(req, async (err, fields) => {
>>>>>>> f40f9bd8d87fdedd2ead9696d72ed22d2d7668ca
    if (err) {
      throw new HttpException(500, err.message);
    }

<<<<<<< HEAD
    console.log(fields.image.slice(fields.images.indexOf(",")));

    const face = await client.faceDetection(Buffer.from(fields.image as string, "base64"));
    console.log(face);
    res.json("OK");
=======
    const image = fields.image as string;

    const [, ...imageSpread] = image.split(",");

    const buffer = Buffer.from(imageSpread.join(","), "base64");

    const [result] = await client.faceDetection(buffer);

    res.json(result);
>>>>>>> f40f9bd8d87fdedd2ead9696d72ed22d2d7668ca
  });
});
