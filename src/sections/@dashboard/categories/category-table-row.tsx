import { useState } from 'react';
// @mui
import {
  Link,
  Stack,
  Button,
  Divider,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';

// utils
import { useLocales } from 'src/locales';
// components
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onListEmployeesRow: VoidFunction;
};

export default function CategoryTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  onListEmployeesRow,
}: Props) {
  const { translate } = useLocales();

  const { name, advantages, isStandard } = row;

  const { isEmployeeLoading } = useSelector((state) => state.categories);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} disabled={isStandard === true} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <div>
              <Typography variant="subtitle1" noWrap>
                <Link noWrap onClick={onViewRow} sx={{ color: 'text.primary', cursor: 'pointer' }}>
                  {name}
                </Link>
              </Typography>

              {isStandard && (
                <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
                  Standard
                </Typography>
              )}
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left" sx={{ display: 'flex' }}>
          {advantages?.length !== 0 ? (
            advantages?.map((row: any, index: number) => (
              <Typography key={row.id} variant="subtitle2">
                &nbsp;&nbsp;
                {index < advantages.length - 1
                  ? translate('advantagesConst.' + row.type) + ','
                  : translate('advantagesConst.' + row.type)}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle2">{translate('cagnotte.no_benefits')}</Typography>
          )}
        </TableCell>

        <TableCell align="right">
          <Tooltip title={translate('update')} placement="top" arrow onClick={onEditRow}>
            <IconButton color="default">
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="solar:hand-stars-bold" />

          {translate('Advantages')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onListEmployeesRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="mdi:users-group" />

          {translate('Employees')}
        </MenuItem>
        {!isStandard && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem
              onClick={() => {
                handleOpenConfirm();
                handleClosePopover();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="eva:trash-2-fill" />
              {translate('cagnotte.delete')}
            </MenuItem>
          </>
        )}
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('delete')}
        content={translate('cagnotte.Are_you_sure_to_delete')}
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={onDeleteRow}
            loading={isEmployeeLoading}
          >
            {translate('yes')}
          </LoadingButton>
        }
      />
    </>
  );
}
