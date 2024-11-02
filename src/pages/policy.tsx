import React from "react";
import Background_1 from "assets/background_1.jpg";
import Slogan from "assets/slogan.png";
import Logo from "assets/logo.png";

const PolicyScreen = () => {
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat px-3 flex items-center flex-col py-10 gap-2 overflow-auto"
      style={{
        backgroundImage: `url(${Background_1})`,
        backgroundSize: "100% 100%", // This will make the background image fill the div without repeating
      }}
    >
      <img src={Logo} className="w-20" />

      <img src={Slogan} className="w-fit" />
      <div className="p-6  text-gray-800">
        <h1 className="text-2xl font-black text-center text-red-600 mb-4">
          Thể lệ chương trình
        </h1>
        <div className="mb-4">
          <h2 className="font-bold text-lg">1. Thời gian & Phạm vi</h2>
          <ul className="list-disc pl-6 text-base custom-round-bullet">
            <li>Thời gian: Đến 23h ngày 30/4/2025.</li>
            <li>Phạm vi: Tại đồng bằng sông Cửu Long.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">2. Đối tượng tham gia</h2>
          <ul className="list-disc pl-6 text-base custom-round-bullet">
            <li> Người tiêu dùng mua sản phẩm có phiếu cào mã dự thưởng.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">3. Cơ cấu giải thưởng</h2>
          <ul className="list-disc pl-6 text-base custom-round-bullet">
            <li>
              Giải nhất, nhì, ba và giải Khuyến Khích cho người có phiếu trúng
              giải.
            </li>
            <li>
              Người không trúng giải có thể tham gia quét mã để có thêm cơ hội
              trúng thưởng.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">
            4. Phương Thức Tham Gia và Nhận Giải
          </h2>
          <p>Cào phiếu, tìm mã dự thưởng và làm theo hướng dẫn để nhận giải.</p>
          <ul className="list-disc pl-6 text-base custom-round-bullet">
            <li>
              <strong>Cơ hội 1:</strong> Trúng giải cần gửi tin nhắn xác nhận
              theo cú pháp <strong>YIS</strong> khoảng cách{" "}
              <strong>{`<Mã dự thưởng gửi>
              6088`}</strong>{" "}
              hoặc quét mã QR bằng Zalo. Hệ thống quản lý chương trình Bayer
              Việt Nam sẽ thông báo và liên hệ trao giải.
            </li>
            <li>
              <strong>Cơ hội 2:</strong> Giành cho Bà con Không trúng giải hay
              trúng giải khuyến kích tại cơ hội 1 có thể tham gia cơ hội 2 tại
              thời điểm nhắn tin mã dự thưởng hay quét Qr bằng Zalo
            </li>
            <li>
              <strong>Bằng chứng xác nhận trúng giải:</strong> Tin nhắn thương
              hiệu Bayer sẽ gửi tin nhắn bằng chứng trúng thưởng xác nhận giải
              thưởng từ mã dự thưởng đã tham gia.
              <ul className="list-disc pl-6 custom-square-bullet">
                <li>
                  Đối với các giải trúng giải 1, 2, 3: Nhận tin nhắn xác nhận từ
                  Bayer và sẽ được liên hệ để nhận giải.
                </li>
                <li>
                  Trúng giải Khuyến Khích (KK): Nhận 10,000 VND nạp tiền tài
                  khaonr điện thoại. Hệ thống quản lý chương trình sẽ tự động
                  Nạp 10,000VND vào tài khoản số điện thoại của khách hàng tham
                  gia nhắn tin hay quét mã dự thưởng bằng Qr thông qua Zalo.
                </li>
                <li>
                  Không trúng: Nhận tin nhắn thương hiệu Bayer "Chúc bạn may mắn
                  lần sau."
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">5. Quy định chung</h2>
          <ul className="list-disc pl-6 text-base">
            <li>
              Người nhận giải cần hoàn thành các thủ tục theo quy định để được
              công nhận trúng giải.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">6. Quy định khác</h2>
          <ul className="list-disc pl-6 text-base">
            <li>Thắc mắc về chương trình, gọi tổng đài 19001992.</li>
            <li>
              Chương trình có quyền từ chối trao thưởng nếu không đủ bằng chứng.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">
            7. Thông tin cần thiết khi nhận giải
          </h2>
          <ul className="list-disc pl-6 text-base">
            <li>
              Trúng giải 1, 2, 3 sẽ nhận tin nhắn xác nhận và Bayer sẽ liên hệ.
            </li>
            <li>
              Trúng giải Khuyến Khích (KK): Nhận tin nhắn xác nhận và 10,000
              VND.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">
            8. Giải thưởng Khuyến Khích (KK)
          </h2>
          <ul className="list-disc pl-6 text-base">
            <li>
              Bayer sẽ liên hệ với người trúng để sắp xếp nhận thưởng và đối
              soát thông tin.
            </li>
            <li>
              Giải Khuyến Khích (KK): Số tiền sẽ được chuyển ngay sau khi nhận
              tin nhắn.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg">
            9. Quy trình và thời gian xác minh:
          </h2>
          <p className="text-base">
            Cần cung cấp bằng chứng tin nhắn thương hiệu Bayer cấp hoặc phiếu
            cào có mã dự thưởng hợp lệ. Thời gian xác minh sẽ được thông báo khi
            tổng đài chương trình 19001992 của YIS liên hệ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicyScreen;
