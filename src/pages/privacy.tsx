import React from "react";
import Background_1 from "assets/background_1.jpg";
import Slogan from "assets/slogan.png";
import Logo from "assets/logo.png";

const PrivacyScreen = () => {
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
          Cách thức tham gia:
        </h1>
        <div className="flex flex-col gap-4">
          <div className="pl-2">
            Bà con nông dân cào, tìm giải thưởng và mã dự thưởng bên dưới lớp
            bạc. Nhắn tin cú pháp <strong>YIS</strong> khoảng cách {"<Mã số>"}
            gửi <strong>6088</strong> hoặc dùng Zalo quét <strong>Qr</strong>{" "}
            tham gia chương trình với 2 cơ hội*
          </div>
          <div className="pl-2">
            <strong>Cơ hội 1:</strong> Cào trúng ngay dưới lớp cào.
          </div>
          <div className="pl-2">
            <strong>Cơ hội 2:</strong> Trúng ngay khi khi nhắn tin hoặc quét Qr.
            Tổng giá trị hơn 5tỷ đồng, chi tiết chương trình và kết quả khách
            hàng trúng thưởng được công bố tại và xem tại iqr.yis.vn
          </div>
          <p className="text-red-600 font-semibold mt-3">
            *Chi tiết chương trình liên hệ 19003209; kết quả giải công bố tại
            web iqr.yis.vn
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyScreen;
