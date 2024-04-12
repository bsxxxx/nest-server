
/**
 * @description: 创建时间、更新时间
 */
export type Times = {
  created_time?: Date; // 创建时间
  updated_time?: Date; // 最后一次更新时间
};

/**
 * @description: 获取枚举的所有 key
 */
export type EnumKeys<T> = keyof T;

export type UserAttributes = {
  id: string; // 用户id
  name: string; // 用户名称
  password: string; // 密码
  phone: string; // 电话号码
  avatar: string; // 用户头像
  role: string; // 角色

}
export type SessionTypes = {
  currentUserInfo: UserAttributes; // 用户信息
};

/**
 * @description: Response 返回体，默认是不分页，如果是分页查询，需要自己将 Model 带入
 */
export type Response<T = any> = {
  code?: number;
  data: T;
  msg?: string;
};






