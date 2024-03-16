import {
  Pagination as MuiPagination,
  Stack,
  TextField,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DefaultFcProps } from 'common';
import { useState } from 'react';
import { Modal } from 'shared-components';
import { CommunityCard } from './components';

const Pagination = styled(MuiPagination)({
  '& .MuiPaginationItem-root': {
    color: '#353840',
    backgroundColor: '#0D0D0D',
    border: '1px solid #323232',
    borderRadius: 12,

    '&.Mui-selected': {
      background: 'linear-gradient(90deg, rgba(0, 254, 126, 0.06) 0%, rgba(0, 196, 254, 0.06) 100%)',
      fontWeight: 700,
      color: '#fff',
    },
  },
});

const ToggleButtonGroup = styled(MuiToggleButtonGroup)({
  gap: 12,
});

const ToggleButton = styled(MuiToggleButton)({
  backgroundColor: '#1a1c21',
  borderRadius: '12px !important',
  color: '#fff',
  textTransform: 'none',
  fontWeight: 500,

  '&.Mui-selected': {
    color: '#fff',
    border: '1px solid #fff !important',
    backgroundColor: '#1a1c21',
  },
});

const SearchIcon = () => {
  return <i className="octan-icon octan-icon--search" />;
};

type CommunitiesProps = DefaultFcProps & {
  open: boolean;
  handleClose: () => void;
};

export const Communities: React.FC<CommunitiesProps> = ({ open, handleClose }) => {
  const [view, setView] = useState('list');
  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <TextField
        placeholder="Search"
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        fullWidth
      />

      <div className="w-[max(1200px, 100%)] my-6">
        <ToggleButtonGroup orientation="horizontal" fullWidth value={view} exclusive onChange={handleChange}>
          <ToggleButton value="list" aria-label="list">
            All
          </ToggleButton>
          <ToggleButton value="module" aria-label="module">
            Gamefi
          </ToggleButton>
          <ToggleButton value="quilt" aria-label="quilt">
            Socialfi
          </ToggleButton>
          <ToggleButton value="quilt" aria-label="quilt">
            Metaverse
          </ToggleButton>
          <ToggleButton value="quilt" aria-label="quilt">
            Metaverse
          </ToggleButton>
          <ToggleButton value="quilt" aria-label="quilt">
            Metaverse
          </ToggleButton>
          <ToggleButton value="quilt" aria-label="quilt">
            Metaverse
          </ToggleButton>
          <ToggleButton value="quilt" aria-label="quilt">
            Others
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="grid grid-cols-4 max-h-[50vh] overflow-auto gap-6 mb-6">
        <CommunityCard isVerify />
        <CommunityCard isVerify />
        <CommunityCard isVerify />
        <CommunityCard isVerify />
        <CommunityCard isVerify />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>

      <div className="flex justify-center">
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </Modal>
  );
};
