import { ENDPOINTS, requestGetData, requestPutData } from '../api';

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

export const getUser = () => requestGetData<UserResult>(ENDPOINTS.USER);
export const setUserData = (profileParams: ProfileParams, config?: {}) => requestPutData<ProfileParams, UserResult>(ENDPOINTS.PROFILE, profileParams, config);
export const setAvatar = (avatarParams: AvatarParams, config?: {}) => requestPutData<AvatarParams, UserResult>(ENDPOINTS.AVATAR, avatarParams, config);
// eslint-disable-next-line max-len
export const setPassword = (passwordParams: PasswordParams, config?: {}) => requestPutData<PasswordParams, PasswordResult>(ENDPOINTS.PASSWORD, passwordParams, config);
