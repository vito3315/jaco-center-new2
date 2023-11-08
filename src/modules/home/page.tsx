import { useHome } from '@/modules/home/store';
import { homeState } from '@/modules/home/types';

import Loading from '@/components/loading';
import Meta from '@/components/meta';

import Form from '@/modules/home/form';
import TableData from '@/modules/home/table';
import TabTable from '@/modules/home/tabtable';
import Orders from '@/modules/home/orders';
import AllItems from '@/modules/home/allItems';
import ChooseAddress from '@/modules/home/chooseAddress';
import CheckClear from '@/modules/home/checkClear';
import ErrorData from '@/modules/home/error';
import OrderCheck from '@/modules/home/orderCheck';
import SnackBar from '@/modules/home/snackbar';

import Grid from '@mui/material/Grid';

export default function HomePage() {
  const loading = useHome((state: homeState) => state.loading);

  return (
    <Meta title="Оформление заказа">
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Loading loading={loading} />
          <Form />
          <TableData />
          <TabTable />
          <Orders />
          <AllItems />
          <ChooseAddress />
          <CheckClear />
          <ErrorData />
          <OrderCheck />
          <SnackBar />
        </Grid>
      </div>
    </Meta>
  );
}
