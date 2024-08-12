import React, { useState } from 'react';
import HotelItem from './HotelItem';
import { Grid } from '@mui/material'; // Use Grid for better layout control
import HotelModal from './HotelModal';

interface Hotel {
  id: string;
  name: string;
  country: string;
  city: string;
  price: number;
  stars: number;
  imageUrl?: string;
}

interface HotelListProps {
  hotels: Hotel[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCardClick = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedHotel(null);
  };

  return (
    <div
      className="p-4"
      style={{
        // backgroundColor: '#f0f0f0', // Grey background
        minHeight: '100vh', // Ensure it takes up full viewport height
      }}
    >
      <Grid container spacing={4}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={hotel.id}>
            <HotelItem
              hotel={hotel}
              onClick={() => handleCardClick(hotel)}
            />
          </Grid>
        ))}
      </Grid>
      {selectedHotel && (
        <HotelModal
          open={modalOpen}
          onClose={handleCloseModal}
          hotel={selectedHotel}
        />
      )}
    </div>
  );
};

export default HotelList;
