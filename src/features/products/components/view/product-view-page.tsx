import { Product } from '@/types/product';

import { fakeProducts } from '@/services/product-mock-api';
import { notFound } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import FormProduct from '../form/form-product';

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

  return (
    <>
      <Heading
        title={pageTitle}
        description='Complete la información del producto.'
      />
      <FormProduct initialData={product} />
    </>
  );
}
