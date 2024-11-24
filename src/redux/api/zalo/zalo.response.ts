export type TZaloRES = {
  image_url: string;
  status: number;
  message: string;
  data: {
    phone: string;
    name: string;
    zalo_device_id: string;
  };
};

export type TZaloCheckRES = {
  image_url: string;
  status: number;
  message: string;
  data: {
    phone: string;
    name: string;
    zalo_device_id: string;
  };
  button: number;
};
