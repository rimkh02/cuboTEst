import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
// @mui
import * as Yup from 'yup';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Card,
  Typography,
  CardProps,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Alert,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
// utils
import { bgGradient } from '../../../utils/cssStyles';
// locales
import { useLocales } from 'src/locales';
import { yupResolver } from '@hookform/resolvers/yup';
// theme
import { ColorSchema } from '../../../theme/palette';
// components
import Image from '../../../components/image';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextField } from 'src/components/hook-form';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getInfoCompanyRequest, updateFacialValueRequest } from 'src/redux/slices/auth';
// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  src: string;
  color?: ColorSchema;
}
type FormValuesProps = {
  facialValue: number | null;
  coveragePercent: number | null;
};

export default function ItemAdvantageRepas({ title, src, color = 'primary', sx, ...other }: Props) {
  const theme = useTheme();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [openConfirmRepas, setOpenConfirmRepas] = useState(false);
  const { company, isLoading, configurations } = useSelector((state) => state.auth);

  const NewUserSchema = Yup.object().shape({
    facialValue: Yup.number()
      .required(translate('tax.face_value_is_required'))
      .typeError(translate('invalid_value'))
      .transform((value, originalValue) => {
        const trimmedValue =
          typeof originalValue === 'string' ? originalValue?.trim() : originalValue;
        return trimmedValue === '' ? null : value;
      })
      .nullable()
      .moreThan(0, translate('tax.Must_be_more'))
      .max(99, translate('tax.facial_value_must_be_less')),

    coveragePercent: Yup.number()
      .required(translate('tax.percent_is_required'))
      .typeError(translate('invalid_value'))
      .transform((value, originalValue) => {
        const trimmedValue =
          typeof originalValue === 'string' ? originalValue?.trim() : originalValue;
        return trimmedValue === '' ? null : value;
      })
      .nullable()
      //  .moreThan(0, translate('tax.Must_be_more'))
      .max(60, translate('tax.Must_be_less_than_percent'))
      .min(50, translate('tax.min_percent')),
  });

  const defaultValues = useMemo(
    () => ({
      facialValue: company?.ticketRestaurantFacialValue || null,
      coveragePercent: company?.ticketRestaurantFacialValueCoveragePercent || null,
    }),
    [company]
  );

  const methods = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { reset, handleSubmit, watch } = methods;

  const values = watch();

  const handleCloseConfirmRepas = () => {
    setOpenConfirmRepas(false);
    reset();
  };
  const handleOpenConfirmRepas = () => {
    setOpenConfirmRepas(true);
  };
  const onSubmit = async (data: FormValuesProps) => {
    dispatch(
      updateFacialValueRequest({
        data,
        translate,
        toast: enqueueSnackbar,
        onClose: handleCloseConfirmRepas,
      })
    );
  };

  useEffect(() => {
    if (company) {
      reset(defaultValues);
    }
  }, [company, defaultValues, reset]);

  useEffect(() => {
    dispatch(getInfoCompanyRequest());
  }, [dispatch]);

  return (
    <>
      <Card
        onClick={() => handleOpenConfirmRepas()}
        sx={{
          py: 5,
          boxShadow: 0,
          textAlign: 'center',
          cursor: 'pointer',
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
        {...other}
      >
        <Image
          src={src}
          sx={{
            mb: 3,
            p: 2.5,
            width: 80,
            height: 80,
            left: '37%',

            borderRadius: '50%',
            ...bgGradient({
              direction: '135deg',
              startColor: `${alpha(theme.palette[color].dark, 0)} 0%`,
              endColor: `${alpha(theme.palette[color].dark, 0.24)} 100%`,
            }),
          }}
        />

        <Typography variant="h6" sx={{ opacity: 0.64, cursor: 'pointer' }}>
          {title}
        </Typography>
      </Card>

      <Dialog open={openConfirmRepas} onClose={handleCloseConfirmRepas}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              autoFocus
              fullWidth
              //  type="number"
              name="facialValue"
              margin="dense"
              variant="outlined"
              label={translate('tax.face_value')}
            />
            <RHFTextField
              autoFocus
              fullWidth
              // type="number"
              margin="dense"
              variant="outlined"
              name="coveragePercent"
              label={translate('tax.percent')}
            />
            {(values.facialValue * values.coveragePercent) / 100 >
              configurations?.recommendedHighestTicketRestaurantEffectiveRefundValue && (
              <Alert severity="warning" sx={{ mt: 3 }}>
                {translate('tax.exceeded')} :
                {configurations?.recommendedHighestTicketRestaurantEffectiveRefundValue}
              </Alert>
            )}

            <Stack direction="row" spacing={3} sx={{ mb: 3, mt: 3 }} justifyContent="flex-end">
              <LoadingButton type="submit" variant="contained" loading={isLoading}>
                {translate('save')}
              </LoadingButton>
              <Button onClick={handleCloseConfirmRepas} color="inherit">
                {translate('Cancel')}
              </Button>
            </Stack>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
