from datetime import datetime
from typing import List
from pydantic import BaseModel
from datetime import datetime
from typing import List
from pydantic import BaseModel

class Beer(BaseModel):
    name: str
    price: float
    quantity: int


class Stock(BaseModel):
    last_updated: datetime
    beers: List[Beer]

class NewItem(BaseModel):
    name: str
    quantity: int
