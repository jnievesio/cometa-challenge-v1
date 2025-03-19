import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { IOrder } from '../types/order';
import { orderService } from '../services/orderService';
import { useNotifications } from '../contexts/NotificationContext';
import { INewItem } from '../types/round';
import { AxiosError } from 'axios';

export const ItemsKeys = {
  orders: () => ['orders'],
  order: (id: number) => ['orders', id],
};

const key = 'orders';

export function useGetOrders(): UseQueryResult<IOrder[], Error> {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      return await orderService.getOrders();
    },
  });
}

export function useGetOrder(id: number): UseQueryResult<IOrder, Error> {
  return useQuery({
    queryKey: [key, id],
    queryFn: async () => {
      return await orderService.getOrder(id);
    },
  });
}

export function useMarkAsPaidMutation(): UseMutationResult<IOrder, Error, number, unknown> {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation({
    mutationFn: async (id: number) => {
      return await orderService.markOrderAsPaid(id);
    },
    onSuccess: (_, id: number) => {
      queryClient.invalidateQueries({ queryKey: [key, id] });
      queryClient.invalidateQueries({ queryKey: [key] });
      showSuccess('Orden marcada como pagada');
    },
    onError: () => showError('Error al actualizar el estado'),
  });
}

export function useCreateOrderMutation(): UseMutationResult<IOrder, Error, unknown> {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation({
    mutationFn: async () => {
      return await orderService.createOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
      showSuccess('Orden creada exitosamente');
    },
    onError: () => showError('Error al crear la orden'),
  });
}

export function useDeleteOrderMutation(): UseMutationResult<IOrder, Error, number, unknown> {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation({
    mutationFn: async (id: number) => {
      return await orderService.deleteOrder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: () => {
      showError('Error al eliminar la orden - Intente nuevamente');
      showSuccess('Orden eliminada exitosamente');
    },
  });
}

export function useAddItemMutation(orderId: number, onClose?: () => void) {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation<IOrder, AxiosError<{ detail?: string; message?: string }>, INewItem>({ 
    mutationFn: async (newItem: INewItem) => {
      return await orderService.addItem(orderId, newItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key, orderId] });
      queryClient.invalidateQueries({ queryKey: [key] });
      showSuccess('Bebida agregada exitosamente');
      if (onClose) {
        onClose();
      }
    },
    onError: (error) => {
      const serverMessage = error.response?.data?.detail || error.response?.data?.message;
      showError(serverMessage || 'Error al agregar la bebida');
    },
  });
}
