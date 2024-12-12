export type IAccountState = {
  isLoading: boolean;
  isLoadingData: boolean;
  error: Error | string | null;
  success: Error | string | null | boolean;
  refresh: number;
  account: TAccount | null;
  accounts: TAccount[] | null;
};

export type TAccount = {
  id: number;
  name: string;
  email: string;
  position: string;
  phone: string;
  accountType: string;
  passwordResetRequired: boolean;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};
