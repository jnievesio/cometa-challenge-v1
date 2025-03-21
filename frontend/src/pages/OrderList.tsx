import { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
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
import { ConfirmModal } from '../components/ConfirmModal';
import { useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrders,
  useMarkAsPaidMutation,
} from '../hooks/useOrder';
import { IOrder } from '../types/order';

export default function OrderList() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: orders = [] } = useGetOrders() as UseQueryResult<IOrder[], Error>;

  const { mutateAsync: createOrderMutation } = useCreateOrderMutation();
  const { mutateAsync: deleteOrderMutation } = useDeleteOrderMutation();

  const handleDelete = (orderId: number) => {
    setOrderToDelete(orderId);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      deleteOrderMutation(orderToDelete);
      setConfirmDeleteOpen(false);
      setOrderToDelete(null);
    }
  };

  const { mutateAsync: markAsPaidMutation } = useMarkAsPaidMutation();

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

      <Button variant="contained" onClick={createOrderMutation} sx={{ mb: 2 }}>
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
                        onClick={() => markAsPaidMutation(order.id)}
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

      <ConfirmModal
        open={confirmDeleteOpen}
        title="Confirmar eliminación"
        message="¿Está seguro que desea eliminar esta orden?"
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setConfirmDeleteOpen(false);
          setOrderToDelete(null);
        }}
      />
    </>
  );
}
