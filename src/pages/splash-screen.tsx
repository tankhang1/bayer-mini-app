import * as React from "react";
import Background from "assets/background.webp";
import Logo from "assets/logo.png";
import Content_2 from "assets/content_2.webp";
import Content_3 from "assets/content_3.png";
import Speaker from "assets/speaker_1.png";
import Topup from "assets/topup_1.png";
import Driver from "assets/driver_1.png";
import Road from "assets/road.png";
import Fridge from "assets/fridge_1.png";

import {
  authorize,
  getAccessToken,
  getDeviceId,
  getDeviceIdAsync,
  getLocation,
  getPhoneNumber,
  getUserInfo,
} from "zmp-sdk";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  const postZaloInfo = async () => {
    let zaloInfo = {
      access_token: "",
      avatar: "",
      code: "test",
      code_get_location: "",
      code_get_phone: "",
      code_hash: "",
      followed_oa: false,
      is_sensitive: false,
      name: "",
      zalo_app_id: "",
      zalo_device_id: "abc",
    };
    const accessToken = await getAccessToken();
    zaloInfo.access_token = accessToken;
    const authorizeInfo = await authorize({
      scopes: ["scope.userInfo", "scope.userPhonenumber"],
    });
    const authorizeLocation = await authorize({
      scopes: ["scope.userLocation"],
    });
    const deviceId = await getDeviceIdAsync();
    zaloInfo = {
      ...zaloInfo,
      zalo_device_id: deviceId,
    };
    if (authorizeInfo["scope.userInfo"]) {
      const userInfo = await getUserInfo();
      if (userInfo) {
        zaloInfo = {
          ...zaloInfo,
          followed_oa: userInfo.userInfo.followedOA || false,
          avatar: userInfo.userInfo.avatar,
          name: userInfo.userInfo.name,
          is_sensitive: userInfo.userInfo.isSensitive ?? false,
        };
      }
    }

    if (authorizeInfo["scope.userPhonenumber"]) {
      await getPhoneNumber().then((value) => {
        zaloInfo = {
          ...zaloInfo,
          code_get_phone: value.token || "",
        };
      });
    }
    if (authorizeLocation["scope.userLocation"]) {
      await getLocation().then((value) => {
        zaloInfo = {
          ...zaloInfo,
          code_get_location: value.token || "",
        };
      });
    }
    console.log(zaloInfo);
    // if (authorizeInfo && authorizeLocation) navigate("/present");
  };

  React.useEffect(() => {
    setTimeout(() => {
      postZaloInfo();
    }, 700);
  }, []);
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-5 flex items-center flex-col overflow-auto"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
      }}
    >
      <img src={Logo} className="w-20 my-5" />
      <img src={Content_2} className="w-[100%] h-40 object-contain" />
      <div className="relative w-full h-full z-20 -mt-6">
        <img
          src={Content_3}
          className="w-72 h-64 object-contain absolute top-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src={Topup}
          className="w-36 h-36 object-contain absolute top-[25%]  left-[10%]"
          loading="eager"
          decoding="async"
        />
        <img
          src={Speaker}
          className="w-32 h-32 object-contain absolute top-[35%] right-[10%]"
          loading="eager"
          decoding="async"
        />
        <img
          src={Fridge}
          className="w-44 h-44 object-contain absolute bottom-[18%] -left-0"
          loading="eager"
          decoding="async"
        />
        <img
          src={Driver}
          className="w-60 h-60 object-contain absolute  bottom-[0%] right-0"
          loading="eager"
          decoding="async"
        />
      </div>
      <img
        src={Road}
        className="w-full object-contain absolute !bottom-0 right-0"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
export default SplashScreen;
