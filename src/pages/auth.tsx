import dynamic from 'next/dynamic';

import { useAuth } from '@/modules/auth/store';
import { authState } from '@/modules/auth/types';
import Loading from "@/components/loading";
import Grid from '@mui/material/Grid';

const Form = dynamic(() => import('@/modules/auth/form'));

export default function Auth() {
  console.log('render Auth');

  const loading = useAuth((state: authState) => state.loading);

  return (
    <Grid container spacing={3}>
      <Loading loading={loading}/>
      <Form />
    </Grid>
  );
}
