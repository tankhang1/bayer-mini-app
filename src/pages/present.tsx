import React, { useEffect, useState } from "react";
import Background from "assets/background.jpg";
import Logo from "assets/logo.png";
import Good_Luck from "assets/good_luck.png";
import Speaker from "assets/speaker.png";
import Button_1 from "assets/button_1.png";
import Sound from "assets/clause.mp3";
const audio = new Audio(Sound);

const PresentScreen = () => {
  const [type, setType] = useState<"option_1" | "option_2">("option_1");
  const [isVisible, setIsVisible] = useState(true);

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
  };

  // Effect to play sound when `type` changes
  useEffect(() => {
    audio.pause();
    if (type === "option_1") playSound();
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
    </div>
  );
};

export default PresentScreen;
