'use client';

import {
  ProductPageAccordion,
  ProdutMeasurementRow,
} from '@/components/molecules';
import { SingleProductMeasurement } from '@/types/product';
import { useTranslations } from 'next-intl';

export const ProductDetailsMeasurements = ({
  measurements,
}: {
  measurements: SingleProductMeasurement[];
}) => {
  const t = useTranslations('product');

  return (
    <ProductPageAccordion
      heading={t('measurements')}
      defaultOpen={false}
    >
      {measurements.map((item) => (
        <ProdutMeasurementRow
          key={item.label}
          measurement={item}
        />
      ))}
    </ProductPageAccordion>
  );
};
