export type TBaseRES<T> = {
  status: number;
  message: string; // nội dung thông báo hiển thị html
  image_url: string; // hình ảnh  hiển thị thay text nhưng chưa sử dụng
  data: T;
  button: number; // 0 : ko hiển thị , 1 : hiển thị
};
