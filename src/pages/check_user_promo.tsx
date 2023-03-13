import { usePromo, promoState, Form, TableData } from "@/modules/check_user_promo";
import Loading from "@/components/loading";
import Grid from '@mui/material/Grid';

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
