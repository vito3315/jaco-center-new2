'use client';

import { useOrders, ordersState } from './store';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  const loading = useOrders((state: ordersState) => state.loading);

  return (
    <Backdrop open={loading} style={{ zIndex: 99, color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
