import React from "react";
import Background_1 from "assets/background.webp";
import Slogan from "assets/content_2.webp";
import Logo from "assets/logo.png";
import { Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { openWebview } from "zmp-sdk";

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
          <h1
            className="text-xl font-black text-center text-red-600 mb-4"
            style={{ fontFamily: "helveticaneue" }}
          >
            PHIẾU ĐỒNG Ý THAM GIA CHƯƠNG TRÌNH & ĐỒNG Ý CHIA SẺ THÔNG TIN CÁ
            NHÂN
          </h1>

          <div className="mb-4" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-xl">1. Điều khoản và điều kiện:</h2>
            <p className="text-lg">
              Bằng cách nhấn vào phím “Đồng Ý” trên giao diện người dùng thông
              qua mã QR trên Zalo, tôi xác nhận rằng:
            </p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>Tôi đồng ý cung cấp thông tin cá nhân cho chương trình.</li>
              <li>Tôi đồng ý cung cấp thông tin định vị.</li>
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
                <span className="font-bold">caonhanhtay@yis.vn</span> hoặc đường
                dây nóng của chương trình:{" "}
                <span className="font-bold">19003209</span>.
              </li>
            </ul>
          </div>
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">2. Dữ liệu cá nhân</h2>
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
              <span className="font-bold">Bayer</span> cho phép và ủy quyền đơn
              vị nhà cung cấp dịch vụ của Bayer, Công Ty Cổ Phần Yis Martech,
              thực hiện quản lý chương trình và thu thập thông tin người tham
              gia chương trình với các loại dữ liệu thông tin cá nhân cần xử lý
              sau:
            </p>
          </div>
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">
              2.1. Các loại dữ liệu cần xử lý
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
              <li>
                <span className="font-bold">Hình ảnh: </span> Hình bạn nhận
                giải.
              </li>
              <li>
                <span className="font-bold">Thông tin định vị vệ tinh:</span>{" "}
                (chúng tôi chỉ nhận được vị trí tỉnh/thành)
              </li>
            </ul>
          </div>
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">2.2. Mục đích xử lý dữ liệu</h2>
            <p className="text-lg">Dữ liệu cá nhân của bạn được sử dụng để:</p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Xác minh thông tin trúng thưởng và trao giải đối với giải nhất,
                nhì & ba.
              </li>
              <li>
                Đối với các giải khuyến khích, chúng tôi chỉ xác nhận và lưu trữ
                số điện thoại khách hàng tham dự qua nền tảng Zalo và thông tin
                chia sẻ cấp quyền từ phía nền tảng Zalo.
              </li>
              <li>
                Liên lạc với người tham gia khi cần thiết trong khuôn khổ chương
                trình.
              </li>
              <li>
                Thông tin xác định vị trí qua vệ tinh được dùng để phân tích và
                cải thiện chương trình khuyến mãi.
              </li>
              <li>
                Hình ảnh sẽ được dùng làm bằng chứng giải thưởng đã được trao
                trong quá trình nghiệm thu.
              </li>
            </ul>
          </div>
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">
              2.3. Cách thức thu thập dữ liệu
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
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">
              2.4. Cơ sở pháp lý của việc xử lý
            </h2>
            <p className="text-lg">
              Chúng tôi xử lý dữ liệu cá nhân dựa trên cơ sở thực hiện các thể
              lệ và điều khoản chương trình mà bạn đã đồng ý tham gia và các yêu
              cầu pháp lý liên quan. Nếu không có những dữ liệu này, chúng tôi
              sẽ không thể tiến hành các bước cần thiết để bạn tham gia chương
              trình.
            </p>
            <p className="text-lg">Chúng tôi cam kết:</p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Không bán, chia sẻ, hoặc sử dụng thông tin cá nhân của người
                tham gia ngoài mục đích của chương trình hoặc khi chưa có sự
                đồng ý của người tham gia.
              </li>
              <li>
                Lưu giữ thông tin theo đúng quy định pháp luật về bảo mật dữ
                liệu và quy định về bảo mật thông tin cá nhân của Bayer Việt
                Nam.
              </li>
            </ul>
          </div>
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">2.5. Thời gian lưu trữ</h2>
            <p className="text-lg">
              Dữ liệu cá nhân của bạn sẽ được lưu trữ từ lúc bạn tham gia chương
              trình. Sau khi chương trình (bao gồm trao giải) kết thúc, chúng
              tôi sẽ lưu trữ thông tin cá nhân của bạn đến khi thực hiện xong
              các yêu cầu về kiểm toán, báo cáo với các cơ quan nhà nước về
              chương trình, và các yêu cầu pháp lý khác về lưu trữ.
            </p>
          </div>
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">
              2.6. Những bên nhận dữ liệu cá nhân
            </h2>
            <p className="text-lg">
              Chúng tôi chỉ chia sẻ dữ liệu của bạn với những bên thực sự cần nó
              để giúp thực hiện mục đích nói trên. Một số bên đó bao gồm:
            </p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Tập đoàn Bayer, các công ty con và công ty liên kết của Tập đoàn
                Bayer.
              </li>
              <li>
                Công ty Cổ Phần Yis Martech: thực hiện quản lý chương trình và
                thu thập thông tin người tham gia chương trình.
              </li>
              <li>
                Các cơ quan nhà nước có liên quan: nếu được yêu cầu theo pháp
                luật hoặc cần thiết cho mục đích được mô tả ở trên.
              </li>
              <li>
                Luật sư thuê ngoài: để hỗ trợ các quyết định pháp lý hoặc giải
                quyết khiếu nại nếu phát sinh.
              </li>
              <li>
                Những bên mua và sáp nhập trong bối cảnh sáp nhập & mua lại,
                hoặc bất kỳ loại hình chuyển đổi quyền sở hữu nào liên quan đến
                chúng tôi hoặc dịch vụ của chúng tôi.
              </li>
              <li>
                Các nhà cung cấp giải pháp đám mây, công nghệ thông tin mà Bayer
                đang sử dụng để lưu trữ (họ chỉ chịu trách nhiệm lưu trữ chứ
                không được phép sử dụng cho mục đích riêng).
              </li>
            </ul>
          </div>
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">
              2.7. Chuyển dữ liệu ra nước ngoài
            </h2>
            <p className="text-lg">
              Bayer là một công ty đa quốc gia bao gồm nhiều pháp nhân, công ty
              liên kết, và công ty con trên toàn thế giới. Ngoài ra, chúng tôi
              sử dụng nhiều dịch vụ công nghệ thông tin có trung tâm dữ liệu đặt
              ngoài lãnh thổ Việt Nam.
            </p>
            <p className="text-lg">
              Trong trường hợp chuyển giao như vậy, Bayer sẽ đảm bảo các biện
              pháp cần thiết để bảo vệ dữ liệu cá nhân của bạn, tuân thủ các yêu
              cầu pháp lý Việt Nam hoặc yêu cầu sự đồng ý rõ ràng của bạn.
            </p>
          </div>
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">
              2.8. Hậu quả, thiệt hại không mong muốn có khả năng xảy ra
            </h2>
            <p className="text-lg">
              Mọi hoạt động với dữ liệu cá nhân đều không thể tránh khỏi các rủi
              ro. Một vài trong số các rủi ro có thể gây hậu quả không mong muốn
              đến bạn bao gồm:
            </p>
            <ul className="list-disc pl-6 text-base custom-round-bullet">
              <li>
                Cơ sở dữ liệu bị tin tặc tấn công và rò rỉ (tuy nhiên chúng tôi
                rất hiếm khi thu thập dữ liệu nhạy cảm).
              </li>
              <li>Lỗi phần cứng.</li>
            </ul>
            <p className="text-lg">
              Tại Bayer, chúng tôi áp dụng nhiều biện pháp tổ chức và kỹ thuật
              để giảm thiểu nguy cơ này đối với dữ liệu cá nhân của bạn, như sử
              dụng tường lửa, ràng buộc nhà thầu/bên thứ ba đáp ứng các tiêu
              chuẩn bảo vệ dữ liệu cá nhân, và huấn luyện nhân viên.
            </p>
          </div>
          <div className="mb-3" style={{ fontFamily: "helveticaneue" }}>
            <h2 className="font-bold text-lg">
              2.9. Liên hệ trực tiếp với Bayer về dữ liệu cá nhân
            </h2>
            <p className="text-lg">
              Đối với các vấn đề, câu hỏi liên quan đến dữ liệu cá nhân, vui
              lòng gửi email đến{" "}
              <span className="font-bold">dpo.asean@bayer.com</span> hoặc liên
              hệ tại văn phòng của chúng tôi:
            </p>
            <p className="font-bold">Trâm Nguyễn - Bộ phận LPC</p>
            <p>Văn phòng TP. Hồ Chí Minh</p>
            <p>
              Lầu 3, Toà nhà CentrePoint, 106 Nguyễn Văn Trỗi, Quận Phú Nhuận,
              TP. HCM
            </p>
            <p>Tel: (84-28) 3845 0828.</p>
          </div>
        </div>
        <div
          className="py-3 w-56 flex items-center justify-center text-lg  text-white !font-bold bg-[#FF2929] rounded-3xl gap-2 mx-auto mb-5 "
          role="button"
          onClick={onNavBack}
          style={{ fontFamily: "helveticaneue" }}
        >
          <Icon icon="zi-arrow-left" />
          Quay lại
        </div>
      </div>
    </div>
  );
};

export default PolicyScreen;
