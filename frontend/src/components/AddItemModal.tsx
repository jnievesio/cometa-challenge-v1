import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  Autocomplete,
} from '@mui/material';
import { drinkService } from '../services/drinkService';
import { AxiosError } from 'axios';
import { orderService } from '../services/orderService';
import { Item } from '../types/item';
import { useState } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  orderId: number;
}

export function AddItemModal({ open, onClose, orderId }: AddItemModalProps) {
  const { showSuccess, showError } = useNotifications();
  const { register, handleSubmit, reset } = useForm<Item>();
  const queryClient = useQueryClient();

  const addItemMutation = useMutation({
    mutationFn: (item: Item) => orderService.addItem(orderId, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', String(orderId)] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      onClose();
      reset();
      showSuccess('Bebida agregada exitosamente');
    },
    onError: (error: AxiosError<{ detail?: string; message?: string }>) => {
      const serverMessage = error.response?.data?.detail || error.response?.data?.message;
      showError(serverMessage || 'Error al agregar la bebida');
    },
  });

  const { data: drinksData, isLoading } = useQuery({
    queryKey: ['drinks'],
    queryFn: drinkService.getDrinks,
  });

  const [error, _] = useState<string>('');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar bebida</DialogTitle>
      {error && (
        <Alert severity="error" sx={{ mx: 3, mb: 2 }}>
          {error}
        </Alert>
      )}
      <DialogContent>
        <Box component="form" sx={{ pt: 2 }}>
          <Autocomplete
            options={drinksData || []}
            getOptionLabel={(option) => option.name}
            loading={isLoading}
            loadingText="Cargando bebidas..."
            renderInput={(params) => (
              <TextField
                {...params}
                label="Bebida"
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? 'Cargando...' : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            onChange={(_, value) => value && reset({ name: value.name })}
          />
          <TextField
            fullWidth
            type="number"
            label="Cantidad"
            margin="normal"
            inputProps={{ min: 1 }}
            {...register('quantity', { valueAsNumber: true, required: true })}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit((data) => addItemMutation.mutate(data))}
          variant="contained"
          disabled={addItemMutation.isLoading}
        >
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
