import Grid from '@mui/material/Grid';

export default function Map() {
  //console.log('render Map');

  return (
   <Grid item xs={12} >
      <div style={{ width: '100%', height: 650, marginRight: 12, backgroundColor: '#e5e5e5' }} id="ForMap" />
    </Grid>
  );
}
