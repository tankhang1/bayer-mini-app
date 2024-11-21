import dayjs from "dayjs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PreviewScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const onNavFinish = () => {
    navigate("/finish");
  };
  const onNavBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full h-full">
      <img src={state.previewImage} className="w-full h-dvh object-cover" />
      <div className="absolute top-5 left-4 flex gap-1 flex-col">
        <div className="flex items-center gap-3">
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
        <p className="text-white">44 Tân Phong, Q7, HCM</p>
        <div className="bg-gradient-to-r via-white/5 from-white/40 to-transparent p-2 flex flex-col gap-1 rounded-md">
          <p className="text-white text-left z-20 whitespace-pre-line">
            Tên khách hàng: Lê Hoài Phong
          </p>
          <p className="text-white text-left z-20 whitespace-pre-line">
            Số điện thoại: xxxx4825
          </p>
        </div>
      </div>

      <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-3/4 justify-center items-center flex flex-col gap-2">
        <div
          className="text-left w-full py-3 px-4 rounded-full text-white bg-[#be0000] font-bold flex justify-center items-center text-xl"
          onClick={onNavFinish}
        >
          Xác nhận
        </div>
        <div
          className="text-left w-full py-3 px-4 rounded-full text-[#be0000] bg-white font-bold flex justify-center items-center text-xl"
          onClick={onNavBack}
        >
          Chụp lại
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
