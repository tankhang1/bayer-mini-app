import * as React from "react";
import Background from "assets/background.webp";
import Content_3 from "assets/Nativo.png";
import Content_2 from "assets/content_2.webp";
import Footer from "assets/footer.webp";
import Logo from "assets/logo.png";
import Hotline from "assets/hotline.webp";
import { useNavigate } from "react-router-dom";
import { openPhone } from "zmp-sdk";

const AuthScreen = () => {
  const navigate = useNavigate();
  const onNavSplashScreen = () => {
    navigate("/splash-screen");
  };
  const onNavPolicyScreen = () => {
    navigate("/policy-screen");
  };
  const onNavPrivacyScreen = () => {
    navigate("/privacy-screen");
  };
  const onClickHotline = async () => {
    await openPhone({
      phoneNumber: "19003209",
    });
  };
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-5 flex items-center flex-col overflow-auto"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
      }}
    >
      <img src={Logo} className="w-20 my-5" />

      <img src={Content_2} className="w-full max-h-40 object-contain -mt-3" />
      <img src={Content_3} className="w-full object-contain -mt-10" />

      <div className="flex justify-center items-center flex-col -mt-3">
        <div
          className="py-3 w-56 bg-no-repeat flex items-center justify-center text-lg  text-white font-bold bg-[#be0000] rounded-3xl"
          role="button"
          onClick={onNavSplashScreen}
        >
          Đồng ý
        </div>
        <div className="flex items-center gap-3 mt-3">
          <p
            className="text-white text-xs underline font-semibold text-center"
            role="button"
            onClick={onNavPrivacyScreen}
          >
            Thể lệ tham gia
          </p>
          <div className="w-[1px] h-4 bg-white  " />
          <p
            className="text-white text-xs underline font-semibold  text-center"
            role="button"
            onClick={onNavPolicyScreen}
          >
            Cam kết quyền riêng tư
          </p>
        </div>
      </div>
      <div className="h-full" />

      <div className="w-full max-h-28 absolute bottom-0">
        <img src={Footer} className="w-full object-contain " />
        <img
          src={Hotline}
          className=" w-36 absolute bottom-3 right-2 object-contain"
          role="button"
          onClick={onClickHotline}
        />
      </div>
    </div>
  );
};
export default AuthScreen;
