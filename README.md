# E-learning Backend Project

This is the backend for an e-learning platform using Node.js, Express.js, and Prisma, with a PostgreSQL database hosted on Render.

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (Node Package Manager)
- **Docker** (Optional, if you want to run the app inside a container)
- **DBeaver** or any other database client (Optional, for accessing the database)

---

## Steps to Run the Project Locally

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm i
```

This will install all the necessary dependencies listed in `package.json`.

### 3. Configure Environment Variables

The project uses environment variables to configure database access and other sensitive data. Since the database is hosted online (e.g., on Render or Supabase), you do not need to run any migration locally. You can skip any database setup locally.

Create a `.env` file in the root directory of the project, and add the following environment variables:

```bash
DATABASE_URL=postgres://user:password@hostname:5432/database_name
 ```

 ### 4. Run the Project

You can now run the project locally using the following command:

```bash
npm run dev
 ```

This will start the server using **Nodemon** for live reloading.

### 5. Verify the Database Connection

If the project connects to a PostgreSQL database (or other database), you can verify the connection by checking the logs or using a database client like **DBeaver** to query the database. Ensure the application is correctly interacting with the online database.

---