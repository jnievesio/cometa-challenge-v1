from fastapi import APIRouter
from app.services.stock_service import StockService
from app.models.stock import Beer
from app.data.mock_data import INITIAL_STOCK

router = APIRouter()

@router.get("/drinks", response_model=list[Beer])
async def get_drinks():
    stock_service = StockService(INITIAL_STOCK)
    stock = stock_service.get_stock()
    return stock.beers