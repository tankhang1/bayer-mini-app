import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PreviewScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const onNavFinish = () => {
    navigate("/finish");
  };
  return (
    <div className="w-full h-full">
      <p className="text-white text-left absolute z-20  top-4 left-4 whitespace-pre-line">
        {`Kiểm tra hình ảnh \ntrước khi gửi nhà sản xuất`}
      </p>
      <img src={state.previewImage} className="w-full h-dvh object-cover" />
      <p className="text-white text-left absolute z-20  bottom-7 left-4 whitespace-pre-line">
        {new Date().toLocaleString()}
      </p>
      <div
        className="text-left absolute z-20 inline-block py-3 px-4 rounded-lg bottom-7 right-4 bg-white text-black font-medium"
        onClick={onNavFinish}
      >
        Xác nhận
      </div>
    </div>
  );
};

export default PreviewScreen;
