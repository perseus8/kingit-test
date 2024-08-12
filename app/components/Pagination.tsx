import React from 'react';
import { Pagination as MuiPagination, Stack, Box } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps & { disabled?: boolean }> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        py: 2,
        px: 3,
      }}
    >
      <Stack spacing={2}>
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => onPageChange(page)}
          color="primary"
          disabled={disabled}
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: 1,
            },
            '& .Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Pagination;
