import { useState } from 'react';
// @mui
import {
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from '../../../components/iconify';
import { CustomAvatar } from '../../../components/custom-avatar';
import ConfirmDialog from '../../../components/confirm-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ListEmployeesCategoryTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { firstName, lastName, email, phone, category, contract } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const { translate } = useLocales();

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          {category?.isStandard === false && <Checkbox checked={selected} onClick={onSelectRow} />}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={firstName} />

            <div>
              <Typography variant="subtitle2" noWrap>
                {firstName}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {lastName}
              </Typography>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{(email === '' && translate('unassigned')) || email}</TableCell>

        <TableCell align="left">{(phone === '' && translate('unassigned')) || phone}</TableCell>

        <TableCell align="center">
          {((contract?.position === '' || contract?.position === null) &&
            translate('unassigned')) ||
            contract?.position}
        </TableCell>

        <TableCell align="center">{category?.name}</TableCell>

        <TableCell align="right">
          {category?.isStandard === false && (
            <IconButton
              color="error"
              title={translate('assign.unassign')}
              onClick={() => {
                handleOpenConfirm();
              }}
            >
              <Iconify icon="typcn:user-delete" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('assign.unassign_employee')}
        content={
          <>
            {translate('assign.you_sure_unassign_employees')}{' '}
            <strong> {firstName + ' ' + lastName} </strong> ?
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {translate('yes')}
          </Button>
        }
      />
    </>
  );
}
