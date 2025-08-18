import { Product, fakeProducts } from '@/constants/product-mock-api';

import ProductForm from './product-form';
import { notFound } from 'next/navigation';

type TProductViewPageProps = {
  productSKU: string;
};

export default async function ProductViewPage({
  productSKU
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Product';

  if (productSKU !== 'new') {
    const data = await fakeProducts.getProductBySKU(productSKU);
    product = data.product as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Product`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
