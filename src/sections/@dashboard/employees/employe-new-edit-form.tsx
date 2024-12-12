import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import 'yup-phone';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// @types
import { TEmplyeeInfo } from 'src/@types/employee';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from '../../../components/hook-form';
import RHFTextFieldPhone from 'src/components/hook-form/RHTextFieldPhone';
// locales
import { useLocales } from 'src/locales';
// utils
import { DEFAULT_PHONE_CODE, REMOVE_COUNTRY_PATTERN } from 'src/utils/const';
//redux
import { useDispatch, useSelector } from 'src/redux/store';
import {
  createEmployeeRequest,
  editEmployeeRequest,
  editEmployeeWithoutCategoryRequest,
} from 'src/redux/slices/employee';
import { getAllCategoriesRequest } from 'src/redux/slices/categories';
// date
import 'dayjs/locale/fr';
import moment from 'moment';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentEmployee?: TEmplyeeInfo;
};

export default function EmployeeNewEditForm({ isEdit = false, currentEmployee }: Props) {
  const navigate = useNavigate();
  const { translate, currentLang } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { categories } = useSelector((state) => state.categories);
  const { isEmployeeLoading } = useSelector((state) => state.employee);
  const [onboardingDateOpen, setOnboardingDateOpen] = useState(false);
  const [startDateOpen, setStartDateOpenOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(translate('employee.first_name_required'))
      .max(20, translate('employee.firstName_max'))
      .matches(/^[a-zA-ZÀ-ÿ\s]+$/, translate('employee.firstName_alpha')),
    lastName: Yup.string()
      .required(translate('employee.last_name_required'))
      .max(20, translate('employee.lastName_max'))
      .matches(/^[a-zA-ZÀ-ÿ\s]+$/, translate('employee.lastName_alpha')),
    email: Yup.string()
      .required(translate('employee.email_required'))
      .email(translate('employee.mail_invalid'))
      .max(100, translate('employee.mail_invalid')),
    phone: Yup.string()
      .required(translate('employee.phone_required'))
      // .matches(/^((\+33|\+262)(\d{9}))$/, translate('employee.phone_invalid')),
      .matches(/^((\d{9}))$/, translate('employee.phone_invalid')),
    phoneCode: Yup.string().default(DEFAULT_PHONE_CODE),
    position: Yup.string()
      .required(translate('companies.position_required'))
      .max(40, translate('employee.position_max'))
      .min(2, translate('employee.position_min')),
    registrationNumber: Yup.string().max(20, translate('employee.identifier_max')),
    category: Yup.string().required(translate('employee.cagnotte_required')),
    /* title: Yup.string().required(translate('employee.contract.title_required')),
    onboardingDate: Yup.mixed<any>()
      .nullable()
      .required(translate('employee.contract.onboardingDate_required')),*/
    startDate: Yup.date().nullable().required(translate('employee.contract.startDate_required')),
    /* endDate: Yup.date()
      .nullable()
      .required(translate('employee.contract.endDate_required'))
      .when(['startDate'], (startDate, schema) =>
        schema.min(startDate, translate('employee.contract.endDateMin'))
      ),*/
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentEmployee?.employee?.firstName || '',
      lastName: currentEmployee?.employee?.lastName || '',
      email: currentEmployee?.employee?.email || '',
      position: currentEmployee?.contract?.position || '',
      category: currentEmployee?.contract?.categoryId || '',
      registrationNumber: currentEmployee?.contract?.registrationNumber || '',
      phone: currentEmployee?.employee?.phone.replace(REMOVE_COUNTRY_PATTERN, '') || '',
      phoneCode: currentEmployee?.employee?.phone
        ? currentEmployee?.employee?.phone.slice(
            0,
            currentEmployee.employee?.phone.length -
              currentEmployee.employee?.phone.replace(REMOVE_COUNTRY_PATTERN, '').length
          )
        : DEFAULT_PHONE_CODE,
      //  onboardingDate: currentEmployee?.contract?.onboardingDate || null,
      startDate: currentEmployee?.contract?.startDate || new Date(),
      //    endDate: currentEmployee?.contract?.endDate || null,
      //   title: currentEmployee?.contract?.title || '',
    }),
    [currentEmployee]
  );

  const methods = useForm({
    mode: 'all',

    reValidateMode: 'onChange',
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { watch, control } = methods;

  const watchedFields = watch();

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (isEdit && currentEmployee) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentEmployee]);

  const onSubmit = async (data: any) => {
    const dataContract = {
      // title: data.title,
      /* onboardingDate: moment(new Date(data.onboardingDate?.toString())).format(
        'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
      ), */
      startDate: moment(new Date(data.startDate?.toString())).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      // endDate: moment(new Date(data.endDate?.toString())).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      position: data.position,
      registrationNumber: data.registrationNumber,
    };
    if (!isEdit) {
      const newEmployee = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: `${data.phoneCode}${data.phone}`,
        position: data.position,
        assignedCategoryId: parseInt(data.category),
        registrationNumber: data.registrationNumber,
        startDate: moment(new Date(data.startDate?.toString())).format(
          'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        ),
      };

      dispatch(
        createEmployeeRequest({
          data: newEmployee,
          dataContract,
          navigate,
          translate,
          toast: enqueueSnackbar,
        })
      );
    } else {
      const dataToSend = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: `${data.phoneCode}${data.phone}`,
        position: data.position,
      };

      const isCategoryModified = () => {
        const defaultValue = defaultValues?.category;
        const watchedValue = watchedFields.category;
        return defaultValue !== watchedValue;
      };

      const contractModified =
        // defaultValues?.onboardingDate !== watchedFields.onboardingDate ||
        defaultValues?.startDate !== watchedFields.startDate ||
        // defaultValues?.endDate !== watchedFields.endDate // ||
        defaultValues?.position !== watchedFields.position ||
        defaultValues?.registrationNumber !== watchedFields.registrationNumber;
      //  defaultValues?.title !== watchedFields.title;

      isCategoryModified()
        ? dispatch(
            editEmployeeRequest({
              data: dataToSend,
              dataContract: contractModified ? dataContract : null,
              currentEmployee,
              navigate,
              translate,
              categoryId: data.category,
              toast: enqueueSnackbar,
            })
          )
        : dispatch(
            editEmployeeWithoutCategoryRequest({
              data: dataToSend,
              dataContract: contractModified ? dataContract : null,
              currentEmployee,
              navigate,
              translate,
              toast: enqueueSnackbar,
            })
          );
    }
  };

  useEffect(() => {
    dispatch(getAllCategoriesRequest({}));
  }, [dispatch]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 3 }}>
              {translate('employee.infos_employee')}
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="firstName"
                label={translate('employee.first_name')}
                placeholder="john"
              />
              <RHFTextField
                name="lastName"
                label={translate('employee.last_name')}
                placeholder="Durand"
              />
              <RHFTextField
                name="email"
                label={translate('Email')}
                placeholder="john@exemple.com"
              />
              {/*  <RHFTextField name="phone" label={translate('Phone')} placeholder="+33234567890" /> */}
              <RHFTextFieldPhone
                name="phone"
                label={translate('Phone')}
                itemName="phoneCode"
                type="phone"
                placeholder="234567890"
              />

              <RHFTextField
                name="position"
                label={translate('companies.position')}
                placeholder="DG"
              />
              <RHFTextField
                name="registrationNumber"
                label={translate('employee.identifier')}
                placeholder="ABC001"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang.value}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label={translate('employee.contract.startDate')}
                      inputFormat="DD/MM/YYYY"
                      disableFuture
                      //   minDate={new Date()}
                      open={startDateOpen}
                      onClose={() => setStartDateOpenOpen(false)}
                      renderInput={(params) => (
                        <TextField
                          size="medium"
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                          onClick={() => setStartDateOpenOpen(true)}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
              <RHFSelect
                fullWidth
                name="category"
                label={translate('cagnotte.cagnotte')}
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                {categories?.map((option: any) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                      '&:first-of-type': { mt: 0 },
                      '&:last-of-type': { mb: 0 },
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>

            {/*   <Typography variant="subtitle2" sx={{ color: 'text.secondary', mt: 3, mb: 3 }}>
              {translate('employee.infos_contract')}
            </Typography> <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="title"
                label={translate('employee.contract.title')}
                placeholder="john"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang.value}>
                <Controller
                  name="onboardingDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label={translate('employee.contract.onboardingDate')}
                      inputFormat="DD/MM/YYYY"
                      // minDate={new Date()}
                      open={onboardingDateOpen}
                      onClose={() => setOnboardingDateOpen(false)}
                      renderInput={(params) => (
                        <TextField
                          size="medium"
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                          onClick={() => setOnboardingDateOpen(true)}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang.value}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label={translate('employee.contract.startDate')}
                      inputFormat="DD/MM/YYYY"
                      //   minDate={new Date()}
                      open={startDateOpen}
                      onClose={() => setStartDateOpenOpen(false)}
                      renderInput={(params) => (
                        <TextField
                          size="medium"
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                          onClick={() => setStartDateOpenOpen(true)}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang.value}>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label={translate('employee.contract.endDate')}
                      inputFormat="DD/MM/YYYY"
                      // minDate={new Date()}
                      open={endDateOpen}
                      onClose={() => setEndDateOpen(false)}
                      renderInput={(params) => (
                        <TextField
                          size="medium"
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                          onClick={() => setEndDateOpen(true)}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box> */}
            <Stack spacing={3}>
              <Box sx={{ textAlign: 'right', mt: 3 }}>
                <Button
                  component={RouterLink}
                  to={PATH_DASHBOARD.employee.list}
                  variant="outlined"
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  {translate('Cancel')}
                </Button>
                <LoadingButton
                  disabled={!isDirty}
                  type="submit"
                  variant="contained"
                  loading={isEmployeeLoading}
                >
                  {translate('save')}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
