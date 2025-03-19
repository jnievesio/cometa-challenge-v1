import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import OrderList from './pages/OrderList';
import { OrderDetail } from './pages/OrderDetail';
import { Layout } from './components/Layout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 3 },
        minHeight: { xs: '90vh', sm: '100vh' },
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<OrderList />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/:orderId" element={<OrderDetail />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
