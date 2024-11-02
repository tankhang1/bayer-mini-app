import * as React from "react";
import Background from "assets/background.jpg";
import Content_1 from "assets/content_1.png";
import Logo from "assets/logo.png";
import Button_1 from "assets/button_1.png";
const SplashScreen = () => {
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-5 flex items-center flex-col py-10 gap-2 overflow-auto"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
      }}
    >
      <img src={Logo} className="w-20" />

      <img src={Content_1} className="w-fit" />
      <div
        className="w-3/4 min-h-24 max-h-24  bg-no-repeat flex items-center justify-center text-xl text-white font-semibold"
        style={{
          backgroundImage: `url(${Button_1})`,
          backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
        }}
        role="button"
      >
        Đồng ý
      </div>
      <div className="flex items-center gap-3">
        <p className="text-red-600 text-sm" role="button">
          Cam kết quyền riêng tư
        </p>
        <div className="w-[1px] h-6 bg-red-600" />
        <p className="text-red-600 text-sm" role="button">
          Điều khoản chương trình
        </p>
      </div>
    </div>
  );
};
export default SplashScreen;
