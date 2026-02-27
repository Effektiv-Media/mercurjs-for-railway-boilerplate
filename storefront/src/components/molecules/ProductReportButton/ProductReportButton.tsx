'use client';

import { Button } from '@/components/atoms';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { ReportListingForm } from '../ReportListingForm/ReportListingForm';
import { useTranslations } from 'next-intl';

export const ProductReportButton = () => {
  const t = useTranslations('seller');
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button
        className='uppercase label-md'
        variant='tonal'
        onClick={() => setOpenModal(true)}
      >
        {t('report')}
      </Button>
      {openModal && (
        <Modal
          heading={t('report')}
          onClose={() => setOpenModal(false)}
        >
          <ReportListingForm
            onClose={() => setOpenModal(false)}
          />
        </Modal>
      )}
    </>
  );
};
