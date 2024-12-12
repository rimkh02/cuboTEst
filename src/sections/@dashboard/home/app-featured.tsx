import { m } from 'framer-motion';
import { useState, useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Stack, Card, Typography, Link, CardProps } from '@mui/material';
// components
import Image from 'src/components/image';
import { MotionContainer, varFade } from 'src/components/animate';
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
// locales
import useLocales from 'src/locales/useLocales';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {}

export default function AppFeatured({ ...other }: Props) {
  const listImage = [
    { id: '1', image: '/assets/images/about/testimonials.jpg', title: 'Employees' },
    {
      id: '2',
      image: '/assets/images/about/what_1.jpg',
      title: 'Categories',
    },
    { id: '3', image: '/assets/images/about/vision.jpg', title: 'Advantages' },
  ];
  const theme = useTheme();

  const carouselRef = useRef<Carousel>(null);

  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? listImage.length - 1 : 0
  );

  const carouselSettings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    ...CarouselDots({
      sx: {
        top: 20,
        left: 20,
        position: 'absolute',
      },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card {...other}>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {listImage.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrev}
        sx={{ top: 8, right: 8, position: 'absolute', color: 'common.white' }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: any;
  isActive?: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const { image, title } = item;
  const { translate } = useLocales();

  return (
    <MotionContainer action animate={isActive} sx={{ position: 'relative' }}>
      <Stack
        spacing={1}
        sx={{
          p: 3,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" component="div" sx={{ opacity: 0.48 }}>
            Wiboost
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Link color="inherit" underline="none">
            <Typography variant="h5" noWrap>
              {translate(title)}
            </Typography>
          </Link>
        </m.div>
      </Stack>

      <StyledOverlay />

      <Image
        alt={title}
        src={image}
        sx={{
          height: { xs: 280, xl: 320 },
        }}
      />
    </MotionContainer>
  );
}
