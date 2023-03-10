import { useMap, mapState, Form, Map } from "@/modules/map";
import Loading from "@/components/loading";
import Grid from '@mui/material/Grid';

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
