export type TZaloREQ = {
  access_token: string;
  avatar: string;
  code: string;
  code_get_location: string;
  code_get_phone: string;
  code_hash: string;
  followed_oa: boolean;
  is_sensitive: boolean;
  name: string;
  zalo_app_id: string;
  zalo_user_id: string;
};

export type TZaloCheckREQ = {
  zalo_user_id: string;
};

export type TZaloInfoManualREQ = {
  name: string;
  phone: string;
  zalo_app_id: string;
  zalo_user_id: string;
  province_code: string;
};
