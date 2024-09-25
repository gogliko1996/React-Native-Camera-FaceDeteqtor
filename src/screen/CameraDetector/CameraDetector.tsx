import { Button, Text } from "react-native";
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { ScreenRoot } from "../../components/ScreenRoot/ScreenRoot.style";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  RNMLKitFaceDetectionResult,
  useFaceDetector,
} from "@infinitered/react-native-mlkit-face-detection";
import { FaceDetectionComponent } from "./FaceDetectionComponent/FaceDetectionComponent";

export const CameraDetector: React.FC = () => {
  const [pathPhoto, setPathPhoto] = useState<
    PhotoFile | RNMLKitFaceDetectionResult | any
  >();
  const [openCamera, setOpenCamera] = useState<boolean>(false);

  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");

  const { hasPermission } = useCameraPermission();


  if (!hasPermission) {
    return (
      <ScreenRoot>
        <Text>not permission</Text>
      </ScreenRoot>
    );
  }
  if (device == null) {
    return (
      <ScreenRoot>
        <Text>not permission</Text>
      </ScreenRoot>
    );
  }

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    // console.log('frame',frame);
    
    // const plugin = VisionCameraProxy.initFrameProcessorPlugin( 'detectFaces', {
     
    // } )
    // console.log('plugin',plugin);


    // const objects = detectObjects(frame);
    // const label = objects[0].name;
    // console.log(`You're looking at a ${label}.`);
  }, []);

  const photo = async () => {
    const photos = await camera.current?.takePhoto();

    setPathPhoto(photos?.path);
  };

  const switchCamera = () => {
    setOpenCamera(!openCamera);
  };

 
  return (
    <ScreenRoot>
      {openCamera ? (
        <>
          <Button title="closeCamera" onPress={switchCamera} />
          <Camera
            ref={camera}
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            photo={true}
            frameProcessor={frameProcessor}
          ></Camera>
          <Button title="PHOTO" onPress={() => photo()} />
        </>
      ) : (
        <Button title="ophenCamra" onPress={switchCamera} />
      )}
      {!openCamera && pathPhoto && <FaceDetectionComponent path={pathPhoto}/>}
    </ScreenRoot>
  );
};
