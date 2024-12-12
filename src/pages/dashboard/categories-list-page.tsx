import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  CircularProgress,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { useSnackbar } from 'src/components/snackbar';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// types
import { TCategory } from 'src/@types/category';
// sections
import CategoryTableToolbar from 'src/sections/@dashboard/categories/category-table-toolbar';
import CategoryTableRow from 'src/sections/@dashboard/categories/category-table-row';
// locales
import { useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { deleteCategoryRequest, getAllCategoriesRequest } from 'src/redux/slices/categories';

// ----------------------------------------------------------------------

export default function CagnotteListPage() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const dispatch = useDispatch();

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

  const { isLoading, refresh, categories } = useSelector((state) => state.categories);

  const [tableData, setCagnotteData] = useState<TCategory[]>([]);
  const [filterName, setFilterName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  const TABLE_HEAD = [
    { id: 'name', label: translate('categorie.name'), align: 'left' },
    { id: 'advantages', label: translate('Advantages'), align: 'left' },
    { id: '' },
  ];

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const dataInPage = dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 56 : 76;

  const isFiltered = filterName !== '';

  const isNotFound = !dataFiltered?.length && !!filterName;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    dispatch(
      deleteCategoryRequest({
        id,
        selected: [],
        toast: enqueueSnackbar,
        translate,
      })
    );
  };

  const handleDeleteRows = (selected: string[]) => {
    for (let i = 0; i < selected.length; i++) {
      dispatch(
        deleteCategoryRequest({
          id: null,
          selected,
          toast: enqueueSnackbar,
          translate,
        })
      );
    }
    setSelected([]);
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
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.cagnotte.edit(id));
  };

  const handleListemployeesRow = (id: string) => {
    navigate(PATH_DASHBOARD.cagnotte.listAssign(id));
  };

  const handleAssignRow = (id: string) => {
    navigate(PATH_DASHBOARD.cagnotte.edit(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  useEffect(() => {
    dispatch(getAllCategoriesRequest({}));
  }, [dispatch, refresh]);

  useEffect(() => {
    if (categories?.length) {
      setCagnotteData(categories?.filter((item: { status: string }) => item?.status === 'ACTIVE'));
    }
  }, [categories]);

  return (
    <>
      <Helmet>
        <title> {translate('cagnotte.cagnottes')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('Categories')}
          links={[
            {
              name: translate('Dashboard'),
              href: PATH_DASHBOARD.general.homeComany,
            },
            {
              name: translate('Categories'),
              href: PATH_DASHBOARD.cagnotte.root,
            },
            {
              name: translate('list'),
            },
          ]}
          action={
            <Button
              to={PATH_DASHBOARD.cagnotte.new}
              component={RouterLink}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {translate('cagnotte.add_cagnotte')}
            </Button>
          }
        />

        <Card>
          <CategoryTableToolbar
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
                  <Tooltip title={translate('delete')}>
                    <IconButton color="primary" onClick={handleOpenConfirm}>
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
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
              <Scrollbar>
                <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
                        tableData
                          //  .filter((category) => category.isStandard === false)
                          .map((row: any) => row.id)
                      )
                    }
                  />

                  <TableBody>
                    {dataFiltered
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <CategoryTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onViewRow={() => handleAssignRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onListEmployeesRow={() => handleListemployeesRow(row.id)}
                        />
                      ))}
                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                    />
                    <TableNoData
                      isNotFound={isNotFound}
                      title={translate('empty_table.no_catgeory')}
                    />
                  </TableBody>
                </Table>
              </Scrollbar>
            )}
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
        title={translate('delete')}
        content={
          <>
            {translate('errors.Are_you_sure_to_delete')} <strong> {selected.length} </strong>{' '}
            {translate('cagnotte.cagnottes')}
          </>
        }
        action={
          <LoadingButton
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
            variant="contained"
            loading={isLoading}
          >
            {translate('yes')}
          </LoadingButton>
        }
      />
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
      (category) => category?.name?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1
    );
  }

  return inputData;
}
