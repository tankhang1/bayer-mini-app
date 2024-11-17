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
      <p className="text-white text-center text-lg absolute z-20  top-4 left-4 whitespace-pre-line ">
        {`Kiểm tra ảnh trước khi gửi về chương trình`}
      </p>
      <img src={state.previewImage} className="w-full h-dvh object-cover" />
      <div>
        <p className="text-white text-left absolute z-20  bottom-14 left-4 whitespace-pre-line">
          {new Date().toLocaleString()}
        </p>
        <p className="text-white text-left absolute z-20  bottom-7 left-4 whitespace-pre-line">
          Số điện thoại: xxxx4825
        </p>
      </div>

      <div
        className="text-left absolute z-20 inline-block py-3 px-4 rounded-lg bottom-7 right-4 bg-white text-[#be0000] font-bold"
        onClick={onNavFinish}
      >
        Xác nhận
      </div>
    </div>
  );
};

export default PreviewScreen;
