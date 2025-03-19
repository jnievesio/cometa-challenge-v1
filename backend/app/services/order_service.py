from datetime import datetime
from typing import List
from app.models.order import Order, Round
from app.models.stock import Stock, NewItem
from app.models.item import Item

from app.data.mock_data import INITIAL_STOCK, INITIAL_ORDERS

class OrderService:
    def __init__(self, stock_service):
        self.stock_service = stock_service
        self.stock = stock_service.get_stock()
        self.orders = [Order(**order) for order in INITIAL_ORDERS]
        self.next_id = max([order.id for order in self.orders], default=0) + 1 if self.orders else 1

    def create_order(self) -> Order:
        new_order = Order(
            id=self.next_id,
            subtotal=0.0,
            items=[],
            rounds=[]
        )
        self.orders.append(new_order)
        self.next_id += 1
        return new_order

    def get_all_orders(self) -> List[Order]:
        return self.orders

    def add_item_to_order(self, order_id: int, item: NewItem) -> Order:
        order = self._find_order(order_id)
        
        # Verificar stock
        beer = next((b for b in self.stock_service.get_stock().beers if b.name == item.name), None)
        if not beer:
            raise ValueError("Bebida no existente")
        if beer.quantity < item.quantity:
            raise ValueError("Insufficient stock")

        # Crear nueva ronda
        new_round = Round(
            created=datetime.now(),
            items=[{
                'name': item.name,
                'quantity': item.quantity,
                'price_per_unit': beer.price
            }]
        )
        order.rounds.append(new_round)

        # Siempre crear nuevo item
        order.items.append(Item(
            name=item.name,
            price_per_unit=beer.price,
            total=beer.price * item.quantity
        ))

        # Actualizar subtotal
        order.subtotal = sum(item.total for item in order.items)

        # Actualizar stock
        self.stock_service.update_beer_quantity(item.name, -item.quantity)
        self.stock_service.get_stock().last_updated = datetime.now()

        return order

    def _find_order(self, order_id: int) -> Order:
        for order in self.orders:
            if order.id == order_id:
                return order
        raise ValueError("Order not found")

    def mark_order_as_paid(self, order_id: int) -> Order:
        order = self._find_order(order_id)
        order.paid = True
        
        # Encontrar el índice de la orden en el arreglo
        order_index = self.find_order_index(order_id)
        
        if order_index is not None:
            self.orders[order_index] = order
        
        return order

    def _find_beer(self, beer_name):
        """Busca una cerveza por nombre en el stock."""
        beer = next((b for b in self.stock_service.get_stock().beers if b.name == beer_name), None)
        if not beer:
            raise ValueError(f"Bebida '{beer_name}' no encontrada en el stock.")
        return beer

    def delete_order(self, order_id: int) -> Order:
        for order in self.orders:
            if order.id == order_id:
                self.orders.remove(order)
                return order
        
    def find_order_index(self, order_id: int) -> int | None:
        for i, order in enumerate(self.orders):
            if order.id == order_id:
                return i
        return None