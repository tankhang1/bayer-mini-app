import * as React from "react";
import Background from "assets/background.jpg";
import Content_2 from "assets/content_2.png";
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
const MapImage = new Map([
  ["driver", Driver],
  ["topup", Topup],
  ["fridge", Fridge],
  ["speaker", Speaker],
  ["complete", Oke],
  ["reject", Reject],
]);
const PresentScreen = () => {
  const navigate = useNavigate();
  const [openPopupCoupon, setOpenPopupCoupon] = React.useState(false);
  const [type, setType] = React.useState<
    "driver" | "topup" | "fridge" | "speaker" | "complete" | "reject"
  >("driver");

  const onChangeType = () => {
    if (type === "driver") {
      setType("topup");
    }
    if (type === "topup") {
      setType("fridge");
    }
    if (type === "fridge") {
      setType("speaker");
    }
    if (type === "speaker") {
      setType("complete");
    }
    if (type === "complete") {
      setType("reject");
    }
    if (type === "reject") {
      navigate("/scan-screen");
    }
  };
  const onNavScan = () => {
    navigate("/scan-screen");
  };
  const onClickHotline = async () => {
    await openPhone({
      phoneNumber: "19003209",
    });
  };
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
        <p className="text-[#f5ecdd] text-xl font-bold text-center">{`Chúc mừng <bạn> với số điện <XXXXXXXX> thoại nhận được <Tên Quà> từ <Cơ Hội 1>`}</p>
      )}
      {type === "complete" && (
        <p className="text-[#f5ecdd] text-xl font-extrabold text-center">{`Chúng tôi đã nhận thông tin và bằng chứng trúng giải của bạn. Tổng đài viên sẽ liên hệ sau!`}</p>
      )}
      {type === "reject" && (
        <p className="text-[#f5ecdd] text-xl font-extrabold text-center">{`Chúng tôi chưa nhận được hình ảnh phiếu trúng thưởng vui lòng liên hệ tổng đài 19003209 để được hỗ trợ !`}</p>
      )}
      <div className="w-full absolute bottom-0">
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
        onClose={() => setOpenPopupCoupon(false)}
      >
        <div className="p-6 bg-white rounded-lg text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Chúc mừng! 🎉
          </h2>
          <p className="text-gray-700 mb-6 text-justify">
            {`Chúc mừng <bạn> với số điện <XXXXXXXX> thoại nhận được <Tên Quà> từ <Cơ Hội 1> Vui lòng gửi hình ảnh xác thực đến hệ
            thống để nhận quà.`}
          </p>
          <button
            onClick={() => {
              /* Chuyển đến trang xác thực hoặc trang cần thiết */
            }}
            className="px-4 py-2 bg-red-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
          >
            Chuyển đến trang xác thực
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default PresentScreen;
