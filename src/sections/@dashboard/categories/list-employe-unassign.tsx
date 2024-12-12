import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// @mui
import {
  Stack,
  Box,
  Checkbox,
  CircularProgress,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableContainer,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import FormProvider from 'src/components/hook-form/FormProvider';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'notistack';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import { useForm } from 'react-hook-form';
// sections
import ToolbarEmployeUnassign from './tolbar-employe-unassign';
// locales
import { useLocales } from 'src/locales';
// types
import { TEmployee } from 'src/@types/employee';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { getAllEmployee } from 'src/redux/slices/employee';
import {
  AssignEmployeeToCagnotteRequest,
  getAllCategoriesRequest,
} from 'src/redux/slices/categories';

// ----------------------------------------------------------------------
type Props = {
  onClose: VoidFunction;
};
export type FormValuesProps = {
  selected: any;
};

export default function ListEmployeUnassign({ onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { translate } = useLocales();

  const { id } = useParams();

  const [filterName, setFilterName] = useState('');
  const [liste, setTableData] = useState<any[]>([]);

  const { employees, isLoading } = useSelector((state) => state.employee);
  const {
    refresh,
    categories,
    isLoading: ActionIsLoading,
  } = useSelector((state) => state.categories);

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

  const TABLE_HEAD = [
    { id: 'last_name', label: translate('employee.last_name') },
    { id: 'first_name', label: translate('employee.first_name') },
    { id: 'category', label: translate('employee.kitty'), align: 'center' },
  ];

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const methods = useForm<FormValuesProps>({
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    dispatch(
      AssignEmployeeToCagnotteRequest({
        cagnotteId: id,
        navigate,
        toast: enqueueSnackbar,
        translate,
        selected,
        onClose: onClose,
      })
    );
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
      /* setTableData(
        employees.filter(
          (cat: any) => cat.category?.id.toString() === '' || cat.category?.isStandard === true
        )
      );*/
      setTableData(
        employees?.filter(
          (x: TEmployee) => x.category?.id.toString() !== id && x?.status !== 'DELETED'
        )
      );
    }
  }, [categories, employees, id]);

  return (
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
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : (
          <>
            <ToolbarEmployeUnassign
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
                <Table>
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
                        <TableRow key={row.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selected?.includes(row)}
                              onClick={() => onSelectRow(row)}
                            />
                          </TableCell>
                          <TableCell align="left">
                            {(row.lastName === '' && translate('unassigned')) || row.lastName}
                          </TableCell>
                          <TableCell align="left">
                            {(row?.firstName === '' && translate('unassigned')) || row.firstName}
                          </TableCell>

                          <TableCell align="center">{row.category?.name}</TableCell>
                        </TableRow>
                      ))}
                    {dataFiltered?.length === 0 && <TableNoData isNotFound={true} />}
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
            <Stack spacing={3}>
              <Box sx={{ textAlign: 'right' }}>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                  {translate('Cancel')}
                </Button>
                <LoadingButton
                  sx={{ m: 3 }}
                  type="submit"
                  variant="contained"
                  disabled={selected.length === 0}
                  loading={ActionIsLoading}
                >
                  {translate('save')}
                </LoadingButton>
              </Box>
            </Stack>
          </>
        )}
      </FormProvider>
    </Stack>
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
