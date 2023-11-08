import { useHome } from './store';
import { homeState, PicPoint } from './types';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Pickup() {
  //console.log('render Pickup');

  const [pic_point, choosePic, orderPic] = useHome((state: homeState) => [state.pic_point, state.choosePic, state.orderPic]);

  return (
    <Grid container direction="column" spacing={0}>
      {/* самовывоз */}
      {pic_point.map((item: PicPoint, key: number) => (
        <Grid item xs={12} key={key}>
          <Button onClick={() => choosePic(item, true)} style={{ backgroundColor: orderPic == item.id ? '#6ab04c' : '#e5e5e5', color: orderPic == item.id ? '#fff' : '#000'}} className="boxPic">
            {item.addr}
          </Button>
        </Grid>
      ))}
      {/* /самовывоз/ */}
    </Grid>
  );
}
