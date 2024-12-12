// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Button,
  Typography,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
// @types
import { TAccount } from 'src/@types/account';
// components
import Iconify from 'src/components/iconify';
// locales
import { useLocales } from 'src/locales';
// sections
import CollaboratorEditForm from '../collaborator/collaborator-edit-from';
import CollaboratorNewEditForm from '../collaborator/collaborator-new-edit-form';
// redux
import {
  deleteAccountRequest,
  disableAccountRequest,
  enableAccountRequest,
  getAllaccounts,
} from 'src/redux/slices/accounts';
import { useDispatch, useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

type Tcollab =
  | {
      firstName: string;
      lastName: string;
      poste: string;
      Phone: string;
      email: string;
      Accesslevel: string;
    }
  | any;

export default function Collabortors() {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { accounts, refresh, isLoading, isLoadingData } = useSelector((state) => state.accounts);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openConfirmUpdate, setOpenConfirmUpdate] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmDisable, setopenConfirmDisable] = useState(false);
  const [openConfirmEnable, setopenConfirmEnable] = useState(false);
  const [currentCollaborartor, setCurrentCollaborartor] = useState<Tcollab>({});

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenConfirmUpdate = (item: TAccount) => {
    setCurrentCollaborartor(item);
    setOpenConfirmUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenConfirmUpdate(false);
  };

  const handleOpenConfirmDelete = (item: TAccount) => {
    setCurrentCollaborartor(item);
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleOpenConfirmDisable = (item: TAccount) => {
    setCurrentCollaborartor(item);
    setopenConfirmDisable(true);
  };

  const handleCloseConfirmDisable = () => {
    setopenConfirmDisable(false);
  };

  const handleOpenConfirmEnable = (item: TAccount) => {
    setCurrentCollaborartor(item);
    setopenConfirmEnable(true);
  };

  const handleCloseConfirmEnable = () => {
    setopenConfirmEnable(false);
  };

  const onDelete = async () => {
    dispatch(
      deleteAccountRequest({
        isLoading: false,
        id: currentCollaborartor.id,
        toast: enqueueSnackbar,
        translate: translate,
        onClose: handleCloseConfirmDelete,
      })
    );
  };

  const onDescativate = async () => {
    dispatch(
      disableAccountRequest({
        isLoading: false,
        id: currentCollaborartor.id,
        toast: enqueueSnackbar,
        translate: translate,
        onClose: handleCloseConfirmDisable,
      })
    );
  };

  const onAtivate = async () => {
    dispatch(
      enableAccountRequest({
        isLoading: false,
        id: currentCollaborartor.id,
        toast: enqueueSnackbar,
        translate: translate,
        onClose: handleCloseConfirmEnable,
      })
    );
  };

  useEffect(() => {
    dispatch(getAllaccounts());
  }, [dispatch, refresh]);

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            {translate('settings.listcollaborators')}
          </Typography>
        </Stack>
        <Button size="small" onClick={handleOpenConfirm} sx={{ mb: 2 }}>
          <Iconify icon="eva:plus-fill" sx={{ mr: '5px' }} />
          {translate('settings.add_a_collaborator')}
        </Button>
        {isLoadingData ? (
          <Stack spacing={3} alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        ) : (
          <>
            {accounts?.filter((item: { id: any }) => item.id !== user?.id).length === 0 ? (
              <Paper
                sx={{
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" paragraph>
                  {translate('settings.no_collaborator')}
                </Typography>
              </Paper>
            ) : (
              <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
                {accounts
                  ?.filter((item: { id: any }) => item.id !== user?.id)
                  .map((item: TAccount) => (
                    <Stack spacing={1} key={item.id}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2">{item.accountType}</Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                          Address:
                        </Box>
                        {item.email}
                      </Typography>

                      <Typography variant="body2">
                        <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                          Phone:
                        </Box>
                        {(item.phone === null && translate('unassigned')) || item.phone}
                      </Typography>

                      <Stack direction="row" spacing={1}>
                        <Button
                          color="error"
                          size="small"
                          startIcon={<Iconify icon="eva:trash-2-outline" />}
                          onClick={() => handleOpenConfirmDelete(item)}
                        >
                          {translate('settings.action.delete')}
                        </Button>

                        <Button
                          size="small"
                          startIcon={<Iconify icon="eva:edit-fill" />}
                          onClick={() => handleOpenConfirmUpdate(item)}
                        >
                          {translate('settings.action.update')}
                        </Button>

                        {item.status === 'ACTIVE' ? (
                          <Button
                            color="warning"
                            size="small"
                            startIcon={<Iconify icon="fluent:presence-blocked-16-regular" />}
                            onClick={() => handleOpenConfirmDisable(item)}
                          >
                            {translate('settings.action.disable')}
                          </Button>
                        ) : (
                          <Button
                            color="warning"
                            size="small"
                            startIcon={<Iconify icon="mdi:account-check" />}
                            onClick={() => handleOpenConfirmEnable(item)}
                          >
                            {translate('employee.activate')}
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  ))}
              </Stack>
            )}
          </>
        )}
      </Card>
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>{translate('settings.add_a_collaborator')}</DialogTitle>
        <DialogContent>
          <CollaboratorNewEditForm onClose={() => handleCloseConfirm()} />
        </DialogContent>
      </Dialog>
      <Dialog open={openConfirmUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>{translate('settings.update_a_collaborator')}</DialogTitle>
        <DialogContent>
          <CollaboratorEditForm
            onClose={() => handleCloseUpdate()}
            isEdit
            currentCollaborartor={currentCollaborartor}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openConfirmDelete} onClose={handleCloseConfirmDelete}>
        <DialogTitle>{translate('settings.delete_a_collaborator')}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            <Box component="span" sx={{ color: 'text.secondary' }}>
              {translate('settings.descr_delete')}
            </Box>
          </Typography>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={isLoading} onClick={onDelete}>
            {translate('confirm')}
          </LoadingButton>
          <Button onClick={handleCloseConfirmDelete}>{translate('Cancel')}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openConfirmDisable} onClose={handleCloseConfirmDisable}>
        <DialogTitle>{translate('settings.desactivate_a_collaborator')}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            <Box component="span" sx={{ color: 'text.secondary' }}>
              {translate('settings.descr_disabe')}
            </Box>
          </Typography>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" onClick={onDescativate} loading={isLoading}>
            {translate('confirm')}
          </LoadingButton>
          <Button onClick={handleCloseConfirmDisable}>{translate('Cancel')}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openConfirmEnable} onClose={handleCloseConfirmEnable}>
        <DialogTitle>{translate('settings.activate_a_collaborator')}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            <Box component="span" sx={{ color: 'text.secondary' }}>
              {translate('settings.descr_enable')}
            </Box>
          </Typography>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" onClick={onAtivate} loading={isLoading}>
            {translate('confirm')}
          </LoadingButton>
          <Button onClick={handleCloseConfirmEnable}>{translate('Cancel')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
