/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'yup-phone';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
// utils
import { DEFAULT_PHONE_CODE, REMOVE_COUNTRY_PATTERN } from 'src/utils/const';
// locales
import { useLocales } from 'src/locales';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFRadioGroup, RHFTextField } from '../../../components/hook-form';
import RHFTextFieldPhone from 'src/components/hook-form/RHTextFieldPhone';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { updateAccountRequest } from 'src/redux/slices/accounts';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentCollaborartor?: any;
  onClose: VoidFunction;
};

export default function CollaboratorEditForm({
  isEdit = false,
  currentCollaborartor,
  onClose,
}: Props) {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading } = useSelector((state) => state.accounts);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string()
      .required(translate('companies.name_is_required'))
      .max(30, translate('companies.name_max'))
      .matches(/^[a-zA-ZÀ-ÿ\s]+$/, translate('companies.name_alpha')),
    position: Yup.string()
      .required(translate('settings.errors.Poste'))
      .max(40, translate('employee.poste_max'))
      .min(2, translate('employee.poste_min')),

    phone: Yup.string()
      .required(translate('settings.errors.Phone'))
      // .matches(/^((\+33|\+262)(\d{9}))$/, translate('employee.phone_invalid')),
      .matches(/^((\d{9}))$/, translate('employee.phone_invalid')),
    phoneCode: Yup.string().default(DEFAULT_PHONE_CODE),

    email: Yup.string()
      .required(translate('settings.errors.Email'))
      .email(translate('settings.errors.mail_invalid'))
      .max(100, translate('settings.errors.mail_invalid')),
    accountType: Yup.string().required(translate('settings.errors.Access_level')),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCollaborartor?.name || '',
      position: currentCollaborartor?.position || '',
      // phone: currentCollaborartor?.phone || '',
      phone:
        currentCollaborartor?.phone && currentCollaborartor?.phone !== null
          ? currentCollaborartor?.phone?.replace(REMOVE_COUNTRY_PATTERN, '')
          : '',
      phoneCode:
        currentCollaborartor?.phone && currentCollaborartor?.phone !== null
          ? currentCollaborartor?.phone.slice(
              0,
              currentCollaborartor?.phone?.length -
                currentCollaborartor?.phone?.replace(REMOVE_COUNTRY_PATTERN, '').length
            )
          : DEFAULT_PHONE_CODE,
      email: currentCollaborartor?.email || '',
      accountType: currentCollaborartor?.accountType || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCollaborartor]
  );

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (isEdit && currentCollaborartor) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentCollaborartor]);

  const onSubmit = async (data: any) => {
    const dataToSend = {
      accountType: data.accountType,
      name: data.name,
      email: data.email,
      position: data.position,
      phone: `${data.phoneCode}${data.phone}`,
    };

    dispatch(
      updateAccountRequest({
        id: currentCollaborartor.id,
        isLoading: false,
        data: dataToSend,
        toast: enqueueSnackbar,
        translate: translate,
        reset,
        onClose,
      })
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{ mt: '10px' }}
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
      >
        <RHFTextField
          name="name"
          placeholder="John Durand"
          label={translate('settings.fields.last_name')}
        />
        <RHFTextField name="position" placeholder="DG" label={translate('settings.fields.Poste')} />
        {/*<RHFTextField
          name="phone"
          placeholder="+33234567890"
          label={translate('settings.fields.Phone')}
        /> */}

        <RHFTextFieldPhone
          name="phone"
          label={translate('settings.fields.Phone')}
          itemName="phoneCode"
          type="phone"
          placeholder="234567890"
        />
        <RHFTextField
          name="email"
          placeholder="john@exemple.com"
          label={translate('settings.fields.Email')}
        />
      </Box>
      <Stack spacing={1} sx={{ mt: '10px' }}>
        <Typography variant="subtitle1" sx={{ color: '#919EAB', fontWeight: 400 }}>
          {translate('settings.fields.Access_level')}
        </Typography>
        <RHFRadioGroup
          name="accountType"
          options={[
            { label: translate('settings.fields.Administrator'), value: 'ADMIN' },
            { label: translate('settings.fields.Manager'), value: 'MANAGER' },
          ]}
          row={true}
        />
      </Stack>
      <Stack justifyContent="flex-end" direction="row" sx={{ mt: 3, mb: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isLoading}>
          {translate('save')}
        </LoadingButton>
        <Button sx={{ ml: '10px' }} onClick={onClose}>
          {translate('Cancel')}
        </Button>
      </Stack>
    </FormProvider>
  );
}
