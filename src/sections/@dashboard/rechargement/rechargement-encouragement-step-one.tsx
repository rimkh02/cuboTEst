import { useEffect, useState } from 'react';
// @mui
import { Card, Button, Stack, Box, TextField, CircularProgress, Typography } from '@mui/material';
// components
import FormProvider from 'src/components/hook-form/FormProvider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
// locales
import { useLocales } from 'src/locales';
// utils
import { ADVANTAGE_TYPE } from 'src/utils/const';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { nextStepEncouragement, setCagnotte } from 'src/redux/slices/rechargement';
import { getAllCategoriesRequest } from 'src/redux/slices/categories';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  categories: any;
};

export const FormSchema = Yup.object().shape({
  categories: Yup.mixed().required('At least one skill is required'),
});

export default function StepOne() {
  const { translate } = useLocales();

  const { categories, isLoading, refresh } = useSelector((state) => state.categories);

  const [liste, setTableData] = useState<any[]>([]);
  const [selected, setSelected] = useState([{}]);

  const defaultValues = {
    categories: null,
  };

  const methods = useForm<FormValuesProps>({
    reValidateMode: 'onChange',
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    dispatch(setCagnotte(selected));
    dispatch(nextStepEncouragement());
  };

  useEffect(() => {
    if (categories?.length) {
      setTableData(
        categories?.filter((category) => {
          const advantages = category?.advantages;
          return !advantages?.every(
            (advantage) =>
              advantage.type === ADVANTAGE_TYPE.restaurant || advantage.type === ADVANTAGE_TYPE.gift
          );
        })
      );
    }
  }, [categories]);

  useEffect(() => {
    dispatch(getAllCategoriesRequest({}));
  }, [refresh]);

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Stack flexGrow={1} spacing={1}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
              width: '100%',
            }}
          >
            <CircularProgress size={40} color={'primary'} />
          </Box>
        ) : (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFAutocomplete
              fullWidth
              name="categories"
              onChange={(event, newValue) => {
                setValue('categories', newValue);
                trigger();
                setSelected(newValue);
              }}
              options={liste}
              disableCloseOnSelect
              noOptionsText={translate('empty_table.no_catgeory_for_reload_engouragment')}
              getOptionLabel={(option: any) => option.name}
              renderInput={(params) => (
                <TextField
                  helperText={
                    errors.categories && translate('rechargementPage.at_least_one_category')
                  }
                  error={!!errors.categories}
                  {...params}
                  label={translate('Categories')}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option?.id}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">{option?.name}</Typography>
                  </Stack>
                </li>
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
        )}
      </Stack>
    </Card>
  );
}
