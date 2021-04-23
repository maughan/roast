import vision from "@google-cloud/vision";
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

  form.parse(req, async (err, fields) => {
    if (err) {
      throw new HttpException(500, err.message);
    }

    const image = fields.image as string;

    const [, ...imageSpread] = image.split(",");

    const buffer = Buffer.from(imageSpread.join(","), "base64");

    const [result] = await client.faceDetection(buffer);

    res.json(result);
  });
});
