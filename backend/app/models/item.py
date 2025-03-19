from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price_per_unit: float = 0
    total: float = 0
