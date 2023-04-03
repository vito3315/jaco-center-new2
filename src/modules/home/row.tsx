import { useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

export default function Row({ item, type }: any) {
  console.log('render Row');

  const autorun = () => {
    // if( this._isMounted === true && this.state.item ){
    //   let my_cart = itemsStore.getItems();
    //   let promoItems = itemsStore.getItemsPromo();
    //   let this_item = my_cart.find( (item) => item.item_id == this.state.item.id );
    //   if( !this_item ){
    //     this_item = my_cart.find( (item) => item.item_id == this.state.item.item_id );
    //   }
    //   if( !this_item ){
    //     this_item = promoItems.find( (item) => item.item_id == this.state.item.id );
    //   }
    // item: this_item
    // }
  };

  useEffect(() => {
    autorun();
  }, []);

  const delItem = (item_id: any) => {
    // itemsStore.delItem(item_id)
  };

  const changeCount = (el: any) => {
    // let count = el.target.value,
    //     item_id = this.state.item.item_id;
    // if( count.length > 0 ){
    //   itemsStore.AddCountItem(item_id, count)
    //   this.lastType = this.state.type;
    // }
  };

  const add = () => {
    // itemsStore.AddItem(this.state.item.item_id);
    // this.lastType = this.state.type;
  };

  const minus = () => {
    // itemsStore.MinusItem(this.state.item.item_id);
    // this.lastType = this.state.type;
  };

  return (
    <TableRow hover style={item && item.count == 0 ? { display: 'none' } : {}}>
      <TableCell style={{ fontSize: '1rem' }}>{item.name}</TableCell>
      <TableCell style={{ textAlign: 'center', fontSize: '1rem' }}>
        {type == 'promo' ? (
          <Typography
            component="span"
            style={{ padding: '11px 0', display: 'block', fontSize: '1rem' }}
          >
            {item.count}
          </Typography>
        ) : (
          <div className={'root2'}>
            <RemoveIcon onClick={minus} style={{ cursor: 'pointer' }} />
            <form className={'root3'} noValidate autoComplete="off">
              <TextField
                variant="outlined"
                onChange={changeCount}
                value={item.count}
              />
            </form>
            <AddIcon onClick={add} style={{ cursor: 'pointer' }} />
          </div>
        )}
      </TableCell>
      <TableCell style={{ fontSize: '1rem' }}>{item.all_price}</TableCell>
      <TableCell style={{ fontSize: '1rem' }}>
        {item.new_one_price
          ? parseInt(item.one_price) * parseInt(item.count) -
            parseInt(item.new_one_price) * parseInt(item.count)
          : ''}
      </TableCell>
      <TableCell style={{ fontSize: '1rem' }}>
        {type !== 'promo' ? (
          <CloseIcon
            style={{ cursor: 'pointer', marginTop: 5 }}
            onClick={() => delItem(item.item_id)}
          />
        ) : null}
      </TableCell>
    </TableRow>
  );
}
