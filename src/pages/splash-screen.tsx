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
import { Button, Modal } from "zmp-ui";
import { toast } from "react-toastify";
import { useUpdateZaloInfoMutation } from "redux/api/zalo/zalo.api";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [openModalReject, setOpenModalReject] = React.useState(false);
  const [openExceededMaximumRequest, setOpenExceededMaximumRequest] =
    React.useState(false);
  const [updateZaloInfo, { isLoading: isLoadingUpdateZalo }] =
    useUpdateZaloInfoMutation();
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
          .then(() => navigate("/present"))
          .catch(() => {});
      }
    } catch (error) {
      //@ts-expect-error no check
      if (error?.code === -203) {
        setOpenExceededMaximumRequest(true);
      } else {
        setOpenModalReject(true);
      }
    }
    // if (authorizeInfo && authorizeLocation) navigate("/present");
  };
  const onCloseApp = async () => {
    await closeApp({
      fail: () =>
        toast.info("Vui lòng nhấn dấu 'X' trên cùng bên trái để tắt ứng dụng"),
    });
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
    </div>
  );
};
export default SplashScreen;
