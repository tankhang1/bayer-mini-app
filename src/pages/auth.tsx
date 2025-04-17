import * as React from "react";
import Background from "assets/background.webp";
import Content_3 from "assets/Nativo.webp";

import Content_2 from "assets/content_2.webp";
import Footer from "assets/footer.webp";
import Logo from "assets/logo.png";
import Hotline from "assets/hotline.webp";
import { Link, useNavigate } from "react-router-dom";
import { closeApp, getUserID, openPhone } from "zmp-sdk";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  useCheckIqrMutation,
  useUsingIqrMutation,
} from "redux/api/iqr/iqr.api";
import { Box, Button, Checkbox, Icon, Input, Modal, Sheet, Text } from "zmp-ui";
import { useGetAccessTokenMutation } from "redux/api/auth/auth.api";
import { ACCOUNT } from "constants";
import {
  updateAward,
  updateCode,
  updateUserId,
  updateInfo,
  updateStatus,
  updateToken,
} from "redux/slices/appSlice";
import { RootState } from "redux/store";
import Logo1 from "assets/logo_1.png";
import { TBaseRES } from "types";
import { TUsingIqrRES } from "redux/api/iqr/iqr.response";
import { useZaloCheckUserIdIdMutation } from "redux/api/zalo/zalo.api";
import NotiTag from "assets/noti.png";
import { TZaloCheckRES } from "redux/api/zalo/zalo.response";

const AuthScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, userId, code } = useSelector((state: RootState) => state.app);
  const [isUserIdExist, setIsUserIdExist] = React.useState(false);
  const [checkIqr, { isLoading: isLoadingCheckIqr }] = useCheckIqrMutation();
  const [usingIqr, { isLoading: isUsingIqr }] = useUsingIqrMutation();
  const [checkUserId, { isLoading: isLoadingCheckUserId }] =
    useZaloCheckUserIdIdMutation();
  const [getAccessToken, { isLoading: isLoadingAccessToken }] =
    useGetAccessTokenMutation();
  const [isLink, setIsLink] = React.useState(true);
  const [isFocused, setIsFocused] = React.useState(false);
  const [iqrCode, setIqrCode] = React.useState("");
  const [openErrorPopup, setOpenErrorPopup] = React.useState(false);
  const [openPermissionPopup, setOpenPermissionPopup] = React.useState(false);
  const [isPermitPrivacy, setIsPermitPrivacy] = React.useState(false);
  const [isPermitPolicy, setIsPermitPolicy] = React.useState(false);
  const [messageError, setMessageError] = React.useState<
    Partial<{
      type: "system" | "api";
      isExit: boolean;
      btnLabel: string;
      message: string;
      navLink: string;
      image_url?: string;
    }>
  >({
    type: "system",
    message: "",
    isExit: false,
    btnLabel: "Xác nhận",
  });
  const contentImageHeight = window.innerHeight < 700 ? 200 : 384;
  const content2Height = window.innerHeight < 700 ? 120 : 200;
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const isLoading =
    isLoadingCheckIqr ||
    isLoadingAccessToken ||
    isLoadingCheckUserId ||
    isUsingIqr;
  const onSubmit = async () => {
    if (isUserIdExist) {
      await onUsingIqr();
    } else {
      setOpenPermissionPopup(true);
    }
  };
  const onSubmitCode = async () => {
    dispatch(updateCode(iqrCode || ""));
    if (isUserIdExist) {
      await onUsingIqr(iqrCode, userId);
    } else {
      setOpenPermissionPopup(true);
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
        "Không thể mở thông tin số hotline, vui lòng thực hiện thủ công!"
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
        btnLabel: "Quét mã khác",
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
        btnLabel: "Quét mã khác",
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
        btnLabel: "Quét mã khác",
      });
    }
    if (value.status === -5) {
      if (isUserIdExist) {
        dispatch(updateAward(value.data));
        navigate("/present");
      } else {
        navigate("/splash-screen");
      }
    }
    if (value.status === -9) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: true,
        btnLabel: "Quét mã khác",
      });
    }
    if (value.status === -10) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: true,
        btnLabel: "Quét mã khác",
      });
    }
    if (value.status === 0) {
      if (isUserIdExist) {
        dispatch(updateAward(value.data));
        navigate("/present");
      } else {
        navigate("/splash-screen");
      }
    }
    if (value.status === 1) {
      dispatch(updateAward(value.data));
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: false,
        btnLabel: "Chụp phiếu",
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
        btnLabel: "Chụp phiếu",
        navLink: "/scan-screen",
      });
    }
    if (value.status === 4) {
      dispatch(updateAward(value.data));
      navigate("/present");
    }
  };
  const onMapZaloError = (value: TZaloCheckRES) => {
    if (value.status === 0) {
      if (value.data !== null)
        dispatch(
          updateInfo({
            name: value.data.name,
            phone: value.data.phone,
            userId: value.data.zalo_user_id,
          })
        );
      if (value.status === 0) setIsUserIdExist(true);
      else setIsUserIdExist(false);
    }
    if (value.status === -9) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "api",
        isExit: true,
        btnLabel: "Quét mã khác",
      });
    }
  };
  const onCheckIqr = async (userId: string, code: string) => {
    await checkIqr({
      code: code,
      zalo_user_id: userId,
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
            "Tương tác bị gián đoạn, vui lòng liên hệ 19003209 để được hỗ trợ!",
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
          "Tương tác bị gián đoạn, vui lòng liên hệ 19003209 để được hỗ trợ. Xin lỗi quý khách hàng vì sự bất tiện này!"
        );
      });
  };
  const onGetParams = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("campaign");
    if (code) {
      setIsLink(true);
      dispatch(updateCode(code || ""));
      onCheckIqr(userId, code || "");
    } else {
      setIsLink(false);
    }
  };
  const onGetUserId = async () => {
    await getUserID({})
      .then(async (userId) => {
        console.log("userId", userId);
        dispatch(updateUserId(userId));
        await checkUserId({
          zalo_user_id: userId,
        })
          .unwrap()
          .then((value) => onMapZaloError(value))
          .catch(() => {
            toast.error(
              "Tương tác bị gián đoạn, vui lòng liên hệ 19003209 để được hỗ trợ. Xin lỗi quý khách hàng vì sự bất tiện này!"
            );
          });
      })
      .catch(() => {
        toast.error(
          "Tương tác bị gián đoạn, vui lòng liên hệ 19003209 để được hỗ trợ. Xin lỗi quý khách hàng vì sự bất tiện này!"
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
            "Vui lòng nhấn dấu 'X' trên cùng bên trái để tắt ứng dụng!"
          ),
      });
    } else {
      if (messageError.navLink) {
        navigate(messageError.navLink);
      }
    }
  };
  const onUsingIqr = async (tmp_code?: string, tmp_userId?: string) => {
    console.log({
      code: tmp_code || code,
      zalo_user_id: tmp_userId || userId,
    });
    await usingIqr({
      code: tmp_code || code,
      zalo_user_id: tmp_userId || userId,
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
            "Tương tác bị gián đoạn, vui lòng liên hệ 19003209 để được hỗ trợ!",
          isExit: true,
          btnLabel: "Thoát",
        });
      });
  };
  const SharedButtonBlock = () => (
    <div className="flex justify-center items-center flex-col">
      <Button
        className="py-3 w-56 text-lg text-white !font-bold !bg-[#FF2929] font-roboto"
        loading={isLoading}
        onClick={isLink ? onSubmit : onSubmitCode}
        style={{ fontFamily: "helveticaneue" }}
      >
        Đồng ý
      </Button>
      <div className="flex items-center gap-3 mt-3">
        <p
          className="text-white text-xs underline font-semibold text-center font-roboto"
          role="button"
          onClick={onNavPrivacyScreen}
          style={{ fontFamily: "helveticaneue" }}
        >
          Thể lệ tham gia
        </p>
        <div className="w-[1px] h-4 bg-white" />
        <p
          className="text-white text-xs underline font-semibold text-center font-roboto"
          role="button"
          onClick={onNavPolicyScreen}
          style={{ fontFamily: "helveticaneue" }}
        >
          Cam kết quyền riêng tư
        </p>
      </div>
    </div>
  );
  React.useEffect(() => {
    onGetAccessToken();
  }, []);
  React.useEffect(() => {
    if (token) {
      onGetUserId();
    }
  }, [token]);
  React.useEffect(() => {
    if (token && userId) {
      onGetParams();
    }
  }, [token, userId]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-dvh bg-cover bg-no-repeat px-5 flex items-center flex-col overflow-auto transition-all duration-300 ${
        isFocused ? "pb-32" : ""
      }`}
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%",
      }}
    >
      <img
        src={Logo}
        width={80}
        height={80}
        className="my-5"
        loading="eager"
        alt="Logo"
      />

      <img
        src={Content_2}
        width={800}
        height={content2Height}
        className="w-full object-contain"
        loading="lazy"
        alt="Content 2"
      />
      <img
        src={Content_3}
        width={800}
        height={contentImageHeight}
        className={`w-full object-contain`}
        loading="eager"
        alt="Content 3"
      />
      {!isLink && (
        <div className="w-full flex flex-col gap-5 justify-center items-center ">
          <input
            className="py-5 mx-auto px-4 !w-3/4 !rounded-full"
            placeholder="Nhập mã trúng thưởng"
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            defaultValue={iqrCode}
            onChange={(e) => setIqrCode(e.target.value)}
          />
          <SharedButtonBlock />
        </div>
      )}
      {isLink && <SharedButtonBlock />}
      <div className="h-full" />

      {isLink && (
        <div className="w-full max-h-28 absolute bottom-0 z-50">
          <img
            src={Footer}
            className="w-full object-contain "
            loading="lazy"
            alt="Footer"
            width={800}
            height={100}
          />
          <img
            src={Hotline}
            width={144}
            height={40}
            className=" w-36 absolute bottom-3 right-2 object-contain"
            role="button"
            onClick={onClickHotline}
            loading="lazy"
            alt="Hotline"
          />
        </div>
      )}
      <Modal
        visible={openErrorPopup}
        onClose={() => {}}
        modalStyle={{
          backgroundColor: "transparent",
        }}
      >
        <div className="bg-white px-10 pt-10 pb-5 rounded-2xl border-4 border-yellow-400 relative">
          <img
            src={NotiTag}
            width={240}
            height={60}
            className="w-3/4 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            alt="Notification Tag"
            loading="lazy"
          />
          {messageError.type === "system" ? (
            <p className="text-lg py-6">{messageError.message}</p>
          ) : (
            messageError.message && (
              <div
                dangerouslySetInnerHTML={{
                  __html: messageError.message,
                }}
                className="py-6"
              />
            )
          )}

          <div className="flex items-center justify-center gap-2 mt-2">
            <Button
              variant="secondary"
              className="!bg-[#FF2929] !font-bold !text-white !whitespace-pre-line w-auto"
              style={{ fontFamily: "helveticaneue", lineHeight: "1" }}
              onClick={onPopupErrorClick}
            >
              {messageError.btnLabel || "Xác nhận"}
            </Button>
          </div>
        </div>
      </Modal>
      <Sheet
        visible={openPermissionPopup}
        onClose={() => setOpenPermissionPopup(false)}
        autoHeight
        mask
        handler
        swipeToClose
      >
        <Box p={4} className="custom-bottom-sheet" flex flexDirection="column">
          <Box className="bottom-sheet-cover">
            <img
              src={Logo1}
              width={48}
              height={48}
              className="w-12 h-12 object-contain mx-auto"
              alt="Bottom Sheet Logo"
              loading="lazy"
            />
          </Box>
          <Box my={4}>
            <Text.Title className="text-center">
              Cho phép chia sẻ thông tin để phục vụ quá trình tham gia chương
              trình
            </Text.Title>
          </Box>
          <Box className="bottom-sheet-body" style={{ overflowY: "auto" }}>
            <Box className="flex flex-row items-center gap-3">
              <Box>
                <Checkbox
                  size="small"
                  label={`Tôi đồng ý cho phép Chương trình nhận các thông tin từ tài khoản
              Zalo (bao gồm tên và ảnh đại diện) theo điều khoản sử dụng của
              Zalo`}
                  value={""}
                  checked={isPermitPrivacy}
                  onChange={() => setIsPermitPrivacy(!isPermitPrivacy)}
                />
                <div className="flex items-center gap-1 justify-end">
                  <p
                    className="text-blue-500 text-sm"
                    onClick={onNavPrivacyScreen}
                  >
                    Điều khoản sử dụng
                  </p>
                  <Icon icon="zi-chevron-right" className="text-blue-500" />
                </div>
              </Box>
              <Checkbox
                size="small"
                label="Tôi đã đọc và đồng ý cho phép chia sẻ thông tin
tới chương trình theo điều khoản sử dụng của
chương trình khuyến mãi
"
                value={""}
                checked={isPermitPolicy}
                onChange={() => setIsPermitPolicy(!isPermitPolicy)}
              />
              <div className="flex items-center gap-1 justify-end mb-4">
                <p
                  className="text-blue-500 text-sm"
                  onClick={onNavPrivacyScreen}
                >
                  Thể lệ tham gia
                </p>
                <Icon icon="zi-chevron-right" className="text-blue-500" />
              </div>
            </Box>
          </Box>
          <Box flex flexDirection="row" mt={1}>
            <Box style={{ flex: 1 }} pr={1}>
              <Button
                fullWidth
                variant="secondary"
                onClick={() => {
                  setOpenPermissionPopup(false);
                }}
              >
                Để sau
              </Button>
            </Box>
            <Box style={{ flex: 1 }} pl={1}>
              <Button
                fullWidth
                onClick={() => {
                  setOpenPermissionPopup(false);
                  navigate("/splash-screen");
                }}
                disabled={
                  isPermitPolicy === true && isPermitPrivacy ? false : true
                }
              >
                Cho phép
              </Button>
            </Box>
          </Box>
        </Box>
      </Sheet>
    </div>
  );
};
export default AuthScreen;
