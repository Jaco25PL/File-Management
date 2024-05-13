# CHALLENGE

**The porpuse of this test is to evaluate the front and back abilities. We have to build a web application taht allows users to upload a CSV file with pre-formated data and show that data as cards in the web site, being able to filter the data**

## INSTRUCTIONS

- Test front and back, and all the functionalities
- Front and Back should work by executing `npm install` followed by `npm run dev` or `npm run test` to execute all test
- Use only **typescript** (for backend and frontend)

### FRONTEND 

- It should be executed in the **port 4000** 
- A button to select the CSV file from the local machine and other one to upload the selected file
- A search bar that allows users to search data of the uploaded CSV file
- Responsive design

### BACKEND

- It should be executed in the **port 3000** 
- The backend should be implemented as a **RESTful API** using **Node**
- The backend should include the following **endpoints**
    - **[POST /api/files]**
        - An endpoint that accept the upload of a CSV file from the front and store the data in a data base or a data structure. We should use the key **"file"** in the body query
        - This route should return a 200 status and a object with the key **message** and the value **"The file was successfully uploaded"**
        - Or this route should retrun a 500 status code and the object with the key **message** with a message error in the value
    - **[GET /api/users]**
        - It should includes an endpoint that allows the frontend to search for the CSV data uploaded. This route should accept a query parameter of **?q=** and should search en each CSV column.
        - It should retrun 200 and an object with the key **message** with and array of objects inside
        - Or retrun 500 with the key **message** with and error message in the value