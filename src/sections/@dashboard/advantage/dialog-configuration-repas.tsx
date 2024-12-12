// @mui
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// locales
import { useLocales } from 'src/locales';
// components
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextField } from 'src/components/hook-form';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getInfoCompanyRequest, updateFacialValueRequest } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------

type FormValuesProps = {
  facialValue: number | null;
  coveragePercent: number | null;
};
export type Props = {
  open: boolean;
  onClose: VoidFunction;
  accessToReloadMeals?: boolean;
};

export default function MadalConfigurationRepas({ open, onClose, accessToReloadMeals }: Props) {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { configurations } = useSelector((state) => state.auth);

  const NewUserSchema = Yup.object().shape({
    facialValue: Yup.number()
      .nullable()
      .moreThan(0, translate('tax.Must_be_more'))
      .typeError(translate('tax.face_value_is_required'))
      .required(translate('tax.face_value_is_required'))
      .max(99, translate('tax.Must_be_less_than_tax_value')),
    coveragePercent: Yup.number()
      .nullable()
      .moreThan(0, translate('tax.Must_be_more'))
      .typeError(translate('tax.percent_is_required'))
      .required(translate('tax.percent_is_required'))
      .max(60, translate('tax.Must_be_less_than_percent'))
      .min(50, translate('tax.min_percent')),
  });

  const defaultValues = {
    facialValue: null,
    coveragePercent: null,
  };

  const methods = useForm({
    reValidateMode: 'onChange',
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const handleCloseConfirmRepas = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: FormValuesProps) => {
    dispatch(
      updateFacialValueRequest({
        data,
        translate,
        toast: enqueueSnackbar,
        onClose,
        reset,
      })
    );
  };

  useEffect(() => {
    dispatch(getInfoCompanyRequest());
  }, [dispatch]);

  return (
    <>
      <Dialog open={open} onClose={handleCloseConfirmRepas}>
        <DialogTitle>{translate('tax.title')}</DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {accessToReloadMeals && (
              <Typography variant="body1" sx={{ color: 'text.disabled', mb: 2, mt: 0 }}>
                {translate('rechargementPage.meals.no_acces')}
              </Typography>
            )}
            <RHFTextField
              autoFocus
              fullWidth
              type="number"
              name="facialValue"
              margin="dense"
              variant="outlined"
              label={translate('tax.face_value')}
            />
            <RHFTextField
              autoFocus
              fullWidth
              type="number"
              margin="dense"
              variant="outlined"
              name="coveragePercent"
              label={translate('tax.percent')}
            />
            {(values?.facialValue! * values?.coveragePercent!) / 100 >
              configurations?.recommendedHighestTicketRestaurantEffectiveRefundValue && (
              <Alert severity="warning" sx={{ mt: 3 }}>
                {translate('tax.exceeded')} :
                {configurations?.recommendedHighestTicketRestaurantEffectiveRefundValue}
              </Alert>
            )}
            <DialogActions>
              <Button onClick={handleCloseConfirmRepas} color="inherit">
                {translate('Cancel')}
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {translate('save')}
              </LoadingButton>
            </DialogActions>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </>
  );
}
