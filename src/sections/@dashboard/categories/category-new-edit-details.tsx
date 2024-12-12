// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, MenuItem, CircularProgress } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { RHFSelect, RHFTextField } from '../../../components/hook-form';

// locales
import { useLocales } from 'src/locales';
// redux
import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

export default function CategoryNewEditDetails() {
  const { control, watch } = useFormContext();
  const { translate } = useLocales();
  const { isLoading } = useSelector((state) => state.categories);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const ADVANTAGES_OPTIONS = [
    { id: 'CULTURE', name: translate('avantages.Culture') },
    { id: 'SPORT', name: translate('avantages.Sport') },
    { id: 'HOLIDAYS', name: translate('avantages.Holidays') },
    { id: 'HELP', name: translate('avantages.Personal_assistance') },
    { id: 'GIFT', name: translate('avantages.Gifts') },
    { id: 'MOBILITY', name: translate('avantages.Mobility') },
    { id: 'REMOTE', name: translate('avantages.Telework') },
  ];

  const handleAdd = () => {
    append({
      type: '',
      yearlyLimit: '',
      // startPeriod: null,
      // endPeriod: null,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Box sx={{ p: 3 }}>
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
        <>
          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
            {translate('categorie.advantages')}
          </Typography>
          {fields?.length === 0 ? (
            <Typography variant="h5" style={{ textAlign: 'center', marginBottom: 3 }}>
              {translate('cagnotte.no_benefits')}
            </Typography>
          ) : (
            <>
              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                {fields?.map((item: any, index) => (
                  <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                      <RHFSelect
                        // name={`items[${index}].type`}
                        name={`items.${index}.type`}
                        size="small"
                        label={translate('categorie.advantage')}
                        InputLabelProps={{ shrink: true }}
                        SelectProps={{
                          native: false,
                          MenuProps: {
                            PaperProps: {
                              sx: { maxHeight: 220 },
                            },
                          },
                          sx: { textTransform: 'capitalize' },
                        }}
                      >
                        <Divider />

                        {ADVANTAGES_OPTIONS.map((option) => (
                          <MenuItem
                            key={option.id}
                            value={option.id}
                            /* disabled={
                              values?.items?.find(
                                (itemSelected: any) => itemSelected.type === option.id
                              )
                                ? true
                                : false
                            } */
                            sx={{
                              mx: 1,
                              my: 0.5,
                              borderRadius: 0.75,
                              typography: 'body2',
                              textTransform: 'capitalize',
                              '&:first-of-type': { mt: 0 },
                              '&:last-of-type': { mb: 0 },
                              display: values?.items?.find(
                                (itemSelected: any) => itemSelected.type === option.id
                              )
                                ? 'none'
                                : 'block',
                            }}
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </RHFSelect>

                      <RHFTextField
                        size="small"
                        name={`items[${index}].yearlyLimit`}
                        label={translate('categorie.yearly_limit_amount')}
                      />

                      {/*     <Controller
                        name={`items.${index}.startPeriod`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <DatePicker
                            {...field}
                            label={translate('categorie.startPeriod')}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                fullWidth
                                {...params}
                                error={!!error}
                                helperText={error?.message}
                              />
                            )}
                          />
                        )}
                      />
                    */}
                    </Stack>

                    <Button
                      size="small"
                      color="error"
                      startIcon={<Iconify icon="eva:trash-2-outline" />}
                      onClick={() => handleRemove(index)}
                    >
                      {translate('remove')}
                    </Button>
                  </Stack>
                ))}
              </Stack>
              <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
            </>
          )}
          <Stack
            spacing={2}
            direction={{ xs: 'column-reverse', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Button
              size="small"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleAdd}
              sx={{ flexShrink: 0 }}
              disabled={values.items.length > 6}
            >
              {translate('add')}
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
}
