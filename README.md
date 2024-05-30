# CSV to JSON Web Application
## Overview

This project is a web application designed to demonstrate front-end and back-end skills using TypeScript. The application allows users to upload a CSV file with pre-formatted data and display that data as cards on the website, with functionality to filter the displayed data.

## Technologies Used
### Frontend
- React
- TypeScript
- Vite

### Backend
- Node.js
- Express.js
- Multer (for handling file uploads)
- convert-csv-to-json (for converting CSV to JSON)
- CORS

## Setup and Installation
Prerequisites
- Node.js
- pnpm

## Installation Steps
Clone the repository:

- git clone <repository-url>
- cd File-Management/
- Install dependencies for both frontend and backend:

#### To run the application, execute `pnpm run dev` at the root directory and both, frontend and backend will run at once because of the **pnpm workspace**

### Access the frontend on http://localhost:5000.
Use the file selection button to choose a CSV file and upload it using the upload button.
Use the search bar to filter and view the data from the uploaded CSV file.
Backend:

### The backend API will be available at http://localhost:3000.
Use the provided endpoints to upload and search CSV data.
Endpoints

### [POST /api/files]
Endpoint to upload a CSV file from the frontend. The key "file" should be used in the body query.
Returns a 200 status code with a message: "The file was successfully uploaded".
Returns a 500 status code with an error message if something goes wrong.
### [GET /api/users]
Endpoint to search the uploaded CSV data. Accepts a query parameter ?q= to search each CSV column.
Returns a 200 status code with an array of objects.
Returns a 500 status code with an error message if something goes wrong.
Contributing
Feel free to contribute to this project by opening issues or submitting pull requests.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
