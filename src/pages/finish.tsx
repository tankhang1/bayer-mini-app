import * as React from "react";
import Background from "assets/background.jpg";
import Content_1 from "assets/content_1.png";
import Logo from "assets/logo.png";
import Button_1 from "assets/button_1.png";
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

      <img src={Content_1} className="w-full" />
      <div className="flex justify-center items-center flex-col">
        <div
          className="w-full min-h-24 max-h-24  bg-no-repeat flex items-center px-5 justify-center text-xl text-white font-semibold"
          style={{
            backgroundImage: `url(${Button_1})`,
            backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
          }}
          role="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Cảm ơn bạn đã tham gia
        </div>
      </div>
    </div>
  );
};
export default FinishScreen;
