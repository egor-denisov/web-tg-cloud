export type UserDataType = {
  id: number;
  username: string;
  chat_id: number;
  user_id: number;
  firstname: string;
  lastname: string;
};

export type UserType = {
  data: UserDataType;
  authorized: boolean;
  error: string;
};

export enum UserActionTypes {
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  UPDATE_USER = "UPDATE_USER",
  LOGOUT_USER = "LOGOUT_USER",
  SET_ERROR = "SET_ERROR",
}
interface LoginUser {
  type: UserActionTypes.LOGIN_USER;
}
interface RegisterUser {
  type: UserActionTypes.REGISTER_USER;
  payload: UserDataType;
}
interface UpdateUser {
  type: UserActionTypes.UPDATE_USER;
  payload: UserDataType;
}
interface LogoutUser {
  type: UserActionTypes.LOGOUT_USER;
}
interface SetError {
  type: UserActionTypes.SET_ERROR;
  payload: string;
}

export type UserAction =
  | LoginUser
  | RegisterUser
  | LogoutUser
  | UpdateUser
  | SetError;
