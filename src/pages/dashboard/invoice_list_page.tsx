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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { fetchDataStart, updateDataStart } from 'src/redux/slices/dataSlice';
import { dispatch, RootState } from 'src/redux/store';
import * as XLSX from 'xlsx'; // Import xlsx library
import Iconify from '../../components/iconify';

interface RowData {
  id: number;
  nom: string;
  montantDemande: number;
  montantValide: number;
  date: string;
  categorie: string;
  amountAccepted: number;
  status: string;
}

export default function FacturationListPage() {
  const { themeStretch } = useSettingsContext();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [dense, setDense] = useState<boolean>(false);
  const [rows, setRows] = useState<RowData[]>([]);

  const { data = [], loading, error } = useSelector((state: RootState) => state.data);

  // Dispatch fetch data action
  useEffect(() => {
    if (selectedDate) {
      // Call the API with the selected date range when the date is chosen
      handleDateChange(selectedDate);
    }
  }, [selectedDate]);

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
        amountAccepted:
          item.EmployerAmountAccepted !== undefined && item.EmployerAmountAccepted !== null
            ? item.EmployerAmountAccepted // If it's defined, keep the value
            : 0, // Otherwise, set to 0
        status:
          item.EmployerStatus && item.EmployerStatus !== ''
            ? item.EmployerStatus // If it's defined and not empty, keep the value
            : 'STATUS', // Otherwise, set to 'PENDING'
      }));
      setRows(transformedRows); // Set rows with the transformed data
    } else {
      setRows([]); // If no data is returned, set the rows to empty
    }
  }, [data]);

  // Handle date change (start date = 26th of chosen month, end date = 25th of next month)
  const handleDateChange = (newDate: Date | null): void => {
    if (newDate) {
      setSelectedDate(newDate);
      const startDate = new Date(newDate);
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setDate(26);

      const formattedStartDate = startDate.toISOString().split('T')[0];

      const endDate = new Date(newDate);
      endDate.setDate(25);
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

  const handleStatusChange = (id: number, newStatus: string): void => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  };

  const handleAmountAcceptedChange = (id: number, newAmount: number): void => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, amountAccepted: newAmount } : row))
    );
  };

  // Function to download the table as an Excel file
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows); // Convert rows to a worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Facturation List'); // Append the worksheet to the workbook
    XLSX.writeFile(wb, 'Facturation_List.xlsx'); // Trigger the file download
  };
  
  const { updateLoading, updateStatus } = useSelector((state: RootState) => state.data);

  const handleSend = (id: number, amountAccepted: number, status: string) => {
    console.log("Sending data:", { id, amountAccepted, status });
    dispatch(updateDataStart({ id, amountAccepted, status }));
  };
  



  return (
    <>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadExcel}
          sx={{ mb: 2, ml: 'auto', display: 'flex' }}
          startIcon={<Iconify icon="solar:import-bold" />}
        >
          Download Excel
        </Button>

        <DatePicker
          label="Month"
          openTo="month"
          views={['month']}
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        
        />

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
              <TableContainer>
                <Table size={dense ? 'small' : 'medium'}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Montant demandé</TableCell>
                      <TableCell>Montant validé</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Catégorie</TableCell>
                      <TableCell>Amount Accepted</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.nom}</TableCell>
                        <TableCell>{row.montantDemande}</TableCell>
                        <TableCell>{row.montantValide}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.categorie}</TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={row.amountAccepted}
                            onChange={(e) =>
                              handleAmountAcceptedChange(row.id, parseFloat(e.target.value))
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={row.status}
                            onChange={(e) => handleStatusChange(row.id, e.target.value)}
                          >
                            <MenuItem value="ACCEPTED">Accepted</MenuItem>
                            <MenuItem value="REJECTED">Rejected</MenuItem>
                            <MenuItem value="PENDING">Pending</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary"
                          onClick={() => handleSend(row.id, row.amountAccepted, row.status )}>
                            Send
                          </Button>
                        </TableCell>
                      </TableRow>
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
          </>
        )}
      </Container>
    </>
  );
}
