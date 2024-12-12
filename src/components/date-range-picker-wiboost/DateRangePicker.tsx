// @mui
import {
  Paper,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';
import { DatePicker, CalendarPicker, LocalizationProvider } from '@mui/x-date-pickers';
// hooks
import useResponsive from '../../hooks/useResponsive';
//
import { DateRangePickerProps } from './types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useLocales } from 'src/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Import the specific locale file for the desired language
import moment from 'moment';

// ----------------------------------------------------------------------

export default function DateRangePickerWiboost({
  variant = 'input',
  //
  startDate,
  endDate,
  //
  onChangeStartDate,
  onChangeEndDate,
  //
  open,
  onClose,
  //
  isError,
}: DateRangePickerProps) {
  const isDesktop = useResponsive('up', 'md');

  const isCalendarView = variant === 'calendar';

  const { currentLang, translate } = useLocales();

  return (
    <Stack
    // fullWidth
    // sx={{maxWidth:{isCalendarView ? false : 'xs'}}}
    // open={open}
    // onClose={onClose}
    /*  PaperProps={{
        sx: {
          ...(isCalendarView && {
            maxWidth: 720,
          }),
        },
      }} */
    /* sx={{
        maxWidth: isCalendarView ? false : 'xs',
        ...(isCalendarView && {
          maxWidth: 720,
        }),
      }} */
    >
      <DialogTitle sx={{ pb: 2 }}>{translate('selectDateRange')}</DialogTitle>

      <DialogContent
        sx={{
          ...(isCalendarView &&
            isDesktop && {
              overflow: 'unset',
            }),
        }}
      >
        <Stack
          spacing={isCalendarView ? 3 : 2}
          direction={isCalendarView && isDesktop ? 'row' : 'column'}
          justifyContent="center"
          sx={{
            pt: 1,
            '& .MuiCalendarPicker-root': {
              ...(!isDesktop && {
                width: 'auto',
              }),
            },
          }}
        >
          {isCalendarView ? (
            <>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang.value}>
                  <CalendarPicker
                    minDate={new Date('01-01-2020')}
                    maxDate={new Date()}
                    date={startDate}
                    onChange={onChangeStartDate}
                  />
                </LocalizationProvider>
              </Paper>

              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang.value}>
                  <CalendarPicker
                    minDate={new Date('01-01-2020')}
                    maxDate={new Date()}
                    date={endDate}
                    onChange={onChangeEndDate}
                  />
                </LocalizationProvider>
              </Paper>
            </>
          ) : (
            <>
              <DatePicker
                label="Start date"
                value={startDate}
                onChange={onChangeStartDate}
                renderInput={(params) => <TextField {...params} />}
                maxDate={new Date()}
                minDate={new Date('01-01-2020')}
              />

              <DatePicker
                label="End date"
                value={endDate}
                onChange={onChangeEndDate}
                renderInput={(params) => <TextField {...params} />}
                maxDate={new Date()}
                minDate={new Date('01-01-2020')}
              />
            </>
          )}
        </Stack>

        {isError && (
          <FormHelperText sx={{ color: 'error.main', px: 2 }}>
            {translate('errorDate')}
          </FormHelperText>
        )}
        {moment(new Date(endDate?.toString()!)).diff(
          moment(new Date(startDate?.toString()!)),
          'days'
        ) > 365 && (
          <FormHelperText sx={{ color: 'error.main', px: 2 }}>
            {translate('plageMax')}
          </FormHelperText>
        )}
      </DialogContent>
    </Stack>
  );
}
