import React, { useState } from "react";
import HotelItem from "./HotelItem";
import { Grid } from "@mui/material"; // Use Grid for better layout control
import HotelModal from "./HotelModal";
import { HotelItemSchema, HotelListProps } from "../types/types";

const HotelList: React.FC<HotelListProps> = ({ HotelLists }) => {
  const [selectedHotel, setSelectedHotel] = useState<HotelItemSchema | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCardClick = (Hotel: HotelItemSchema) => {
    setSelectedHotel(Hotel);
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
        minHeight: "100vh", // Ensure it takes up full viewport height
      }}
    >
      <Grid container spacing={4}>
        {HotelLists.map((Hotel) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={Hotel.id}>
            <HotelItem
              HotelItem={Hotel}
              onClick={() => handleCardClick(Hotel)}
            />
          </Grid>
        ))}
      </Grid>
      {selectedHotel && (
        <HotelModal
          open={modalOpen}
          onClose={handleCloseModal}
          selectedHotel={selectedHotel}
        />
      )}
    </div>
  );
};

export default HotelList;
