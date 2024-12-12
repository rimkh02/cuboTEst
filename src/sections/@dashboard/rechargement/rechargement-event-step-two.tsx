/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Button, Card, Stack, Box, Divider, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import FormProvider, { RHFSelect, RHFTextField } from '../../../components/hook-form';
// locales
import { useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { nextStepEvent, backStepEvent, ReloadEventRequest } from 'src/redux/slices/rechargement';

// ----------------------------------------------------------------------

export default function StepTwo() {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.rechargement.rechargementEvent);
  const { isLoadingEvent } = useSelector((state) => state.rechargement);

  const EVENEMENT_OPTIONS = [
    { id: 1, name: 'Naissance', label: translate('EVENEMENT_OPTIONS.Birth') },
    { id: 2, name: 'Adoption', label: translate('EVENEMENT_OPTIONS.Adoption') },
    { id: 3, name: 'Mariage', label: translate('EVENEMENT_OPTIONS.Wedding') },
    { id: 4, name: 'Le Pacs', label: translate('EVENEMENT_OPTIONS.Le_Pacs') },
    { id: 5, name: 'Départ à la retraitre', label: translate('EVENEMENT_OPTIONS.Retirement') },
    { id: 6, name: 'la fête des mères', label: translate('EVENEMENT_OPTIONS.mother_day') },
    { id: 7, name: 'la fête des pères', label: translate('EVENEMENT_OPTIONS.father_day') },
    { id: 8, name: 'sainte catherine', label: translate('EVENEMENT_OPTIONS.saint_catherine') },
    { id: 9, name: 'la saint nicolas', label: translate('EVENEMENT_OPTIONS.the_saint_nicholas') },
    { id: 10, name: 'Noël', label: translate('EVENEMENT_OPTIONS.Christmas') },
    { id: 11, name: 'la rentrée scolaire', label: translate('EVENEMENT_OPTIONS.back_to_school') },
  ];

  const PaymentSchema = Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        event: Yup.string().required(translate('rechargementPage.event.event_required')),
        quantity: Yup.number()
          .required(translate('rechargementPage.event.quantity'))
          .typeError(translate('invalid_value'))
          .min(1, translate('rechargementPage.event.quantity_more_than'))
          .max(1000, translate('rechargementPage.event.value_less_than')),
        value: Yup.number()
          .required(translate('rechargementPage.event.value'))
          .typeError(translate('invalid_value'))
          .min(1, translate('rechargementPage.event.value_more_than'))
          .max(1000, translate('rechargementPage.event.value_less_than')),
      })
    ),
  });

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(PaymentSchema),
  });

  const { watch, setValue, trigger, handleSubmit } = methods;

  const values = watch();

  const handleChangeQuantity = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      setValue(`items[${index}].quantity`, event.target.value);
      trigger(`items[${index}].quantity`);

      setValue(
        `items[${index}].total`,
        values.items.map((item: any) =>
          item.quantity * item.value ? item.quantity * item.value : ''
        )[index]
      );
    },
    [setValue, values.items]
  );
  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      setValue(`items[${index}].value`, event.target.value);
      trigger(`items[${index}].value`);
      setValue(
        `items[${index}].total`,
        values.items.map((item: any) =>
          item.quantity * item.value ? item.quantity * item.value : ''
        )[index]
      );
    },
    [setValue, values.items]
  );

  const handleNextStep = () => {
    dispatch(nextStepEvent());
  };

  const handleBackStep = () => {
    dispatch(backStepEvent());
  };

  const onSubmit = async (data: any) => {
    let dataToSend: {
      forAdvantageType: string;
      lines: { forEmployeeContractId: number; amount: number; reason: string }[];
    } = {
      forAdvantageType: 'GIFT',
      lines: [],
    };

    for (let i = 0; i < data.items.length; i++) {
      let item = {
        forEmployeeContractId: employees[i].contract?.id,
        amount: data.items[i].total,
        reason: data.items[i].event,
      };
      dataToSend.lines.push(item);
    }
    dispatch(
      ReloadEventRequest({
        data: dataToSend,
        onNextStep: handleNextStep,
      })
    );
  };

  return (
    <Card sx={{ pt: 3, pr: 3, pl: 3 }}>
      <Stack flexGrow={1} spacing={3}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                {employees?.map((row: any, index: any) => (
                  <Stack key={row.id}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          minWidth: { md: 160 },
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                          {row.firstName + ' ' + row.lastName}
                        </Typography>
                      </Box>
                      <RHFSelect
                        name={`items[${index}].event`}
                        label={translate('rechargementPage.event.Event')}
                        size="small"
                      >
                        <option value="" />
                        {EVENEMENT_OPTIONS.map((option) => (
                          <option key={option.id} value={option.name}>
                            {option.label}
                          </option>
                        ))}
                      </RHFSelect>

                      <RHFTextField
                        name={`items[${index}].quantity`}
                        label={translate('rechargementPage.event.quantity_field')}
                        // type="number"
                        size="small"
                        placeholder={translate('tax.writing')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(event) => handleChangeQuantity(event, index)}
                      />

                      <RHFTextField
                        name={`items[${index}].value`}
                        label={translate('rechargementPage.event.value_field')}
                        // type="number"
                        size="small"
                        placeholder={translate('tax.writing')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(event) => handleChangeValue(event, index)}
                      />

                      <RHFTextField
                        name={`items[${index}].total`}
                        label="total"
                        //   type="number"
                        size="small"
                        disabled
                        placeholder={translate('total')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Stack>
                  </Stack>
                ))}
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
                  onClick={handleBackStep}
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                >
                  {translate('back')}
                </Button>

                <LoadingButton
                  loading={isLoadingEvent}
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  {translate('next')}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
          .
        </FormProvider>
      </Stack>
    </Card>
  );
}
