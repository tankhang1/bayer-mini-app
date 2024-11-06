import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Icon, Page } from "zmp-ui";
import api, {
  chooseImage,
  FacingMode,
  PhotoFormat,
  PhotoFrame,
  PhotoQuality,
  ZMACamera,
} from "zmp-sdk";
import { useNavigate } from "react-router-dom";

const ScanScreen = () => {
  const navigate = useNavigate();
  const cameraRef = useRef<ZMACamera | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState("");
  const startStreaming = async () => {
    try {
      const camera = cameraRef.current;
      await camera?.start();
    } catch (error) {
      console.error("Failed to start camera stream:", error);
    }
  };
  const changeFlip = async () => {
    await cameraRef.current?.flip();
  };
  const handleChooseImage = async () => {
    try {
      const { filePaths, tempFiles } = await chooseImage({
        sourceType: ["album", "camera"],
        cameraType: "back",
        count: 1,
      });
      startStreaming();
      console.log("file", filePaths, tempFiles);
    } catch (error) {
      startStreaming();
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      console.log("Media component not ready");
      return;
    }
    if (!cameraRef.current) {
      cameraRef.current = api.createCameraContext({
        videoElement: videoElement,
        mediaConstraints: {
          width: 1920, // High resolution for better quality
          height: 1080, // Maintain a full-screen aspect ratio
          facingMode: FacingMode.BACK,
          audio: false,
          mirrored: false, // Ensures the video isn't flipped
        },
      });
      startStreaming();
    }
  }, []);

  return (
    <Page className="w-full h-full">
      <Box className="w-full h-full">
        <video
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            backgroundColor: "transparent",
          }} // Ensure full-screen without cropping
          ref={videoRef}
          muted
          playsInline
          webkit-playsinline="true" // Use this format to avoid the warning
        />
        {data && (
          <img
            id="image"
            src={data}
            alt={""}
            className="mb-2 absolute z-20 bottom-5 left-5 w-16 h-24 object-cover rounded-lg"
          ></img>
        )}
      </Box>
      <div className="absolute z-20 top-6 right-5 flex items-center gap-2">
        <button
          className=" bg-gray-500 p-2 rounded-full transform transition-transform duration-200 ease-in-out active:scale-90"
          onClick={changeFlip}
        >
          <Icon icon="zi-auto" size={28} style={{ color: "white" }} />
        </button>
        <button
          className=" bg-gray-500 p-2 rounded-full transform transition-transform duration-200 ease-in-out active:scale-90"
          onClick={handleChooseImage}
        >
          <Icon icon="zi-gallery" size={28} style={{ color: "white" }} />
        </button>
      </div>
      {data && (
        <button
          className="absolute z-30 bottom-12 right-5 bg-white p-2 rounded-full transform transition-transform duration-200 ease-in-out active:scale-90"
          onClick={() => {
            console.log("navigate");
            navigate("/finish");
          }}
        >
          <Icon icon="zi-arrow-right" size={28} style={{ color: "black" }} />
        </button>
      )}
      <div className="absolute z-20 bottom-10 w-full flex justify-center">
        <button
          onClick={() => {
            let result: PhotoFrame = cameraRef.current?.takePhoto({
              quality: PhotoQuality.NORMAL,
              format: PhotoFormat.JPEG,
              minScreenshotHeight: 1000,
            });
            if (result) {
              console.log(result);
              setData(result.data);
            } else {
              console.log("No data");
            }
          }}
          className="w-16 h-16 rounded-full bg-white transform transition-transform duration-200 ease-in-out active:scale-90"
        ></button>
      </div>
    </Page>
  );
};

export default ScanScreen;
