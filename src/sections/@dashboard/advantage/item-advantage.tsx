import { useState } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Card, Typography, CardProps } from '@mui/material';
// utils
import { bgGradient } from '../../../utils/cssStyles';
// theme
import { ColorSchema } from '../../../theme/palette';
// components
import Image from '../../../components/image';
import ConfirmDialog from 'src/components/confirm-dialog';
import { Stack } from '@mui/system';
import { useLocales } from 'src/locales';
// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  src: string;
  color?: ColorSchema;
  description: string;
  plafond: number | null;
}

export default function ItemAdvantage({
  title,
  src,
  description,
  color = 'primary',
  plafond,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const [openConfirm, setOpenConfirm] = useState(false);
  const { translate } = useLocales();
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  return (
    <>
      <Card
        onClick={handleOpenConfirm}
        sx={{
          py: 5,
          boxShadow: 0,
          textAlign: 'center',
          cursor: 'pointer',
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
        {...other}
      >
        <Image
          src={src}
          sx={{
            mb: 3,
            p: 2.5,
            width: 80,
            height: 80,
            left: '37%',

            borderRadius: '50%',
            ...bgGradient({
              direction: '135deg',
              startColor: `${alpha(theme.palette[color].dark, 0)} 0%`,
              endColor: `${alpha(theme.palette[color].dark, 0.24)} 100%`,
            }),
          }}
        />

        <Typography variant="h6" sx={{ opacity: 0.64, cursor: 'pointer' }}>
          {title}
        </Typography>
      </Card>
      <ConfirmDialog
        open={openConfirm}
        title={
          <Stack direction="row" justifyContent="space-between">
            {title}
            <Typography variant="subtitle1">
              {plafond === null ? translate('cagnotte.Uncapped') : `${plafond} €`}
            </Typography>
          </Stack>
        }
        /* content={description.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))} */
        content={description}
        action={undefined}
        onClose={handleCloseConfirm}
      />
    </>
  );
}
