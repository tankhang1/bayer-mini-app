import React from "react";
import Background_1 from "assets/background.webp";
import Slogan from "assets/content_2.webp";
import Logo from "assets/logo.png";
import { Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const PolicyScreen = () => {
  const navigate = useNavigate();
  const onNavBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-3 flex items-center flex-col py-10 gap-2"
      style={{
        backgroundImage: `url(${Background_1})`,
        backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
      }}
    >
      <img src={Logo} className="w-20" />

      <img src={Slogan} className="w-fit" />
      <div className="absolute w-full h-dvh bg-white/90 overflow-y-auto top-0">
        <div className="p-6  text-black">
          <h1 className="text-2xl font-black text-center text-red-600 mb-4">
            Cam kết quyền riêng tư
          </h1>
          <div className="mb-4">
            <h2 className="font-bold text-xl">1. Điều khoản và điều kiện:</h2>
            <p className="text-lg">
              Bằng cách nhấn vào nút “Đồng ý” tôi xác nhận rằng:
            </p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>Tôi đồng ý cung cấp thông tin cá nhân cho chương trình.</li>
              <li>
                Tôi hiểu rằng thông tin của tôi sẽ được sử dụng để xác minh giải
                thưởng và liên lạc trong khuôn khổ chương trình.
              </li>
              <li>
                Tôi đồng ý để ban tổ chức lưu giữ thông tin trong thời gian cần
                thiết theo quy định.
              </li>
              <li>
                Tôi có quyền yêu cầu chỉnh sửa hoặc xóa thông tin bất kỳ lúc nào
                bằng cách liên hệ qua [email/đường dây nóng của chương trình
                19003209].
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-lg">2. Cam kết bảo mật thông tin:</h2>
            <p className="text-lg">Ban tổ chức cam kết:</p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Không chia sẻ, bán, hoặc sử dụng thông tin cá nhân của người
                tham gia ngoài mục đích của chương trình.
              </li>
              <li>
                Lưu giữ thông tin theo đúng quy định pháp luật về bảo mật dữ
                liệu và quy định về bảo mật thông tin cá nhận theo quy định của
                Bayer Việt Nam.
              </li>
            </ul>
          </div>
        </div>
        <div
          className="py-3 w-56 flex items-center justify-center text-lg  text-white font-bold bg-[#be0000] rounded-3xl gap-2 mx-auto mb-5 "
          role="button"
          onClick={onNavBack}
        >
          <Icon icon="zi-arrow-left" />
          Quay lại
        </div>
      </div>
    </div>
  );
};

export default PolicyScreen;
