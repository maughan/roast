enum Likelihood {
  UNKNOWN = "UNKNOWN",
  VERY_UNLIKELY = "VERY_UNLIKELY",
  UNLIKELY = "UNLIKELY",
  POSSIBLE = "POSSIBLE",
  LIKELY = "LIKELY",
  VERY_LIKELY = "VERY_LIKELY",
}
interface Vertices {
  x: number;
  y: number;
  z?: number;
}

interface FaceRecognition {
  angerLikelihood: Likelihood;
  blurredLikelihood: Likelihood;
  boundingPoly: {vertices: Vertices[]; normalizedVertices: any[]};
  detectionConfidence: number;
  fdBoundingPoly: {vertices: Vertices[]; normalizedVertices: any[]};
  headwearLikelihood: Likelihood;
  joyLikelihood: Likelihood;
  landmarkingConfidence: number;
  landmarks: {type: string; position: Vertices}[];
  panAngle: number;
  rollAngle: number;
  sorrowLikelihood: Likelihood;
  surpriseLikelihood: Likelihood;
  tiltAngle: number;
  underExposedLikelihood: Likelihood;
}

interface LabelAnnotation {
  locations: [];
  properties: [];
  mid: string;
  locale: string;
  description: string;
  score: number;
  confidence: number;
  topicality: number;
  boundingPoly: null;
}

export interface VisionResponse {
  faceAnnotations: FaceRecognition[];
  landmarkAnnotations: [];
  logoAnnotations: [];
  labelAnnotations: LabelAnnotation[];
  textAnnotations: [];
  localizedObjectAnnotations: [];
  safeSearchAnnotation: null;
  imagePropertiesAnnotation: null;
  error: any;
  cropHintsAnnotation: null;
  fullTextAnnotation: null;
  webDetection: null;
  productSearchResults: null;
  context: null;
}

export interface FormValues {
  file: FileList;
}

export enum Glasses {
  GLASSES = "Glasses",
  "VISION CARE" = "Vision care",
  EYEWEAR = "Eyewear",
  GOGGLES = "Goggles",
  SUNGLASSES = "Sunglasses",
}
