import { useMap } from '@/modules/map/store';
import { mapState } from '@/modules/map/types';

import Loading from '@/components/loading';
import Meta from '@/components/meta';
import Form from '@/modules/map/form';
import Map from '@/modules/map/map';

import Grid from '@mui/material/Grid';

export default function MapPage() {
  const loading = useMap((state: mapState) => state.loading);

  return (
    <Meta title="Карта">
      <Grid container spacing={3}>
        <Loading loading={loading} />
        <Form />
        <Map />
      </Grid>
    </Meta>
  );
}
