export type IStatistiquesState = {
  isLoading: boolean;
  error: Error | string | null;
  success: boolean | string | null;
  adminsCount: number;
  managersCount: number;
  employeesCount: number;
  categoriesCount: number;
  usageEmployees: any;
  usageCategory: any;
};
