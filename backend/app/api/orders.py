from fastapi import APIRouter, HTTPException, Depends
from app.services.order_service import OrderService
from app.services.stock_service import StockService
from app.data.mock_data import INITIAL_STOCK
from app.models.order import Order
from app.models.stock import NewItem


# Crear el router
router = APIRouter()
stock_service = StockService(INITIAL_STOCK)

# Dependencia para obtener el servicio de órdenes
order_service_instance = None
def get_order_service():
    global order_service_instance
    if not order_service_instance:
        order_service_instance = OrderService(stock_service)
    return order_service_instance

# Endpoint para obtener todas las órdenes
@router.get("/orders", response_model=list[Order])
async def get_orders(order_service: OrderService = Depends(get_order_service)):
    return [order.dict() for order in order_service.orders]

# Endpoint para crear una nueva orden
@router.post("/orders", response_model=Order)
async def create_order(order_service: OrderService = Depends(get_order_service)):
    return order_service.create_order()

# Endpoint para agregar un ítem a una orden
@router.post("/orders/{order_id}/items", response_model=Order)
async def add_item_to_order(
    order_id: int,
    item: NewItem,
    order_service: OrderService = Depends(get_order_service)
):
    try:
        return order_service.add_item_to_order(order_id, item)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# Endpoint para obtener los detalles de una orden
@router.get("/orders/{order_id}", response_model=Order)
async def get_order_details(
    order_id: int,
    order_service: OrderService = Depends(get_order_service)
):
    try:
        return order_service._find_order(order_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# Endpoint para actualizar el estado
@router.patch("/orders/{order_id}/pay", response_model=Order)
async def mark_order_as_paid(
    order_id: int,
    order_service: OrderService = Depends(get_order_service)
):
    return order_service.mark_order_as_paid(order_id)

# Endpoint para eliminar una orden
@router.delete("/orders/{order_id}", response_model=Order)
async def delete_order(
    order_id: int,
    order_service: OrderService = Depends(get_order_service)
):
    try:
        return order_service.delete_order(order_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))