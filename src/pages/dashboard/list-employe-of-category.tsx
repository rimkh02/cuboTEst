import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  DialogTitle,
  DialogContent,
  Dialog,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// types
import { TEmployee } from 'src/@types/employee';
// sections
import ListEmployeUnassign from 'src/sections/@dashboard/categories/list-employe-unassign';
import ListEmployeesCategoryTableRow from 'src/sections/@dashboard/categories/list-employe-category-Table-row';
import EmployeCategoryTableToolbar from 'src/sections/@dashboard/categories/list-employe-category-Table-toolbar';
import TableNoEmployeAssign from 'src/sections/@dashboard/categories/no-employe-assign';
// locales
import { useLocales } from 'src/locales';
// redux
import {
  getAllCategoriesRequest,
  UnAssignEmployeeToCagnotteRequest,
} from 'src/redux/slices/categories';
import { getAllEmployee } from 'src/redux/slices/employee';
import { useDispatch, useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

export default function EmployeListOfCagnottePage() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { id } = useParams();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const { employees } = useSelector((state) => state.employee);
  const { refresh, isLoading, categories } = useSelector((state) => state.categories);

  const currentCagnotte = categories?.find((cagnotte: any) => cagnotte?.id.toString() === id);

  const [tableData, setTableData] = useState<any[]>([]);
  const [filterName, setFilterName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAddEmploye, setOpenAddEmploye] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const TABLE_HEAD = [
    { id: 'Name', label: translate('name'), align: 'left' },
    { id: 'Email', label: translate('Email'), align: 'left' },
    { id: 'Phone', label: translate('Phone'), align: 'left' },
    { id: 'Positin', label: translate('companies.position'), align: 'center', width: 140 },
    { id: 'Cagnotte', label: translate('cagnotte.cagnotte'), align: 'center', width: 140 },
    { id: '' },
  ];

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const dataInPage = dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 56 : 76;

  const isFiltered = filterStatus !== 'all' || filterName !== '';

  const isNotFound =
    (!dataFiltered?.length && !!filterName) || (!dataFiltered?.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenAddEmploye = () => {
    setOpenAddEmploye(true);
  };

  const handleCloseAddEmploye = () => {
    setOpenAddEmploye(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleUnassignRow = (employeeId: any) => {
    dispatch(
      UnAssignEmployeeToCagnotteRequest({
        navigate,
        toast: enqueueSnackbar,
        translate,
        selected: [employeeId],
        onClose: handleCloseConfirm,
      })
    );

    setSelected([]);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleUnAssignManyRow = (selected: any[]) => {
    dispatch(
      UnAssignEmployeeToCagnotteRequest({
        navigate,
        toast: enqueueSnackbar,
        translate,
        selected,
        onClose: handleCloseConfirm,
      })
    );
    setSelected([]);
    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus('all');
  };
  useEffect(() => {
    dispatch(getAllEmployee({}));
  }, [dispatch, refresh]);

  useEffect(() => {
    if (employees?.length) {
      setTableData(
        employees?.filter(
          (x: TEmployee) => x.category?.id.toString() === id && x?.status !== 'DELETED'
        )
      );
    }
  }, [employees, refresh, id]);

  useEffect(() => {
    dispatch(getAllCategoriesRequest({}));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> {translate('cagnotte.cagnottes')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={currentCagnotte?.name}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.general.homeComany,
            },
            {
              name: translate('Categories'),
              href: PATH_DASHBOARD.cagnotte.list,
            },

            {
              name: translate('assign.list_assign'),
            },
          ]}
          action={
            <Button
              onClick={handleOpenAddEmploye}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {translate('employee.new_employee')}
            </Button>
          }
        />

        <Card>
          <EmployeCategoryTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData?.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row: any) => row.id)
                )
              }
              action={
                <Stack direction="row">
                  <Tooltip title={translate('assign.unassign')}>
                    <IconButton color="warning" onClick={handleOpenConfirm}>
                      <Iconify icon="typcn:user-delete" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                {currentCagnotte?.isStandard === false && (
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData?.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row: any) => row)
                      )
                    }
                  />
                )}

                <TableBody>
                  {dataFiltered
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ListEmployeesCategoryTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row)}
                        onSelectRow={() => onSelectRow(row)}
                        onDeleteRow={() => handleUnassignRow(row)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                  />

                  <TableNoEmployeAssign isNotFound={isNotFound} />
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
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('assign.unassigned_employeees')}
        content={
          <>
            {translate('assign.you_sure_unassign_employees')} <strong> {selected.length} </strong>{' '}
            {translate('assign.employees')}?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={() => {
              handleUnAssignManyRow(selected);
              handleCloseConfirm();
            }}
            loading={isLoading}
          >
            {translate('yes')}
          </LoadingButton>
        }
      />

      <Dialog fullWidth maxWidth="lg" open={openAddEmploye} onClose={handleCloseAddEmploye}>
        <DialogTitle sx={{ pb: 2 }}>{translate('cagnotte.Assign')}</DialogTitle>
        <DialogContent>
          <ListEmployeUnassign onClose={handleCloseAddEmploye} />
        </DialogContent>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: any[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = inputData?.map((el, index) => [el, index] as const);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    inputData = inputData?.filter(
      (employe) =>
        employe.lastName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        employe.firstName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1
    );
  }

  return inputData;
}
