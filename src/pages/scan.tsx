import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Icon, Modal, Page } from "zmp-ui";
import api, {
  checkZaloCameraPermission,
  chooseImage,
  FacingMode,
  openPermissionSetting,
  PhotoFormat,
  PhotoFrame,
  PhotoQuality,
  requestCameraPermission,
  ZMACamera,
} from "zmp-sdk";
import { useNavigate } from "react-router-dom";
import GuideAudio from "assets/guide.mp3";
import NotiTag from "assets/noti.png";

const guide = new Audio(GuideAudio);

const ScanScreen = () => {
  const navigate = useNavigate();
  const [openedPermissionCamera, setOpenedPermissionCamera] = useState(false);
  const cameraRef = useRef<ZMACamera | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const takePhoto = () => {
    const result: PhotoFrame = cameraRef.current?.takePhoto({
      quality: PhotoQuality.HIGH,
      format: PhotoFormat.JPEG,
      minScreenshotHeight: 800,
    });
    if (result) {
      console.log("result", result);
      guide.pause();
      navigate("/preview", {
        state: {
          previewImage: result.data,
          type: "base64",
        },
      });
    } else {
      onRequestCameraPermission();
    }
  };
  const startStreaming = async () => {
    console.log("start stream");
    try {
      const camera = cameraRef.current;
      await camera?.start();
    } catch (error) {
      setOpenedPermissionCamera(true);
    }
  };
  const onOpenSetting = async () => {
    openPermissionSetting();
  };
  // const changeFlip = async () => {
  //   await cameraRef.current?.flip();
  // };

  const onRequestCameraPermission = async () => {
    try {
      const cameraStatus = await requestCameraPermission({});
      console.log("1", cameraStatus);
      setOpenedPermissionCamera(false);

      if (cameraStatus.userAllow) {
        startStreaming();
      } else {
        setOpenedPermissionCamera(true);
      }
    } catch (error) {
      setOpenedPermissionCamera(true);
    }
  };
  const handleChooseImage = async () => {
    await chooseImage({
      sourceType: ["camera"],
      cameraType: "back",
      count: 1,
    }).then(async (value) => {
      const response = await fetch(value.filePaths[0]);
      const blob = await response.blob();

      // Read the blob as Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        guide.pause();
        navigate("/preview", {
          state: {
            previewImage: reader.result,
            type: "base64",
          },
        });
      };
      reader.readAsDataURL(blob); // Read as data URL (Base64)
    });
  };
  const onConfirmOpenSettingCamera = () => {
    setOpenedPermissionCamera(false);
    openPermissionSetting();
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
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        onRequestCameraPermission();
      } else {
        cameraRef.current?.stop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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

        <div className="absolute top-0 w-full h-full px-3 pt-24 bg-drop">
          <p className="text-white font-bold text-center">
            Chụp hình phiếu trúng thưởng
          </p>
          <div className="border-2 border-gray-200 rounded-2xl !h-[35%] relative">
            <div className="border-2 border-gray-200 rounded-xl !h-[30%] w-[30%] absolute bottom-10 right-10" />
          </div>
        </div>
      </Box>

      <div className="absolute z-20 top-6 right-5 flex items-center gap-2">
        {/*<button
          className=" bg-gray-500 p-2 rounded-full transform transition-transform duration-200 ease-in-out active:scale-90"
          onClick={changeFlip}
        >
          <Icon icon="zi-auto" size={28} style={{ color: "white" }} />
        </button>*/}

        <button
          className=" bg-gray-500 p-2 rounded-full transform transition-transform duration-200 ease-in-out active:scale-90"
          onClick={handleChooseImage}
        >
          <Icon icon="zi-camera" size={28} style={{ color: "white" }} />
        </button>
        <button
          className=" bg-gray-500 p-2 rounded-full transform transition-transform duration-200 ease-in-out active:scale-90"
          onClick={onOpenSetting}
        >
          <Icon icon="zi-setting" size={28} style={{ color: "white" }} />
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
            chỉnh phiếu trúng giải vào trong phạm vi ô vuông màu trắng.
          </p>
          <p className="text-black font-medium text-sm">
            <span className="font-bold">Bước 2:</span> Nhấn vào biểu tượng
            “camera” chụp rõ nét phiếu trúng thưởng.
          </p>
          <p className="text-black font-medium text-sm">
            <span className="font-bold">Bước 3:</span> Kiểm tra hình và nhấn
            phím “Xác nhận” để gửi hình bằng chứng trúng giải.
          </p>
          <p className="text-black font-medium text-sm">
            Gọi tổng đài chương trình khi cần hỗ trợ{" "}
            <span className="font-bold">19003209</span>.
          </p>
        </div>
      </div>
      <Modal
        visible={openedPermissionCamera}
        onClose={() => {}}
        modalStyle={{
          backgroundColor: "transparent",
        }}
      >
        <div className="bg-white px-10 pt-10 pb-5 rounded-2xl border-4 border-yellow-400 relative">
          <img
            src={NotiTag}
            className="w-3/4 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          />
          <p className="text-lg py-6 text-center">
            Quý nhà nông vui lòng nhấn “Đồng ý” để bật quyền sử dụng camera nhằm
            chụp bằng chứng trúng giải.
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Button
              variant="secondary"
              className="!bg-[#FF2929] !font-bold !text-white !whitespace-pre-line w-auto"
              style={{ fontFamily: "helveticaneue", lineHeight: "1" }}
              onClick={onConfirmOpenSettingCamera}
            >
              Đồng ý
            </Button>
          </div>
        </div>
      </Modal>
    </Page>
  );
};

export default ScanScreen;
