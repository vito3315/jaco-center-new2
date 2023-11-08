import { useAuth } from '@/modules/auth/store';
import { authState } from '@/modules/auth/types';

import Loading from '@/components/loading';
import Meta from '@/components/meta';
import Form from '@/modules/auth/form';

import Grid from '@mui/material/Grid';

export default function AuthPage() {
  const loading = useAuth((state: authState) => state.loading);

  return (
    <Meta title="Авторизация">
      <Grid container spacing={3}>
        <Loading loading={loading} />
        <Form />
      </Grid>
    </Meta>
  );
}
