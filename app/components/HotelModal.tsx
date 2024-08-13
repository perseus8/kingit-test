import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { HotelModalProps } from '../types/types';


const HotelModal: React.FC<HotelModalProps> = ({ open, onClose, selectedHotel }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(3px)', // Grey background effect
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          {selectedHotel.imageUrl ? (
            <img
              src={selectedHotel.imageUrl}
              alt={selectedHotel.name}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: 180,
                backgroundColor: 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                No Image Available
              </Typography>
            </Box>
          )}
          <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
            {selectedHotel.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {selectedHotel.city}, {selectedHotel.country}
          </Typography>
          <Typography variant="h6" color="primary" fontWeight="bold" mt={2}>
            €{selectedHotel.price}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            {[...Array(5)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  color: index < selectedHotel.stars ? 'warning.main' : 'grey.400',
                  fontSize: 20,
                }}
              >
                &#9733; {/* Unicode star character */}
              </Box>
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HotelModal;
