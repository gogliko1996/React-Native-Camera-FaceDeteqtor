import { useEffect } from "react";

import { useCameraPermission } from "react-native-vision-camera";
import { CameraDetector } from "./src/screen/CameraDetector/CameraDetector";

import {
  RNMLKitFaceDetectionContextProvider,
  RNMLKitFaceDetectorOptions,
  useFaceDetector,
} from "@infinitered/react-native-mlkit-face-detection";

const CUSTOM_OPTIONS: RNMLKitFaceDetectorOptions = {
  performanceMode: "fast",
  landmarkMode: false,
  contourMode: true,
  classificationMode: true,
  minFaceSize: 0.01,
  isTrackingEnabled: true,
};

export default function App() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const detector = useFaceDetector()

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    detector.initialize()
  }, []);

  return (
    <RNMLKitFaceDetectionContextProvider options={CUSTOM_OPTIONS} deferInitialization >
      <CameraDetector />
    </RNMLKitFaceDetectionContextProvider>
  );
}
