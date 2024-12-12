/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useMemo } from 'react';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';
import Iconify from '../../../components/iconify';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// locales
import { useLocales } from 'src/locales';
// utils
import { ADVANTAGE_TYPE } from 'src/utils/const';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import {
  backStepEncouragement,
  nextStepEncouragement,
  ReloadEncouragementRequest,
} from 'src/redux/slices/rechargement';

// ----------------------------------------------------------------------

export default function Advantages() {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { cagnottes } = useSelector((state) => state.rechargement.rechargementEncouragement);
  const { isLoadingReloadEncouragement } = useSelector((state) => state.rechargement);

  const defaultValues = useMemo(() => {
    const defaultAdvantages = cagnottes?.advantages
      ?.filter(
        (advantage: any) =>
          advantage?.type !== ADVANTAGE_TYPE.restaurant && advantage?.type !== ADVANTAGE_TYPE.gift
      )
      .map((advantage: any) => ({
        id: cagnottes?.id,
        forAdvantageType: advantage?.type,
        amountPerEmployee: null,
      }));

    return { advantages: defaultAdvantages };
  }, [cagnottes]);

  const NewUserSchema = Yup.object().shape({
    advantages: Yup.array().of(
      Yup.object().shape({
        amountPerEmployee: Yup.number()
          //  .required(translate('cagnotte.amount_requerd'))
          .typeError(translate('invalid_value'))
          .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value))
          .nullable()
          .moreThan(0, translate('cagnotte.Must_be_more_than'))
          .max(10000, translate('cagnotte.Must_be_less_than')),
      })
    ),
  });
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  const values = watch();

  const handleBackStep = () => {
    dispatch(backStepEncouragement());
  };
  const handleNextStep = () => {
    dispatch(nextStepEncouragement());
  };

  const onSubmit = async (data: any) => {
    const dataTosend: any = [];
    for (let i = 0; i < values.advantages.length; i++) {
      // if (data.advantages[i].amountPerEmployee !== null) {
      if (
        data.advantages[i].amountPerEmployee !== null &&
        data.advantages[i].amountPerEmployee !== ''
      ) {
        let line = {
          forCategoryId: cagnottes?.id,
          forAdvantageType: data.advantages[i].forAdvantageType,
          amountPerEmployee: parseInt(data.advantages[i].amountPerEmployee),
        };
        dataTosend.push(line);
      }
    }

    dataTosend.length !== 0
      ? dispatch(
          ReloadEncouragementRequest({
            data: dataTosend,
            onNextStep: handleNextStep,
          })
        )
      : enqueueSnackbar(translate('rechargementPage.fields.advantage_required_event'), {
          variant: 'error',
        });
  };
  return (
    <Box>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        {translate('Advantages')}
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          {cagnottes?.advantages?.filter(
            (adv: any) =>
              adv?.type !== ADVANTAGE_TYPE.restaurant && adv?.type !== ADVANTAGE_TYPE.gift
          ).length === 0 ? (
            <Typography variant="h5" alignSelf="center">
              {translate('cagnotte.no_benefits')}
            </Typography>
          ) : (
            <>
              {cagnottes?.advantages
                ?.filter(
                  (advantage: any) =>
                    advantage?.type !== ADVANTAGE_TYPE.restaurant &&
                    advantage?.type !== ADVANTAGE_TYPE.gift
                )
                .map((item: any, index: any) => (
                  <Stack key={item.id}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                      <RHFTextField
                        size="small"
                        name={`advantages[${index}].forAdvantageType`}
                        disabled
                      />
                      <RHFTextField
                        size="small"
                        //  type="number"
                        label={translate('cagnotte.amount')}
                        name={`advantages[${index}].amountPerEmployee`}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />
                    </Stack>
                  </Stack>
                ))}
            </>
          )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          justifyContent={'space-between'}
          sx={{ mt: 3 }}
        >
          <Button
            size="small"
            color="inherit"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            onClick={handleBackStep}
          >
            {translate('back')}
          </Button>
          <Box sx={{ textAlign: 'right' }}>
            <LoadingButton
              loading={isLoadingReloadEncouragement}
              type="submit"
              variant="contained"
              disabled={cagnottes?.advantages.length === 0}
            >
              {translate('next')}
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Box>
  );
}
