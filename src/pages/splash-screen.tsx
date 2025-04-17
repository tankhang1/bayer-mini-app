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
  getLocation,
  getPhoneNumber,
  getUserID,
  getUserInfo,
} from "zmp-sdk";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Modal,
  Select,
  Sheet,
  Spinner,
  Stack,
  Text,
} from "zmp-ui";
import { toast } from "react-toastify";
import {
  useUpdateZaloInfoManualMutation,
  useUpdateZaloInfoMutation,
} from "redux/api/zalo/zalo.api";
import { useUsingIqrMutation } from "redux/api/iqr/iqr.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { TBaseRES } from "types";
import { TUsingIqrRES } from "redux/api/iqr/iqr.response";
import { updateAward, updateInfo, updateStatus } from "redux/slices/appSlice";
import { TZaloRES } from "redux/api/zalo/zalo.response";
import { useGetListProvinceQuery } from "redux/api/meta/meta.api";
const { Option } = Select;

const SplashScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, code } = useSelector((state: RootState) => state.app);
  const [openModalReject, setOpenModalReject] = React.useState(false);
  const [openExceededMaximumRequest, setOpenExceededMaximumRequest] =
    React.useState(false);
  const [updateZaloInfo, { isLoading: isLoadingUpdateZalo }] =
    useUpdateZaloInfoMutation();
  const [isLoadingProcess, setIsLoadingProcess] = React.useState(false);
  const [usingIqr, { isLoading: isUsingIqr }] = useUsingIqrMutation();
  const { data: listProvinces, isLoading: isLoadingListProvince } =
    useGetListProvinceQuery();
  const [errorCounter, setErrorCounter] = React.useState(0);
  const [updateManualZaloInfo, { isLoading: isLoadingUpdateManualZaloInfo }] =
    useUpdateZaloInfoManualMutation();

  const [messageError, setMessageError] = React.useState<
    Partial<{
      type: "system" | "api" | "zalo" | "zalo-manual";
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
  const [openManualForm, setOpenManualForm] = React.useState(false);

  const [manualForm, setManualForm] = React.useState<{
    province_code: string;
    province: string;
    name: string;
    phone: string;
  }>({
    name: "",
    phone: "",
    province_code: "",
    province: "",
  });
  const [openErrorPopup, setOpenErrorPopup] = React.useState(false);
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
      dispatch(updateAward(value.data));
      navigate("/present");
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
        btnLabel: "Chụp phiếu thưởng",
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
    if (value.status === 406) {
      setOpenManualForm(true);
    }
  };
  const onMapZaloError = async (value: TZaloRES) => {
    if (value.status === 0) {
      dispatch(
        updateInfo({
          name: value.data.name,
          phone: value.data.phone,
          userId: value.data.zalo_user_id,
        })
      );
      await onUsingIqr();
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
    if (value.status === -11) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "zalo",
        isExit: false,
        btnLabel: "Xác nhận",
      });
    }
    if (value.status === 406) {
      setOpenErrorPopup(true);
      setMessageError({
        ...value,
        type: "zalo-manual",
        isExit: false,
        btnLabel: "Nhập lại thông tin",
      });
    }
  };
  const onUsingIqr = async () => {
    console.log({
      code: code,
      zalo_user_id: userId,
    });
    await usingIqr({
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
            "Đã có lỗi xảy ra, vui lòng liên hệ 19003209 để được hỗ trợ!",
          isExit: true,
          btnLabel: "Quét mã khác",
        });
      });
  };
  const postZaloInfo = async () => {
    try {
      setIsLoadingProcess(true);
      let zaloInfo = {
        access_token: "",
        avatar: "",
        code: "",
        code_get_location: "",
        code_get_phone: "",
        code_hash: "",
        followed_oa: false,
        sensitive: false,
        name: "",
        zalo_app_id: "",
        zalo_user_id: "",
      };
      const accessToken = await getAccessToken();
      zaloInfo.access_token = accessToken;
      const authorizeInfo = await authorize({
        scopes: ["scope.userLocation", "scope.userPhonenumber"],
      });
      // const authorizeLocation = await authorize({
      //   scopes: ["scope.userLocation"],
      // });
      const userId = await getUserID();
      zaloInfo = {
        ...zaloInfo,
        zalo_user_id: userId,
      };
      if (authorizeInfo["scope.userInfo"]) {
        const userInfo = await getUserInfo();
        if (userInfo) {
          zaloInfo = {
            ...zaloInfo,
            followed_oa: userInfo.userInfo.followedOA || false,
            avatar: userInfo.userInfo.avatar,
            name: userInfo.userInfo.name,
            sensitive: userInfo.userInfo.isSensitive ?? false,
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
      if (authorizeInfo["scope.userLocation"]) {
        await getLocation().then((value) => {
          zaloInfo = {
            ...zaloInfo,
            code_get_location: value.token || "",
          };
        });
      }
      setIsLoadingProcess(false);
      if (zaloInfo) {
        await updateZaloInfo(zaloInfo)
          .unwrap()
          .then(async (value) => onMapZaloError(value))
          .catch(() => {
            toast.error(
              "Đã có lỗi xảy ra, vui lòng liên hệ 19003209 để được hỗ trợ!"
            );
          });
      }
    } catch (error) {
      setErrorCounter(errorCounter + 1);
      setIsLoadingProcess(false);
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
        toast.info("Vui lòng nhấn dấu 'X' trên cùng bên trái để tắt ứng dụng!"),
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
      if (messageError.type === "zalo") {
        postZaloInfo();
      } else if (messageError.type === "zalo-manual") {
        setOpenManualForm(true);
      }
      if (messageError.navLink) {
        navigate(messageError.navLink);
      }
    }
  };
  const onUpdateManualZaloInfo = async () => {
    setOpenManualForm(false);
    await updateManualZaloInfo({
      ...manualForm,
      zalo_app_id: "1403968996472527032",
      zalo_user_id: userId,
    })
      .unwrap()
      .then(async (value) => {
        onMapZaloError(value);
      })
      .catch((error) => {
        setOpenErrorPopup(true);
        setMessageError({
          message: error.data.message,
          type: "zalo-manual",
          isExit: false,
          btnLabel: "Nhập lại thông tin",
        });
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
      <img src={Logo} className="h-[10%] object-contain my-5" />
      <img src={Content_2} className="w-[100%] h-[20%] object-contain" />
      <div className="relative w-full h-full z-20">
        <img
          src={Content_3}
          className="h-[32%] object-contain absolute top-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src={Topup}
          className="h-[18%] object-contain absolute top-[30%]  left-[5%]"
          loading="eager"
          decoding="async"
        />
        <img
          src={Speaker}
          className="h-[25%] object-contain absolute top-[35%] right-[10%]"
          loading="eager"
          decoding="async"
        />
        <img
          src={Fridge}
          className="h-[33%] object-contain absolute bottom-[18%] -left-0"
          loading="eager"
          decoding="async"
        />
        <img
          src={Driver}
          className="h-[40%] object-contain absolute  bottom-[2%] right-0"
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
        <p
          className="whitespace-pre-line"
          style={{ fontFamily: "helveticaneue" }}
        >
          {`Ứng dụng Bayer Việt Nam cần quyền truy cập vào thông tin cá nhân (họ tên, số điện thoại, vị trí) để: 
          1) Xác minh tính hợp lệ của người tham gia chương trình. 
          2) Hỗ trợ gửi thông báo trúng thưởng và thực hiện trao giải thưởng một cách chính xác. 
          Việc cấp quyền giúp chúng tôi đảm bảo quyền lợi của bạn và tối ưu hóa trải nghiệm khi tham gia chương trình. Bayer cam kết bảo mật thông tin và sử dụng theo đúng mục đích được công bố."`}
        </p>
        <div className="flex items-center justify-between gap-2 mt-2">
          {errorCounter < 2 ? (
            <Button
              className="w-full"
              onClick={() => {
                postZaloInfo();
                setOpenModalReject(false);
              }}
            >
              Xin quyền
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                setManualForm({
                  name: "",
                  phone: "",
                  province: "",
                  province_code: "",
                });
                setOpenManualForm(true);
                setOpenModalReject(false);
              }}
            >
              Nhập thông tin
            </Button>
          )}
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
      <Sheet
        visible={openManualForm}
        onClose={() => {}}
        autoHeight
        mask
        handler
        swipeToClose
      >
        <Box p={4} className="custom-bottom-sheet" flex flexDirection="column">
          <Box className="bottom-sheet-cover">
            <img
              alt="Bottom Sheet"
              src={Logo}
              className="w-12 h-12 object-contain mx-auto"
            />
          </Box>
          <Box my={4}>
            <Text.Title className="text-center">Nhập thông xác thực</Text.Title>
          </Box>
          <Box className="bottom-sheet-body" style={{ overflowY: "auto" }}>
            <Stack space="0.125rem">
              <Input
                placeholder="Ví dụ: Nguyễn Văn B"
                label="Tên khách hàng"
                className="w-full"
                onChange={(e) =>
                  setManualForm({ ...manualForm, name: e.target.value })
                }
                value={manualForm.name}
              />
              <Input
                placeholder="Ví dụ: 09xxxxx"
                label="Số điện thoại"
                className="w-full"
                type="number"
                onChange={(e) =>
                  setManualForm({ ...manualForm, phone: e.target.value })
                }
                value={manualForm.phone}
              />
              <Select
                label="Chọn tỉnh thành"
                placeholder="VD: Hồ chí minh ( HM )"
                defaultValue={manualForm.province_code}
                onChange={(value) => {
                  if (value) {
                    setManualForm({
                      ...manualForm,
                      province_code: value as string,
                    });
                  }
                }}
                closeOnSelect
              >
                {listProvinces &&
                  listProvinces.map((province, index) => (
                    <Option
                      value={province.code}
                      title={province.name}
                      key={index}
                    />
                  ))}
              </Select>
            </Stack>
          </Box>

          <Box flex flexDirection="row" mt={1}>
            <Box style={{ flex: 1 }} pr={1}>
              <Button
                fullWidth
                variant="secondary"
                onClick={() => {
                  setManualForm({
                    name: "",
                    phone: "",
                    province_code: "",
                    province: "",
                  });
                  setOpenManualForm(false);
                }}
              >
                Để sau
              </Button>
            </Box>
            <Box style={{ flex: 1 }} pl={1}>
              <Button
                fullWidth
                onClick={onUpdateManualZaloInfo}
                disabled={
                  !(
                    manualForm.name &&
                    manualForm.phone &&
                    manualForm.province_code
                  )
                }
              >
                Cho phép
              </Button>
            </Box>
          </Box>
        </Box>
      </Sheet>
      <Modal
        visible={openExceededMaximumRequest}
        onClose={() => setOpenExceededMaximumRequest(false)}
        title={(<img src={Reject} className="w-20 h-20 mx-auto" />) as any}
      >
        <p
          className="whitespace-pre-line"
          style={{ fontFamily: "helveticaneue" }}
        >
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
      <Modal
        visible={
          isLoadingUpdateZalo ||
          isUsingIqr ||
          isLoadingUpdateManualZaloInfo ||
          isLoadingListProvince
        }
      >
        <div className="flex flex-col justify-center items-center">
          <Spinner />
          <p className="text-center">
            Hệ thống đang xử lí, vui lòng chờ trong giây lát....
          </p>
        </div>
      </Modal>
      <Modal
        visible={openErrorPopup}
        onClose={() => {}}
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

        <div className="flex items-center justify-center gap-2 mt-2">
          <Button
            variant="secondary"
            className="!bg-red-400 !text-white !whitespace-pre-line w-auto"
            onClick={onPopupErrorClick}
            style={{ fontFamily: "helveticaneue", lineHeight: "1" }}
          >
            {messageError.btnLabel || "Xác nhận"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default SplashScreen;
