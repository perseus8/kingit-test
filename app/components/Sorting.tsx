import React from 'react';
import { Button, ButtonGroup, Typography, IconButton, Tooltip } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface SortingProps {
  onSortChange: (sortBy: string) => void;
  priceSortOrder: 'asc' | 'desc';
  starsSortOrder: 'asc' | 'desc';
}

const Sorting: React.FC<SortingProps & { disabled?: boolean }> = ({ onSortChange, priceSortOrder, starsSortOrder, disabled }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full mb-4">
      {/* <Typography variant="h6" component="div" className="mb-2 lg:mb-0">
        Sort By:
      </Typography> */}
      <div className="flex space-x-2 lg:space-x-4">
        <Tooltip title="Sort by price" arrow>
          <Button
            variant="outlined"
            onClick={() => onSortChange('price')}
            disabled={disabled}
            color="primary"
            endIcon={priceSortOrder === 'desc' ? <ExpandLess /> : <ExpandMore />}
            sx={{ borderRadius: 2, borderColor: 'primary.main', '&:hover': { borderColor: 'primary.dark' } }}
          >
            Price
          </Button>
        </Tooltip>
        <Tooltip title="Sort by stars" arrow>
          <Button
            variant="outlined"
            onClick={() => onSortChange('stars')}
            disabled={disabled}
            color="primary"
            endIcon={starsSortOrder === 'desc' ? <ExpandLess /> : <ExpandMore />}
            sx={{ borderRadius: 2, borderColor: 'primary.main', '&:hover': { borderColor: 'primary.dark' } }}
          >
            Stars
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sorting;
