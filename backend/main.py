from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.orders import router as orders_router
from app.api.drinks import router as drinks_router
from app.core.config import settings
from app.services.order_service import OrderService
from app.services.stock_service import StockService
from app.data.mock_data import INITIAL_STOCK

app = FastAPI(
    title="API de Pedidos de Cerveza",
    description="API para gestionar pedidos de cerveza",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stock_service = StockService(INITIAL_STOCK)
order_service = OrderService(stock_service)

app.include_router(router=orders_router, prefix="/api")
app.include_router(router=drinks_router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "message": "Api para el sistema de pedidos de cerveza",
        "environment": settings.ENVIRONMENT
    }