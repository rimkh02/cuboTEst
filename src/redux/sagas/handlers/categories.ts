import { call, put } from 'redux-saga/effects';
import {
  requestGetAllCategories,
  requestCreateCategory,
  requestEditCategory,
  requestAssignEmployeeToCategory,
  requestAssignEmployeeToCategoryStandard,
  requestDeleteCategory,
  requestGetCategory,
} from '../requests/catrgories';

import {
  hasError,
  getAllCagnotteFailure,
  getAllCagnotteSuccess,
  createCagnotteFailed,
  createCagnotteSuccess,
  editCagnotteFailed,
  editCagnotteSuccess,
  UnAssignEmployeeToCagnotteFailed,
  UnAssignEmployeeToCagnotteSuccess,
  deleteCategorySuccess,
  deleteCategoryFailed,
  AssignEmployeeToCagnotteSuccess,
  AssignEmployeeToCagnotteFailed,
  getCategorySuccess,
  getCategoryFailure,
} from 'src/redux/slices/categories';
import { PATH_DASHBOARD } from 'src/routes/paths';

export function* handleGetAllCategories(action: any): Generator<any, any, any> {
  try {
    const response = yield call(requestGetAllCategories);
    if (response.status === 200) {
      yield put(getAllCagnotteSuccess(response.data.categories));
    } else {
      const { error } = response.data;
      yield put(getAllCagnotteFailure(error));
    }
  } catch (error) {
    yield put(
      hasError({
        message: error.message,
        data: error.data,
        error: error.error,
      })
    );
  }
}

export function* handleGetCategory(action: any): Generator<any, any, any> {
  const { id } = action.payload;

  try {
    const response = yield call(requestGetCategory, id);
    if (response.status === 200) {
      yield put(getCategorySuccess(response.data.category));
    }
  } catch (error) {
    yield put(getCategoryFailure(error));
  }
}

export function* handleCreateCategory(action: any): Generator<any, any, any> {
  const { dataToSend, translate, toast, navigate } = action.payload;

  try {
    const response = yield call(requestCreateCategory, dataToSend);
    if (response.status === 201 || response.status === 200) {
      yield put(createCagnotteSuccess(response.data));
      toast(translate('Success_message.create_success'), {
        variant: 'success',
      });
      navigate(PATH_DASHBOARD.cagnotte.list);
    }
  } catch (error) {
    toast(translate('errors.' + error.code), {
      variant: 'error',
    });
    yield put(createCagnotteFailed(error));
  }
}
export function* handleEditCategory(action: any): Generator<any, any, any> {
  const { dataToSend, id, navigate, toast, translate } = action.payload;
  try {
    const response = yield call(requestEditCategory, dataToSend, id);
    if (response.status === 200) {
      yield put(editCagnotteSuccess(response.data));
      toast(translate('Success_message.update_success'), {
        variant: 'success',
      });
      navigate(PATH_DASHBOARD.cagnotte.list);
    }
  } catch (error) {
    toast(translate('errors_categories.' + error.code), {
      variant: 'error',
    });
    yield put(editCagnotteFailed(error));
  }
}

export function* handleDeleteCategory(action: any): Generator<any, any, any> {
  const { id, toast, translate, selected } = action.payload;

  try {
    if (selected.length !== 0) {
      for (let i = 0; i < selected.length; i++) {
        const response = yield call(requestDeleteCategory, selected[i]);
        if (response.status === 200) {
          toast(translate('Success_message.successfully_deleted'), {
            variant: 'success',
          });
          yield put(deleteCategorySuccess(response.data));
        }
      }
    } else {
      const response = yield call(requestDeleteCategory, id);
      if (response.status === 200) {
        toast(translate('Success_message.successfully_deleted'), {
          variant: 'success',
        });
        yield put(deleteCategorySuccess(response.data));
      }
    }
  } catch (error) {
    toast(translate('errors.error'), {
      variant: 'error',
    });

    yield put(deleteCategoryFailed(error));
  }
}

export function* handleAssignEmpoyeeToCategory(action: any): Generator<any, any, any> {
  const { cagnotteId, toast, translate, selected, onClose } = action.payload;

  try {
    for (let i = 0; i < selected.length; i++) {
      const employeeId = selected[i].id;
      const contractId = selected[i].contract.id;

      const response = yield call(
        requestAssignEmployeeToCategory,
        cagnotteId,
        employeeId,
        contractId
      );
      if (response.status === 200) {
        yield put(AssignEmployeeToCagnotteSuccess(response.data));
        toast(translate('assign.assigned_employee'), {
          variant: 'success',
        });
        onClose();
      }
    }
  } catch (error) {
    yield put(AssignEmployeeToCagnotteFailed(error));
    toast(translate('error'), {
      variant: 'error',
    });
  }
}
/* export function* handleAssignOneEmpoyeeToCategory(action: any): Generator<any, any, any> {
  const { cagnotteId, employeeId } = action.payload;

  try {
    const response = yield call(requestAssignEmployeeToCategory, cagnotteId, employeeId);
    if (response.status === 200) {
      yield put(AssignEmployeeToCagnotteSuccess(response.data));
    }
  } catch (error) {
    yield put(AssignEmployeeToCagnotteFailed(error));
  }
} */

export function* handleAssignEmployeeToCategoryStandard(action: any): Generator<any, any, any> {
  try {
    const { toast, translate, selected, onClose } = action.payload;

    for (let i = 0; i < selected.length; i++) {
      const employeeId = selected[i].id;
      const contractId = selected[i].contract.id;

      const response = yield call(requestAssignEmployeeToCategoryStandard, employeeId, contractId);

      if (response.status === 200) {
        yield put(UnAssignEmployeeToCagnotteSuccess(response.data));
        toast(translate('assign.unassigned_employee'), {
          variant: 'success',
        });
        onClose();
      }
    }
  } catch (error) {
    yield put(UnAssignEmployeeToCagnotteFailed(error));
  }
}
