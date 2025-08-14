////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Product data
export type Product = {
  id: number;
  photo_url: string;
  name: string;
  sku: string;
  brand: string;
  gender: string;
  sizes: string[];
  colors: string[];
  cost_price: number;
  sale_price: number;
  has_discount: boolean;
  discount_percentage?: number;
  is_active: boolean;
  stock: number;

  description: string;
  category: string;
  updated_at: string;
  created_at: string;
};

export const categories = [
  'Clothing',
  'T-shirts',
  'Pants',
  'Blouses',
  'Sweatshirts',
  'Home',
  'Sportswear',
  'Kitchen',
  'Underwear',
  'Winter',
  'Summer'
];
export const genders = ['male', 'female', 'unisex', 'kids', 'baby'];
export const sizes = ['XS', 'S', 'M', 'L', 'XL'];
export const colors = [
  'red',
  'blue',
  'green',
  'black',
  'white',
  'yellow',
  'pink',
  'purple'
];
// Mock product data store
export const fakeProducts = {
  records: [] as Product[],

  initialize() {
    const sampleProducts: Product[] = [];

    function generateRandomProductData(id: number): Product {
      const hasDiscount = faker.datatype.boolean();
      const costPrice = Number(
        faker.commerce.price({ min: 5, max: 500, dec: 2 })
      );
      const salePrice = Number(
        faker.commerce.price({ min: costPrice, max: costPrice + 200, dec: 2 })
      );

      return {
        id,
        photo_url: faker.image.urlLoremFlickr({ category: 'fashion' }),
        name: faker.commerce.productName(),
        sku: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
        brand: faker.company.name(),
        gender: faker.helpers.arrayElement(genders),
        sizes: faker.helpers.arrayElements(sizes, {
          min: 1,
          max: sizes.length
        }),
        colors: faker.helpers.arrayElements(colors, {
          min: 1,
          max: colors.length
        }),
        cost_price: costPrice,
        sale_price: salePrice,
        has_discount: hasDiscount,
        discount_percentage: hasDiscount
          ? faker.number.int({ min: 5, max: 50 })
          : undefined,
        is_active: faker.datatype.boolean(),
        stock: faker.number.int({ min: 0, max: 200 }),
        description: faker.commerce.productDescription(),
        category: faker.helpers.arrayElement(categories),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        updated_at: faker.date.recent().toISOString()
      };
    }

    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

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

  async getProductById(id: number) {
    await delay(1000);
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Product with ID ${id} found`,
      product
    };
  }
};

fakeProducts.initialize();
