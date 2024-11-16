import * as React from "react";
import Background from "assets/background.webp";
import Content_2 from "assets/content_2.webp";
import Logo from "assets/logo.png";
import Oke from "assets/oke.webp";
import { useNavigate } from "react-router-dom";
const FinishScreen = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-5 flex items-center flex-col py-10 gap-2 overflow-auto"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
      }}
    >
      <img src={Logo} className="w-20" />

      <img src={Content_2} className="w-full" />
      <img
        src={Oke}
        className={`w-full mb-2 
         h-44
        object-contain `}
        loading="eager"
        decoding="auto"
      />
      <p className="text-[#f5ecdd] text-xl font-extrabold text-center">{`Chúng tôi đã nhận thông tin và bằng chứng trúng giải của bạn. Tổng đài viên sẽ liên hệ sau!`}</p>
    </div>
  );
};
export default FinishScreen;
