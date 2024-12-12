import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// @mui
import {
  Card,
  Button,
  Stack,
  Box,
  Checkbox,
  CircularProgress,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableContainer,
  Typography,
} from '@mui/material';
// components
import FormProvider from 'src/components/hook-form/FormProvider';
import Scrollbar from 'src/components/scrollbar';
import {
  TableHeadCustom,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import { useForm } from 'react-hook-form';
// sections
import EmployeeTableToolbarRechargement from '../employees/tolbar-employe-recharegment-meals';
import NoEmploye from './noData/table-no-data';
// utils
import { ADVANTAGE_TYPE } from 'src/utils/const';
// locales
import { useLocales } from 'src/locales';
// redux
import { setEmployeListEvent, nextStepEvent } from 'src/redux/slices/rechargement';
import { dispatch, useSelector } from 'src/redux/store';
import { getAllEmployee } from 'src/redux/slices/employee';
import { getAllCategoriesRequest } from 'src/redux/slices/categories';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  selected: any;
};

export const FormSchema = Yup.object().shape({
  selected: Yup.array().min(1, 'At least one skill is required'),
});

export default function StepOne() {
  const { employees, isLoading } = useSelector((state) => state.employee);
  const { refresh, categories } = useSelector((state) => state.categories);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const [liste, setTableData] = useState<any[]>([]);

  const { translate } = useLocales();

  const [filterName, setFilterName] = useState('');
  const TABLE_HEAD = [
    // { id: 'first_name', label: translate('employee.first_name') },
    { id: 'last_name', label: translate('employee.last_name') },
    { id: 'email', label: translate('Email') },
    { id: 'phone', label: translate('companies.phone') },
  ];
  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const defaultValues = {
    selected: [],
  };
  const methods = useForm<FormValuesProps>({
    reValidateMode: 'onChange',
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    dispatch(setEmployeListEvent(selected));
    dispatch(nextStepEvent());
  };
  const dataFiltered = applyFilter({
    inputData: liste,
    filterName,
  });
  const handleResetFilter = () => {
    setFilterName('');
  };
  const isFiltered = filterName !== '';

  useEffect(() => {
    dispatch(getAllEmployee({}));
  }, []);

  useEffect(() => {
    dispatch(getAllCategoriesRequest({}));
  }, [refresh]);

  useEffect(() => {
    if (employees?.length) {
      const listeData: any = [];
      employees
        ?.filter((item: any) => item.status === 'ACTIVE' || item.status === 'CREATED')
        .forEach((element: any) => {
          const currentCategoey = categories.find((cat: any) => cat.id === element.category?.id);
          if (currentCategoey !== undefined) {
            if (
              currentCategoey?.advantages?.findIndex(
                (cat: any) => cat.type === ADVANTAGE_TYPE.gift
              ) > -1
            ) {
              listeData.push(element);
            }
          }
        });

      setTableData(listeData);
    }
  }, [categories, employees]);

  return (
    <Card sx={{ mb: 3 }}>
      <Stack flexGrow={1} spacing={1}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              <EmployeeTableToolbarRechargement
                isFiltered={isFiltered}
                filterName={filterName}
                onFilterName={handleFilterName}
                onResetFilter={handleResetFilter}
              />
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar>
                  <TableSelectedAction
                    dense={dense}
                    numSelected={selected?.length}
                    rowCount={liste?.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        liste?.map((row: any) => row.id)
                      )
                    }
                  />
                  <Table sx={{ minWidth: 800 }}>
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={liste?.length}
                      numSelected={selected?.length}
                      onSort={onSort}
                      onSelectAllRows={(checked) =>
                        onSelectAllRows(
                          checked,
                          liste?.map((row: any) => row)
                        )
                      }
                    />
                    <TableBody>
                      {dataFiltered
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        ?.map((row: any, index: any) => (
                          <TableRow key={row.id} hover>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selected?.includes(row)}
                                onClick={() => onSelectRow(row)}
                              />
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                variant="subtitle2"
                                noWrap
                                sx={{ textTransform: 'capitalize' }}
                              >
                                {(row?.firstName === '' && translate('unassigned')) ||
                                  row.firstName}
                                &nbsp;
                                {(row.lastName === '' && translate('unassigned')) || row.lastName}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">
                              {((row.email === '' || row.email === null) &&
                                translate('unassigned')) ||
                                ' ' + row.email}
                            </TableCell>
                            <TableCell>
                              {(row.phone === '' && translate('unassigned')) || row.phone}
                            </TableCell>
                          </TableRow>
                        ))}
                      {dataFiltered?.length === 0 && <NoEmploye isNotFound={true} />}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePaginationCustom
                count={dataFiltered?.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
            </>
          )}

          <Stack spacing={3}>
            <Box sx={{ textAlign: 'right' }}>
              <Button
                sx={{ m: 3 }}
                type="submit"
                variant="contained"
                disabled={dataFiltered.length === 0 || selected?.length === 0}
              >
                {translate('next')}
              </Button>
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
        employee.lastName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        employee.firstName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1
    );
  }

  return inputData;
}
