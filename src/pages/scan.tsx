import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Icon, Page } from "zmp-ui";
import api, {
  chooseImage,
  FacingMode,
  PhotoFormat,
  PhotoFrame,
  PhotoQuality,
  requestCameraPermission,
  ZMACamera,
} from "zmp-sdk";
import { useNavigate } from "react-router-dom";
import GuideAudio from "assets/guide.mp3";
const guide = new Audio(GuideAudio);

const ScanScreen = () => {
  const navigate = useNavigate();
  const cameraRef = useRef<ZMACamera | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState("");
  const [isPermitCamera, setIsPermitCamera] = useState(false);
  const takePhoto = () => {
    const result: PhotoFrame = cameraRef.current?.takePhoto({
      quality: PhotoQuality.NORMAL,
      format: PhotoFormat.JPEG,
      minScreenshotHeight: 1000,
    });
    if (result) {
      guide.pause();
      navigate("/preview", {
        state: {
          previewImage: result.data,
        },
      });
    } else {
      console.log("No data");
    }
  };
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
      console.log(error);
    }
  };

  const onRequestCameraPermission = async () => {
    try {
      const result = await requestCameraPermission();

      setIsPermitCamera(result.userAllow);
    } catch (error) {
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
          height: 1300, // Maintain a full-screen aspect ratio
          facingMode: FacingMode.BACK,
          audio: false,
          mirrored: false,
        },
      });
    }
    startStreaming();

    return () => {
      cameraRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      startStreaming();
    };

    const handleBlur = () => {
      cameraRef.current?.stop();
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);
  useEffect(() => {
    guide.play();
    onRequestCameraPermission();
  }, []);
  return (
    <Page className="w-full h-full">
      <Box className="w-full h-full">
        <video
          style={{
            width: "100vw",
            height: "60vh",
            objectFit: "cover",
            backgroundColor: "transparent",
          }}
          ref={videoRef}
          muted
          playsInline
          webkit-playsinline="true"
        />

        <div className="absolute top-0 w-full px-3 pt-24 bg-drop">
          <p className="text-white font-bold text-center">
            Chụp hình phiếu trúng thưởng
          </p>
          <div
            className="border-2 border-gray-200 rounded-2xl"
            style={{ height: "35dvh" }}
          />
        </div>
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
        <button
          className=" bg-gray-500 p-2 rounded-full transform transition-transform duration-200 ease-in-out active:scale-90"
          onClick={takePhoto}
        >
          <Icon icon="zi-camera" size={28} style={{ color: "white" }} />
        </button>
      </div>

      <div className="flex h-[45%] rounded-t-3xl py-4 w-full bg-white text-black absolute z-30 bottom-0 justify-between flex-col items-center">
        <button
          className=" bg-gray-500 p-2 rounded-full my-2"
          onClick={takePhoto}
        >
          <Icon icon="zi-camera" size={36} style={{ color: "white" }} />
        </button>
        <div className="h-full overflow-y-auto gap-3 flex w-full flex-col px-3 font-roboto">
          <p className="text-black font-bold text-center text-lg bg-green-300 py-3">
            Hướng dẫn chụp hình
          </p>
          <p className="text-black font-medium text-sm">
            <span className="font-bold">Bước 1:</span> Đưa camera gần và canh
            chỉnh phiếu trúng giải vào trong phạp vi ô vuông màu trắng.
          </p>
          <p className="text-black font-medium text-sm">
            <span className="font-bold">Bước 2:</span> Nhấn vào biểu tượng
            “camera” chụp rõ nét phiếu trúng thưởng
          </p>
          <p className="text-black font-medium text-sm">
            <span className="font-bold">Bước 3:</span> Kiểm tra hình và nhấn
            phím “Xác nhận” để gửi hình bằng chứng trúng giải
          </p>
          <p className="text-black font-medium text-sm">
            Gọi tổng đài chương trình khi cần hỗ trợ{" "}
            <span className="font-bold">19003209</span>
          </p>
        </div>
      </div>
    </Page>
  );
};

export default ScanScreen;
