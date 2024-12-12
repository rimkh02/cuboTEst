import { useMemo, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// components
import FormProvider from '../../../components/hook-form';
import { useSnackbar } from 'notistack';
// sections
import CategoryNewEditDetails from './category-new-edit-details';
import CategoryNewEditStatus from './category-new-edit-status';
// utils
import { ADVANTAGE_TYPE } from 'src/utils/const';
// locales
import { useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { createCagnotteRequest, editCagnotteRequest } from 'src/redux/slices/categories';
import { getPlafondsAdvantagesRequest } from 'src/redux/slices/settings';
// ----------------------------------------------------------------------

interface FormValuesProps {
  items: any;
  name: string | null;
}
interface Advantage {
  type: string;
  yearlyLimit: number | null;
}
interface Advantage2 {
  type: string;
  yearlyLimit: number | null;
  facialValue: number;
  facialValueCoveragePercent: number;
}

type Props = {
  isEdit?: boolean;
  currentCategory?: any;
};

export default function CategoryNewEditForm({ isEdit, currentCategory }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoadingAction } = useSelector((state) => state.categories);
  const { company } = useSelector((state) => state.auth);
  const { plafonds } = useSelector((state) => state.settings);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string()
      .nullable()
      .required(translate('cagnotte.name_required'))
      .max(20, translate('cagnotte.name_length')),
    /* startPeriod: Yup.mixed<any>().nullable().required(translate('cagnotte.startPeriod')),
    endPeriod: Yup.mixed<any>()
      .nullable()
      .required(translate('cagnotte.endPeriod'))
      .test(
        'startPeriod',
        translate('cagnotte.end_later_start'),
        (value, { parent }) => moment(value) >= moment(parent.startPeriod)
      ), */
    items: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required(translate('cagnotte.advantage_required')),

        yearlyLimit: Yup.mixed()
          .test('is-number-or-empty', translate('invalid_value'), (value) => {
            if (value === '' || value === undefined || value === null) {
              return true;
            }
            return !isNaN(value);
          })

          .test({
            name: 'max',
            test: function (value) {
              const type = this.parent?.type;
              if (type && type !== '') {
                const maxLimits: { [key: string]: number } = {
                  CULTURE: plafonds !== null ? plafonds?.CULTURE : 999999,
                  SPORT: plafonds !== null ? plafonds?.SPORT : 999999,
                  HOLIDAYS: plafonds !== null ? plafonds?.HOLIDAYS : 999999,
                  HELP: plafonds !== null ? plafonds?.HELP : 999999,
                  GIFT: plafonds !== null ? plafonds.GIFT : 999999,
                  MOBILITY: plafonds !== null ? plafonds?.MOBILITY : 999999,
                  REMOTE: plafonds !== null ? plafonds?.REMOTE : 999999,
                };

                const maxLimit = maxLimits[type];

                if (!isNaN(value) && value > maxLimit) {
                  return this.createError({
                    message: `${translate('cagnotte.yearlyLimitMax')} ${
                      maxLimit ? maxLimit : 999999
                    }`,
                  });
                }
              }

              return true;
            },
          }),
      })
    ),
    /* items: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required(translate('cagnotte.advantage_required')),
        yearlyLimit: Yup.mixed().test('is-number-or-empty', translate('invalid_value'), (value) => {
          if (value === '' || value === null) {
            return true;
          }
          return !isNaN(value);
        }), */

    /* yearlyLimit: Yup.number()
          .required(translate('cagnotte.required'))
          // .nullable()
          .typeError(translate('cagnotte.required'))
          .moreThan(0, translate('cagnotte.Must_be_more_than'))
          .max(99999, translate('cagnotte.Must_be_less_than')), */
    //  })
    //  ),
  });

  const defaultValues = useMemo(
    () => ({
      items: currentCategory?.advantages?.filter(
        (advantage: any) => advantage?.type !== ADVANTAGE_TYPE.restaurant
      ) || [{ type: '', yearlyLimit: null }],
      name: currentCategory?.name || '',
     // startPeriod: null,
     // endPeriod: null,
      isStandard: currentCategory?.isStandard,
    }),
    [currentCategory]
  );

  const methods = useForm<FormValuesProps>({
    mode: 'onChange',
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (isEdit && currentCategory) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCategory]);

  /* useEffect(() => {
    dispatch(getPlafondsAdvantagesRequest());
  }, [dispatch]); */

  const handleCreateAndSend = async (data: FormValuesProps) => {
    const allAvantages: any = [];

    const dataToSend = {
      name: data.name,
      advantages: allAvantages,
    };

    const advRESTAURANT2: Advantage2 = {
      type: 'RESTAURANT',
      yearlyLimit: null,
      facialValue: company?.ticketRestaurantFacialValue,
      facialValueCoveragePercent: company?.ticketRestaurantFacialValueCoveragePercent,
    };

    dataToSend.advantages.push(advRESTAURANT2);

    data.items.forEach((element: { yearlyLimit: string; type: string }) => {
      const adv: Advantage = {
        type: element.type,
        yearlyLimit: parseInt(element.yearlyLimit),
      };
      dataToSend.advantages.push(adv);
    });

    if (!isEdit) {
      dispatch(
        createCagnotteRequest({
          dataToSend,
          navigate: navigate,
          translate,
          toast: enqueueSnackbar,
        })
      );
    } else {
      dispatch(
        editCagnotteRequest({
          dataToSend,
          navigate: navigate,
          id: currentCategory.id,
          translate,
          toast: enqueueSnackbar,
        })
      );
    }
  };

  return (
    <>
      <FormProvider methods={methods}>
        <Card>
          <CategoryNewEditStatus />
          <CategoryNewEditDetails />
        </Card>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton
            size="large"
            variant="contained"
            loading={isLoadingAction}
            onClick={handleSubmit(handleCreateAndSend)}
          >
            {translate('save')}
          </LoadingButton>
        </Stack>
      </FormProvider>
      {/* <MadalConfigurationRepas open={openConfirmRepas} onClose={handleCloseConfirmRepas} /> */}
    </>
  );
}
