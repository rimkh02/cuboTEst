export type TTransation = {
  id: number;
  createdAt: Date | number;
  updatedAt: Date | number;
  amount: number;
  type: string;
  status: string;
  reloadMonth: Date;
  reloadAdvantageType: string;
  reloadLines: TReloadLine[];
};

export type TReloadLine=   {
  id: number;
  amount: number;
  presenceDaysCount: null | number;
  forEmployeeId: number;
  reason: string;
}

export type ITransationsState = {
  isLoading: boolean;
  error: Error | string | null;
  success: boolean | string | null;
  transations: any;
  totalTransactions: number;
};
