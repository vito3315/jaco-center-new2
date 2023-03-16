import dynamic from 'next/dynamic';

import { useMap, mapState } from "@/modules/map";
import Loading from "@/components/loading";
import Grid from '@mui/material/Grid';

const Form = dynamic(() => import('@/modules/map/form'));
const Map = dynamic(() => import('@/modules/map/map'));

export default function MapPages() {
  console.log('render MapPages');

  const loading = useMap((state: mapState) => state.loading);

  return (
    <Grid container spacing={3}>
      <Loading loading={loading}/>
      <Form />
      <Map />
    </Grid>
  );
}
