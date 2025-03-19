import { useParams } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';
import { IOrder } from '../types/order';
import { Typography, Button, Stack, Paper } from '@mui/material';
import { AddItemModal } from '../components/AddItemModal';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { useGetOrder, useMarkAsPaidMutation } from '../hooks/useOrder';

export function OrderDetail() {
  const { orderId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const { mutateAsync: markAsPaidMutation } = useMarkAsPaidMutation();

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrder(Number(orderId)) as UseQueryResult<IOrder, Error>;

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading order</Typography>;
  if (!order) return null;

  return (
    <Paper
      sx={{
        p: isMobile ? 2 : 4,
        maxWidth: isMobile ? '100%' : '90%',
        mx: 'auto',
        mt: isMobile ? 2 : 4,
      }}
    >
      <Stack spacing={{ xs: 2, sm: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Orden #{order.id}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Chip
            label={order.paid ? 'Pagada' : 'Pendiente'}
            color={order.paid ? 'success' : 'warning'}
            sx={{
              mb: { xs: 1, sm: 0 },
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
          />
          {!order.paid && (
            <Button
              variant="contained"
              color="success"
              onClick={() => markAsPaidMutation(Number(orderId))}
            >
              Marcar como pagada
            </Button>
          )}
        </Stack>

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
          Total : ${order.subtotal?.toFixed(2) ?? '0.00'}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
          Detalles de los Items
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textAlign: isMobile ? 'left' : 'inherit' }}>
                  Item
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    display: { xs: 'none', sm: 'table-cell' },
                    textAlign: 'right',
                  }}
                  align={isMobile ? 'left' : 'right'}
                >
                  Cantidad
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.875rem' : 'inherit' }}
                  align="right"
                >
                  Precio Unitario
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.875rem' : 'inherit' }}
                  align="right"
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">
                    {(item.total / item.price_per_unit).toFixed(0)}
                  </TableCell>
                  <TableCell align="right">${item.price_per_unit?.toFixed(2) ?? '0.00'}</TableCell>
                  <TableCell align="right">${item.total?.toFixed(2) ?? '0.00'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {!order.paid && (
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ mt: 2, alignSelf: 'flex-start' }}
          >
            Agregar Item
          </Button>
        )}
      </Stack>

      <AddItemModal open={open} onClose={() => setOpen(false)} orderId={Number(orderId)} />
    </Paper>
  );
}
