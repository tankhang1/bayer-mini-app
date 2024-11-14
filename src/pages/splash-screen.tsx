import * as React from "react";
import Background from "assets/background.jpg";
import Logo from "assets/logo.png";
import Content_2 from "assets/content_2.png";
import Content_3 from "assets/content_3.webp";
import Speaker from "assets/speaker_1.webp";
import Topup from "assets/topup_1.webp";
import Driver from "assets/driver_1.webp";
import Footer from "assets/footer.webp";
import Fridge from "assets/fridge_1.webp";
import Hotline from "assets/hotline.webp";

import { authorize, followOA, openPhone } from "zmp-sdk";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  const postZaloInfo = async () => {
    const authorizeInfo = await authorize({
      scopes: ["scope.userInfo", "scope.userPhonenumber"],
    });
    const authorizeLocation = await authorize({
      scopes: ["scope.userLocation"],
    });

    await followOA({
      id: "3393764570128346168",
      showDialogConfirm: true,
    })
      .then(async (value) => {
        navigate("/present");
      })
      .catch((reason) => console.log(reason));
  };
  const onClickHotline = async () => {
    await openPhone({
      phoneNumber: "19003209",
    });
  };
  React.useEffect(() => {
    setTimeout(() => {
      postZaloInfo();
    }, 700);
  }, []);
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-5 flex items-center flex-col py-5 overflow-auto"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
      }}
    >
      <img src={Logo} className="w-20" />
      <img src={Content_2} className="w-[80%] h-40 object-contain" />
      <div className="relative w-full h-full z-20 -mt-3">
        <img
          src={Content_3}
          className="w-56 h-56 object-contain absolute top-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src={Topup}
          className="w-32 h-32 object-contain absolute top-28 left-0"
          loading="eager"
          decoding="async"
        />
        <img
          src={Speaker}
          className="w-36 h-36 object-contain absolute top-32 right-14"
          loading="eager"
          decoding="async"
        />
        <img
          src={Fridge}
          className="w-48 h-48 object-contain absolute top-48 -left-2"
          loading="eager"
          decoding="async"
        />
        <img
          src={Driver}
          className="w-56 h-56 object-contain absolute  top-56 right-0"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="w-full absolute bottom-0">
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
export default SplashScreen;
