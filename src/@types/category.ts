export type TCategory = {
  id: number;
  createdAt: string;
  name: string;
  status: string;
  isStandard: boolean;
  version: number;
  advantages: TAdvantage [];
};

export type TAdvantage = {
  id: number;
  createdAt: string;
  type: string;
  version: number;
  facialValue: number | null;
  facialValueCoveragePercent: number | null;
  yearlyLimit: number | null;
};

export type ICategoryState = {
  isLoading: boolean;
  isLoadingAction: boolean;
  isEmployeeLoading: boolean;
  cagnotte: TCategory | null;
  category: TCategory | null;
  error: Error | string | null;
  success: boolean | string | null;
  categories: TCategory[];
  refresh: number;
};
