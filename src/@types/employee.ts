import { TCategory } from './category';
import { TCompany } from './company';

export type TEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  category: TCategory;
  companyAccepted: boolean;
  companyLinkingDisabled: boolean;
  companyId: number | any;
  company: TCompany;
  contract: TContract;
};

export type TContract = {
  id: number;
  position: string;
  status: string;
  companyAccepted: boolean;
  companyLinkingDisabled: boolean;
  registrationNumber: string;
  title: string;
  startDate: string;
  onboardingDate: string;
  isSelectedForApp: string;
  endDate: string;
};

export type TEmplyeeInfo = {
  contract: any;
  employee: TEmployee;
};

export type IEmployeeState = {
  isLoading: boolean;
  isEmployeeLoading: boolean;
  isLoadingReprting: boolean;
  //  employee: TEmployee | TEmplyeeInfo | null;
  employee: TEmplyeeInfo | null;
  error: Error | string | null;
  success: boolean | string | null;
  employees: any;
  totalEmployees: number;
  refresh: number;
  importEmployees: any;
  reporting: any;
};
