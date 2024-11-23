import React from "react";
import Background_1 from "assets/background.webp";
import Slogan from "assets/content_2.webp";
import Logo from "assets/logo.png";
import { Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { openWebview } from "zmp-sdk";

const PrivacyScreen = () => {
  const navigate = useNavigate();
  const onNavBack = () => {
    navigate(-1);
  };
  const openUrlProgram = async () => {
    try {
      await openWebview({
        url: "https://bit.ly/CaoNhanhTay",
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
  const openUrlProgram2 = async () => {
    try {
      await openWebview({
        url: "https://bayerkhoahoccaytrong.com/dong-hanh-ng/cao-nhanh-tay/",
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
          <h1 className="text-2xl font-black text-center text-red-600 mb-4">
            THỂ LỆ CHƯƠNG TRÌNH KHUYẾN MÃI
          </h1>
          <h4 className="text-xl font-black text-center mb-4">
            Nativo 75 WG, Vayego 200SC “Cào Nhanh Tay, Trúng Quà Ngay”
          </h4>
          <div className="mb-4">
            <h2 className="font-bold text-xl">1. Tên chương trình: </h2>

            <p className="text-lg">
              Nativo 75 WG, Vayego 200SC “Cào Nhanh Tay, Trúng Quà Ngay”{" "}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold text-xl">2. Thời gian áp dụng: </h2>

            <p className="text-lg">
              Từ ngày 1/12/2024 đến hết ngày 31/03/2025.{" "}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold text-xl">3. Phạm vi áp dụng:</h2>

            <p className="text-lg">
              Áp dụng trên 13 tỉnh Đồng Bằng Sông Cửu Long với các sản phẩm
              Nativo 75 WG, Vayego 200SC có phiếu cào khuyến mãi.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold text-xl">4. Đối tượng tham gia:</h2>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Tất cả khách hàng bà con nông dân khi mua sản phẩm có phiếu cào
                trong chương trình khuyến mãi và thực hiện các bước tham gia
                theo hướng dẫn.
              </li>
              <li>
                Không áp dụng cho nhân viên thuộc công ty tổ chức chương trình
                và đối tác có liên quan và hệ thống phân phối.
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="font-bold text-xl">5. Cơ cấu giải thưởng:</h2>

            <p className="text-lg">
              Tổng giá trị giải thưởng lên đến hơn 5,4 tỷ đồng, bao gồm:
            </p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                10 Giải Nhất: Xe máy Honda Airblade 125 cc 2024 bản đặc biệt
              </li>
              <li>15 Giải Nhì: Tủ lạnh Sharp Inverter 362 lít SJ-FX420VG-BK</li>
              <li>30 Giải Ba: Loa JBL Partybox 110</li>
              <li>
                453.023 Giải Khuyến Khích: Nạp tiền điện thoại trị giá 10.000
                đồng.
              </li>
            </ul>
            <p className="text-lg font-bold">Cơ hội 1</p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                4 Giải Nhất: Xe máy Honda Airblade 125 cc 2024 bản đặc biệt
              </li>
              <li>6 Giải Nhì: Tủ lạnh Sharp Inverter 362 lít SJ-FX420VG-BK </li>
              <li>12 Giải Ba: Loa JBL Partybox 110</li>
              <li>
                317,116 Giải Khuyến Khích: Nạp tiền điện thoại trị giá 10.000
                đồng.
              </li>
            </ul>
            <p className="text-lg font-bold">Cơ hội 2</p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                6 Giải Nhất: Xe máy Honda Airblade 125 cc 2024 bản đặc biệt
              </li>
              <li>9 Giải Nhì: Tủ lạnh Sharp Inverter 362 lít SJ-FX420VG-BK </li>
              <li>18 Giải Ba: Loa JBL Partybox 110</li>
              <li>
                135,907 Giải Khuyến Khích: Nạp tiền điện thoại trị giá 10.000
                đồng.
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-xl">6. Cách thức tham gia:</h2>
            <p className="text-lg">
              Quý nhà nông hãy nhanh tay tìm mua sản phẩm phẩm Nativo 75 WG,
              Vayego 200SC có phiếu cào khuyến mãi tại các cửa hàng kinh doanh
              thuốc BVTV tại các tỉnh ĐBSCL, trong thơi gian chương trình diễn
              ra chương trình để tham gia:
            </p>
            <p className="text-lg font-bold">Cơ hội 1:</p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Bước 1: Cào lớp phủ bạc trên phiếu để xem kết quả trúng thưởng
                ngay.
              </li>
              <li>
                Bước 2: Quét mã QR in trên phiếu để xác thực giải thưởng (áp
                dụng cho các giải Nhất, Nhì, Ba và khuyến kích).
              </li>
              <li>
                Bước 3: Sử dụng ứng dụng Zalo, tiến hành quét mã Qr trên phiếu
                trúng thưởng và làm theo hướng dẫn hệ thống: “Đồng ý” thể lệ và
                điều kiện khi tham gia chương trình; cho phép chia sẽ thông tin
                số điện thoại, địa chỉ tỉnh của Quý nhà nông. Tiếp theo, hệ
                thống tự động xác nhận kết quả trúng thưởng của Quý nhà nông
                nhận được và yêu cầu Quý nhà nông tiến hành chụp hình ảnh phiếu
                cào trúng giải gửi về chương trình. Sau khi thực hiện gửi hình
                bằng chứng trúng giải. Quý nhà nông trúng giải sẽ nhận được tin
                nhắn thương hiệu “Bayer VN” xác thực trúng giải qua số điện
                thoại đã chia sẽ trước đó.
                <p className="whitespace-pre-line">
                  {`Với nội dung: “Chuong trinh Nativo & Vayego, Cao Nhanh Tay-Trung Qua Ngay, xac nhan MASO <1234G6789> nhan duoc CH1: <Tên phần quà> Chi tiet goi 19003209.
Riêng với, các giải nhất, nhì, ba, trong vòng 24h kể từ gửi bằng chứng trúng giải, khách hàng sẽ được trổng đài chương trình liên hệ và xác thực các thông tin như:
-	Họ tên người trúng giải
-	Địa chỉ trao giải
-	Và thông báo dự kiến thời gian tiến hành trao giải
`}
                </p>
              </li>
            </ul>

            <p className="text-lg font-bold">Cơ hội 2:</p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Đối với các phiếu không trúng cơ hội 1, Quý nhà nông có thêm một
                cơ hội tham gia ở Cơ hội 2, với trình tự các bước tham gia tương
                tự ở Cơ hội 1
              </li>
              <li>
                Bước 1: Sử dụng ứng dụng Zalo, tiến hành quét mã QR để tham gia
                chương trình. Thực hiện theo hướng dẫn và hoàn tất các bước
                giống như ở cơ hội 1.
              </li>
              <li>
                Bước 2: Đón chờ xem kết quả may mắn của cơ hội 2 được chạy ngẫu
                nhiên trong 2 giây. Nếu trúng giải thưởng Quý nhà nông thực hiện
                thao tác tiếp ở Bước 3.{" "}
              </li>
              <li className="whitespace-pre-line">
                {`Bước 3: Theo hướng dẫn hệ thống và chụp hình ảnh phiếu cào trúng giải gửi về chương trình và nhận tin nhắn thương hiệu xác thực trúng giải qua tin nhắn thương hiệu “Bayer VN”             
Với nội dung: “Chuong trinh Nativo & Vayego, Cao Nhanh Tay-Trung Qua Ngay, xac nhan MASO <1234G6789> nhan duoc CH2: <Tên phần quà> Chi tiet goi 19003209.
`}
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-xl">7. Quy định trao thưởng:</h2>

            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Đối với các giải Nhất, nhì, ba, Khách hàng được tổng đài viên
                chương trình 19003209 - “YIS” liên hệ qua số điện thoại đã đăng
                ký trong vòng 24h từ khi gửi hình bằng chứng trúng giải hợp lệ.
                Quý nhà nông trúng giải sẽ cung cấp thêm thông tin về Họ tên
                trên Căn Cước, Địa chỉ thường trú và Khách hàng trúng thưởng
                Nhất, Nhì, ba cần giử lại phiếu cào hợp lệ và tin nhắn thương
                hiệu Bayer VN để nhận giải.
              </li>
              <li>
                Giải thưởng của giải Nhất, Nhì, Ba sẽ được trao trong vòng 30
                ngày kể từ ngày công bố kết quả trên trang web Bayer Khoa Học
                Cây Trồng{" "}
                <span
                  onClick={openUrlProgram}
                  className="text-blue-400 underline"
                >
                  https://bit.ly/CaoNhanhTay
                </span>
              </li>
              <li>
                Giải khuyến khích – Nạp tiền điện thoại 10,000 đ, Quý nhà nông
                sẽ được nhận trực tiếp qua số điện thoại đăng ký ngay khi tin
                nhắn thương hiệu “Bayer VN” gửi ra.
              </li>
              <li>
                Các giải thưởng không có giá trị quy đổi thành tiền mặt hoặc các
                sản phẩm khác.
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-xl">8. Quy định khác:</h2>

            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Ban tổ chức có quyền từ chối trao giải nếu phát hiện bất kỳ gian
                lận nào.
              </li>
              <li>
                Phiếu trúng thưởng hết hạn sẽ không có giá trị nhận thưởng.
              </li>
              <li>
                Trong mọi trường hợp, quyết định của Bayer Việt Nam là cuối cùng
                trong mọi trường hợp. Kết quả Quý nhà nông trúng giải được công
                bố tại trang web Bayer Khoa học cây trồng{" "}
                <span
                  onClick={openUrlProgram2}
                  className="text-blue-400 underline"
                >
                  https://bayerkhoahoccaytrong.com/dong-hanh-ng/cao-nhanh-tay/
                </span>
              </li>
              <li>
                Ban tổ chức cam kết bảo mật thông tin cá nhân của khách hàng và
                chỉ sử dụng cho mục đích xác minh giải thưởng.
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <h2 className="font-bold text-xl">9. Thông tin liên hệ:</h2>
            <p className="text-lg">Mọi thắc mắc, vui lòng liên hệ:</p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>Hotline: 19003209</li>
              <li>
                Website công bố kết quả:{" "}
                <span
                  onClick={openUrlProgram}
                  className="text-blue-400 underline"
                >
                  https://bit.ly/CaoNhanhTay
                </span>
              </li>
            </ul>
            <p className="text-lg">Chúc quý khách hàng may mắn!</p>
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

export default PrivacyScreen;
