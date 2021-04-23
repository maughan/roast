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

  const form = new IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      throw new HttpException(500, err.message);
    }

    console.log(fields.image);

    res.json("OK");
  });
});
