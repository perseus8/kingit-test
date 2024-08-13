import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import { Info as InfoIcon } from '@mui/icons-material';
import { HotelItemProps } from '../types/types';


const HotelItem: React.FC<HotelItemProps> = ({ HotelItem, onClick }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: 3,
        transition: '0.3s',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.02)',
        },
        backgroundColor: 'background.paper',
      }}
      onClick={onClick}
    >
      {HotelItem.imageUrl ? (
        <CardMedia
          component="img"
          height="180"
          image={HotelItem.imageUrl}
          alt={HotelItem.name}
          sx={{
            objectFit: 'cover',
            width: '100%',
            height: '180px',
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }}
        />
      ) : (
        <Box
          sx={{
            height: '180px',
            backgroundColor: 'grey.300',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            No Image Available
          </Typography>
        </Box>
      )}
      <CardContent
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
          {HotelItem.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {HotelItem.city}, {HotelItem.country}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="primary" fontWeight="bold">
              €{HotelItem.price}
            </Typography>
            <Box display="flex" alignItems="center">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  sx={{
                    color: index < HotelItem.stars ? 'warning.main' : 'grey.400',
                    fontSize: 20,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'text.secondary',
          '&:hover': {
            color: 'primary.main',
          },
        }}
        onClick={onClick}
      >
        <InfoIcon />
      </IconButton>
    </Card>
  );
};

export default HotelItem;
