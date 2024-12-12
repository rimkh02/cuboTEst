import 'yup-phone';
import moment from 'moment';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions } from '@mui/material';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider from 'src/components/hook-form';
import { useDateRangePicker } from 'src/components/date-range-picker';

// locales
import { useLocales } from 'src/locales';
//redux
import { useDispatch, useSelector } from 'src/redux/store';
import DateRangePickerWiboost from 'src/components/date-range-picker-wiboost/DateRangePicker';
import { getEmployeesReportingRequest } from 'src/redux/slices/employee';

// ----------------------------------------------------------------------

type Props = {
  onClose: VoidFunction;
};

export default function ReportemployeesForm({ onClose }: Props) {
  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,

    isSelected: isSelectedValuePicker,
    isError,
  } = useDateRangePicker(null, null);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const { isLoadingReprting } = useSelector((state) => state.employee);

  const handleChangeStartDate = (newValue: Date | null) => {
    onChangeStartDate(newValue);
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    onChangeEndDate(newValue);
  };

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    if (startDate !== undefined && endDate !== undefined) {
      const dataToSend = {
        startDate: moment(new Date(startDate!)).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        endDate: moment(new Date(endDate!)).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      };

      dispatch(
        getEmployeesReportingRequest({
          data: dataToSend,
          onClose,
        })
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DateRangePickerWiboost
        variant="calendar"
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
        open={true}
        onClose={onClose}
        isSelected={isSelectedValuePicker}
        isError={isError}
      />

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          {translate('Cancel')}
        </Button>

        <LoadingButton
          type="submit"
          loading={isLoadingReprting}
          disabled={
            isError ||
            !startDate ||
            !endDate ||
            moment(new Date(endDate?.toString()!)).diff(
              moment(new Date(startDate?.toString()!)),
              'days'
            ) > 365
          }
          variant="contained"
        >
          {translate('save')}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
