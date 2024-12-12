export type IRechargementCheckoutState = {
  activeStep: number;
  employees: any[];
  month: string;
  cagnotte: string;
  total: number;
  linesToSend: any;
};

export type IRechargementEventState = {
  activeStep: number;
  employees: any[];
  month: string;
  cagnotte: string;
};

export type IRechargementEncouragement = {
  activeStep: number;
  cagnottes: any;
};
export type IRechargementState = {
  isLoading: boolean;
  isLoadingReloadTicketResto: boolean;
  isLoadingReloadEncouragement: boolean;
  isLoadingEvent: boolean;
  error: Error | string | null;
  success: boolean | null;
  products: any;
  product: any | null;
  rechargementData: IRechargementCheckoutState;
  rechargementEvent: IRechargementEventState;
  rechargementEncouragement: IRechargementEncouragement;
};
