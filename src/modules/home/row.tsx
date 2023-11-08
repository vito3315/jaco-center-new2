import { useHome } from './store';
import { homeState, CatItem } from './types';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

type RowProps = {
  type: string;
  item: CatItem;
};

export const Row = ({ item, type }: RowProps) => {
  //console.log('render Row', item);

  const [addToCart, minusToCart, delToCart, changeCount] = useHome((state: homeState) => [state.addToCart, state.minusToCart, state.delToCart, state.changeCount]);

  return (
    <TableRow hover style={item && item.count == 0 ? { display: 'none' } : {}}>
      <TableCell style={{ fontSize: '1rem' }}>{item.name}</TableCell>
      <TableCell style={{ textAlign: 'center', fontSize: '1rem' }}>
        {type == 'promo' ? (
          <Typography component="span" style={{ padding: '11px 0', display: 'block', fontSize: '1rem' }}>
            {item.count}
          </Typography>
        ) : (
          <div className={'root2'}>
            <RemoveIcon onClick={() => minusToCart(item.id)} style={{ cursor: 'pointer' }} />
            <form className={'root3'} noValidate autoComplete="off">
              <TextField variant="outlined" onChange={(event) => changeCount(event, item.id)} value={item.count}/>
            </form>
            <AddIcon onClick={() => addToCart(item.id)} style={{ cursor: 'pointer' }} />
          </div>
        )}
      </TableCell>
      <TableCell style={{ fontSize: '1rem' }}>{item.all_price}</TableCell>
      <TableCell style={{ fontSize: '1rem' }}>{item.new_one_price ? parseInt(item.one_price) * parseInt(item.count) - parseInt(item.new_one_price) * parseInt(item.count) : ''}</TableCell>
      <TableCell style={{ fontSize: '1rem' }}>{type !== 'promo' ? <CloseIcon style={{ cursor: 'pointer', marginTop: 5 }} onClick={() => delToCart(item.id)} /> : null}</TableCell>
    </TableRow>
  );
};
