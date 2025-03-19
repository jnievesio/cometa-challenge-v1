from datetime import datetime
from app.models.stock import Stock
from app.data.mock_data import INITIAL_STOCK

class StockService:
    def __init__(self, initial_stock):
        self.stock = Stock(**initial_stock)
        self.stock.last_updated = datetime.now()

    def get_stock(self) -> Stock:
        return self.stock

    def update_beer_quantity(self, beer_name, quantity):
        for beer in self.stock.beers:
            if beer.name == beer_name:
                beer.quantity += quantity
                self.stock.last_updated = datetime.now()
                return
        return None