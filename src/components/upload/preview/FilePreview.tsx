import { m, AnimatePresence } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import FileThumbnail, { fileData } from 'src/components/file-thumbnail';
import { fData } from 'src/utils/formatNumber';
import { varFade } from 'src/components/animate';
// utils

// ----------------------------------------------------------------------

export default function SinFilePreview({ thumbnail, file, onRemove, sx }: any) {
  const render = () => {
    const { key, name = '', size = 0 } = fileData(file);

    const isNotFormatFile = typeof file === 'string';

    return (
      <Stack
        key={key}
        component={m.div}
        {...varFade().inUp}
        spacing={2}
        direction="row"
        alignItems="center"
        sx={{
          my: 1,
          py: 1,
          px: 1.5,
          borderRadius: 1,
          ...sx,
        }}
      >
        <FileThumbnail file={file} />

        <ListItemText
          primary={isNotFormatFile ? file : name}
          secondary={isNotFormatFile ? '' : fData(size)}
          secondaryTypographyProps={{
            component: 'span',
            typography: 'caption',
          }}
        />
      </Stack>
    );
  };
  return <AnimatePresence initial={false}>{render()}</AnimatePresence>;
}
