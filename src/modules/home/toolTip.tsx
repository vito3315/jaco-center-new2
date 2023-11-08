import React, { useState } from 'react';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

type Props = {
  tmp_desc: string,
  info_weight: string,
}

export default function MyToolTip({ tmp_desc, info_weight }: Props) {
  //console.log('render MyToolTip');

  const [open, setOpen] = useState(false);

  return (
    <>
      {open === true ? (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Tooltip
            disableFocusListener
            disableHoverListener
            disableTouchListener
            PopperProps={{ disablePortal: true }}
            onClose={() => setOpen(false)}
            open={open}
            placement="top"
            style={{ position: 'absolute', top: 0, right: 0 }}
            title={
              <React.Fragment>
                <Typography color="inherit">{tmp_desc}</Typography>
                <Typography color="inherit">{info_weight}</Typography>
              </React.Fragment>
            }
          >
            <InfoIcon onClick={() => setOpen(true)} />
          </Tooltip>
        </ClickAwayListener>
      ) : (
        <Tooltip
          disableFocusListener
          disableHoverListener
          disableTouchListener
          PopperProps={{ disablePortal: true }}
          onClose={() => setOpen(false)}
          open={open}
          placement="top"
          style={{ position: 'absolute', top: 0, right: 0 }}
          title={
            <React.Fragment>
              <Typography color="inherit">{tmp_desc}</Typography>
              <Typography color="inherit">{info_weight}</Typography>
            </React.Fragment>
          }
        >
          <InfoIcon onClick={() => setOpen(true)} />
        </Tooltip>
      )}
    </>
  );
}
