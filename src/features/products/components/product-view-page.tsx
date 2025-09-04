import { Product } from '@/types/product';
import ProductForm from './product-form';
import { fakeProducts } from '@/services/product-mock-api';
import { notFound } from 'next/navigation';

type TProductViewPageProps = {
  productSKU: string;
};

export default async function ProductViewPage({
  productSKU
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Crear Nuevo Producto';

  if (productSKU !== 'new') {
    const data = await fakeProducts.getProductBySKU(productSKU);
    product = data.product as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Editar Producto`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
