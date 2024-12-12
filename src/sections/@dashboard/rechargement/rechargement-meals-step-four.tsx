import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Card,
  Button,
  Stack,
  Typography,
  Grid,
  FormHelperText,
  Link,
  Dialog,
  Box,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
// components
import FormProvider, { RHFCheckbox } from '../../../components/hook-form';
import Iconify from 'src/components/iconify';
// locales
import useLocales from 'src/locales/useLocales';
// redux
import { ReloadTicketRestoRequest } from 'src/redux/slices/rechargement';
import { useDispatch, useSelector } from 'src/redux/store';
import { getInfoCompanyRequest } from 'src/redux/slices/auth';
import { useEffect, useState } from 'react';
// pdf
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// ----------------------------------------------------------------------

type Props = {
  rechargementData: any;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
};

export default function FormStepFour({ rechargementData, onNextStep, onBackStep }: Props) {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { linesToSend, total } = useSelector((state) => state.rechargement.rechargementData);
  const { isLoadingReloadTicketResto } = useSelector((state) => state.rechargement);
  const [open, setOpen] = useState(false);

  const { company } = useSelector((state) => state.auth);

  const FormSchema = Yup.object().shape({
    terms: Yup.boolean().oneOf([true], translate('rechargementPage.meals.terms_required')),
  });
  const defaultValues = {
    terms: false,
    bic: '',
    iban: '',
  };
  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = async (data: any) => {
    dispatch(
      ReloadTicketRestoRequest({
        data: linesToSend,
        onNextStep: onNextStep,
      })
    );
  };

  useEffect(() => {
    dispatch(getInfoCompanyRequest());
  }, [dispatch]);

  return (
    <>
      <Card
        sx={{
          mb: 3,
        }}
      >
        <Stack flexGrow={1} spacing={3}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Typography
                paragraph
                variant="h4"
                sx={{ whiteSpace: 'pre-line', pl: { xs: 3, md: 7 }, pt: 3, pr: { xs: 3, md: 7 } }}
              >
                {translate('rechargementPage.meals.title_payment')}
              </Typography>

              <Stack
                sx={{
                  padding: 3,
                  ml: { xs: 3, md: 7 },
                  mr: { xs: 3, md: 7 },
                  backgroundColor: 'rgba(0, 171, 85, 0.08)',
                  border: 'solid',
                  borderRadius: '8px',
                  borderColor: '#00AB55',
                  borderWidth: '0.1em',
                }}
              >
                <Typography paragraph variant="h6" sx={{ whiteSpace: 'pre-line', fontWeight: 700 }}>
                  {translate('rechargementPage.meals.bank_debit')}
                </Typography>
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  <Typography variant="body2">
                    {translate('rechargementPage.meals.reference')}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {company?.paymentInformations?.[0]?.mandateIdentifier}
                  </Typography>
                </Stack>
                <Typography
                  paragraph
                  variant="body1"
                  sx={{
                    whiteSpace: 'pre-line',
                    color: 'text.secondary',
                    mb: 1,
                  }}
                >
                  {translate('rechargementPage.meals.iban')}
                </Typography>
                <Stack
                  sx={{
                    padding: 2,
                    width: { xs: '100%', md: '60%' },
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography variant="body1">{company?.paymentInformations?.[0]?.iban}</Typography>
                </Stack>
                <Typography
                  paragraph
                  variant="body1"
                  sx={{ whiteSpace: 'pre-line', color: 'text.secondary', mb: 1, mt: 2 }}
                >
                  {translate('rechargementPage.meals.bic')}
                </Typography>
                <Stack
                  sx={{
                    padding: 2,
                    width: { xs: '100%', md: '60%' },
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography variant="body1">{company?.paymentInformations?.[0]?.bic}</Typography>
                </Stack>
                <Typography
                  paragraph
                  variant="body1"
                  sx={{ whiteSpace: 'pre-line', color: 'text.secondary', mb: 1, mt: 2 }}
                >
                  {translate('rechargementPage.meals.Signing')}
                </Typography>
                <Stack
                  sx={{
                    padding: 2,
                    width: { xs: '100%', md: '60%' },
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography variant="body1">
                    {company?.paymentInformations?.[0]?.signatory}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={'space-between'}
                sx={{ mt: 3, mb: 3, ml: 3 }}
              >
                <Button
                  size="small"
                  color="inherit"
                  onClick={onBackStep}
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                >
                  {translate('back')}
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack
                flexGrow={1}
                justifyContent="center"
                alignItems="center"
                sx={{
                  p: 3,
                  backgroundColor: '#F4F6F8',
                  height: '100%',
                  width: '100%',
                }}
              >
                <Stack
                  sx={{
                    padding: 2,
                    backgroundColor: '#fff',
                    border: 'dashed',
                    borderRadius: '8px',
                    borderColor: '#00AB55',
                    borderWidth: '0.12em',
                  }}
                >
                  <Typography
                    paragraph
                    variant="h6"
                    sx={{ whiteSpace: 'pre-line', textAlign: 'center' }}
                  >
                    {translate('rechargementPage.meals.summaryoredr')}
                  </Typography>
                  <Stack sx={{ flexDirection: 'row' }}>
                    <Stack
                      sx={{
                        textAlign: 'left',
                        width: '70%',
                      }}
                    >
                      <Typography
                        paragraph
                        variant="body1"
                        sx={{ whiteSpace: 'pre-line', mb: 0, fontWeight: 400 }}
                      >
                        {translate('rechargementPage.meals.reloads')}
                      </Typography>
                    </Stack>
                    <Stack
                      alignItems="flex-end"
                      sx={{
                        width: '30%',
                      }}
                    >
                      <Typography paragraph variant="h6" sx={{ whiteSpace: 'pre-line', mb: 0 }}>
                        {total}€
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography
                    paragraph
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-line',
                      color: 'text.secondary',
                      mb: 0,
                      textAlign: 'left',
                    }}
                  >
                    {translate('rechargementPage.meals.not_tva')}
                    {translate('rechargementPage.meals.tva')}
                  </Typography>

                  <Stack sx={{ flexDirection: 'row', mt: 3 }}>
                    <Stack
                      sx={{
                        textAlign: 'left',
                        width: '70%',
                      }}
                    >
                      <Typography
                        paragraph
                        variant="h5"
                        sx={{
                          whiteSpace: 'pre-line',
                          mb: 1,
                          fontWeight: 700,
                          color: 'primary.main',
                        }}
                      >
                        {translate('rechargementPage.meals.total')}
                      </Typography>
                    </Stack>
                    <Stack
                      alignItems="flex-end"
                      sx={{
                        width: '30%',
                      }}
                    >
                      <Typography
                        paragraph
                        variant="h5"
                        sx={{
                          whiteSpace: 'pre-line',
                          mb: 1,
                          fontWeight: 700,
                          color: 'primary.main',
                          flex: 'dispay',
                        }}
                      >
                        {total}€
                      </Typography>
                    </Stack>
                  </Stack>
                  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <RHFCheckbox
                      name="terms"
                      label={<>{translate('rechargementPage.meals.accept')}</>}
                    />
                    <Link
                      onClick={() => setOpen(true)}
                      sx={{ color: '#212B36', fontWeight: '500', cursor: 'pointer' }}
                    >
                      {translate('rechargementPage.meals.accept_link')}
                    </Link>
                    {errors.terms && (
                      <FormHelperText sx={{ px: 2 }} error>
                        {errors.terms.message}
                      </FormHelperText>
                    )}
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 3 }}
                      fullWidth
                      loading={isLoadingReloadTicketResto}
                      disabled={!methods.formState.isValid}
                    >
                      {translate('rechargementPage.meals.finale')}
                    </LoadingButton>
                  </FormProvider>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Card>
      <Dialog fullScreen open={open} sx={{ mt: 5, mb: 5, ml: 8, mr: 8 }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={() => setOpen(false)}>
                <Iconify icon="eva:close-fill" width={40} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>
            <Worker workerUrl="/pdf.worker.js">
              <Viewer fileUrl="/assets/document/CGUSWEWawashi.pdf" />
            </Worker>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
