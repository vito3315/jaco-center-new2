import { usePromo } from '@/modules/check_user_promo/store';
import { promoState } from '@/modules/check_user_promo/types';

import Loading from '@/components/loading';
import Meta from '@/components/meta';
import Form from '@/modules/check_user_promo/form';
import TableData from '@/modules/check_user_promo/table';

import Grid from '@mui/material/Grid';

export default function CheckUserPromoPage() {
  const loading = usePromo((state: promoState) => state.loading);

  return (
    <Meta title="Проверка промокода клиента">
      <Grid container spacing={3}>
        <Loading loading={loading} />
        <Form />
        <TableData />
      </Grid>
    </Meta>
  );
}
