import { BASE_NO_AUTH_URL } from "constants";
import dayjs from "dayjs";
import { generateUUID } from "hooks/generateUUID";
import { uploadBase64Image, uploadBlob } from "hooks/uploadFile";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useConfirmIqrMutation } from "redux/api/iqr/iqr.api";
import { RootState } from "redux/store";
import { Button } from "zmp-ui";

const PreviewScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { code, userId, phone, name } = useSelector(
    (state: RootState) => state.app
  );
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [confirmIqr, { isLoading: isLoadingConfirmIqr }] =
    useConfirmIqrMutation();
  const onNavFinish = async () => {
    setIsLoadingUpload(true);
    if (state.type === "base64") {
      await uploadBase64Image(state.previewImage, code);
    } else {
      await uploadBlob(state.previewImage, code);
    }
    setIsLoadingUpload(false);
    await confirmIqr({
      code: code,
      zalo_user_id: userId,
      image_confirm: `${BASE_NO_AUTH_URL}/${code}.jpg`,
    })
      .unwrap()
      .then((value) => {
        navigate("/finish", {
          state: {
            status: value.status,
          },
        });
      })
      .catch(() => {
        toast.error(
          "Hệ thống đang bị gián đoạn. Vui lòng liên hệ 19003209 để được hỗ trợ. Xin lỗi quý khách hàng vì sự bất tiện này"
        );
      });
  };
  const onNavBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full h-full bg-black">
      <img
        src={state.previewImage}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "contain",
          backgroundColor: "transparent",
        }}
      />
      <div className="absolute top-5 left-4 flex gap-1 flex-col">
        <div
          className="flex items-center gap-3"
          style={{ fontFamily: "helveticaneue" }}
        >
          <p className="text-white text-left z-20 whitespace-pre-line text-5xl">
            {dayjs(new Date()).format("HH:mm")}
          </p>
          <div className="w-[2px] h-9 bg-yellow-300 rounded-full" />
          <div>
            <p className="text-white text-left z-20 whitespace-pre-line">
              {dayjs(new Date()).format("DD/MM/YYYY")}
            </p>
            <p className="text-white text-left z-20 whitespace-pre-line">
              {dayjs(new Date()).format("dddd")}
            </p>
          </div>
        </div>
        <div
          className="bg-gradient-to-r via-white/5 from-white/40 to-transparent p-2 flex flex-col gap-1 rounded-md"
          style={{ fontFamily: "helveticaneue" }}
        >
          <p className="text-white text-left z-20 whitespace-pre-line">
            Tên khách hàng: {name}
          </p>
          <p className="text-white text-left z-20 whitespace-pre-line">
            Số điện thoại: {phone}
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-2/4 justify-center items-center flex flex-col gap-2"
        style={{ fontFamily: "helveticaneue" }}
      >
        <Button
          className=" w-full py-3 px-4 !text-white !bg-[#FF2929] !font-bold !text-xl"
          onClick={onNavFinish}
          loading={isLoadingUpload || isLoadingConfirmIqr}
        >
          Xác nhận
        </Button>
        <Button
          className="w-full py-3 px-4 !text-[#be0000] !bg-white !font-bold !text-xl"
          onClick={onNavBack}
        >
          Chụp lại
        </Button>
      </div>
    </div>
  );
};

export default PreviewScreen;
