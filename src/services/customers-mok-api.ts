import { Customer } from '@/types/user';
import { delay } from './product-mock-api';
import { mockCustomers } from '@/constants/mocks/customers';

export const fakeCustomers = {
  records: mockCustomers as Customer[],

  async getCustomerById(id: string) {
    await delay(500);
    const customer = this.records.find((customer) => customer.id === id);

    if (!customer) {
      return {
        success: false,
        message: `Customer with ID: ${id} not found`
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Customer with ID: ${id} found`,
      customer
    };
  },
  async getCustomerByDNI(dni: string) {
    await delay(500);
    const customer = this.records.find((customer) => customer.dni === dni);

    if (!customer) {
      return {
        success: false,
        message: `Customer with DNI: ${dni} not found`
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Customer with DNI: ${dni} found`,
      customer
    };
  }
};
