from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, List
import os
import requests

app = FastAPI()

class UserCreate(BaseModel):
    username: str

class User(UserCreate):
    id: int

class ItemCreate(BaseModel):
    name: str
    description: str
    category: str

class Item(ItemCreate):
    id: int
    price: float

class OrderCreate(BaseModel):
    user_id: int
    item_id: int

class Order(OrderCreate):
    id: int

users: Dict[int, User] = {}
items: Dict[int, Item] = {}
orders: Dict[int, Order] = {}

user_counter = 1
item_counter = 1
order_counter = 1

ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:5000/predict")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/users", response_model=User)
def create_user(user: UserCreate):
    global user_counter
    new_user = User(id=user_counter, **user.dict())
    users[user_counter] = new_user
    user_counter += 1
    return new_user

@app.get("/users", response_model=List[User])
def list_users():
    return list(users.values())

@app.get("/items", response_model=List[Item])
def list_items():
    return list(items.values())

@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]

@app.post("/items", response_model=Item)
def create_item(item: ItemCreate):
    global item_counter
    price = 0.0
    try:
        r = requests.post(
            ML_SERVICE_URL,
            json={
                "name": item.name,
                "item_description": item.description,
                "category_name": item.category,
            },
            timeout=2,
        )
        if r.status_code == 200 and "predicted_price" in r.json():
            price = float(r.json()["predicted_price"])
    except Exception:
        pass
    new_item = Item(id=item_counter, price=price, **item.dict())
    items[item_counter] = new_item
    item_counter += 1
    return new_item

@app.post("/orders", response_model=Order)
def create_order(order: OrderCreate):
    global order_counter
    if order.user_id not in users or order.item_id not in items:
        raise HTTPException(status_code=400, detail="Invalid user or item")
    new_order = Order(id=order_counter, **order.dict())
    orders[order_counter] = new_order
    order_counter += 1
    return new_order

@app.get("/orders", response_model=List[Order])
def list_orders():
    return list(orders.values())
