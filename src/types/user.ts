export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  orderHistory: string[];
  cancelledOrders: number;
  rejectedOrders: number;
  avatar: string;
}
