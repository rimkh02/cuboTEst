export type ISettingsState = {
  isLoading: boolean;
  plafonds: any;
  texts: any;
  error: Error | string | null | any;
  success: string;
  refresh: number;
};
