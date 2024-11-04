import * as React from "react";
import BannerZalo from "assets/baner-zalo.jpg";
import { authorize, followOA, requestSendNotification } from "zmp-sdk";
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

  React.useEffect(() => {
    setTimeout(() => {
      postZaloInfo();
    }, 700);
  }, []);
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-5 flex items-center flex-col py-10 gap-2 overflow-auto"
      style={{
        backgroundImage: `url(${BannerZalo})`,
        backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
      }}
    ></div>
  );
};
export default SplashScreen;
