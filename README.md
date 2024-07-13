# Meal Management App

- **Technologies Used:** [Express.js](https://expressjs.com/), [React.js](https://react.dev/), [Node.js](https://nodejs.org/en), [MongoDB](https://www.mongodb.com/)

**N.B:**

- Here I used MongoDB Atlas as the database, as I was using MongoDB Atlas for my previous project. So, I used it here as well to avoid any issues.
- I tried to finish the most of the backend features of the project at first, and tested all the endpoints (for admin and users) which worked fine expect for the `api/v1/mealschedules/` related endpoints (I'll fix those later).
- I also tried to finish the frontend of the app, but I could only manage to finish Landing page, the Login/Register pages, and the Dashboard page. I couldn't manage to finish the rest of the pages currently.

### E-R Diagram:

![meal-management-er-diagram](https://github.com/user-attachments/assets/e570347a-cbe8-40ab-89a1-1b363586255e)

## Backend Features Added:

- **Authentication**: JWT-based login and registration. (N.B: in my settings, **The first registered user will be assigned the ADMIN role by default.**)
- **User Management**:
  - Admins Only: Add, update, ban users.
  - General Users: Viewing own profile.
- **Item Management**:
  - Admins Only: Add, delete food items.
  - General Users: Viewing all items.
- **Meal Management**:
  - Admins Only: Create, update, delete meals and manage schedules.
  - General Users: Viewing all meals.
- **Meal Schedule Management**: Viewing all users' meal schedules (Have to fix some issues with this feature).

## Frontend Features Added:

- Landing Page
- Login, Registration Page
- Dashboard Page with Navbar
- Theme Toggling (Dark and Light Mode)
- Other features aren't built yet

### Usage

1. Clone the repository

   ```sh
   git clone https://github.com/Rashed112/Jobify-MERN-Project.git
   ```

2. Install dependencies

   ```sh
   cd jobify
   npm run setup-production-app
   ```

3. Set up environment variables: To run the application locally or deploy it elsewhere, you need to set up the following environment variables in a `.env` file at the root of the project. Here's how to fill in each variable:

   - `NODE_ENV`: Set the environment to either `development` or `production`.
   - `PORT`: Define the port number on which the server will run. Here default is `5100`.
   - `MONGO_URL`: Provide the connection string to your MongoDB database. Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB credentials.
   - `JWT_SECRET`: Choose a secret key for JSON Web Token (JWT) encryption.
   - `JWT_EXPIRES_IN`: Set the expiration time for JWT tokens.

   Here's an example `.env` file:

   ```plaintext
   NODE_ENV=development
   PORT=5100
   MONGO_URL=mongodb+srv://<username>:<password>@cluster0.a3mftk7.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1d
   ```

4. Run the application:

   ```sh
   node server
   ```

5. Access the application in your browser at `http://localhost:5100`.
