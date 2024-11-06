import React, { useEffect, useState } from "react";
import Background from "assets/background.jpg";
import Logo from "assets/logo.png";
import Good_Luck from "assets/good_luck.png";
import Speaker from "assets/speaker.png";
import Button_1 from "assets/button_1.png";
import Sound from "assets/clause.mp3";
import { Modal } from "zmp-ui";
import { useNavigate } from "react-router-dom";
const audio = new Audio(Sound);

const PresentScreen = () => {
  const [type, setType] = useState<"option_1" | "option_2">("option_1");
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const handleSwitch = (newType) => {
    // Trigger the fade-out animation before switching
    setIsVisible(false);
    setTimeout(() => {
      setType(newType);
      setIsVisible(true); // Fade-in effect when new type appears
    }, 200); // Match the duration of the fade-out animation
  };
  const playSound = () => {
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 2000);
  };
  const navScan = () => {
    navigate("/scan-screen");
  };
  // Effect to play sound when `type` changes
  useEffect(() => {
    // audio.pause();
    // if (type === "option_1") playSound();
  }, [type]);

  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-3 flex items-center flex-col py-10 gap-2 overflow-hidden transition-all duration-75"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%",
      }}
    >
      <img src={Logo} className={`w-20 `} />
      {type === "option_1" ? (
        <img
          src={Speaker}
          className={`w-full ${
            isVisible ? "zoom-in-animation" : "fade-out-animation"
          }`}
        />
      ) : (
        <img
          src={Good_Luck}
          className={`w-full ${
            isVisible ? "zoom-in-animation" : "fade-out-animation"
          }`}
        />
      )}
      {type === "option_1" ? (
        <p
          className={`text-2xl text-red-600 font-bold whitespace-pre-line text-center ${
            isVisible ? "zoom-in-animation" : "fade-out-animation"
          }`}
        >
          {`Cơ hội <0X>,\nchúc <bạn> may mắn lần sau!`}
        </p>
      ) : (
        <p
          className={`text-2xl text-red-600 font-bold whitespace-pre-line text-center ${
            isVisible ? "zoom-in-animation" : "fade-out-animation"
          }`}
        >
          {`Chúc mừng <bạn> trúng\nthưởng cơ hội <0X>`}
        </p>
      )}
      <div
        className={`w-4/5 min-h-24 max-h-24 bg-no-repeat flex items-center justify-center text-xl text-white font-bold gap-5`}
        style={{
          backgroundImage: `url(${Button_1})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div role="button" onClick={() => handleSwitch("option_1")}>
          Cơ hội 1
        </div>
        <div className="w-[1px] h-8 bg-white" />
        <div role="button" onClick={() => handleSwitch("option_2")}>
          Cơ hội 2
        </div>
      </div>
      <Modal visible={true}>
        <div className=" max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
            Xin chúc mừng!
          </h2>
          <p className="text-gray-700 text-justify mb-6">
            Bạn đã trúng giải thưởng. Để xác thực thông tin và liên hệ nhận
            thưởng, vui lòng nhấn vào nút xác thực bên dưới và hoàn thành các
            bước xác nhận. Chúng tôi sẽ liên hệ với bạn sau khi quá trình xác
            thực hoàn tất. Cảm ơn bạn đã tham gia và chúc bạn nhận được phần
            thưởng sớm nhất!
          </p>
          <div className="text-center">
            <button
              className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
              onClick={navScan}
            >
              Xác Thực Ngay
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PresentScreen;
