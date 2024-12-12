import { useCallback, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { IconButton, InputAdornment, MenuItem } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
//
import { countries } from 'src/assets/data';
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
import CustomPopover, { usePopover } from '../custom-popover';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  itemName?: string;
  endAdornment?: any;
};

export default function RHFPPhone({
  itemName,
  name,
  helperText,
  type,
  endAdornment,
  ...other
}: Props) {
  const { control } = useFormContext();
  const { currentLang } = useLocales();
  const popover = usePopover();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const dataFiltered =
    search !== ''
      ? countries.filter(
          (el) =>
            el.labelFr.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            el.labelEn.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      : countries;

  return type === 'phone' ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          InputProps={{
            startAdornment: (
              <Controller
                name={itemName!}
                control={control}
                render={(item) => (
                  <>
                    <InputAdornment position="start">
                      <IconButton onClick={popover.onOpen}>
                        <Iconify
                          icon={`circle-flags:${
                            countries.filter((el) => el.phone === item.field.value).length === 1 ||
                            selected === ''
                              ? countries
                                  .filter((el) => el.phone === item.field.value)[0]!
                                  ?.code.toLowerCase()
                              : countries
                                  .filter(
                                    (el) => el.phone === item.field.value && selected === el.id
                                  )[0]!
                                  ?.code.toLowerCase()
                          }`}
                          /* icon={`circle-flags:${countries
                            .filter((el) => el.phone === item.field.value)[0]!
                            ?.code.toLowerCase()}`} */
                          width={28}
                        />
                      </IconButton>
                      <CustomPopover open={popover.open} onClose={popover.onClose}>
                        <TextField
                          value={search}
                          onChange={handleSearch}
                          placeholder=""
                          fullWidth
                          sx={{ p: 1 }}
                        />
                        <Scrollbar
                          sx={{
                            maxHeight: 250,
                            width: 300,
                          }}
                        >
                          {dataFiltered.map((country) => (
                            <MenuItem
                              sx={{ width: 300 }}
                              key={country.id}
                              onClick={() => {
                                item.field.onChange(country.phone);
                                popover.onClose();
                                setSelected(country.id);
                              }}

                              // disabled={country.phone !== '+33' && country.phone !== '+262'}
                            >
                              <Iconify
                                icon={`circle-flags:${country?.code.toLowerCase()}`}
                                width={28}
                                sx={{ mr: 1 }}
                              />
                              {currentLang.value === 'fr' ? country?.labelFr : country.labelEn}
                              &nbsp;
                              {country?.phone}
                            </MenuItem>
                          ))}
                        </Scrollbar>
                      </CustomPopover>
                    </InputAdornment>
                    <InputAdornment position="end" sx={{ mr: 1 }}>
                      {item.field.value}
                    </InputAdornment>
                  </>
                )}
              />
            ),
            endAdornment,
          }}
          {...other}
        />
      )}
    />
  ) : (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
