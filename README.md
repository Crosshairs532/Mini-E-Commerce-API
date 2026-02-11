## Project Setup instructions:

open you terminal and follow the below instructions

1. Clone the repository:

```bash
     git clone https://github.com/your-username/mini-ecommerce-api.git
    cd Mini-E-Commerce-API
```

2. Install dependencies:

```bash
    npm install
```

3. Environment Variables:
   Create a .env file in the root directory:

```bash
    PORT=5000
    MONGODB_URI=mongodb_uri
    JWT_SECRET=""
    JWT_EXPIRE=""
    BCRYPT_SALT_ROUNDS=""
```

4. Run the application:

```bash
    npm run start:dev
```

## Tech stack used

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB (via Mongoose)
- Validation: Zod (via SchemaValidation middleware)
- Pattern: MVC (Models, Views/Routes, Controllers) + Service Layer

## Diagram

![ER-diagram](./diagram.png)

## Assumptions made:

- NO media or image is needed for now.
- Only product, description , stock and price is there. others are excluding for simplicity.
- Assuming basic product search Functionality. Search product on only name and Description
- instead deleting the whole product, Updating isDeleted field on product. So that we do not have to create the product from the beginning.

## API Endpoints

### 1. Authentication

| Method | Endpoint               | Access | Description           |
| ------ | ---------------------- | ------ | --------------------- |
| POST   | /api/auth/registration | Public | Register a new user   |
| POST   | /api/auth/login        | Public | Login and receive JWT |

---

### 2. Products

| Method | Endpoint                                | Access | Description                       |
| ------ | --------------------------------------- | ------ | --------------------------------- |
| GET    | /api/products                           | All    | Fetch all active products         |
| GET    | /api/products/:productId                | All    | Fetch details of a single product |
| POST   | /api/products/create-product            | Admin  | Add new product to inventory      |
| PATCH  | /api/products/product-update/:productId | Admin  | Update product details/stock      |
| PATCH  | /api/products/product-delete/:productId | Admin  | Soft-delete a product             |

---

### 3. Cart

| Method | Endpoint                    | Access   | Description                    |
| ------ | --------------------------- | -------- | ------------------------------ |
| GET    | /api/cart                   | Customer | View current items in cart     |
| POST   | /api/cart/add-to-cart       | Customer | Add a product to the cart      |
| PATCH  | /api/cart/update            | Customer | Update item quantity in cart   |
| DELETE | /api/cart/remove/:productId | Customer | Remove specific item from cart |
| DELETE | /api/cart/clear             | Customer | Empty the entire cart          |

---

### 4. Orders

| Method | Endpoint                    | Access         | Description                                    |
| ------ | --------------------------- | -------------- | ---------------------------------------------- |
| POST   | /api/orders                 | Customer       | Place order (validates stock & clears cart)    |
| GET    | /api/orders/my-orders       | Customer       | View personal order history                    |
| GET    | /api/orders/:orderId        | Customer       | View specific order details                    |
| PATCH  | /api/orders/:orderId/status | Admin/Customer | Update status (Pending/Shipped/Delivered/etc.) |
