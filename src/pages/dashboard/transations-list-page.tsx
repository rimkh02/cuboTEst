import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  Box,
  CircularProgress,
} from '@mui/material';
// utils
import { fTimestamp } from 'src/utils/formatTime';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { TTransation } from 'src/@types/transations';
// components
import Scrollbar from '../../components/scrollbar';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableNoData,
} from '../../components/table';
// locales
import { useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getTransations } from 'src/redux/slices/transations';
// sections
import TransationTableRow from 'src/sections/@dashboard/transations/transation-table-row';
import TransactionTableToolbar from 'src/sections/@dashboard/transations/transation-table-toolbar';

// ----------------------------------------------------------------------

export default function TransationsListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,

    //
    selected,
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

  const { transations, isLoading } = useSelector((state) => state.transation);

  const TABLE_HEAD = [
    { id: 'reloadAdvantageType', label: translate('TransationsPage.type'), align: 'center' },
    { id: 'amount', label: translate('facturationPage.fields.amount'), align: 'center' },
    { id: 'reloadMonth', label: translate('facturationPage.fields.Month'), align: 'center' },
    { id: 'createdAt', label: 'Date', align: 'center' },
    { id: '', align: 'center' },
  ];

  const ADVANTAGES_OPTIONS = [
    { label: translate('all'), value: 'all' },
    { label: translate('avantages.billets_restaurant'), value: 'RESTAURANT' },
    { label: translate('avantages.Culture'), value: 'CULTURE' },
    { label: translate('avantages.Sport'), value: 'SPORT' },
    { label: translate('avantages.Holidays'), value: 'HOLIDAYS' },
    { label: translate('avantages.Personal_assistance'), value: 'HELP' },
    { label: translate('avantages.Gifts'), value: 'GIFT' },
    { label: translate('avantages.Mobility'), value: 'MOBILITY' },
    { label: translate('avantages.Telework'), value: 'REMOTE' },
  ];
  const [tableData, setTableData] = useState<any[]>([]);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterAdvantage, setFilterAdvantage] = useState('all');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterStartDate,
    filterAdvantage,
    sortedBy: orderBy,
    orderType: order,
  });

  const denseHeight = dense ? 52 : 72;

  const isFiltered = !!filterStartDate || filterAdvantage !== 'all';

  const isNotFound = !dataFiltered.length;

  const handleViewRow = (id: number) => {
    navigate(PATH_DASHBOARD.transations.view(paramCase(id.toString())));
  };

  const handleResetFilter = () => {
    setFilterStartDate(null);
    setFilterAdvantage('all');
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAdvantage(event.target.value);
  };

  useEffect(() => {
    dispatch(getTransations({}));
  }, [dispatch]);

  useEffect(() => {
    if (transations?.length) {
      setTableData(transations);
    }
  }, [transations]);

  return (
    <>
      <Helmet>
        <title> {translate('TransationsPage.titlePage')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('TransationsPage.titlePage')}
          links={[
            { name: translate('Dashboard'), href: PATH_DASHBOARD.general.homeComany },
            { name: translate('Transations'), href: PATH_DASHBOARD.transations.root },
            { name: translate('list') },
          ]}
        />

        <Card>
          <TransactionTableToolbar
            isFiltered={isFiltered}
            filterAdvantage={filterAdvantage}
            optionsAdvantages={ADVANTAGES_OPTIONS}
            filterStartDate={filterStartDate}
            onResetFilter={handleResetFilter}
            onFilterAdvantage={handleFilterRole}
            onFilterStartDate={(newValue) => {
              const createDate = new Date(newValue!);
              setFilterStartDate(createDate);
            }}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
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
                  />

                  <TableBody>
                    {dataFiltered

                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: TTransation) => (
                        <TransationTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id.toString())}
                          onViewRow={() => handleViewRow(row.id)}
                        />
                      ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                    />

                    <TableNoData
                      isNotFound={isNotFound}
                      title={translate('TransationsPage.no_data')}
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
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterStartDate,
  filterAdvantage,
  sortedBy,
  orderType,
}: {
  inputData: TTransation[];
  comparator: (a: any, b: any) => number;
  filterStartDate: Date | null;
  filterAdvantage: string;
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

  if (filterStartDate instanceof Date) {
    inputData = inputData.filter((transation) => {
      const createDate = new Date(transation?.reloadMonth);
      return fTimestamp(createDate.getMonth()) === fTimestamp(filterStartDate.getMonth());
    });
  }

  if (filterAdvantage !== 'all') {
    inputData = inputData.filter((user) => user.reloadAdvantageType === filterAdvantage);
  }

  if (sortedBy === 'reloadAdvantageType') {
    inputData = inputData
      .slice()
      .sort((a, b) =>
        orderType === 'asc'
          ? a?.reloadAdvantageType?.localeCompare(b?.reloadAdvantageType)
          : b?.reloadAdvantageType?.localeCompare(a?.reloadAdvantageType)
      );
  }
  return inputData;
}
