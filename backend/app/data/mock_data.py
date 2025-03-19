from datetime import datetime
from app.models.stock import Stock, Beer

INITIAL_STOCK = {
    "last_updated": datetime.now(),    "beers": [
        {"name": "Corona", "price": 115, "quantity": 50},
        {"name": "Quilmes", "price": 120, "quantity": 30},
        {"name": "Club Colombia", "price": 110, "quantity": 40}
    ]
}

INITIAL_ORDERS = [
    {
        "id": 1,
        "created": datetime.now(),
        "paid": False,
        "subtotal": 500,
        "taxes": 0,
        "discounts": 0,
        "items": [
            {"name": "Corona", "price_per_unit": 115, "quantity": 2, "total": 230},
            {"name": "Club Colombia", "price_per_unit": 110, "quantity": 1, "total": 110}
        ],
        "rounds": [
            {
                "created": datetime.now(),
                "items": [
                    {"name": "Corona", "quantity": 2},
                    {"name": "Club Colombia", "quantity": 1}
                ]
            }
        ]
    }
]