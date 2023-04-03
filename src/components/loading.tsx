import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  loading: boolean;
}

export default function Loading({ loading }: Props) {

  return (
    <Backdrop open={loading} style={{ zIndex: 99, color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
