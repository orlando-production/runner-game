/* eslint-disable no-console */
import { ENDPOINTS, requestPutData } from '../api';

export type AvatarParams = {
    FormData: FormData
};

export type ProfileParams = {
    login: string,
    first_name: string,
    second_name: string,
    email: string,
    phone: string,
    display_name: string,
    status?: null,
    avatar?: string,
};

export type PasswordParams = {
    newPassword: string,
    oldPassword: string,
}

export type PasswordResult = null;

export type UserResult = {
    id: number,
    login: string,
    first_name: string,
    second_name: string,
    email: string,
    phone: string,
    display_name: string,
    avatar: string,
    status?: null
};

export const setUserData = (
  profileParams: ProfileParams,
  config?: {}, isServer?:boolean
) => requestPutData<ProfileParams, UserResult>(ENDPOINTS.PROFILE, profileParams, config, isServer);
export const setAvatar = (
  avatarParams: AvatarParams,
  config?: {},
  isServer?:boolean
) => requestPutData<AvatarParams, UserResult>(ENDPOINTS.AVATAR, avatarParams, config, isServer);
// eslint-disable-next-line max-len
export const setPassword = (passwordParams: PasswordParams, config?: {}, isServer?:boolean) => requestPutData<PasswordParams, PasswordResult>(ENDPOINTS.PASSWORD, passwordParams, config, isServer);
