import * as React from "react";
import Background from "assets/background.webp";
import Content_2 from "assets/content_2.png";
import Logo from "assets/logo.png";
import Driver from "assets/driver.png";
import Topup from "assets/topup.png";
import Fridge from "assets/fridge.png";
import Speaker from "assets/speaker.png";
import Oke from "assets/oke.webp";
import Hotline from "assets/hotline.webp";
import Reject from "assets/reject.webp";
import { useNavigate } from "react-router-dom";

import Footer from "assets/footer.webp";
import { Icon, Modal } from "zmp-ui";
import { openPhone } from "zmp-sdk";
import ConsolationPrize from "assets/consolation_prize.mp3";
import FirstPrize from "assets/first_prize.mp3";
import SecondPrize from "assets/second_prize.mp3";
import ThirdPrize from "assets/third_prize.mp3";
import GoodLuck from "assets/good_luck.mp3";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { TAward } from "redux/api/iqr/iqr.response";
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
  ["xemay", "Xe máy"],
  ["topup", "Thẻ cào điện thoại"],
  ["tulanh", "Tủ lạnh"],
  ["loaJBL", "Loa JBL"],
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
      <img src={Logo} className="w-20" />
      <img src={Content_2} className="w-full h-40 object-contain" />

      {type !== "" && (
        <img
          src={MapImage.get(type)}
          className={`w-full -mt-10 mb-2 h-64 object-contain `}
          loading="eager"
          decoding="auto"
        />
      )}

      {type !== "" && (
        <p className="text-[#f5ecdd] font-roboto text-xl font-bold text-center">{`Chúc mừng ${name} với số điện thoại ${phone} nhận được ${MapLabel.get(
          award1 || award2
        )} từ <Cơ Hội ${award1 ? "1" : "2"}>`}</p>
      )}

      {type === "" && (
        <div>
          <p className="text-[#f5ecdd] font-roboto text-3xl uppercase font-extrabold text-center whitespace-pre-line">{`Chúc bạn\nmay mắn lần sau`}</p>
          <p className="text-[#f5ecdd] font-roboto text-xl font-extrabold text-center whitespace-pre-line">{`Hãy mua Nativo hoặc Vayego\nđể có cơ hội trúng thưởng!`}</p>
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
      >
        <div className="p-0 -mt-2 bg-white rounded-lg text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4 font-roboto">
            🎉 Chúc mừng! 🎉
          </h2>
          <p className="text-gray-700 mb-6 text-left text-xl font-roboto">
            {`Chúc mừng ${name} với số điện thoại ${phone} nhận được ${MapLabel.get(
              award1 || award2
            )}. Vui lòng nhấn "Gửi phiếu cào" để xác thực và nhận quà`}
          </p>
          <button
            onClick={() => {
              if (status === 1 || status === 3 || status === 0) {
                onNavScan();
              } else setOpenPopupCoupon(false);
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200 text-lg font-roboto"
          >
            {status === 1 || status === 3 || status === 0
              ? "Gửi hình phiếu cào"
              : "Xác nhận"}
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default PresentScreen;
