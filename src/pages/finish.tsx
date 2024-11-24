import * as React from "react";
import Background from "assets/background_2.png";
import Logo from "assets/logo.png";
import Content_2 from "assets/content_2.webp";
import Content_3 from "assets/content_3.png";
import Speaker from "assets/speaker_1.png";
import Topup from "assets/topup_1.png";
import Driver from "assets/driver_1.png";
import Fridge from "assets/fridge_1.png";
import Oke from "assets/oke.webp";
import Reject from "assets/reject.webp";
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
    try {
      await closeApp({});
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
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
        modalStyle={{ padding: 0 }}
      >
        <div className="bg-white rounded-lg text-center flex flex-col justify-center items-center gap-4 -mt-3">
          <img
            src={state.status == 4 || state.status === 2 ? Oke : Reject}
            className="w-20 object-contain"
          />
          <p className="text-gray-700 text-left text-lg">
            {state.status == 4 || state.status === 2
              ? `Thông tin và bằng chứng trúng giải của quý nhà nông đã được tiếp
            nhận. Tổng đài viên 19003209 sẽ chủ động liên hệ khi cần thiết để hỗ
            trợ tốt nhất`
              : `Chúng tôi chưa nhận bằng chứng trúng giải của Quý nhà nông. Vui lòng nhấn chụp lại!`}
          </p>
          <button
            className="px-4 py-3 bg-[#be0000]  w-3/5 text-white rounded-lg font-bold transition duration-200"
            onClick={onExit}
          >
            Thoát
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default FinishScreen;
