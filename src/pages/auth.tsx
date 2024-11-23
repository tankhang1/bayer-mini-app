import * as React from "react";
import Background_tmp from "assets/background_2.png";
import Background from "assets/background.webp";
import Content_3 from "assets/Nativo.png";
import Content_3_tmp from "assets/content_3.png";

import Content_2 from "assets/content_2.webp";
import Footer from "assets/footer.webp";
import Logo from "assets/logo.png";
import Hotline from "assets/hotline.webp";
import { useNavigate } from "react-router-dom";
import { openPhone } from "zmp-sdk";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useCheckIqrMutation } from "redux/api/iqr/iqr.api";
import { Button, Spinner } from "zmp-ui";
import { RootState } from "redux/store";
import { useGetAccessTokenMutation } from "redux/api/auth/auth.api";
import { ACCOUNT } from "constants";

const AuthScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deviceId } = useSelector((state: RootState) => state.app);
  const [checkIqr, { isLoading: isLoadingCheckIqr }] = useCheckIqrMutation();
  const [getAccessToken, { isLoading: isLoadingAccessToken }] =
    useGetAccessTokenMutation();
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
    }).catch((e) => {
      toast.error(
        "Không thể mở thông tin số hotline, vui lòng thực hiện thủ công"
      );
    });
  };

  const onCheckIqr = async () => {
    await checkIqr({
      code: "",
      zalo_device_id: deviceId,
    })
      .unwrap()
      .then(() => {})
      .catch(() => {});
  };
  const onGetAccessToken = async () => {
    await getAccessToken(ACCOUNT)
      .unwrap()
      .then(() => {})
      .catch(() => {});
  };
  const onGetParams = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("t");
    onCheckIqr();
  };

  React.useEffect(() => {
    onGetAccessToken();
    onGetParams();
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

      <img src={Content_2} className="w-full max-h-40 object-contain -mt-3" />
      <img src={Content_3} className="w-full object-contain" />

      <div className="flex justify-center items-center flex-col">
        <Button
          className="py-3 w-56 !text-lg  text-white !font-bold !bg-[#be0000] !font-roboto"
          // loading={isLoadingCheckIqr || isLoadingAccessToken}
          onClick={onNavSplashScreen}
        >
          Đồng ý
        </Button>
        <div className="flex items-center gap-3 mt-3">
          <p
            className="text-white text-xs underline font-semibold text-center font-roboto"
            role="button"
            onClick={onNavPrivacyScreen}
          >
            Thể lệ tham gia
          </p>
          <div className="w-[1px] h-4 bg-white  " />
          <p
            className="text-white text-xs underline font-semibold  text-center font-roboto"
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
