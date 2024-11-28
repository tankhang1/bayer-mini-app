import * as React from "react";
import Background from "assets/background_2.png";
import Logo from "assets/logo.png";
import Content_2 from "assets/content_2.png";
import Content_3 from "assets/content_3.png";
import Speaker from "assets/speaker_1.png";
import Topup from "assets/topup_1.png";
import Driver from "assets/driver_1.png";
import Fridge from "assets/fridge_1.png";
import Oke from "assets/success.png";
import Reject from "assets/noti.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "zmp-ui";
import { closeApp } from "zmp-sdk";
const FinishScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [openFinishConfirm, setOpenFinishConfirm] = React.useState(false);
  const onNavScan = () => {
    navigate("/scan-screen");
  };
  const onExit = async () => {
    if (state.status === 4 || state.status === 2) {
      try {
        await closeApp({});
      } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    } else {
      navigate(-1);
    }
  };
  React.useEffect(() => {
    setOpenFinishConfirm(true);
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
          className="w-44 h-44 object-contain absolute top-[30%] right-7"
          loading="eager"
          decoding="async"
        />
        <img
          src={Fridge}
          className="w-52 h-52 object-contain absolute bottom-[15%] -left-7"
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
      <Modal
        visible={openFinishConfirm}
        onClose={() => {
          setOpenFinishConfirm(false);
        }}
        modalStyle={{
          backgroundColor: "transparent",
        }}
      >
        <div
          className="bg-white px-4 pt-10 pb-5 rounded-2xl border-4 border-yellow-400 relative w-full flex-col flex items-center justify-center gap-5"
          style={{ fontFamily: "helveticaneue" }}
        >
          <img
            src={state.status == 4 || state.status === 2 ? Oke : Reject}
            className="w-3/4 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          />
          <p
            className="text-gray-700 text-left text-lg font-bold pt-6"
            style={{ fontFamily: "helveticaneue" }}
          >
            {state.status == 4 || state.status === 2
              ? "Đã gửi ảnh thành công"
              : "Gửi ảnh không thành công!"}
          </p>
          <button
            className="px-6 py-3 bg-[#FF2929] w-auto text-white !rounded-full font-bold transition duration-200"
            onClick={onExit}
            style={{ fontFamily: "helveticaneue" }}
          >
            {state.status == 4 || state.status === 2
              ? "Quét mã khác"
              : "Chụp lại"}
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default FinishScreen;
