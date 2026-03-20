# Product Manager Frontend

A simple CRUD (Create, Read, Update, Delete) frontend application for managing products.

## Features

- Add new products with name, description, price, category, and image
- View all products in a responsive table
- Edit existing products
- Delete products with confirmation
- Responsive design that works on mobile and desktop

## Technologies Used

- HTML5
- CSS3 (with Bootstrap 5)
- JavaScript (Vanilla JS)
- Bootstrap Icons

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and go to `http://localhost:5173` (or the URL provided in the terminal)

## Project Structure

```
frontend/
├── index.html       # Main HTML file
├── styles.css       # Custom styles
├── script.js        # Application logic
├── package.json     # Project metadata and dependencies
└── README.md        # This file
```

## CRUD Operations

### Create
Fill out the form and click "Save Product" to add a new product.

### Read
All products are displayed in the table below the form.

### Update
Click the "Edit" button on any product row to load its data into the form. Modify the data and click "Save Product" to update.

### Delete
Click the "Delete" button on any product row. Confirm the deletion in the modal dialog.

## Data Storage

Currently, product data is stored in memory (JavaScript array). In a real application, this would connect to a backend API for persistent storage.