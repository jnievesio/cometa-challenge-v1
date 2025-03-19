import { Box, AppBar, Toolbar, Typography, Container, IconButton } from '@mui/material';
import { SportsBar } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { useTheme, useMediaQuery } from '@mui/material';

export function Layout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <SportsBar />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Órdenes de cervezas
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          mt: isMobile ? 2 : 4,
          mb: isMobile ? 2 : 4,
          flex: 1,
        }}
      >
        <Breadcrumbs />
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            maxWidth: 'lg',
            margin: '0 auto',
            gap: { xs: 2, sm: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
