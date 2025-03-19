from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from app.models.item import Item

class Round(BaseModel):
    created: datetime
    items: List[Item]

class Order(BaseModel):
    id: int
    created: datetime = datetime.now()
    paid: bool = False
    subtotal: float = 0
    taxes: float = 0
    discounts: float = 0
    items: List[Item] = []
    rounds: List[Round] = []