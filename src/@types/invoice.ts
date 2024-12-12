// ----------------------------------------------------------------------

export type IInvoiceAddress = {
  id: string;
  name: string;
  address: string;
  company: string;
  email: string;
  phone: string;
};

export type IInvoiceItem = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  service: string;
};

export type TInvoice = {
  id: number;
  createdAt: Date | number;
  updatedAt: Date | number;
  status: string;
  amount: number;
  dueDate: Date | null;
  invoiceMonth: Date;
  paidAt: Date | null;
  employeeFees: number;
  overageFees: number;
  usedBonusesFees: number;
  invoiceTo: IInvoiceAddress;
  customerName: string;
};

export type IInvoice = {
  id: string;
  status: string;
  totalPrice: number;
  invoiceFrom: IInvoiceAddress;
  invoiceTo: IInvoiceAddress;
  createDate: Date | number;
  invoiceMonth: Date;
  dueDate: Date | number;
  items: IInvoiceItem[];
};

export type IInvoiceState = {
  isLoading: boolean;
  invoice: TInvoice | null;
  error: Error | string | null;
  success: boolean | string | null;
  invoices: any;
  refresh: number;
};
