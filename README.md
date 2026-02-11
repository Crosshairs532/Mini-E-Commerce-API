## Project Setup instructions:

open you terminal and follow the below instructions

```bash
    git clone https://github.com/Crosshairs532/Mini-E-Commerce-API.git
    cd Mini-E-Commerce-API
    npm i
    npm run start_dev
```

## Tech stack used

```bash
    Mongoose, Zod, Express.js, MongoDb, Typescript
```

## Assumptions made:

- NO media or image is needed for now.
- Only product, description , stock and price is there. others are excluding for simplicity.
- Assuming basic product search Functionality. Search product on only name and Description
- instead deleting the whole product, Updating isDeleted field on product. So that we do not have to create the product from the beginning.
-

## Diagram

![ER-diagram](./diagram.png)
