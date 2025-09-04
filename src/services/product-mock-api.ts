////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { Product } from '@/types/product';
import { matchSorter } from 'match-sorter'; // For filtering
import { mockProducts } from '../constants/mocks/products';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Product data

export const fakeProducts = {
  records: mockProducts as Product[],

  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category', 'brand', 'sku']
      });
    }

    return products;
  },

  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;

    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  async getProductBySKU(sku: string) {
    await delay(500);
    const product = this.records.find((product) => product.sku === sku);

    if (!product) {
      return {
        success: false,
        message: `Product with SKU ${sku} not found`
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Product with SKU ${sku} found`,
      product
    };
  }
};
