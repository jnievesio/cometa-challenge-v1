import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddItemModal } from '../components/AddItemModal';
import { orderService } from '../services/orderService';
import { useNotifications } from '../contexts/NotificationContext';
import { useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function OrderList() {
  const { showSuccess, showError } = useNotifications();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getOrders,
  });

  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      showSuccess('Orden creada exitosamente');
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: orderService.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: () => {
      showError('Error al eliminar la orden - Intente nuevamente');
      showSuccess('Orden eliminada exitosamente');
    },
  });

  const handleDelete = (orderId: number) => {
    if (confirm('¿Está seguro que desea eliminar esta orden?')) {
      deleteOrderMutation.mutate(orderId);
    }
  };

  const markAsPaidMutation = useMutation({
    mutationFn: (orderId: number) => orderService.markOrderAsPaid(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      showSuccess('Orden marcada como pagada');
    },
    onError: () => showError('Error al actualizar el estado'),
  });

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
      >
        Órdenes
      </Typography>

      {isMobile && (
        <Grid container spacing={2} sx={{ p: 2 }}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body2">ID: {order.id}</Typography>
                  <Typography variant="body2">
                    Estado: {order.paid ? 'Pagada' : 'Pendiente'}
                  </Typography>
                  <Typography variant="body2">
                    Total: ${(order?.subtotal + order.taxes - order.discounts).toFixed(2)}
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 1 }}>
                    <Button variant="outlined" fullWidth onClick={() => navigate(`/${order.id}`)}>
                      Ver
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Button variant="contained" onClick={() => createOrderMutation.mutate()} sx={{ mb: 2 }}>
        Nueva orden
      </Button>

      <Paper sx={{ width: '100%', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Impuestos</TableCell>
              <TableCell>Descuentos</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.paid ? 'Pagada' : 'Pendiente'}</TableCell>
                <TableCell>${order?.subtotal?.toFixed(2)}</TableCell>
                <TableCell>${order?.taxes?.toFixed(2)}</TableCell>
                <TableCell>${order?.discounts?.toFixed(2)}</TableCell>
                <TableCell>
                  ${(order?.subtotal + order.taxes - order.discounts).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Stack direction="column" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/${order.id}`)}
                      sx={{ width: '100%' }}
                    >
                      Ver
                    </Button>
                    {!order.paid && (
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => markAsPaidMutation.mutate(order.id)}
                        sx={{ width: '100%' }}
                      >
                        Marcar como pagada
                      </Button>
                    )}
                    {!order.paid && (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setAddModalOpen(true);
                        }}
                        sx={{ width: '100%' }}
                      >
                        Agregar Items
                      </Button>
                    )}
                    {!order.paid && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(order.id)}
                        sx={{ width: '100%' }}
                      >
                        Eliminar
                      </Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {selectedOrderId !== null && (
        <AddItemModal
          open={addModalOpen}
          onClose={() => {
            setAddModalOpen(false);
            setSelectedOrderId(null);
          }}
          orderId={selectedOrderId}
        />
      )}
    </>
  );
}
