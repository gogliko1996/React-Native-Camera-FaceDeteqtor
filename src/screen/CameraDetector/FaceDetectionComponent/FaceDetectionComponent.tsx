import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { ScreenRoot } from "../../../components/ScreenRoot/ScreenRoot.style";
import {
  useFaceDetector,
  useFacesInPhoto,
} from "@infinitered/react-native-mlkit-face-detection";
import {
  FaceDetectionComponentProps,
  KitFaceProps,
} from "./FaceDetectionComponent.props";

export const FaceDetectionComponent: React.FC<FaceDetectionComponentProps> = (
  props
) => {
  const { path } = props;
  const { faces, error, status } = useFacesInPhoto(path);
  
console.log();

  const faceDetector = useFaceDetector();
  const [face, setFace] = useState<KitFaceProps>();

  useEffect(() => {
    const detectFaces = async () => {
      try {
        const result = await faceDetector.detectFaces(path);
        setFace(result?.faces[0].frame);
        console.log('success',result?.success);
        
        console.log("result", result?.faces);
      } catch (e) {
        console.error("Face detection error:", e);
      }
    };

    if (path) {
      detectFaces();
    }
  },[]);
  // console.log("face", faces[0]);

  if (!face) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScreenRoot>
      <ImageBackground source={{ uri: path }} style={styles.image}>
        <View
          style={[
            styles.cube,
            {
              top: face.origin.y,
              left: face.origin.x,
              width: face.size.x,
              height: face.size.y,
            },
          ]}
        />
      </ImageBackground>
    </ScreenRoot>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  cube: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "red",
  },
});
