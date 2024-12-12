import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
// utils
import 'yup-phone';
// @types
import { TEmployee } from 'src/@types/employee';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
  RHFUploadFileExcel,
} from '../../../components/hook-form';
// locales
import { useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { addEmployeesRequest } from 'src/redux/slices/employee';
import { getAllCategoriesRequest } from 'src/redux/slices/categories';
import Iconify from 'src/components/iconify';

import { countries } from 'src/assets/data';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentEmployee?: TEmployee;
  onClose: VoidFunction;
};

export default function EmployeeImportForm({ isEdit = false, currentEmployee, onClose }: Props) {
  // const navigate = useNavigate();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isEmployeeLoading, importEmployees } = useSelector((state) => state.employee);
  const { categories } = useSelector((state) => state.categories);

  const [step, setStep] = useState(0);
  const { currentLang } = useLocales();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');

  const dataFiltered =
    search !== ''
      ? countries.filter(
          (el) =>
            el.labelFr.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            el.labelEn.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      : countries;

  const NewUserSchema = Yup.object().shape({
    singleUpload: Yup.mixed<any>().nullable().required(translate('errors.select_a_file')),
    category: Yup.string().required(translate('employee.cagnotte_required')),
    // phoneCode: Yup.string()
    // .default(DEFAULT_PHONE_CODE)
    // .required(translate('employee.cagnotte_required')),
    phoneCode: Yup.mixed<any>().required(translate('employee.formImport.errors.phoneNumberPrefix')),
  });

  const defaultValues = {
    //  phoneCode: DEFAULT_PHONE_CODE,
    phoneCode: {
      id: '1',
      code: 'FR',
      labelEn: 'France',
      labelFr: 'France',
      phone: '+33',
      suggested: true,
    },
    singleUpload: null,
    category: '',
  };

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = methods;

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('singleUpload', newFile as any, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('csvFile', data.singleUpload);
    formData.append('phoneNumberPrefix', data.phoneCode.phone.slice(1));
    formData.append('assignedCategoryId', data.category);

    dispatch(
      addEmployeesRequest({
        data: formData,
        translate,
        toast: enqueueSnackbar,
        onClose: onClose,
        next: () => setStep(1),
      })
    );
  };

  useEffect(() => {
    dispatch(getAllCategoriesRequest({}));
  }, [dispatch]);

  return (
    <>
      {step === 0 ? (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={3}>
            <Grid item xs={12} md={8}>
              <RHFSelect
                sx={{ mt: 1 }}
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

              <RHFAutocomplete
                // loading={isDoctorLoading}
                sx={{ mt: 3, mb: 3 }}
                name="phoneCode"
                // label={translate('employee.formImport.fields.phoneNumberPrefix')}
                //  autoHighlight
                onChange={(event, newValue) => {
                  setValue('phoneCode', newValue as any);
                  trigger('phoneCode');
                  setSelected(newValue as any);
                }}
                options={dataFiltered}
                getOptionLabel={(option: any) => option.phone}
                isOptionEqualToValue={(option, value) => option?.phone === value?.phone}
                renderOption={(props, option) => (
                  <li {...props} key={option?.id}>
                    <Stack spacing={1} direction="row" alignItems="center">
                      <Iconify
                        icon={`circle-flags:${option?.code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {currentLang.value === 'fr' ? option?.labelFr : option.phone}
                      &nbsp;
                      {option?.phone}
                    </Stack>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    helperText={
                      errors.phoneCode && translate('employee.formImport.errors.phoneNumberPrefix')
                    }
                    error={!!errors.phoneCode}
                    {...params}
                    label={translate('employee.formImport.fields.phoneNumberPrefix')}
                  />
                )}
              />

              {/* <RHFPrefixPhone
                sx={{ mt: 3, mb: 3 }}
                name="phone"
                label={translate('employee.formImport.fields.phoneNumberPrefix')}
                itemName="phoneCode"
                type="phone"
                disabled

                // placeholder="234567890"
              /> */}

              <RHFUploadFileExcel
                name="singleUpload"
                // maxSize={3145728}
                onDrop={handleDropSingleFile}
                onDelete={() => setValue('singleUpload', null, { shouldValidate: true })}
              />
              <FormHelperText sx={{ mt: 2, px: 1, alignItems: 'center', alignContent: 'center' }}>
                <Iconify icon="ep:warning-filled" width={15} />

                {translate('employee.formImport.helperUpload')}
              </FormHelperText>
              <Stack spacing={3}>
                <Box sx={{ textAlign: 'right', mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    sx={{ mr: 1 }}
                    variant="contained"
                    loading={isEmployeeLoading}
                  >
                    {translate('save')}
                  </LoadingButton>

                  <Button onClick={() => onClose()} variant="outlined" color="inherit">
                    {translate('Cancel')}
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      ) : (
        <>
          {/* importEmployees?.skippedEmployees?.length === 1 ? (
            <Stack alignItems="center" sx={{ mb: 3 }}>
              <Iconify icon="eva:checkmark-fill" sx={{ color: 'primary.main' }} />
              <Typography variant="subtitle1">all accpeted</Typography>{' '}
            </Stack>
          ) : (
            <Stack alignItems="center" sx={{ mb: 3 }}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  color: 'primary.main',
                  mb: 1,
                }}
              >
                <Iconify icon="line-md:check-all" width={40} sx={{ color: 'primary.main' }} />
              </Stack>
              <Typography variant="subtitle1">
                {translate('employeeImportForm.allAccepted')}
              </Typography>
            </Stack>
          )*/}

          {importEmployees?.skippedEmployees?.length !== 0 && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                color: 'primary.main',
                mb: 1,
              }}
            >
              <Alert severity="warning" icon={<Iconify icon="line-md:alert-twotone" width={40} />}>
                <Typography variant="subtitle1">
                  {importEmployees?.skippedEmployees?.length}&nbsp;
                  {translate('employeeImportForm.skipped')}&nbsp;
                  {importEmployees?.createdEmployees?.length !== 0 && (
                    <>
                      {translate('employeeImportForm.and')}
                      {importEmployees?.createdEmployees?.length}&nbsp;
                      {translate('employeeImportForm.accpeted')}.
                    </>
                  )}
                </Typography>
              </Alert>
            </Stack>
          )}

          {importEmployees?.skippedEmployees?.length === 0 &&
            importEmployees?.createdEmployees.length !== 0 && (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  color: 'primary.main',
                  mb: 1,
                }}
              >
                <Alert
                  severity="success"
                  icon={
                    <Iconify icon="line-md:check-all" width={40} sx={{ color: 'primary.darker' }} />
                  }
                >
                  <Typography variant="subtitle1">
                    {translate('employeeImportForm.allAccepted')}.
                  </Typography>
                </Alert>
              </Stack>
            )}
          <Stack spacing={3}>
            {importEmployees?.skippedEmployees?.length !== 0 ? (
              <Stack sx={{ mt: 3 }} spacing={3} justifyContent="space-between" direction="row">
                <Button
                  size="small"
                  color="inherit"
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  onClick={() => setStep(0)}
                >
                  {translate('employeeImportForm.back')}
                </Button>

                <Button onClick={() => onClose()} variant="outlined" color="inherit">
                  {translate('Cancel')}
                </Button>
              </Stack>
            ) : (
              <Box sx={{ textAlign: 'right', mt: 3 }}>
                <Button onClick={() => onClose()} variant="outlined" color="inherit">
                  {translate('Cancel')}
                </Button>
              </Box>
            )}
          </Stack>
        </>
      )}
    </>
  );
}
