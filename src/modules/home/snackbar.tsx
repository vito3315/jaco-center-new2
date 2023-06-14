
import { shallow } from 'zustand/shallow';

import { useHome } from './store';
import { homeState } from './types';

import { MyAlert } from '@/ui';

export default function SnackBar() {
  console.log('render SnackBar');

  const [openAlert, status, text, closeAlert] = useHome((state: homeState) => [state.openAlert, state.status, state.text, state.closeAlert], shallow);

  return (
    <MyAlert
      isOpen={openAlert}
      onClose={(closeAlert)}
      status={status}
      text={text}
      location={true}
    />
  );
}
