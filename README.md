# e-commerce - Vue Florist

Feature and Endpoint

### 1. Login
| method | routes                        | detail                              | body | headers | query |
| ------ | ----------------------------- | ------------------------------------|--------|-------------|----|
| POST   | /users/login                    | `User` login to system                    | email, password | - | -|

> POST / users/login
#### input
    {
        "email": "tviuty@yahoo.com",
        "password": "12345",
    }
#### expected output
status code: 200

object

    {
       "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0dml1dHlAeWFob28uY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkdG5iaU52eHp2Vmpud2cuOUJBYXJiZVBGVU5BaDFzbEZEbFJpODU0a1h4VGxCYzdEeXYvZlMiLCJjcmVhdGVkQXQiOiIyMDE5LTA3LTA4VDA2OjExOjIyLjU5NFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA3LTA4VDA2OjExOjIyLjU5NFoiLCJpYXQiOjE1NjI1NzE2NzIsImV4cCI6MTU2MjU3NTI3Mn0.HF9CmMpJrzSV64fO-T6CH76bJkPCf22td4PddDa-lW8",
        "user": "eyJhbGciOiJIUzI1NiIsInR9"
    }



### 2. Register
There's 2 ways to register user:
- from register page in client
- from admin page

| method | routes                        | detail                              | body | headers | query |
| ------ | ----------------------------- | ------------------------------------|--------|-------------|----|
| POST   | /users/register                 | create new `User`                         | email, password,username | - | -|

> POST / users/register
#### input all required
    {
        "email": "tviuty@yahoo.com",
        "password": "123456",
        "username" : "tviuty"
    }

minimum password length : 5

#### expected output
status code: 201

object

    {
        "id": 2,
        "email": "tviuty1206@yahoo.com",
        "password": "$2a$10$hnpJVqap6dJRTIANw8avFOSRe2Uhy43KD2jz5DCd6yIZBYlTUaN9.",
        "username" : "tviuty",
        "role" : "customer",
        "updatedAt": "2019-07-08T10:01:21.667Z",
        "createdAt": "2019-07-08T10:01:21.667Z"
    }

### 3. Change Password
 > PATCH /users
 - to change a password for admin page

Required Body: 

    {
        "password" : "123456"
    }

expected output : 

    {
        "id": 2,
        "email": "tviuty1206@yahoo.com",
        "password": "$2a$10$hnpJVqap6dJRTIANw8avFOSRe2Uhy43KD2jz5DCd6yIZBYlTUaN9.",
        "username" : "tviuty",
        "role" : "customer",
        "updatedAt": "2019-07-08T10:01:21.667Z",
        "createdAt": "2019-07-08T10:01:21.667Z"
    }

### 4. CRUD Product
 
> GET / products
- Get all products

expected output : 

    [
        {
            "_id":"5d43a9db66d5d5141af69913",
            "name":"white rose",
            "stock":19,"price":100000,
            "picture":"https://storage.googleapis.com/mini-word/156471548189241k3uokz0pL.jpg",
            "createdAt":"2019-08-02T03:11:23.365Z",
            "updatedAt":"2019-08-02T03:11:43.375Z",
            "__v":0
        }
    ]

 > POST / products
- create products

Headers : "Token"
Body Input required. "picture" is Optional.
 
    {
        "name": "basic shirt",
        "stock": 5,
        "price": 1000
    }

Expected Output 

    {
        "_id":"5d36ac8fcc3e8c2900106bc6",
        "name":"basic shirt",
        "stock":5,"price":1000,
        "createdAt":"2019-07-23T06:43:27.488Z",
        "updatedAt":"2019-07-23T06:43:27.488Z",
        "__v":0
    }

> PUT / products / :productid 
- to update a product

Headers : "Token"
Body Input required. "picture" is Optional.
 
    {
        "name": "basic shirt",
        "stock": 5,
        "price": 1000
    }

Expected Output 

    {
        "_id":"5d36ac8fcc3e8c2900106bc6",
        "name":"basic shirt",
        "stock":5,"price":1000,
        "createdAt":"2019-07-23T06:43:27.488Z",
        "updatedAt":"2019-07-23T06:43:27.488Z",
        "__v":0
    }

> DELETE /products / :productid
- delete a product

Headers : "Token"
Expected Output

    {
        "_id":"5d43a9db66d5d5141af69913",
        "name":"white rose",
        "stock":19,"price":100000,
        "picture":"https://storage.googleapis.com/mini-word/156471548189241k3uokz0pL.jpg",
        "createdAt":"2019-08-02T03:11:23.365Z",
        "updatedAt":"2019-08-02T03:11:43.375Z",
        "__v":0
    }


## Additional Feature
- every 2 hours, cronjob will check a cart of all customer, 
- If there's cart who didn't checkout for 2 hours,
- the crobjob will delete it automatically from customers' shopping cart

this is how cronjob running on server
> running cronjob

    [ 
        { 
            count: 1,
            _id: 5d43a9ef66d5d5141af69914,
            user_id: 5d3e75a6ce9b4c18a974bbe0,
            product_id: 5d43a9db66d5d5141af69913,
            createdAt: 2019-08-02T03:11:43.614Z,
            updatedAt: 2019-08-02T03:11:43.614Z,
            __v: 0 
        } 
    ] 'ini cart' //cart founded

> 496441 (selisih waktunya)

    [ 
        { 
            count: 1,
            _id: 5d43a9ef66d5d5141af69914,
            user_id: 5d3e75a6ce9b4c18a974bbe0,
            product_id: 5d43a9db66d5d5141af69913,
            createdAt: 2019-08-02T03:11:43.614Z,
            updatedAt: 2019-08-02T03:11:43.614Z,
            __v: 0 
        } 
    ] //cart that will be deleted

> deleted data cart success

### 5. CRUD Cart

> GET /carts
- Get all carts

Headers: Token

Expected Output:

    [ 
        { 
            count: 1,
            _id: 5d43a9ef66d5d5141af69914,
            user_id: 5d3e75a6ce9b4c18a974bbe0,
            product_id: 5d43a9db66d5d5141af69913,
            createdAt: 2019-08-02T03:11:43.614Z,
            updatedAt: 2019-08-02T03:11:43.614Z,
            __v: 0 
        } 
    ]

> POST /carts/ 
- Create new carts

Headers: Token
Input required : 

    {
        "product_id": "5d43a9db66d5d5141af69913"
    }

Expected Output:

    { 
        count: 1,
        _id: 5d43a9ef66d5d5141af69914,
        user_id: 5d3e75a6ce9b4c18a974bbe0,
        product_id: 5d43a9db66d5d5141af69913,
        createdAt: 2019-08-02T03:11:43.614Z,
        updatedAt: 2019-08-02T03:11:43.614Z,
        __v: 0 
    } 
    
### 6. CRUD Transaction

> GET /transactions / user
- Get all transactions from specific user

Headers: Token

Expected Output:

    [ 
        { 
            status: 'waiting',
            _id: 5d43b419e750b120a0d04bd9,
            user_id: 5d3e75a6ce9b4c18a974bbe0,
            total: 100000,
            products: [ [Object] ],
            createdAt: 2019-08-02T03:55:05.352Z,
            updatedAt: 2019-08-02T03:55:05.453Z,
            __v: 0 
        } 
    ]

- same as GET /transactions / all

> POST / transactions
- create new transactions

Headers: Token

Input body : 

    { 
        total: 100000,
        carts:
            [ 
                { 
                    count: 1,
                    _id: '5d43b412e750b120a0d04bd8',
                    user_id: '5d3e75a6ce9b4c18a974bbe0',
                    product_id: [Object],
                    createdAt: '2019-08-02T03:54:58.682Z',
                    updatedAt: '2019-08-02T03:54:58.682Z',
                    __v: 0 
                } 
            ] 
    }

expected output : 

    { 
        status: 'waiting',
        _id: 5d43b419e750b120a0d04bd9,
        user_id: 5d3e75a6ce9b4c18a974bbe0,
        total: 100000,
        products: 
                [ 
                    { 
                        _id: 5d43b419e750b120a0d04bda,
                        id: 5d43b403e750b120a0d04bd7,
                        count: 1 
                    } 
                ],
        createdAt: 2019-08-02T03:55:05.352Z,
        updatedAt: 2019-08-02T03:55:05.453Z,
        __v: 0 
    }

### Example Expected output validation error if one of req.body empty for all Collection

status code : 400

    {
        "message":"Product validation failed: name: Path `name` is required., stock: Path `stock` is required., price: Path `price` is required."
    }

#### expected output If User input price <1 or stock <1
status code : 400

    {
      "message":"Validation failed: price: minimum price is 1, stock: minimum stock is 1"
    }


### expected output JsonWebTokenError (try to edit or delete document without token)
status code : 401

    {
        "message": "Sorry you are not authorized"
    }
