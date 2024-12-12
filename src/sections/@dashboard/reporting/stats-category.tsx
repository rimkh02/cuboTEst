import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
// @mui
import { Card, CardHeader, Box, CardProps } from '@mui/material';
import Chart, { useChart } from 'src/components/chart';
import { CustomSmallSelect } from 'src/components/custom-input';

// locales
import { useLocales } from 'src/locales';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getStatsUsageCategory } from 'src/redux/slices/statsiqtique';
import { getAllCategoriesRequest } from 'src/redux/slices/categories';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    options?: ApexOptions;
  };
}

export default function StatsCategory({ title, subheader, chart, ...other }: Props) {
  const { colors, options } = chart;
  const dispatch = useDispatch();
  const { usageCategory } = useSelector((state) => state.statistiques);
  const { translate } = useLocales();
  interface DataPoint {
    name: string;
    data: number[];
  }
  const [stat, setStat] = useState<DataPoint[]>([
    {
      name: translate('statsPage.used'),
      data: [],
    },
    {
      name: translate('statsPage.available'),
      data: [],
    },
  ]);

  const chartOptions = useChart({
    chart: {
      stacked: true,
    },
    colors,
    xaxis: {
      categories: [
        translate('avantages.billets_restaurant'),
        translate('avantages.Culture'),
        translate('avantages.Sport'),
        translate('avantages.Holidays'),
        translate('avantages.Personal_assistance'),
        translate('avantages.Mobility'),
        translate('avantages.Telework'),
        translate('avantages.Gifts'),
      ],
    },
    tooltip: {
      y: {
        //formatter: (value: number) => fCurrency(value),
        formatter: (value: number) => value.toString(),
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    },
    ...options,
  });

  const handleGetStatCategory = (id: string) => {
    dispatch(getStatsUsageCategory({ id }));
  };

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategoriesRequest({}));
  }, [dispatch]);

  useEffect(() => {
    if (categories?.length) {
      const { id } = categories[0];
      dispatch(getStatsUsageCategory({ id }));
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (usageCategory) {
      const dataChart: DataPoint[] = [
        {
          name: translate('statsPage.used'),
          data: [],
        },
        {
          name: translate('statsPage.available'),
          data: [],
        },
      ];

      dataChart[0].data.push(usageCategory?.RESTAURANT.used);
      dataChart[0].data.push(usageCategory?.CULTURE.used);
      dataChart[0].data.push(usageCategory?.SPORT.used);
      dataChart[0].data.push(usageCategory?.HOLIDAYS.used);
      dataChart[0].data.push(usageCategory?.HELP.used);
      dataChart[0].data.push(usageCategory?.MOBILITY.used);
      dataChart[0].data.push(usageCategory?.REMOTE.used);
      dataChart[0].data.push(usageCategory?.GIFT.used);
      dataChart[1].data.push(usageCategory?.RESTAURANT.available);
      dataChart[1].data.push(usageCategory?.CULTURE.available);
      dataChart[1].data.push(usageCategory?.SPORT.available);
      dataChart[1].data.push(usageCategory?.HOLIDAYS.available);
      dataChart[1].data.push(usageCategory?.HELP.available);
      dataChart[1].data.push(usageCategory?.MOBILITY.available);
      dataChart[1].data.push(usageCategory?.REMOTE.available);
      dataChart[1].data.push(usageCategory?.GIFT.available);
      setStat(dataChart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usageCategory]);
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleGetStatCategory(event.target.value)
            }
          >
            {categories?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <Chart type="bar" series={stat} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
