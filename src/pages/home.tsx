import dynamic from 'next/dynamic';

import { useHome } from '@/modules/home/store';
import { homeState } from '@/modules/home/types';
import Loading from '@/components/loading';
import Grid from '@mui/material/Grid';

const Form = dynamic(() => import('@/modules/home/form'));
const TableData = dynamic(() => import('@/modules/home/table'));
const TabTable = dynamic(() => import('@/modules/home/tabtable'));
const Orders = dynamic(() => import('@/modules/home/orders'));
const AllItems = dynamic(() => import('@/modules/home/allItems'));
const ChooseAddress = dynamic(() => import('@/modules/home/chooseAddress'));
const CheckClear = dynamic(() => import('@/modules/home/checkClear'));
const ErrorData = dynamic(() => import('@/modules/home/error'));
const OrderCheck = dynamic(() => import('@/modules/home/orderCheck'));
const SnackBar = dynamic(() => import('@/modules/home/snackbar'));

export default function Home() {
  console.log('render Home');

  const loading = useHome((state: homeState) => state.loading);

  return (
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
  );
}
