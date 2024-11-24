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
import { closeApp, getDeviceIdAsync, openPhone } from "zmp-sdk";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  useCheckIqrMutation,
  useConfirmIqrMutation,
  useUsingIqrMutation,
} from "redux/api/iqr/iqr.api";
import { Button, Modal, Spinner } from "zmp-ui";
import { useGetAccessTokenMutation } from "redux/api/auth/auth.api";
import { ACCOUNT, BASE_URL } from "constants";
import {
  updateAward,
  updateCode,
  updateDeviceId,
  updateToken,
} from "redux/slices/appSlice";
import Reject from "assets/reject.webp";
import { useZaloCheckDeviceIdMutation } from "redux/api/zalo/zalo.noauth.api";
import axios from "axios";
import { RootState } from "redux/store";
import { TBaseRES } from "types";
import { TIqrRES, TUsingIqrRES } from "redux/api/iqr/iqr.response";

const AuthScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, deviceId, code } = useSelector(
    (state: RootState) => state.app
  );
  const [isDeviceIdExist, setIsDeviceIdExist] = React.useState(false);
  const [checkIqr, { isLoading: isLoadingCheckIqr }] = useCheckIqrMutation();
  const [usingIqr, { isLoading: isUsingIqr }] = useUsingIqrMutation();
  const [checkDeviceId, { isLoading: isLoadingCheckDeviceId }] =
    useZaloCheckDeviceIdMutation();
  const [getAccessToken, { isLoading: isLoadingAccessToken }] =
    useGetAccessTokenMutation();
  const [openErrorPopup, setOpenErrorPopup] = React.useState(false);
  const [messageError, setMessageError] = React.useState<
    Partial<{
      type: "system" | "api";
      isExit: boolean;
      btnLabel: string;
      message: string;
      navLink: string;
    }>
  >({
    type: "system",
    message: "",
    isExit: false,
    btnLabel: "Xác nhận",
  });
  const onSubmit = async () => {
    if (isDeviceIdExist) {
      await onUsingIqr();
    } else {
      navigate("/splash-screen");
    }
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
  const onMapError = (value: TBaseRES<TUsingIqrRES>) => {
    if (value.status === -99) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: true,
        btnLabel: "Thoát",
      });
    }
    if (value.status === -1) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: false,
        btnLabel: "Xác nhận",
      });
    }
    if (value.status === -2) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: true,
        btnLabel: "Thoát",
      });
    }
    if (value.status === -3) {
    }
    if (value.status === -4) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: true,
        btnLabel: "Thoát",
      });
    }
    if (value.status === -5) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: true,
        btnLabel: "Thoát",
      });
    }
    if (value.status === 0) {
      if (isDeviceIdExist) {
        dispatch(updateAward(value.data));
        navigate("/present");
      } else {
        navigate("/splash-screen");
      }
    }
    if (value.status === 1) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: false,
        btnLabel: "Chụp phiếu trúng thưởng",
        navLink: "/scan-screen",
      });
    }
    if (value.status === 2) {
      navigate("/present");
    }
    if (value.status === 3) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: false,
        btnLabel: "Chụp lại phiếu trúng thưởng",
        navLink: "/scan-screen",
      });
    }
    if (value.status === 4) {
      navigate("/present");
    }
  };
  const onCheckIqr = async (deviceId: string, code: string) => {
    await checkIqr({
      code: code,
      zalo_device_id: deviceId,
    })
      .unwrap()
      .then((value) => {
        onMapError(value);
      })
      .catch((error) => {
        setOpenErrorPopup(true);
        setMessageError({
          type: "api",
          message:
            error?.message ||
            "Đã có lỗi xảy ra, vui lòng liên hệ 19003209 để được hỗ trợ",
          isExit: true,
          btnLabel: "Thoát",
        });
      });
  };
  const onGetAccessToken = async () => {
    await getAccessToken(ACCOUNT)
      .unwrap()
      .then(async (value) => {
        dispatch(updateToken(value.token));
      })
      .catch(() => {
        toast.error(
          "Hệ thống đang bị gián đoạn. Vui lòng liên hệ 19003209 để được hỗ trợ. Xin lỗi quý khách hàng vì sự bất tiện này"
        );
      });
  };
  const onGetParams = async () => {
    // const queryString = window.location.search;
    const queryString =
      "https://zalo.me/s/961875647980920338/?env=DEVELOPMENT&version=zdev-38705cd9&code=NY8TFV9AM";
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    console.log(code);
    dispatch(updateCode(code || ""));
    onCheckIqr(deviceId, code || "");
  };
  const onGetDeviceId = async () => {
    await getDeviceIdAsync()
      .then(async (deviceId) => {
        dispatch(updateDeviceId(deviceId));
        await checkDeviceId({
          i: deviceId,
        })
          .unwrap()
          .then((value) => {
            if (value) setIsDeviceIdExist(true);
            else setIsDeviceIdExist(false);
          })
          .catch(() => {
            toast.error(
              "Hệ thống đang bị gián đoạn. Vui lòng liên hệ 19003209 để được hỗ trợ. Xin lỗi quý khách hàng vì sự bất tiện này"
            );
          });
      })
      .catch(() => {
        toast.error(
          "Hệ thống đang bị gián đoạn. Vui lòng liên hệ 19003209 để được hỗ trợ. Xin lỗi quý khách hàng vì sự bất tiện này"
        );
      });
  };
  const onPopupErrorClick = async () => {
    setOpenErrorPopup(false);
    if (messageError.isExit) {
      await closeApp({
        success() {},
        fail: () =>
          toast.info(
            "Vui lòng nhấn dấu 'X' trên cùng bên trái để tắt ứng dụng"
          ),
      });
    } else {
      if (messageError.navLink) {
        navigate(messageError.navLink);
      }
    }
  };
  const onUsingIqr = async () => {
    await usingIqr({
      code: code,
      zalo_device_id: deviceId,
    })
      .unwrap()
      .then((value) => {
        onMapError(value);
      })
      .catch((error) => {
        setOpenErrorPopup(true);
        setMessageError({
          type: "api",
          message:
            error?.message ||
            "Đã có lỗi xảy ra, vui lòng liên hệ 19003209 để được hỗ trợ",
          isExit: true,
          btnLabel: "Thoát",
        });
      });
  };
  React.useEffect(() => {
    onGetAccessToken();
    onGetDeviceId();
  }, []);
  React.useEffect(() => {
    if (deviceId && token) {
      onGetParams();
    }
  }, [token, deviceId]);
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
          loading={
            isLoadingCheckIqr ||
            isLoadingAccessToken ||
            isLoadingCheckDeviceId ||
            isUsingIqr
          }
          onClick={onSubmit}
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
      <Modal
        visible={openErrorPopup}
        onClose={() => setOpenErrorPopup(false)}
        title={(<img src={Reject} className="w-20 h-20 mx-auto" />) as any}
      >
        {messageError.type === "system" ? (
          <p className="text-lg">{messageError.message}</p>
        ) : (
          messageError.message && (
            <div
              dangerouslySetInnerHTML={{
                __html: messageError.message,
              }}
            />
          )
        )}

        <div className="flex items-center justify-between gap-2 mt-2">
          <Button
            variant="secondary"
            className="!bg-red-400 !text-white w-full"
            onClick={onPopupErrorClick}
          >
            {messageError.btnLabel || "Xác nhận"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default AuthScreen;
