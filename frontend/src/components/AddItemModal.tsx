import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Autocomplete,
} from '@mui/material';
import { drinkService } from '../services/drinkService';
import { INewItem } from '../types/round';
import { useNotifications } from '../contexts/NotificationContext';
import { useAddItemMutation } from '../hooks/useOrder';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  orderId: number;
}

export function AddItemModal({ open, onClose, orderId }: AddItemModalProps) {
  const { showError } = useNotifications();
  const { register, handleSubmit, reset, setValue, watch } = useForm<INewItem>();
  const addItemMutation = useAddItemMutation(orderId, () => {
    onClose();
    reset();
  });

  const { data: drinksData, isLoading } = useQuery({
    queryKey: ['drinks'],
    queryFn: drinkService.getDrinks,
  });

  const selectedDrink = watch('name');

  const onSubmit = (data: INewItem) => {
    if (!selectedDrink) {
      showError('Debes seleccionar una bebida');
      return;
    }
    if (!data.quantity || data.quantity < 1) {
      showError('La cantidad debe ser al menos 1');
      return;
    }
    addItemMutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar bebida</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ pt: 2 }} onSubmit={handleSubmit(onSubmit)}>
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
            onChange={(_, value) => {
              setValue('name', value?.name || '');
            }}
          />
          <TextField
            fullWidth
            type="number"
            label="Cantidad"
            margin="normal"
            inputProps={{ min: 1 }}
            {...register('quantity', {
              valueAsNumber: true,
              required: true,
              validate: (value) => value > 0 || 'La cantidad debe ser mayor que 0',
            })}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="contained" disabled={addItemMutation.isLoading}>
              Registrar
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
