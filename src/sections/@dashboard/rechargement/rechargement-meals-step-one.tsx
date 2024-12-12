import { useEffect, useState } from 'react';
import moment from 'moment';
// @mui
import { Card, Button, Stack, TextField, Box } from '@mui/material';
import { LocalizationProvider, MobileDatePicker, PickersLocaleText } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/fr';
import 'dayjs/locale/en';
// routes
import FormProvider from 'src/components/hook-form/FormProvider';
// components
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// locales
import { defaultLang, useLocales } from 'src/locales';
import dayjs, { Dayjs } from 'dayjs';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { getAllCategoriesRequest } from 'src/redux/slices/categories';
// ----------------------------------------------------------------------

type Props = {
  rechargementData: any;
  onNextStep: VoidFunction;
  onAddMonth: (productId: string) => void;
};
export type FormValuesProps = {
  date: Date | null;
  cagnotte: null | string;
};

export default function FormStepOne({ rechargementData, onNextStep, onAddMonth }: Props) {
  const customEnLocaleText: Partial<PickersLocaleText<any>> = {
    okButtonLabel: 'Ok',
    cancelButtonLabel: 'Cancel',
  };

  const customFrLocaleText: Partial<PickersLocaleText<any>> = {
    okButtonLabel: 'Valider',
    cancelButtonLabel: 'Annuler',
  };

  const lng = localStorage.getItem('i18nextLng') || defaultLang.value;

  const { categories, refresh } = useSelector((state) => state.categories);
  var today = new Date();

  const [tableData, setCagnotteData] = useState(categories);

  const [date, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  });

  const { translate, currentLang } = useLocales();
  const FormSchema = Yup.object().shape({
    date: Yup.date()
      .nullable()
      .required(translate('tax.at_least_month'))
      .typeError(translate('invalid_value')),
    // cagnotte: Yup.string().required(translate('tax.at_least_cagnotte')),
  });

  const defaultValues = {
    date: null,
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    dispatch(getAllCategoriesRequest({}));
  }, [refresh]);

  useEffect(() => {
    if (categories?.length) {
      setCagnotteData(categories?.filter((item: { status: string }) => item?.status === 'ACTIVE'));
    }
  }, [categories]);

  const onSubmit = async (data: any) => {
    onAddMonth(data.date);
    onNextStep();
  };

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Stack flexGrow={1} spacing={3}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="date"
            //control={control}
            render={({ field, fieldState: { error } }) => (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={lng}
                localeText={currentLang.value === 'fr' ? customFrLocaleText : customEnLocaleText}
              >
                <MobileDatePicker
                  views={['month']}
                  {...field}
                  label={translate('tax.month')}
                  inputFormat="MMMM"
                  minDate={new Date(date.year + '-' + (date.month -1) + '-01')}
                  // maxDate={new Date(date.year + '-' + date.month + 2 + '-01')}
                  maxDate={moment(today).add(1, 'months').toDate()}
                  showToolbar={false}
                  closeOnSelect={true}
                  renderInput={(params) => (
                    <TextField
                      // onChange={handleChangeMouth}
                      onKeyDown={(event) => event.preventDefault()}
                      disabled={true}
                      fullWidth
                      {...params}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />

          <Stack spacing={3}>
            <Box sx={{ textAlign: 'right' }}>
              <Button sx={{ mt: 3 }} type="submit" variant="contained">
                {translate('next')}
              </Button>
            </Box>
          </Stack>
        </FormProvider>
      </Stack>
    </Card>
  );
}
