import vision from "@google-cloud/vision";

export async function quickstart() {
  const client = new vision.ImageAnnotatorClient();

  const [results] = await client.labelDetection("");
  const labels = results.labelAnnotations;
  console.log("labels:");
  if (!labels) return;
  labels.forEach(label => console.log(label.description));
}
