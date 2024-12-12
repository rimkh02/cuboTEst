import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Button,
  Card,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';
import Iconify from '../../../components/iconify';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import Scrollbar from 'src/components/scrollbar';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
// sections
import EmployeeTableToolbarRechargement from '../employees/tolbar-employe-recharegment-meals';
import TableNoEmployeAssign from '../categories/no-employe-assign';
// locales
import { useLocales } from 'src/locales';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { getAllEmployee } from 'src/redux/slices/employee';
import { addLines } from 'src/redux/slices/rechargement';

// ----------------------------------------------------------------------

type Props = {
  rechargementData: any;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
  onReset: VoidFunction;
};

export default function FormStepTwo({ rechargementData, onReset, onNextStep, onBackStep }: Props) {
  const { page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTable({
    defaultRowsPerPage: 10,
  });

  const { isLoading, employees } = useSelector((state) => state.employee);
  const { isLoadingReloadTicketResto, rechargementData: dataToSend } = useSelector(
    (state) => state.rechargement
  );

  const [dataTable, setTableData] = useState<any[]>([]);
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const TABLE_HEAD = [
    { id: 'name', label: translate('employee.employee') },
    { id: 'email', label: translate('Email'), align: 'center' },
    { id: 'phone', label: translate('companies.phone'), align: 'center' },
    { id: 'nbrday', label: translate('employee.Number_of_days'), align: 'right' },
  ];
  const Schema = Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        nbr: Yup.number()
          //.required(translate('employee.Number_of_days_required'))
          .typeError(translate('invalid_value'))
          .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value))
          .nullable()
          .min(0, translate('employee.Must_be_more_than'))
          .max(90, translate('employee.Must_be_less_than')),
      })
    ),
  });

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(Schema),
  });
  const [filterName, setFilterName] = useState('');

  const isFiltered = filterName !== '';

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
  };
  const dataFiltered = applyFilter({
    inputData: dataTable,
    filterName,
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = async (data: any) => {
    let dataToSend: {
      lines: { forEmployeeContractId: number; presenceDaysCount: number }[];
      reloadMonth: string;
    } = {
      lines: [],
      reloadMonth: rechargementData.month,
    };
    let s = 0;

    Object.keys(data.items).forEach((id) => {
      if (
        data.items[id].nbr !== undefined &&
        data.items[id].nbr !== null &&
        data.items[id].nbr !== 0
      ) {
        const user = dataFiltered.find((el) => el.id.toString() === id);
        s = s + parseInt(data.items[id].nbr);

        let line = {
          forEmployeeContractId: user?.contract?.id,
          presenceDaysCount: parseInt(data.items[id].nbr),
        };
        dataToSend.lines.push(line);
      }
    });

    if (!isNaN(s) && s !== 0) {
      dispatch(addLines(dataToSend));
      onNextStep();
    } else {
      enqueueSnackbar(translate('errors.employe_nbr_required_event'), {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    dispatch(getAllEmployee({}));
  }, []);

  useEffect(() => {
    if (employees?.length) {
      setTableData(
        employees.filter(
          (employe: any) =>
            employe?.category?.status === 'ACTIVE' &&
            (employe?.status === 'ACTIVE' || employe?.status === 'CREATED')
        )
      );
    }
  }, [employees, rechargementData?.cagnotte]);
  return (
    <Card
      sx={{
        mb: 3,
      }}
    >
      <Stack flexGrow={1} spacing={3}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <EmployeeTableToolbarRechargement
                isFiltered={isFiltered}
                filterName={filterName}
                onFilterName={handleFilterName}
                onResetFilter={handleResetFilter}
              />
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
                <Table sx={{ minWidth: 800 }}>
                  <TableHeadCustom headLabel={TABLE_HEAD} rowCount={dataTable?.length} />

                  <TableBody>
                    {dataFiltered
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map((row: any, index: any) => (
                        <TableRow hover key={row.phone}>
                          <TableCell>
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {row.firstName + ' ' + row.lastName}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            {((row.email === '' || row.email === null) &&
                              translate('unassigned')) ||
                              ' ' + row.email}
                          </TableCell>
                          <TableCell align="center">
                            {(row.phone === '' && translate('unassigned')) || row.phone}
                          </TableCell>
                          <TableCell align="right">
                            <RHFTextField
                              name={`items[${row.id}].nbr`}
                              variant="standard"
                              // type="number"
                              size="small"
                              placeholder={translate('tax.writing')}
                              sx={{ width: 100 }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    {dataFiltered?.length === 0 && (
                      <TableNoData isNotFound={true} title={translate('employee.no_employees')} />
                    )}
                    <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, dataTable?.length)} />
                  </TableBody>
                </Table>
              )}
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={dataFiltered?.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
            sx={{ px: 2.5, py: 3 }}
          >
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              {translate('back')}
            </Button>
            <Box sx={{ textAlign: 'right' }}>
              <LoadingButton
                type="submit"
                variant="contained"
                disabled={
                  // dataToSend?.linesToSend?.lines?.presenceDaysCount?.length !== 0
                  !isDirty
                }
                loading={isLoadingReloadTicketResto}
              >
                {translate('next')}
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </Stack>
    </Card>
  );
}
function applyFilter({ inputData, filterName }: { inputData: any[]; filterName: string }) {
  if (filterName) {
    inputData = inputData?.filter(
      (employee) =>
        employee?.lastName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        employee?.firstName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1
    );
  }

  return inputData;
}
