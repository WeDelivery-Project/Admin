import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const admin = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null;
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem admin={admin} key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  admin: PropTypes.shape({
    role: PropTypes.object,
  }),
};

function NavItem({ item, admin }) {
  const { title, path, icon, info, role } = item;
  const isDisabled = () => {
    if (!role) return false;
    if (!admin || !admin.role) return true;
    if (admin && admin.role) if (admin.role) return !admin.role[role];
    return false;
  };
  return (
    <StyledNavItem
      disabled={isDisabled()}
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
