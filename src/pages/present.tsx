import * as React from "react";
import Background from "assets/background.webp";
import Content_2 from "assets/content_2.png";
import Logo from "assets/logo.png";
import Driver from "assets/driver.png";
import Topup from "assets/topup.png";
import Fridge from "assets/fridge.png";
import Speaker from "assets/speaker.png";
import Hotline from "assets/hotline.png";
import Reject from "assets/reject.webp";
import { useNavigate } from "react-router-dom";

import Footer from "assets/footer.png";
import { Button, Icon, Modal } from "zmp-ui";
import { closeApp, openPhone } from "zmp-sdk";
import ConsolationPrize from "assets/consolation_prize.mp3";
import FirstPrize from "assets/first_prize.mp3";
import SecondPrize from "assets/second_prize.mp3";
import ThirdPrize from "assets/third_prize.mp3";
import GoodLuck from "assets/good_luck.mp3";
import SuccessTag from "assets/success.png";
import NotiTag from "assets/noti.png";

import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { TAward } from "redux/api/iqr/iqr.response";
import { toast } from "react-toastify";
const co = new Audio(ConsolationPrize);
const fr = new Audio(FirstPrize);
const se = new Audio(SecondPrize);
const th = new Audio(ThirdPrize);
const gl = new Audio(GoodLuck);

const MapImage = new Map([
  ["xemay", Driver],
  ["topup", Topup],
  ["tulanh", Fridge],
  ["loaJBL", Speaker],
  ["", Reject],
]);
const MapAudio = new Map([
  ["xemay", fr],
  ["topup", co],
  ["tulanh", se],
  ["loaJBL", th],
  ["", gl],
]);
const MapLabel = new Map([
  ["xemay", "Xe máy Air Blade 125cc"],
  ["topup", "Nạp tiền 10.000VND"],
  ["tulanh", "Tủ lạnh Sharp 362L"],
  ["loaJBL", "Loa JBL Partybox110"],
  ["", "Không trúng thưởng"],
]);
const PresentScreen = () => {
  const navigate = useNavigate();
  const { award1, award2, phone, name, status } = useSelector(
    (state: RootState) => state.app
  );
  const [openPopupCoupon, setOpenPopupCoupon] = React.useState(false);
  const [type, setType] = React.useState<TAward>("");

  const onNavScan = () => {
    navigate("/scan-screen");
  };
  const onClickHotline = async () => {
    await openPhone({
      phoneNumber: "19003209",
    });
  };

  const onExit = async () => {
    try {
      await closeApp({});
    } catch (error) {
      // xử lý khi gọi api thất bại
      toast.info("Vui lòng nhấn dấu X góc phải màn hình để thoát ứng dụng");
    }
  };
  React.useEffect(() => {
    if (award1) {
      MapAudio.get(award1)?.play();
      setType(award1 as TAward);
      setTimeout(() => {
        setOpenPopupCoupon(true);
      }, 1500);
    } else {
      if (award2) {
        MapAudio.get(award2)?.play();
        setType(award2 as TAward);
        setTimeout(() => {
          setOpenPopupCoupon(true);
        }, 1500);
      } else {
        MapAudio.get("")?.play();
        setType("");
      }
    }
  }, [award1, award2]);
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-5 flex items-center flex-col py-10 overflow-auto"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
      }}
      // role="button"
      // onClick={onChangeType}
    >
      <img src={Logo} className="max-h-[10%] object-contain" />
      <img src={Content_2} className="w-full h-[20%] object-contain" />

      {type !== "" && (
        <img
          src={MapImage.get(type)}
          className={`w-full mb-2 h-[40%] object-contain `}
          loading="eager"
          decoding="auto"
        />
      )}

      {type !== "" && (
        <p className="text-[#f5ecdd] font-roboto text-xl font-bold text-center">{`Chúc mừng ${name} với số điện thoại ${phone} trúng ${MapLabel.get(
          award1 || award2
        )} từ Cơ Hội ${award1 ? "1" : "2"}`}</p>
      )}

      {type === "" && (
        <div
          className="!mt-14 bg-white p-5 rounded-2xl justify-center items-center flex flex-col gap-3 w-[95%] relative border-4 border-yellow-400 "
          style={{ fontFamily: "helveticaneue" }}
        >
          <img src={NotiTag} className="absolute w-3/4 -top-10" />
          <div className="pt-7">
            <p className="text-black font-roboto text-3xl  font-extrabold text-center whitespace-pre-line">{`Chúc bạn\nmay mắn lần sau!`}</p>
          </div>
          <Button
            className="py-3 !text-lg  text-white !font-bold !bg-[#FF2929] !font-roboto !rounded-full w-auto !mt-5"
            onClick={onExit}
            style={{ fontFamily: "helveticaneue" }}
          >
            Quét mã khác
          </Button>
        </div>
      )}

      <div className="w-full max-h-28 absolute bottom-0">
        <img src={Footer} className="w-full object-contain " />
        <img
          src={Hotline}
          className=" w-36 absolute bottom-3 right-2 object-contain"
          role="button"
          onClick={onClickHotline}
        />
      </div>

      {!openPopupCoupon &&
        (award1 || award2) &&
        (status === 1 || status === 3 || status === 0) && (
          <button
            className=" bg-white/30 p-2 rounded-full transform transition-transform duration-200 ease-in-out active:scale-90 absolute right-4 bottom-40 animate-bounce"
            onClick={onNavScan}
          >
            <Icon icon="zi-camera" size={28} style={{ color: "white" }} />
          </button>
        )}
      <Modal
        visible={openPopupCoupon}
        onClose={() => {
          fr.pause();
          setOpenPopupCoupon(false);
        }}
        modalStyle={{
          backgroundColor: "transparent",
        }}
      >
        <div
          className="bg-white px-4 pt-10 pb-5 rounded-2xl border-4 border-yellow-400 relative w-full"
          style={{ fontFamily: "helveticaneue" }}
        >
          <img
            src={SuccessTag}
            className="w-3/4 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          />

          <p className="text-black pl-2 font-bold text-left text-lg">
            Quý nhà nông: {name}
          </p>
          <p className="text-black pl-2 font-bold text-left text-lg ">
            Số điện thoại: {phone}
          </p>
          <p className="text-black pl-2 font-bold text-left text-lg">
            Trúng: {MapLabel.get(award1 || award2)}
          </p>
          <p className="text-black pl-2 font-bold text-left text-lg">
            Cơ hội: {award1 ? "1" : award2 ? "2" : ""}
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                if (status === 1 || status === 3 || status === 0) {
                  onNavScan();
                } else setOpenPopupCoupon(false);
              }}
              className="px-4 py-2 bg-[#FF2929] hover:bg-red-600 text-white rounded-full transition duration-200 text-lg font-bold mt-3 "
            >
              {status === 1 || status === 3 || status === 0
                ? "Gửi hình phiếu cào"
                : "Xác nhận"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default PresentScreen;
