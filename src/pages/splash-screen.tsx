import * as React from "react";
import Background from "assets/background.webp";
import Logo from "assets/logo.png";
import Content_2 from "assets/content_2.png";
import Content_3 from "assets/content_3.png";
import Speaker from "assets/speaker_1.png";
import Topup from "assets/topup_1.png";
import Driver from "assets/driver_1.png";
import Road from "assets/road.png";
import Fridge from "assets/fridge_1.png";
import Reject from "assets/reject.webp";
import {
  authorize,
  closeApp,
  getAccessToken,
  getDeviceId,
  getDeviceIdAsync,
  getLocation,
  getPhoneNumber,
  getUserInfo,
} from "zmp-sdk";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Spinner } from "zmp-ui";
import { toast } from "react-toastify";
import { useUpdateZaloInfoMutation } from "redux/api/zalo/zalo.api";
import { useUsingIqrMutation } from "redux/api/iqr/iqr.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { TBaseRES } from "types";
import { TUsingIqrRES } from "redux/api/iqr/iqr.response";
import { updateAward, updateInfo, updateStatus } from "redux/slices/appSlice";

const SplashScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deviceId, code } = useSelector((state: RootState) => state.app);
  const [openModalReject, setOpenModalReject] = React.useState(false);
  const [openExceededMaximumRequest, setOpenExceededMaximumRequest] =
    React.useState(false);
  const [updateZaloInfo, { isLoading: isLoadingUpdateZalo }] =
    useUpdateZaloInfoMutation();
  const [usingIqr, { isLoading: isUsingIqr }] = useUsingIqrMutation();
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
  const [openErrorPopup, setOpenErrorPopup] = React.useState(false);
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
      dispatch(updateAward(value.data));
      navigate("/present");
    }
    if (value.status === 0) {
      dispatch(updateAward(value.data));
      navigate("/present");
    }
    if (value.status === 1) {
      dispatch(updateAward(value.data));
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
      dispatch(updateAward(value.data));
      navigate("/present");
    }
    if (value.status === 3) {
      dispatch(updateAward(value.data));
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
      dispatch(updateAward(value.data));
      navigate("/present");
    }
  };
  const onUsingIqr = async () => {
    await usingIqr({
      code: code,
      zalo_device_id: deviceId,
    })
      .unwrap()
      .then((value) => {
        dispatch(updateStatus(value.status));
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
  const postZaloInfo = async () => {
    try {
      let zaloInfo = {
        access_token: "",
        avatar: "",
        code: "",
        code_get_location: "",
        code_get_phone: "",
        code_hash: "",
        followed_oa: false,
        is_sensitive: false,
        name: "",
        zalo_app_id: "",
        zalo_device_id: "961875647980920338",
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
      if (zaloInfo) {
        await updateZaloInfo(zaloInfo)
          .unwrap()
          .then(async (value) => {
            dispatch(
              updateInfo({
                name: value.data.name,
                phone: value.data.phone,
                deviceId: value.data.zalo_device_id,
              })
            );
            await onUsingIqr();
          })
          .catch(() => {
            toast.error(
              "Đã có lỗi xảy ra, vui lòng liên hệ 19003209 để được hỗ trợ"
            );
          });
      }
    } catch (error) {
      //@ts-expect-error no check
      if (error?.code === -203) {
        setOpenExceededMaximumRequest(true);
      } else {
        setOpenModalReject(true);
      }
    }
  };

  const onCloseApp = async () => {
    await closeApp({
      fail: () =>
        toast.info("Vui lòng nhấn dấu 'X' trên cùng bên trái để tắt ứng dụng"),
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
      <Modal
        visible={openModalReject}
        onClose={() => setOpenModalReject(false)}
        title={(<img src={Reject} className="w-20 h-20 mx-auto" />) as any}
      >
        <p className="whitespace-pre-line">
          {`Ứng dụng Bayer Việt Nam cần quyền truy cập vào thông tin cá nhân (họ tên, số điện thoại, vị trí) để: 
          1) Xác minh tính hợp lệ của người tham gia chương trình. 
          2) Hỗ trợ gửi thông báo trúng thưởng và thực hiện trao giải thưởng một cách chính xác. 
          Việc cấp quyền giúp chúng tôi đảm bảo quyền lợi của bạn và tối ưu hóa trải nghiệm khi tham gia chương trình. Bayer cam kết bảo mật thông tin và sử dụng theo đúng mục đích được công bố."`}
        </p>
        <div className="flex items-center justify-between gap-2 mt-2">
          <Button
            className="w-full"
            onClick={() => {
              postZaloInfo();
              setOpenModalReject(false);
            }}
          >
            Xin quyền
          </Button>
          <Button
            variant="secondary"
            className="!bg-red-400 !text-white w-full"
            onClick={() => {
              setOpenModalReject(false);
              navigate(-1);
              onCloseApp();
            }}
          >
            Từ chối
          </Button>
        </div>
      </Modal>
      <Modal
        visible={openExceededMaximumRequest}
        onClose={() => setOpenExceededMaximumRequest(false)}
        title={(<img src={Reject} className="w-20 h-20 mx-auto" />) as any}
      >
        <p className="whitespace-pre-line">
          Bạn đã gửi quá số lần yêu cầu cho phép. Hệ thống chỉ cho phép tối đa 5
          yêu cầu, nhưng bạn đã gửi 6 yêu cầu. Vui lòng thoát app và quét lại.
        </p>
        <div className="flex items-center justify-between gap-2 mt-2">
          <Button
            variant="secondary"
            className="!bg-red-400 !text-white w-full"
            onClick={() => {
              setOpenModalReject(false);
              navigate(-1);
              onCloseApp();
            }}
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
      <Modal visible={isLoadingUpdateZalo || isUsingIqr}>
        <div className="flex flex-col justify-center items-center">
          <Spinner />
          <p className="text-center">
            Hệ thống đang xử lí, vui lòng chờ trong giây lát....
          </p>
        </div>
      </Modal>
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
export default SplashScreen;
