# Backend RESTful API Tokopedia Play Clone

<center>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="Mongo DB" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Mongo DB" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Mongo DB" />
</center>

API Deployed at [Vercel](https://api-ulinnaja-gigih-midterm.vercel.app/)

This is the submission for the fullstack final project [#GenerasiGigih3.0](https://www.anakbangsabisa.org/generasi-gigih/)


## Table of Contents 🎯

- [Requirement](#requirement)
- [How to run localy](#how-to-run-localy)
- [Database Structure](#database-structure)
- [API Structure](#api-structure)
- [List API Request and Response](#list-api-request-and-response)


## Requirement 📝
1. NodeJS
2. MongoDBCompass
3. Postman
  
## How to run localy 💻
1. Clone this repository
2. Open it using a code editor
3. Run the command `npm install` in the terminal
4. Create a new file named `.env` in the root directory, then copy the contents of the `.env.example` file into the `.env` file
   1. Fill in the `PORT` variable with the port you want to use (e.g. 5000)
   2. Fill in the `DATABASE_URL` variable with the MongoDB connection string (e.g. mongodb://localhost:27017/{database_name})
   3. Fill in the `JWT_SECRET` variable with the secret key for the JWT (e.g. your_secret_key)
   4. Fill in the `ABLY_API_KEY` variable with the your API key https://ably.com/
5. To run the project, use `npm run dev` command
6. Open Postman, then import the available collection & environment in the `_postman` folder into Postman
   1. You can use the available collection to test the API
7. Woala! You can use this API now

 
## Database Structure 💾
My application uses a MongoDB database to store data. The database is organized into several collections, including `Users`, `Videos`, `Products`, and `Comments`.

The `Users` collection stores information about the users of our application, including their full name, email address, and password. Each user document has a unique ID, which is used to associate the user with their videos and comments.

The `Videos` collection stores information about the videos submitted by users, including the title, URL, and thumbnail URL. Each video document has a unique ID and a reference to the ID of the user who submitted it. Videos can also be associated with multiple products through the `products` field, which stores an array of references to product documents.

The `Products` collection stores information about the products associated with videos, including the title, price, link, and image URL. Each product document has a unique ID and a reference to the ID of the video it is associated with.

The `Comments` collection stores information about the comments submitted by users on videos, including the full name of the commenter, the comment text, and a timestamp. Each comment document has a unique ID and a reference to the ID of the video it is associated with.

## API structure ⚙
This is a RESTful API. The API is organized into several endpoints, including `users`, `videos`, `products`, and `comments`. Each endpoint has a set of routes that correspond to the CRUD operations (Create, Read, Update, and Delete).

Requests to the API should include any required parameters in the request body or URL, depending on the endpoint and method. Responses from the API are returned in JSON format and include a status code, a message indicating the success or failure of the request, and any relevant data.

Some endpoints require authentication. In these cases, the request must include an `Authorization` header with a valid JSON Web Token (JWT). The JWT is generated when a user login in to the application. The JWT is used to verify that the user is authorized to make the request.

## List API request and response 💡

### Authentication
* User object
``` 
{
  id: integer
  fullname: string
  email: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

**POST /auth/login**
----
  Returns a JSON Web Token (JWT) & user object if the user is successfully authenticated.
* **URL Params**
* **Data Params**  
``` 
  {
    email: string,
    password: string
  }
```
* **Headers**  
  Content-Type: application/json
* **Success Response:**
* **Code:** 200  
  **Content:**  
  `{message: "Login success", access_token: <JWT>, refresh_token: <JWT>}` 
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "User not found" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ message : "Incorrect password" }`

**POST /auth/signup**
----
  Creates a new user and returns user object.
* **URL Params**
* **Data Params**  
``` 
  {
    fullname: string,
    email: string,
    password: string
  }
```
* **Headers**  
  Content-Type: application/json
* **Success Response:**
* **Code:** 200  
  **Content:**  
  `{message: "User created", user: <user_object>}`
* **Error Response:**
  * **Code:** 400  
  **Content:** `{ message : "User already exists" }`
  * **Code:** 400  
  **Content:** `{ message : "Fullname is required" }`
  * **Code:** 400
  **Content:** `{ message : "Email is not valid" }`
  * **Code:** 400
  **Content:** `{ message : "Password must be at least 8 characters long" }`  


**GET /auth/user**
----
  Returns the user object associated with the provided JWT.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**
  Authorization: Bearer `<JWT Token>`
* **Success Response:**  
  * **Code:** 200  
  **Content:**  
```
{
  message: "Get user success"
  data: <user_object>
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message : "User not found" }`

**PUT /auth/user**
----
  Updates the user object associated with the provided JWT.
* **URL Params**
  None
* **Data Params**  
``` 
  {
    fullname: string,
    email: string,
    password: string
  }
```
* **Headers**
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**  
```
{
  message: "Update user success"
  data: <user_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "User not found" }`

**PATCH /auth/user**
----
  Updates the user object associated with the provided JWT.
* **URL Params**
  None
* **Data Params**
  Optional  
``` 
  {
    fullname: string,
    email: string,
    password: string
  }
```
* **Headers**
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**  
```
{
  message: "Update user success"
  data: <user_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "User not found" }`

**DELETE /auth/user**
----
  Deletes the user object associated with the provided JWT.
* **URL Params**
  None
* **Data Params**
  None
* **Headers**
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Delete user success"
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "User not found" }`

**GET /user/:id**
----
  Returns the details of the specified user.
* **URL Params**
  *Required:* `id=[integer]`
* **Data Params**
  None
* **Headers**
  None
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Get user details success"
  data: <data_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "User not found" }`


### Videos
* Video object
```
{
  id: integer
  userId: integer
  userName: string
  title: string
  url: string
  thumbnail: string
  createdAt: datetime(iso 8601)
  updatedAt: datetime(iso 8601)
}
```

**POST /videos**
----
  Creates a new video and returns video object.
* **URL Params**
  None
* **Data Params**
```
{
  title: string,
  url: string,
  thumbnail: string
}
```
* **Headers**
  Content-Type: application/json
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Success creating new video"
  data: <video_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "User not found" }`
  * **Code:** 409  
  **Content:** `{ message : "Title video already exists, please use another title!" }`
  * **Code:** 400  
  **Content:** `{ message : "Title is required" }`
  * **Code:** 400  
  **Content:** `{ message : "URL is required" }`
  * **Code:** 400  
  **Content:** `{ message : "Thumbnail is required" }`

**GET /videos**
----
  Returns a list of videos.
* **URL Params**
  *Optional:* `search=[string]`
* **Data Params**
  None
* **Headers**
  None
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Success finding videos"
  data: [<video_object>]
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ error : "No videos found" }`

**PUT /videos/:id**
----
  Updates the video object associated with the provided ID.
* **URL Params**
  *Required:* `id=[integer]`
* **Data Params**
```
{
  title: string,
  url: string,
  thumbnail: string
}
```
* **Headers**
  Content-Type: application/json
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Success updating video"
  data: <video_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "Video not found" }`

**PATCH /videos/:id**
----
  Updates the video object associated with the provided ID.
* **URL Params**
  *Required:* `id=[integer]`
* **Data Params**
  Optional
```
{
  title: string,
  url: string,
  thumbnail: string
}
```
* **Headers**
  Content-Type: application/json
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Success updating video"
  data: <video_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "Video not found" }`

**DELETE /videos/:id**
----
  Deletes the video object associated with the provided ID.
* **URL Params**
  *Required:* `id=[integer]`
* **Data Params**
  None
* **Headers**
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Delete video success"
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "Video not found" }`

**GET /videos/:id**
----
  Returns the details of the specified video.
* **URL Params**
  *Required:* `id=[integer]`
* **Data Params**
  None
* **Headers**
  None
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Get video details success"
  data: <video_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "Video not found" }`

### Products
* Product object
```
{
  id: integer
  videoId: integer
  title: string
  price: integer
  link: string
  imageUrl: string
  createdAt: datetime(iso 8601)
  updatedAt: datetime(iso 8601)
}
```

**POST /products/:videoId**
----
  Creates a new product and returns product object.
* **URL Params**
  *Required:* `videoId=[integer]`
* **Data Params**
```
{
  title: string,
  price: integer,
  link: string,
  imageUrl: string
}
```
* **Headers**
  Content-Type: application/json
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 201
  **Content:**
```
{
  message: "Success creating new product"
  data: <product_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "Video not found" }`
  * **Code:** 409  
  **Content:** `{ message : "Product already exist" }`
  * **Code:** 400  
  **Content:** `{ message : "Title is required" }`
  * **Code:** 400  
  **Content:** `{ message : "Price is required" }`
  * **Code:** 400  
  **Content:** `{ message : "Link is required" }`
  * **Code:** 400  
  **Content:** `{ message : "Image URL is required" }`

**PUT /products/:id**
----
  Updates the product object associated with the provided ID.
* **URL Params**
  *Required:* `id=[integer]`
* **Data Params**
```
{
  title: string,
  price: integer,
  link: string,
  imageUrl: string
}
```
* **Headers**
  Content-Type: application/json
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Success updating product"
  data: <product_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "Product not found" }`

**PATCH /products/:id**
----
  Updates the product object associated with the provided ID.
* **URL Params**
  *Required:* `id=[integer]`
* **Data Params**
  Optional
```
{
  title: string,
  price: integer,
  link: string,
  imageUrl: string
}
```
* **Headers**
  Content-Type: application/json
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Success updating product"
  data: <product_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "Product not found" }`

**DELETE /products/:id**
----
  Deletes the product object associated with the provided ID.
* **URL Params**
  *Required:* `id=[integer]`
* **Data Params**
  None
* **Headers**
  Authorization: Bearer `<JWT Token>`
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Delete product success"
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "Product not found" }`

**GET /products/:id**
----
  Returns the details of the specified product.
* **URL Params**
  None
* **Data Params**
  None
* **Headers**
  None
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Get product details success"
  data: <product_object>
}
```
* **Error Response:**
  * **Code:** 404  
  **Content:** `{ message : "Product not found" }`

**GET /products/video/:videoId**
----
  Returns a list of products associated with the specified video.
* **URL Params**
  *Required:* `videoId=[integer]`
* **Data Params**
  None
* **Headers**
  None
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Success finding all products"
  data: [<product_object>]
}
```
* **Error Response:**
  * **Code:** 500 
  **Content:** `{ message : "Cast to ObjectId failed ..." }`

### Comments
* Comment object
```
{
  id: integer
  videoId: integer
  username: string
  comment: string
  createdAt: datetime(iso 8601)
  updatedAt: datetime(iso 8601)
}
```

**POST /comments/:videoId**
----
  Creates a new comment and returns comment object.
* **URL Params**
  *Required:* `videoId=[integer]`
* **Data Params**
```
{
  username: string,
  comment: string
}
```
* **Headers**
  None
* **Success Response:**
  * **Code:** 201
  **Content:**
```
{
  message: "Success submitting new comment"
  data: <comment_object>
}
```
* **Error Response:**
  * **Code:** 400  
  **Content:** `{ message : "Username is required" }`
  * **Code:** 400  
  **Content:** `{ message : "Comment is required" }`
  * **Code:** 400  
  **Content:** `{ message : "Comment must be less than 200 characters" }`
  * **Code:** 500  
  **Content:** `{ message : "Comments validation failed: videoId: Cast to ObjectId failed for value ..." }`

**GET /comments/:videoId**
----
  Returns a list of comments associated with the specified video.
* **URL Params**
  *Required:* `videoId=[integer]`
* **Data Params**
  None
* **Headers**
  None
* **Success Response:**
  * **Code:** 200
  **Content:**
```
{
  message: "Success finding all comments"
  data: [<comment_object>]
}
```
* **Error Response:**
  * **Code:** 500  
  **Content:** `{ message : "Cast to ObjectId failed ..." }`


