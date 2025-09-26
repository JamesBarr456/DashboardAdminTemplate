import { Product } from '@/types/product';

import { fakeProducts } from '@/services/product-mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { TableCustom } from '@/components/table';
import { columns } from '../tables/product-tables/columns';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeProducts.getProducts(filters);
  const totalProducts = data.total_products;
  const products: Product[] = data.products;

  return (
    <TableCustom data={products} totalItems={totalProducts} columns={columns} />
  );
}
