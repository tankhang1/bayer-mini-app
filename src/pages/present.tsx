import * as React from "react";
import Background from "assets/background.webp";
import Content_2 from "assets/content_2.webp";
import Logo from "assets/logo.png";
import Driver from "assets/driver.webp";
import Topup from "assets/topup.webp";
import Fridge from "assets/fridge.webp";
import Speaker from "assets/speaker.webp";
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
const MapImage = new Map([
  ["driver", Driver],
  ["topup", Topup],
  ["fridge", Fridge],
  ["speaker", Speaker],
  ["complete", Oke],
  ["reject", Reject],
]);
const co = new Audio(ConsolationPrize);
const fr = new Audio(FirstPrize);
const se = new Audio(SecondPrize);
const th = new Audio(ThirdPrize);
const PresentScreen = () => {
  const navigate = useNavigate();
  const [openPopupCoupon, setOpenPopupCoupon] = React.useState(false);
  const [type, setType] = React.useState<
    "driver" | "topup" | "fridge" | "speaker" | "complete" | "reject"
  >("driver");

  const onNavScan = () => {
    navigate("/scan-screen");
  };
  const onClickHotline = async () => {
    await openPhone({
      phoneNumber: "19003209",
    });
  };
  React.useEffect(() => {
    fr.play();
    setTimeout(() => {
      setOpenPopupCoupon(true);
    }, 1000);
  }, []);

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
      <img
        src={MapImage.get(type)}
        className={`w-full -mt-10 mb-2 ${
          type === "complete" || type === "reject" ? "h-40 mt-0" : "h-64"
        } object-contain `}
        loading="eager"
        decoding="auto"
      />
      {type !== "complete" && type !== "reject" && (
        <p className="text-[#f5ecdd] text-xl font-bold text-center">{`Chúc mừng Lê Hoài Phong với số điện thoại xxxx4825 nhận được <Tên Quà> từ <Cơ Hội 1>`}</p>
      )}
      {type === "complete" && (
        <p className="text-[#f5ecdd] text-xl font-extrabold text-center">{`Chúng tôi đã nhận thông tin và bằng chứng trúng giải của bạn. Tổng đài viên sẽ liên hệ sau!`}</p>
      )}
      {type === "reject" && (
        <p className="text-[#f5ecdd] text-xl font-extrabold text-center">{`Chúng tôi chưa nhận được hình ảnh phiếu trúng thưởng vui lòng liên hệ tổng đài 19003209 để được hỗ trợ !`}</p>
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
      {!openPopupCoupon && (
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
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Chúc mừng! 🎉
          </h2>
          <p className="text-gray-700 mb-6 text-justify text-xl">
            {`Chúc mừng Lê Hoài Phong với số điện thoại xxxx4825 nhận được <Tên Quà>. Vui lòng nhấn "Gửi phiếu cào" để xác thực và nhận quà`}
          </p>
          <button
            onClick={onNavScan}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200 text-lg"
          >
            Gửi hình phiếu cào
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default PresentScreen;
