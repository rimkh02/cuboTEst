import { TCompany, Tconfigurations } from './company';

export type IAuthState = {
  isLoading: boolean;
  isLoadingUpdate: boolean;
  user: TUser | null | any;
  company: any | TCompany;
  configurations: any | Tconfigurations;
  isInitialized: boolean;
  isLoadingForget: boolean;
  isAuthenticated: boolean;
  errorForget: boolean;
  error: Error | string | null | any;
  success: string;
  refresh: number;
  temporal: boolean;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  position: string;
  phone: null;
  createdAt: string;
  updatedAt: string;
  company: null | TCompany;
  passwordResetRequired: boolean;
};

export type TResetPassword = {
  oldPassword: string;
  newPassword: string;
};

export type TProfil = {
  name: string;
  email: string;
  position: string;
  phone: string;
};
