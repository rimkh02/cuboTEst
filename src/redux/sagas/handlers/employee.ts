import { call, put } from 'redux-saga/effects';
import {
  requestGetAllEmployee,
  requestCreateEmployee,
  requestEditEmployee,
  requestDeleteEmployee,
  // requestDisableEmployee,
  // requestDisableEnableContract,
  requestCreateEmployees,
  requestGetInfoEmployee,
  requestEditContract,
  // requestDisableEmployee,
  requestDisableEnableContract,
  requestReportingEmployees,
} from '../requests/employee';

import {
  getAllEmployeeFailure,
  getAllEmployeeSuccess,
  createEmployeeFailed,
  createEmployeeSuccess,
  editEmployeeFailed,
  editEmployeeSuccess,
  deleteEmployeeFailed,
  deleteEmployeeSuccess,
  disableEmployeeSuccess,
  disableEmployeeFailed,
  editEmployeWithoutCategoryeSuccess,
  editEmployeeWithoutCategoryFailed,
  addEmployeesSuccess,
  addEmployeesFailed,
  getInfoEmployeeFailure,
  getInfoEmployeeSuccess,
  hasError,
  getEmployeesReportingFailure,
  getEmployeesReportingSuccess,
} from 'src/redux/slices/employee';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { requestAssignEmployeeToCategory } from '../requests/catrgories';
import moment from 'moment';
import { saveAs } from 'file-saver';

export function* handleGetAllEmployees(action: any): Generator<any, any, any> {
  const firstParams = {
    sizePage: 10,
    page: 1,
  };

  try {
    const response = yield call(requestGetAllEmployee, firstParams);
    let allEmployees = [];

    if (response.status === 200) {
      if (response.data.total > 0) {
        const n = Math.ceil(response.data.total / 500);
        for (let pageNumber = 1; pageNumber <= n; pageNumber++) {
          const paramsPage = {
            sizePage: 500,
            page: pageNumber,
          };
          const responseEmployeePage = yield call(requestGetAllEmployee, paramsPage);
          if (responseEmployeePage.status === 200) {
            if (responseEmployeePage.data.employees.length > 0) {
              for (let i = 0; i < responseEmployeePage.data.employees.length; i++) {
                allEmployees.push(responseEmployeePage.data.employees[i]);
              }
            }
          }
        }
        if (allEmployees.length !== 0) {
          yield put(getAllEmployeeSuccess(allEmployees));
        } else {
          yield put(getAllEmployeeSuccess(response.data.employees));
        }
      } else {
        yield put(getAllEmployeeSuccess([]));
      }
    }
  } catch (error) {
    yield put(getAllEmployeeFailure(error));
  }
}

export function* handleGetInfoEmployee(action: any): Generator<any, any, any> {
  const { id } = action.payload;

  try {
    const response = yield call(requestGetInfoEmployee, id);
    if (response.status === 200) {
      // yield put(getInfoEmployeeSuccess(response.data.employee));
      yield put(getInfoEmployeeSuccess(response.data));
    }
  } catch (error) {
    yield put(getInfoEmployeeFailure(error));
  }
}

export function* handleCreateEmployee(action: any): Generator<any, any, any> {
  const { data, dataContract, navigate, toast, translate } = action.payload;
  try {
    const response = yield call(requestCreateEmployee, data);
    if (response.status === 201 || response.status === 200) {
      navigate(PATH_DASHBOARD.employee.list);

      /*   const responseUpdated = yield call(
        requestEditContract,
        dataContract,
        response.data.employee.id,
        response.data.contract.id
      ); */
      // if (responseUpdated.status === 201 || responseUpdated.status === 200) {
      yield put(createEmployeeSuccess(response.data));

      toast(translate('create_success'), {
        variant: 'success',
      });
      //   }
      navigate(PATH_DASHBOARD.employee.list);
    }
  } catch (error) {
    toast(translate('errors.' + error.code), {
      variant: 'error',
    });
    yield put(createEmployeeFailed(error));
  }
}

export function* handleEditEmployee(action: any): Generator<any, any, any> {
  const { data, currentEmployee, navigate, toast, translate, categoryId, dataContract } =
    action.payload;
  try {
    const response = yield call(requestEditEmployee, data, currentEmployee.employee.id);
    if (response.status === 200) {
      const responseAssign = yield call(
        requestAssignEmployeeToCategory,
        categoryId,
        currentEmployee.employee.id,
        currentEmployee.contract.id
      );
      if (responseAssign.status === 200) {
        if (dataContract !== null) {
          const responseUpdated = yield call(
            requestEditContract,
            dataContract,
            response.data.employee.id,
            response.data.contract.id
          );
        }

        navigate(PATH_DASHBOARD.employee.list);
        yield put(editEmployeeSuccess(response.data));
        toast(translate('update_success'), {
          variant: 'success',
        });
      }
    }
  } catch (error) {
    yield put(editEmployeeFailed(error));
    toast(translate(`errors.${error.code}`), {
      variant: 'error',
    });
  }
}

export function* handleEditEmployeeWithoutCategory(action: any): Generator<any, any, any> {
  const { data, currentEmployee, navigate, toast, translate, dataContract } = action.payload;
  try {
    const response = yield call(requestEditEmployee, data, currentEmployee.employee.id);
    if (response.status === 200) {
      if (dataContract !== null) {
        const responseUpdated = yield call(
          requestEditContract,
          dataContract,
          response.data.employee.id,
          response.data.contract.id
        );
      }
      toast(translate('update_success'), {
        variant: 'success',
      });
      yield put(editEmployeWithoutCategoryeSuccess(response.data));
      navigate(PATH_DASHBOARD.employee.list);
    }
  } catch (error) {
    yield put(editEmployeeWithoutCategoryFailed(error));
    toast(translate(`errors.${error.code}`), {
      variant: 'error',
    });
  }
}

export function* handleDeleteEmployee(action: any): Generator<any, any, any> {
  try {
    const { selected, translate, toast } = action.payload;
    for (let i = 0; i < selected.length; i++) {
      const id = selected[i];
      const response = yield call(requestDeleteEmployee, id);
      if (response.status === 200) {
        yield put(deleteEmployeeSuccess(response.data));
        toast(translate('Success_message.successfully_deleted'), {
          variant: 'success',
        });
      }
    }
  } catch (error) {
    yield put(deleteEmployeeFailed(error));
  }
}

/* export function* handleDisableEmployee(action: any): Generator<any, any, any> {
  try {
    const { id, translate, toast, data } = action.payload;
    const response = yield call(requestDisableEmployee, id, data);

    if (response.status === 200) {
      yield put(disableEmployeeSuccess(response.data));
      if (response.data.employee.companyLinkingDisabled) {
        toast(translate('Success_message.successfully_disable'), {
          variant: 'success',
        });
      } else {
        toast(translate('Success_message.successfully_enable'), {
          variant: 'success',
        });
      }
    }
  } catch (error) {
    yield put(disableEmployeeFailed(error));
  }
} */

export function* handleChangeStatusContract(action: any): Generator<any, any, any> {
  try {
    const { id, translate, toast, data } = action.payload;
    // const response = yield call(requestDisableEmployee, id, data);
    const response = yield call(requestDisableEnableContract, id, data);

    if (response.status === 200) {
      yield put(disableEmployeeSuccess(response.data));
      //if (!response.data.employee.companyLinkingDisabled) {
      if (response.data.contract.companyLinkingDisabled) {
        toast(translate('Success_message.successfully_disable'), {
          variant: 'success',
        });
      } else {
        toast(translate('Success_message.successfully_enable'), {
          variant: 'success',
        });
      }
    }
  } catch (error) {
    yield put(disableEmployeeFailed(error));
  }
}

// for emplyees import
export function* handleAddEmployees(action: any): Generator<any, any, any> {
  const { data, toast, translate, onClose, next } = action.payload;
  try {
    const response = yield call(requestCreateEmployees, data);
    if (response.status === 201 || response.status === 200) {
      yield put(addEmployeesSuccess(response.data));

      if (response.data.createdEmployees.length !== 0) {
        toast(translate('create_success'), {
          variant: 'success',
        });
      }
      // onClose();
      next();
    }
  } catch (error) {
    //  toast(translate('errors.' + error.code), {
    toast(translate('errors.invalid_CSV_format'), {
      variant: 'error',
    });
    yield put(addEmployeesFailed(error));
  }
}

// Reporting employees
export function* handleReportingEmployees(action: any): Generator<any, any, any> {
  try {
    const { data, onClose } = action.payload;
    const response = yield call(requestReportingEmployees, data);
    if (response.status === 200) {
      yield put(getEmployeesReportingSuccess(response.data));
      saveAs(response.data, `Salariés-${moment().format('DD-MM-YYYY')}.zip`);
      yield put(getEmployeesReportingSuccess(response.data));
      /* const csvContent = response.data;
      const blob = new Blob([csvContent], { type: 'text/xls;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${Date.now()}.csv`;
      link.click();
      window.URL.revokeObjectURL(url); */
      if (onClose) {
        onClose();
      }
    } else {
      const { error } = response.data;
      yield put(getEmployeesReportingFailure(error));
    }
  } catch (error) {
    yield put(getEmployeesReportingFailure(error));

    yield put(
      hasError({
        message: error.message,
        data: error.data,
        error: error.error,
      })
    );
  }
}
