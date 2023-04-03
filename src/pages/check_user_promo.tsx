import dynamic from 'next/dynamic';

import { usePromo } from '@/modules/check_user_promo/store';
import { promoState } from '@/modules/check_user_promo/types';
import Loading from "@/components/loading";
import Grid from '@mui/material/Grid';

const Form = dynamic(() => import('@/modules/check_user_promo/form'));
const TableData = dynamic(() => import('@/modules/check_user_promo/table'));

export default function CheckUserPromo() {
  console.log('render CheckUserPromo');

  const loading = usePromo((state: promoState) => state.loading);

  return (
    <Grid container spacing={3}>
      <Loading loading={loading}/>
      <Form />
      <TableData />
    </Grid>
  );
}
