import React from "react";
import Background_1 from "assets/background.webp";
import Slogan from "assets/content_2.png";
import Logo from "assets/logo.png";
import { Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { openWebview } from "zmp-sdk";

const PolicyScreen = () => {
  const navigate = useNavigate();
  const onNavBack = () => {
    navigate(-1);
  };
  const openUrlProgram = async () => {
    try {
      await openWebview({
        url: "https://caonhanhtay@yis.vn",
        config: {
          style: "bottomSheet",
          leftButton: "back",
        },
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
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
          <h1 className="text-xl font-black text-center text-red-600 mb-4">
            PHIẾU ĐỒNG Ý THAM GIA CHƯƠNG TRÌNH & ĐỒNG Ý CHIA SẼ THÔNG TIN CÁ
            NHÂN
          </h1>
          <div className="mb-4">
            <h2 className="font-bold text-xl">1. Điều khoản và điều kiện:</h2>
            <p className="text-lg">
              Bằng cách nhấn vào phím “Đồng Ý” trên giao diện người dùng thông
              qua mã Qr trên Zalo, tôi xác nhận rằng:
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
                bằng cách liên hệ qua email:{" "}
                <span
                  onClick={openUrlProgram}
                  className="text-blue-400 underline"
                >
                  caonhanhtay@yis.vn
                </span>{" "}
                đường dây nóng của chương trình 19003209.
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-lg">2. Cam kết bảo mật thông tin:</h2>
            <p className="text-lg">
              Công ty TNHH Bayer Việt Nam (sau đây gọi là “Bayer”) hiểu rõ tầm
              quan trọng của quyền riêng tư và bảo vệ dữ liệu cá nhân của bạn.
              Chúng tôi cam kết sử dụng và bảo vệ dữ liệu cá nhân của bạn một
              cách có trách nhiệm. Với tư cách là bên kiểm soát dữ liệu, tuân
              thủ Nghị định 13 về bảo vệ dữ liệu cá nhân, chúng tôi mời bạn đọc
              kỹ thông báo này vì nó giải thích:
            </p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Mục đích và phương thức chúng tôi xử lý dữ liệu cá nhân của bạn.
              </li>
              <li>Quyền của bạn đối với thông tin cá nhân.</li>
              <li>Cách thức bạn có thể thực hiện các quyền này.</li>
            </ul>
            <p className="text-lg">
              Bayer cho phép và uỷ viền đơn vị nhà cung cấp dịch vụ của Bayer,
              Công Ty Cổ Phần Yis Martech thực hiện quản lý chương trình và thu
              thập thông tin người tham gia chương trình với các loại dữ liệu
              thông tin cá nhân cần sử lý sau.
            </p>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-lg">
              3.1. Các loại dữ liệu cần xử lý
            </h2>
            <p className="text-lg">
              Chúng tôi sẽ thu thập và xử lý các thông tin cá nhân sau:
            </p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                <span className="font-bold">Thông tin nhận dạng: </span> Họ và
                tên, số Căn cước công dân (CCCD).
              </li>
              <li>
                <span className="font-bold">Thông tin liên lạc: </span> Số điện
                thoại, địa chỉ.
              </li>
            </ul>
            <p className="text-lg">
              <span className="font-bold">Lưu ý:</span> Chúng tôi sẽ không yêu
              cầu thông tin ngày sinh vì thông tin CCCD đã đủ để phục vụ các mục
              đích xác minh cần thiết đối với các khách hàng tham dự trúng giải
              Nhất, Nhì, Ba từ chương trình.
            </p>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-lg">3.2. Mục đích xử lý dữ liệu</h2>
            <p className="text-lg">Dữ liệu cá nhân của bạn được sử dụng để:</p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Xác minh thông tin trúng thưởng và trao giải đối với giải nhất,
                nhì & ba.
              </li>
              <li>
                Riêng các giải khuyến kích chúng tôi chỉ xác nhận và lưu trữ số
                điện thoại khách hàng tham dự qua nền tảng Zalo và thông tin
                chia sẽ cấp quyền từ phía nền tảng Zalo.
              </li>
              <li>
                Liên lạc với người tham gia khi cần thiết trong khuôn khổ chương
                trình.
              </li>
              <li>Phân tích và cải thiện chương trình khuyến mãi.</li>
            </ul>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-lg">
              3.3. Cách thức thu thập dữ liệu
            </h2>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                <span className="font-bold">Trực tiếp:</span> Qua phiếu đăng ký
                tham gia chương trình từ biểu mẫu này.
              </li>
              <li>
                <span className="font-bold">Gián tiếp:</span> Thông qua hệ thống
                quét mã QR hoặc các nền tảng đăng ký trực tuyến liên quan đến
                chương trình.
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-lg">
              3.4. Cơ sở pháp lý của việc xử lý
            </h2>
            <p className="text-lg">
              Chúng tôi xử lý dữ liệu cá nhân dựa trên sự đồng ý của bạn khi
              tham gia chương trình và các yêu cầu pháp lý liên quan. Chúng tôi
              cam kết:
            </p>
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
          <div className="mb-3">
            <h2 className="font-bold text-lg">
              3.5. Liên hệ trực tiếp với Bayer
            </h2>
            <p className="text-lg">
              Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến việc bảo
              vệ dữ liệu cá nhân, vui lòng liên hệ:
            </p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Tên: Thuy Pham Truong Legal Entity Bayer Vietnam Ltd. Role Data
                Privacy Manager
              </li>
              <li>Email: thuy.pham@bayer.com</li>
              <li>Hotline: 1800 1775</li>
              <li>
                Địa chỉ: 3rd Floor, 106 Nguyen Van Troi Street, Phu Nhuan
                District, Ho Chi Minh City, Vietnam.
              </li>
            </ul>
          </div>
          <div>
            <div className="text-center justify-center items-center w-1/2 ml-auto">
              <p className="font-bold">Chữ ký xác nhận của Người tham gia:</p>
              <p>(Ký tên và ghi rõ họ tên)</p>
              <p className="text-center">...............................</p>
              <p>
                <span className="font-bold">Ngày:</span>.................
              </p>
            </div>
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
