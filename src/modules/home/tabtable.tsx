import { useHome } from './store';
import { homeState } from './types';

import Delivery from './delivery';
import Pickup from './pickup';
import ClientAddress from './clientAddress';
import Comment from './comment';
import Time from './time';
import PlaceOrder from './placeOrder'

import Grid from '@mui/material/Grid';

export default function TabTable() {
  //console.log('render TabTable');

  const [activeTab, all_addr, pic_point, clientAddr] = useHome((state: homeState) => [state.activeTab, state.all_addr, state.pic_point, state.clientAddr]);

  return (
    <Grid item xs={4} style={{ paddingTop: 5 }}>
      {activeTab == 0 ? all_addr.length > 0 ? <Delivery /> : null : null}
      {activeTab == 1 ? pic_point.length > 0 ? <Pickup /> : null : null}
      {activeTab == 2 ? clientAddr.length > 0 ? <ClientAddress /> : null : null}
      {(activeTab == 0 || activeTab == 2) && all_addr.length > 0 ? <Comment /> : null}
      <Time />
      <PlaceOrder />
    </Grid>
  );
}
