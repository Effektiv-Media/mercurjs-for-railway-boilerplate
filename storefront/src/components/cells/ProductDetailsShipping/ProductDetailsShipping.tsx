'use client';

import { ProductPageAccordion } from '@/components/molecules';
import { useTranslations } from 'next-intl';

export const ProductDetailsShipping = () => {
  const t = useTranslations('product');

  return (
    <ProductPageAccordion
      heading={t('shippingAndReturns')}
      defaultOpen={false}
    >
      <div className='product-details'>
        <ul>
          <li>{t('shippingPolicy')}</li>
          <li>{t('returnPolicy')}</li>
        </ul>
      </div>
    </ProductPageAccordion>
  );
};
