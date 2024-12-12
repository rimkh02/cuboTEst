import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Box,
  CircularProgress,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  alpha,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { TEmployee } from 'src/@types/employee';
// components
import Label from 'src/components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { useSnackbar } from 'notistack';
import {
  useTable,
  getComparator,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
  TableNoData,
} from '../../components/table';
// sections
import EmployeeTableRow from 'src/sections/@dashboard/employees/employee-table-row';
import EmployeeTableToolbar from 'src/sections/@dashboard/employees/employee-table-toolbar';
import EmployeeImportForm from 'src/sections/@dashboard/employees/employee-import-form';
// locales
import { useLocales } from 'src/locales';
// redux
import {
  deleteEmployeeRequest,
  disableEmployeeRequest,
  getAllEmployee,
} from 'src/redux/slices/employee';
import { useDispatch, useSelector } from 'src/redux/store';
import ReportemployeesForm from 'src/sections/@dashboard/employees/report-employees-form';

// ----------------------------------------------------------------------

export default function EmployeeListPage() {
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
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const { translate } = useLocales();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { refresh, isLoading, employees } = useSelector((state) => state.employee);

  const TABLE_HEAD = [
    { id: 'lastName', label: translate('employee.last_name'), align: 'center' },
    { id: 'firstName', label: translate('employee.first_name'), align: 'left' },
    { id: 'category', label: translate('employee.kitty'), align: 'left' },
    { id: 'phone', label: translate('Phone'), align: 'left' },
    { id: 'email', label: translate('Email'), align: 'left' },
    { id: 'status', label: translate('state'), align: 'center' },
    { id: '' },
  ];

  const [tableData, setTableData] = useState<any[]>([]);
  const [filterName, setFilterName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
    sortedBy: orderBy,
    orderType: order,
  });

  const getLengthByStatActive = () =>
    tableData?.filter((item: { contract: any }) => item?.contract?.companyLinkingDisabled === false)
      .length;

  const getLengthByDisable = () =>
    tableData?.filter((item: { contract: any }) => item?.contract?.companyLinkingDisabled === true)
      .length;

  const getLengthByDelete = () =>
    tableData?.filter((item: { status: any }) => item?.status === 'DELETE').length;

  const TABS = [
    {
      id: 'all',
      value: 'all',
      label: translate('all'),
      color: 'info',
      count: tableData?.length,
    },
    {
      id: 'ACTIVE',
      value: 'ACTIVE',
      label: translate('employee.active'),
      color: 'success',
      count: getLengthByStatActive(),
    },
    {
      id: 'Disable',
      value: 'Disable',
      label: translate('employee.disable'),
      color: 'warning',
      count: getLengthByDisable(),
    },
    /* {
      id: 'delete',
      value: 'delete',
      label: translate('employee.deleted'),
      color: 'error',
      count: getLengthByDelete(),
    } */
  ] as const;

  const dataInPage = dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered?.length && !!filterName) || (!dataFiltered?.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenImport = () => {
    setOpenImport(true);
  };

  const handleCloseImport = () => {
    setOpenImport(false);
  };

  const handleOpenExport = () => {
    setOpenExport(true);
  };

  const handleCloseExport = () => {
    setOpenExport(false);
  };


  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteRow = (id: any) => {
    dispatch(
      deleteEmployeeRequest({
        isLoading: false,
        selected: [id],
        translate,
        toast: enqueueSnackbar,
      })
    );
    const deleteRow = tableData?.filter((row: { id: string }) => row.id !== id);

    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };
  const handleDeleteRows = (selected: string[]) => {
    dispatch(
      deleteEmployeeRequest({ isLoading: false, selected, translate, toast: enqueueSnackbar })
    );

    const deleteRows = tableData.filter((row: { id: string }) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selected.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selected.length === dataFiltered.length) {
        setPage(0);
      } else if (selected.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selected.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
    //}
  };

  const handleDesactivateRow = (id: any) => {
    const employee = tableData?.find((row: { id: string }) => row.id === id);
    employee.contract.companyLinkingDisabled
      ? dispatch(
          disableEmployeeRequest({
            isLoading: false,
            id: id,
            data: { disable: false },
            translate,
            toast: enqueueSnackbar,
          })
        )
      : dispatch(
          disableEmployeeRequest({
            isLoading: false,
            id: id,
            data: { disable: true },
            translate,
            toast: enqueueSnackbar,
          })
        );
  };
  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.employee.edit(paramCase(id.toString())));
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
      //  setTableData(employees);
      setTableData(employees?.filter((item: any) => item?.status !== 'DELETED'));
    }
  }, [employees]);

  return (
    <>
      <Helmet>
        <title> {translate('employee.employees')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('employee.heading')}
          links={[
            { name: translate('Dashboard'), href: PATH_DASHBOARD.general.homeComany },
            { name: translate('employee.employees'), href: PATH_DASHBOARD.employee.root },
            { name: translate('list') },
          ]}
          action={
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => handleOpenImport()}
                variant="outlined"
                startIcon={<Iconify icon="solar:import-bold" />}
              >
                {translate('employee.import')}
              </Button>
              <Button
                to={PATH_DASHBOARD.employee.new}
                component={RouterLink}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {translate('employee.new_employee')}
              </Button>
            </Stack>
          }
        />

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                icon={
                  <Label color={tab.color} sx={{ mr: 1 }}>
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <EmployeeTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
            onExport ={handleOpenExport}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            {/*<TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData?.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row: { id: any }) => row.id)
                )
              }
              action={
                <Tooltip title={translate('delete')}>
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            /> */}

            <Scrollbar>
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
                <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData?.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    /* onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row: { id: any }) => row.id)
                      )
                    } */
                  />

                  <TableBody>
                    {dataFiltered
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: TEmployee) => (
                        <EmployeeTableRow
                          key={row.id}
                          row={row}
                          //selected={selected.includes(row.id.toString())}
                          // onSelectRow={() => onSelectRow(row.id.toString())}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onDesactivateRow={() => handleDesactivateRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                        />
                      ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                    />

                    <TableNoData
                      isNotFound={isNotFound}
                      title={translate('employee.no_employees')}
                    />
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
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
      {/* ****************************** Delete employee *******************************/}
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('employee.delete_employees')}
        content={
          <>
            {translate('errors.Are_you_sure_to_delete')} <strong> {selected.length} </strong>{' '}
            {translate('employee.many_employe')} ?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            {translate('yes')}
          </Button>
        }
      />

     {/* ****************************** Import Employees via file  *******************************/}
      <Dialog fullWidth maxWidth="xs" open={openImport} onClose={handleCloseImport}>
        <DialogTitle sx={{ pb: 2 }}>{translate('employee.add_employees')}</DialogTitle>

        <DialogContent sx={{ typography: 'body2', mb: 3 }}>
          <EmployeeImportForm onClose={handleCloseImport} />
        </DialogContent>
      </Dialog>


      {/* ****************************** Export Employees Reporting *******************************/}
      <Dialog fullWidth maxWidth="md" open={openExport} onClose={handleCloseExport}>
        <DialogContent>
          <ReportemployeesForm
            onClose={() => setOpenExport(false)}
          />
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
  filterStatus,
  sortedBy,
  orderType,
}: {
  inputData: TEmployee[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  sortedBy: string;
  orderType: string;
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
        employe.firstName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        employe.category?.name?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        employe.phone?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        employe.email?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    if (filterStatus === 'ACTIVE') {
      inputData = inputData?.filter((employe) => employe.contract.companyLinkingDisabled === false);
    } else {
      /*  if (filterStatus === 'delete') {
        inputData = inputData?.filter((employe) => employe.status === 'delete');
      } else {
        inputData = inputData?.filter((employe) => employe.companyLinkingDisabled === true);
      } */
      inputData = inputData?.filter((employe) => employe.contract.companyLinkingDisabled === true);
    }
  }

  if (sortedBy === 'category') {
    inputData = inputData
      .slice()
      .sort((a, b) =>
        orderType === 'asc'
          ? a?.category?.name.toLowerCase().localeCompare(b?.category?.name.toLowerCase())
          : b?.category?.name.toLowerCase().localeCompare(a?.category?.name.toLowerCase())
      );
  }

  return inputData;
}
