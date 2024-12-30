import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  Container,
  Box,
  CircularProgress,
  TextField,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  MenuItem,
  Select,
  Button,
  Typography,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import {
  fetchDatacsvStart,
  fetchDatapdfStart,
  fetchDataStart,
  hideSnackbar,
  notificationSend,
  updateDataStart,
} from 'src/redux/slices/dataSlice';
import { dispatch, RootState } from 'src/redux/store';
import * as XLSX from 'xlsx'; // Import xlsx library
import Iconify from '../../components/iconify';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { requestnotificationSend } from 'src/redux/sagas/requests/dataSaga';
import Snackbar from '@mui/material/Snackbar';

interface RowData {
  id: number;
  nom: string;
  montantDemande: number;
  montantValide: number;
  date: string;
  categorie: string;
  amountAccepted: number;
  status: string;
  registrationNumber: number;
  position: string;
  category: string;
  firstname: string;
  lastname: string;
  totalAmount: number;
  totalAmountAccepted: number;
  totalAmountAcceptedByEmployer: number;
  new_employees_subscription_amount: number;
  refund_management_fees: number;
  total: number;
  employeeExpensesStatus: string;
}
interface GroupedData {
  personName: string;
  expenses: RowData[];
}

export default function FacturationListPage() {
  const { themeStretch } = useSettingsContext();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [dense, setDense] = useState<boolean>(false);
  const [rows, setRows] = useState<RowData[]>([]);
  const [groupedRows, setGroupedRows] = useState<GroupedData[]>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const { data = [], loading, error } = useSelector((state: RootState) => state.data);

  // Dispatch fetch data action
  useEffect(() => {
    if (selectedDate) {
      // Call the API with the selected date range when the date is chosen
      handleDateChange(selectedDate);
    }
  }, [selectedDate]);

  const handleToggleExpand = (personName: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [personName]: !prev[personName],
    }));
  };

  // Transform API data and set rows
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const transformedRows = data.map((item) => ({
        id: item.expenseId,
        nom: `${item.lastName} ${item.firstName}`,
        montantDemande: item.amount,
        montantValide: item.amountAccepted,
        date: new Date(item.date).toLocaleDateString(),
        categorie: item.advantage,
        category: item.category,
        position: item.position,
        registrationNumber: item.registrationNumber,
        firstname: item.firstName,
        lastname: item.lastName,
        amountAccepted:
          item.EmployerAmountAccepted !== undefined && item.EmployerAmountAccepted !== null
            ? item.EmployerAmountAccepted // If it's defined, keep the value
            : 0, // Otherwise, set to 0
        status:
          item.EmployerStatus && item.EmployerStatus !== ''
            ? item.EmployerStatus // If it's defined and not empty, keep the value
            : 'ACCEPTED', // Otherwise, set to 'PENDING'
        totalAmount: item.totalAmount,
        totalAmountAccepted: item.totalAmountAccepted,
        totalAmountAcceptedByEmployer: item.totalAmountAcceptedByEmployer,
        new_employees_subscription_amount: item.new_employees_subscription_amount,
        refund_management_fees: item.refund_management_fees,
        total: item.total,
        employeeExpensesStatus: item.employeeExpensesStatus,
      }));
      setRows(transformedRows); // Set rows with the transformed data
      const groupedData = transformedRows.reduce((acc: GroupedData[], expense) => {
        const existingGroup = acc.find((group) => group.personName === expense.nom);
        // const existingGroup = acc.find((group) => group.position === expense.position);
        if (existingGroup) {
          existingGroup.expenses.push(expense);
        } else {
          acc.push({ personName: expense.nom, expenses: [expense] });
        }
        return acc;
      }, []);

      setGroupedRows(groupedData);
    } else {
      setRows([]);
      setGroupedRows([]);
    }
  }, [data]);
  console.log('the data:', data);

  // Handle date change (start date = 26th of chosen month, end date = 25th of next month)
  const handleDateChange = (newDate: Date | null): void => {
    if (newDate) {
      setSelectedDate(newDate);
      const startDate = new Date(newDate);
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setDate(25);

      const formattedStartDate = startDate.toISOString().split('T')[0];

      const endDate = new Date(newDate);
      endDate.setDate(24);
      const formattedEndDate = endDate.toISOString().split('T')[0];

      console.log('startttttdaaateee:', formattedStartDate);
      console.log('enddddddateeee:', formattedEndDate);

      // Dispatch the fetch action
      dispatch(fetchDataStart({ startDate: formattedStartDate, endDate: formattedEndDate }));
    } else {
      setSelectedDate(null);
    }
  };

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (id: number, newStatus: string): Promise<void> => {
    setUpdating(true);

    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );

    dispatch(updateDataStart({ id, status: newStatus }));

    if (selectedDate) {
      setSelectedDate(selectedDate);
      console.log('inside the if-statement for selectedDate!!');

      const startDate = new Date(selectedDate);
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setDate(25);
      const formattedStartDate = startDate.toISOString().split('T')[0];

      const endDate = new Date(selectedDate);
      endDate.setDate(24);
      const formattedEndDate = endDate.toISOString().split('T')[0];

      dispatch(fetchDataStart({ startDate: formattedStartDate, endDate: formattedEndDate }));
      console.log('inside the if-statement fetchDataStart: ', data);
      window.location.reload();
    }

    setUpdating(false);
  };

  const handleAmountAcceptedChange = (id: number, newAmount: number): void => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, amountAccepted: newAmount } : row))
    );
  };

  const { updateLoading, updateStatus } = useSelector((state: RootState) => state.data);

  // const handleSend = (id: number, status: string) => {
  //   console.log('Sending data:', { id, status });
  //   dispatch(updateDataStart({ id, status }));
  // };

  const handleDownloadCSV = (): void => {
    if (selectedDate) {
      const startDate = new Date(selectedDate);
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setDate(25);
      const formattedStartDate = startDate.toISOString().split('T')[0];

      const endDate = new Date(selectedDate);
      endDate.setDate(24);
      const formattedEndDate = endDate.toISOString().split('T')[0];

      console.log('Downloading CSV for:', formattedStartDate, formattedEndDate);

      dispatch(fetchDatacsvStart({ startDate: formattedStartDate, endDate: formattedEndDate }));
    } else {
      console.error('No date selected');
    }
    // window.location.reload();
  };
  const handleDownloadPDF = (): void => {
    console.log('Downloading PDF');
    dispatch(fetchDatapdfStart());
    // window.location.reload();
  };
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    id: number | null;
    newStatus: string | null;
  }>({ open: false, id: null, newStatus: null });

  const handleStatusChangeRequest = (id: number, newStatus: string): void => {
    setConfirmationDialog({ open: true, id, newStatus });
  };

  const handleDialogClose = (confirm: boolean): void => {
    if (confirm && confirmationDialog.id !== null && confirmationDialog.newStatus) {
      // Dispatch action and update all data
      handleStatusChange(confirmationDialog.id, confirmationDialog.newStatus);
    }
    setConfirmationDialog({ open: false, id: null, newStatus: null });

  };

  const handleSendNotification = () => {
    if (selectedDate) {
      const startDate = new Date(selectedDate);
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setDate(25);
      const formattedStartDate = formatDate(startDate);

      const endDate = new Date(selectedDate);
      endDate.setDate(24);
      const formattedEndDate = formatDate(endDate);

      console.log('Sending notification:', formattedStartDate, formattedEndDate);

      // Dispatch action with the formatted start and end dates
      dispatch(notificationSend({ startDate: formattedStartDate, endDate: formattedEndDate }));
    } else {
      console.error('No date selected');
    }
  };

  // Helper function to ensure date is in correct format
  const formatDate = (date: Date) => {
    // Ensure date is formatted as 'YYYY-MM-DD'
    return date.toISOString().split('T')[0];
  };
  const snackbar = useSelector((state: any) => state.data.snackbar);

  const handleCloseSnackbar = () => {
    dispatch(hideSnackbar()); // Hide snackbar after the message is displayed
  };

  return (
    <div>
      <Helmet>
        <title>Facturation List Page</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Facturation List"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Facturation', href: '/facturation' },
            { name: 'List' },
          ]}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <DatePicker
            label="Month"
            openTo="month"
            views={['month']}
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="MMMM yyyy"
          />

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Alert onClose={handleCloseSnackbar} severity="error">
              {snackbar.message}
            </Alert>
          </Snackbar>

          <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDownloadCSV()}
              sx={{ mb: 2 }}
              startIcon={<Iconify icon="solar:import-bold" />}
            >
              Download CSV
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDownloadPDF()}
              sx={{ mb: 2 }}
              startIcon={<Iconify icon="solar:import-bold" />}
            >
              Download PDF
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : rows.length === 0 ? (
          // If no rows are found, display a message
          <Typography variant="h6" sx={{ mt: 3, textAlign: 'center' }}>
            No data available for the selected date range.
          </Typography>
        ) : (
          <>
            <Card sx={{ mt: 3 }}>
              <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                <Table size={dense ? 'small' : 'medium'}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Matricule</TableCell>
                      <TableCell>Nom</TableCell>
                      <TableCell >Montant demandé</TableCell>
                      <TableCell >Montant validé</TableCell>
                      <TableCell >
                        validé par société
                      </TableCell>
                      <TableCell sx={{ minWidth: 70 }}>
                        Abonnement
                      </TableCell>
                      <TableCell >frais de gestion</TableCell>
                      <TableCell >Total</TableCell>
                      <TableCell >Status</TableCell>
                      <TableCell ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupedRows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((group, index) => (
                        <>
                          {/* Render the first expense row */}
                          <TableRow key={group.personName + index}>
                            {/* <TableCell>{group.expenses[0]?.firstname}</TableCell> */}
                            {/* <TableCell>{group.expenses[0]?.lastname}</TableCell> */}
                            <TableCell>{group.expenses[0]?.registrationNumber}</TableCell>
                            <TableCell>{group.personName}</TableCell>
                            {/* <TableCell>{group.expenses[0]?.position}</TableCell> */}
                            {/* <TableCell>{group.expenses[0]?.category}</TableCell> */}
                            <TableCell>{group.expenses[0]?.totalAmount}</TableCell>
                            <TableCell>{group.expenses[0]?.totalAmountAccepted}</TableCell>
                            <TableCell>
                              {group.expenses[0]?.totalAmountAcceptedByEmployer}
                            </TableCell>
                            <TableCell>
                              {group.expenses[0]?.new_employees_subscription_amount}
                            </TableCell>
                            <TableCell>{group.expenses[0]?.refund_management_fees}</TableCell>
                            <TableCell>{group.expenses[0]?.total}</TableCell>
                            <TableCell
                              sx={{
                                color:
                                  group.expenses[0]?.employeeExpensesStatus === 'REJECTED'
                                    ? 'red'
                                    : group.expenses[0]?.employeeExpensesStatus === 'ACCEPTED'
                                    ? 'green'
                                    : group.expenses[0]?.employeeExpensesStatus === 'MODIFIED'
                                    ? 'blue'
                                    : 'inherit',
                                fontWeight: 'bold',
                              }}
                            >
                              {group.expenses[0]?.employeeExpensesStatus}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton onClick={() => handleToggleExpand(group.personName)}>
                                {expandedRows[group.personName] ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </IconButton>
                            </TableCell>
                          </TableRow>

                          {/* Render additional expenses when expanded */}
                          <TableRow>
                            <TableCell colSpan={8} sx={{ p: 0 }}>
                              <Collapse
                                in={expandedRows[group.personName]}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Table
                                  size="small"
                                  sx={{
                                    width: '108%',
                                    marginLeft: '10%',
                                    backgroundColor: '#F9FAFB',
                                  }}
                                >
                                  <TableHead>
                                    <TableRow sx={{ backgroundColor: '#F4F6F8' }}>
                                      {/* <TableCell></TableCell> */}
                                      {/* <TableCell></TableCell> */}
                                      <TableCell>Montant demandé</TableCell>
                                      <TableCell>Montant validé</TableCell>
                                      <TableCell>Date</TableCell>
                                      <TableCell>Avantages</TableCell>
                                      {/* <TableCell>Amount Accepted</TableCell> */}
                                      <TableCell>Status</TableCell>
                                      {/* <TableCell></TableCell> */}
                                      {/* <TableCell>Action</TableCell> */}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {group.expenses.slice(0).map((expense) => (
                                      <TableRow key={expense.id}>
                                        <TableCell>{expense.montantDemande}</TableCell>
                                        <TableCell>{expense.montantValide}</TableCell>
                                        <TableCell>{expense.date}</TableCell>
                                        <TableCell>{expense.categorie}</TableCell>
                                        <TableCell>
                                          <Select
                                            value={expense.status}
                                            onChange={(e) =>
                                              handleStatusChangeRequest(expense.id, e.target.value)
                                            }
                                            // disabled={expense.status === 'PENDING'} // Disable dropdown when status is PENDING
                                            // sx={{
                                            //   '& .MuiSelect-select': {
                                            //     color:
                                            //       expense.status === 'PENDING'
                                            //         ? 'rgba(255, 0, 0, 0.2)'
                                            //         : 'inherit', // Transparent red text when PENDING
                                            //     borderColor:
                                            //       expense.status === 'PENDING'
                                            //         ? 'rgba(255, 0, 0, 0.2)'
                                            //         : 'inherit', // Transparent red border
                                            //   },
                                            //   '& .MuiOutlinedInput-notchedOutline': {
                                            //     borderColor:
                                            //       expense.status === 'PENDING'
                                            //         ? 'rgba(255, 0, 0, 0.2)'
                                            //         : 'grey',
                                            //   },
                                            //   '&.Mui-disabled': {
                                            //     color: 'rgba(255, 0, 0, 0.2)',
                                            //     '& .MuiOutlinedInput-notchedOutline': {
                                            //       borderColor: 'rgba(255, 0, 0, 0.2)',
                                            //     },
                                            //     '& .MuiSelect-select': {
                                            //       color: 'rgba(255, 0, 0, 0.2) !important',
                                            //     },
                                            //   },
                                            // }}
                                          >
                                            <MenuItem value="ACCEPTED" sx={{ color: '#55baaa' }}>
                                              Accept
                                            </MenuItem>
                                            <MenuItem value="PENDING" sx={{ color: 'red' }}>
                                              Reject
                                            </MenuItem>
                                          </Select>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendNotification}
                disabled={loading}
                sx={{ m: 2 }}
              >
                {loading ? 'Sending...' : 'Send Notification'}
              </Button>
            </Box>
            <Dialog
              open={confirmationDialog.open}
              onClose={() => setConfirmationDialog({ open: false, id: null, newStatus: null })}
            >
              <DialogTitle>Confirm Status Change</DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to change the status of this item to{' '}
                  {confirmationDialog.newStatus}?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDialogClose(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleDialogClose(true)} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Container>
    </div>
  );
}
