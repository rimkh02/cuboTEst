import { TOffre } from './offre';

export type TCompany = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
  siret: string;
  tax: 5;
  website: string;
  invoiceAddress: string;
  invoiceEmail: string;
  phone: string;
  status: string;
  ticketRestaurantFacialValue: any;
  ticketRestaurantFacialValueCoveragePercent: any;
  wiBoostOffer: TOffre | any;
};

export type Tconfigurations = {
  maximumTicketRestaurantRefundFacialValue: number | null;
  recommendedHighestTicketRestaurantEffectiveRefundValue: number | null;
};
