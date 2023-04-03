import { shallow } from 'zustand/shallow';

import { useHome } from './store';
import { homeState } from './types';
import { MyTextInput } from '@/ui';

import Grid from '@mui/material/Grid';

export default function Comment() {
  console.log('render Comment');

  const [comment, sdacha, changeComment, changeSdacha] = useHome((state: homeState) => [state.comment, state.sdacha, state.changeComment, state.changeSdacha], shallow);

  return (
    <Grid container spacing={2} marginTop={0}>
      <Grid item xs={12}>
        <MyTextInput
          multiline={true}
          maxRows={2}
          value={comment}
          func={changeComment}
          label="Комментарий курьеру"
        />
      </Grid>
      <Grid item xs={4}>
        <MyTextInput
          type="number"
          value={sdacha}
          func={changeSdacha}
          label="Сдача"
        />
      </Grid>
    </Grid>
  );
}
