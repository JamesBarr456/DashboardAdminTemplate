import { Customer, mockCustomers } from './mocks/customers';
import { delay } from './product-mock-api';

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
  }
};
