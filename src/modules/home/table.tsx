import { shallow } from 'zustand/shallow';

import { useHome } from './store';
import { homeState, CatItem } from './types';

import { Row } from './row';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

export default function TableData() {
  console.log('render Table');

  // const [mainItems, setMainItems] = useState([]);
  // const [dopItems, setDopItems] = useState([]);
  // const [promoItems, setPromoItems] = useState([]);

  //const autorun = () => {
    // if( this._isMounted ){
    //   let my_cart = itemsStore.getItems();
    //   let all_items = itemsStore.getAllItems();
    //   let promoItems = itemsStore.getItemsPromo();
    //   let cartPromoItems = [];
    //   promoItems.map((item) => {
    //     let thisitem = all_items.find( (item_) => item_.id == item.item_id );
    //     if(thisitem){
    //       cartPromoItems.push({
    //         id: item.item_id,
    //         cat_id: thisitem.cat_id,
    //         name: thisitem.name,
    //         desc: thisitem.tmp_desc,
    //         count: item.count,
    //         all_price: item.all_price,
    //         img: thisitem.img_new,
    //         imgUpdate: thisitem.img_new_update,
    //       })
    //     }
    //   })
    //   let main_items = [],
    //       dop_items = [];
    //   if( all_items.length > 0 ){
    //     my_cart.map( (it) => {
    //       let cart_info = all_items.find( (item) => item.id == it.item_id );
    //       if( !cart_info ){
    //         alert('В корзине произошла ошибка');
    //       }
    //       if( cart_info && parseInt(cart_info.cat_id) == 7 ){
    //         dop_items.push( it );
    //       }else{
    //         main_items.push( it );
    //       }
    //     } )
    // setDopItems(dop_items);
    // setMainItems(main_items);
    // setPromoItems(cartPromoItems);
    //   }
    // }
  // };

  const [mainItems] = useHome((state: homeState) => [state.mainItems], shallow);

  return (
    <Grid item xs={8} style={{ paddingTop: 5 }}>
      <Paper style={{ width: '100%' }}>
        <TableContainer style={{ maxHeight: 420, overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Наименование</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Кол-во</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Скидка</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainItems.map((item: CatItem, key: number) => (
                <Row key={key} item={item} type="main" />
              ))}

              {/* {dopItems.map((item, key) => (
                <Row key={key} item={item} type="dop" />
              ))}

              {promoItems.map((item, key) => (
                <Row key={key} item={item} type="promo" />
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
}
