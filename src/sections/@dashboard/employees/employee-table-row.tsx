import moment from 'moment';
import { useEffect, useState } from 'react';
// @mui
import {
  Stack,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { CustomAvatar } from 'src/components/custom-avatar';
import Label from 'src/components/label';
// utils
import { getLocalSession } from 'src/utils/local-sesson';
import { STATUS_EMPLOYEE } from 'src/utils/const';
// config
import { HOST_API_KEY } from 'src/config';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  // selected: boolean;
  onEditRow: VoidFunction;
  // onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onDesactivateRow: VoidFunction;
};

export default function EmployeeTableRow({
  row,
  // selected,
  onEditRow,
  // onSelectRow,
  onDeleteRow,
  onDesactivateRow,
}: Props) {
  const { translate } = useLocales();

  const { contract } = row;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [openConfirmDesactivate, setOpenConfirmDesactivate] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const token = getLocalSession();

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenConfirmDesactivate = () => {
    setOpenConfirmDesactivate(true);
  };

  const handleCloseConfirmDesactivate = () => {
    setOpenConfirmDesactivate(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenView = () => {
    setOpenViewDetails(true);
  };

  const handleCloseView = () => {
    setOpenViewDetails(false);
  };

  const fetchImage = async (id: any) => {
    const response = await fetch(HOST_API_KEY + '/employees/' + id + '/profile-photo', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await response.blob();
    return blob;
  };

  useEffect(() => {
    if (row?.hasPhoto) {
      fetchImage(row.id)
        .then((blob) => {
          if (
            blob.type === 'image/jpeg' ||
            blob.type === 'image/png' ||
            blob.type === 'image/jpg'
          ) {
            const fileToBase64 = URL.createObjectURL(blob);
            setPreviewImage(fileToBase64);
          }
        })
        .catch((err) => {
          console.log('Error Has Occurred fetching file:', err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row.id]);
  return (
    <>
      <TableRow hover>
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            {previewImage !== '' ? (
              <CustomAvatar src={previewImage} alt={row?.firstName} name={row?.firstName} />
            ) : (
              <CustomAvatar name={row.lastName} />
            )}

            <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
              {(row.lastName === '' && translate('unassigned')) || row.lastName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {(row.firstName === '' && translate('unassigned')) || row.firstName}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {((row.category?.name === '' || row.category === null) && translate('unassigned')) ||
            row.category?.name}
        </TableCell>

        <TableCell align="left" >
          <Stack direction="row" sx={{ alignContent:"center", alignItems:"center"}}>
          <Iconify
            icon="material-symbols:phone-android"
            sx={{
              width: 20,
              height: 20,
              color: 'Grey',
            }}
          />
          {(row.phone === '' && translate('unassigned')) || row.phone}
          </Stack>
         
        </TableCell>
        <TableCell align="left">
        <Stack direction="row" sx={{ alignContent:"center", alignItems:"center"}}>

          <Iconify
            icon="ic:outline-mark-email-unread"
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
            }}
          /> &nbsp;

          {((row.email === '' || row.email === null) && translate('unassigned')) || ' ' + row.email}
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Label
            variant="soft"
            color={
              (contract?.companyLinkingDisabled === false && 'success') ||
              (contract?.companyLinkingDisabled === true && 'warning') ||
              'default'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {(contract?.companyLinkingDisabled === false && translate('employee.active_status')) ||
              (contract?.companyLinkingDisabled === true && translate('employee.disable_status'))}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top">
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-2-outline" />
          {translate('edit')}
        </MenuItem>

        {!contract.companyLinkingDisabled ? (
          <MenuItem
            onClick={() => {
              handleOpenConfirmDesactivate();
              handleClosePopover();
            }}
            sx={{ color: 'warning.main' }}
          >
            <Iconify icon="eva:slash-fill" />
            {translate('employee.desactivate')}
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleOpenConfirmDesactivate();
              handleClosePopover();
            }}
            sx={{ color: 'info.main' }}
          >
            <Iconify icon="eva:person-done-outline" />
            {translate('employee.activate')}
          </MenuItem>
        )}
        {/*<MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          {translate('cagnotte.delete')}
        </MenuItem> */}
        <Divider />
        <MenuItem
          onClick={() => {
            handleOpenView();
            handleClosePopover();
          }}
        >
          <Iconify icon="mdi:eye-outline" />
          {translate('more_details')}
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('employee.delete_employee')}
        content={translate('employee.Are_you_sure_to_delete')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {translate('yes')}
          </Button>
        }
      />
      <ConfirmDialog
        open={openConfirmDesactivate}
        onClose={handleCloseConfirmDesactivate}
        title={translate('employee.deactivate_employee')}
        content={translate('employee.Are_you_sure_to_desactivate')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDesactivateRow();
              handleCloseConfirmDesactivate();
            }}
          >
            {translate('yes')}
          </Button>
        }
      />
      <ConfirmDialog
        open={openViewDetails}
        onClose={handleCloseView}
        // title={translate('employee.details_employee')}
        title=""
        content={
          <>
            <Typography variant="h6">Application</Typography>
            <>
              <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                sx={{ p: 1 }}
              >
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                  {translate('Status')}
                </Typography>

                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {(row.businessStatus === STATUS_EMPLOYEE.not_enrolled &&
                    translate('employee.employee_status.not_enrolled')) ||
                    (row.businessStatus === STATUS_EMPLOYEE.enrolled &&
                      translate('employee.employee_status.enrolled')) ||
                    (row.businessStatus === STATUS_EMPLOYEE.active &&
                      translate('employee.employee_status.active')) ||
                    translate('employee.employee_status.rejected')}
                </Typography>
              </Stack>
              <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                sx={{ p: 1 }}
              >
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                  {translate('employee.appLastLoginAt')}
                </Typography>

                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {row.appLastLoginAt !== null
                    ? moment(row.appLastLoginAt).format('DD/MM/YYYY')
                    : '---'}
                </Typography>
              </Stack>
              <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                sx={{ p: 1 }}
              >
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                  {translate('employee.appLastLoginVersion')}
                </Typography>

                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {row.appLastLoginVersion !== null ? row.appLastLoginVersion : '---'}
                </Typography>
              </Stack>
            </>
            {/*   <Typography variant="h6" sx={{ mt: 3 }}>
              Transactions
            </Typography>
            <Stack justifyContent="space-between" alignItems="center" direction="row" sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                Raison: Mariage
              </Typography>

              <Typography variant="body1">100 €</Typography>
            </Stack>
            <Typography variant="h6" sx={{ mt: 3 }}>
              {translate('categorie.advantages')}
            </Typography>
            <Stack justifyContent="space-between" alignItems="center" direction="row" sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                {translate('avantages.Culture')}
              </Typography>

              <Typography variant="body1">100 €</Typography>
            </Stack>
            <Stack justifyContent="space-between" alignItems="center" direction="row" sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                {translate('avantages.Sport')}
              </Typography>

              <Typography variant="body1">250 €</Typography>
            </Stack> */}
          </>
        }
        action={undefined}
      />
    </>
  );
}
