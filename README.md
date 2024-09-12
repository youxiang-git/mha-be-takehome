# Backend Take Home Assignment (MHA)

Submission by: Chai Youxiang </br>
Date: 12 September 2024

## Backend API Implementation using Node.JS and Express.JS

### Tasks

1. Create a backend API with 3 endpoints:

    - GET request - Get an object by ID from a list of JSON object.
    - POST request - Add a new object.
    - DELETE request - Delete an object (should pass in an ID or some identifier).

2. Log all requests to the backend.

3. Validate the add and delete object requests.

4. Create a couple of unit tests cases to test out the endpoints.

5. Implement dependency injection.

**Bonus:** Deploy the above app to the cloud.

## Overview

### Installed dependencies:

<ul>
    <li> Express.JS - For our backend server</li>
    <li> Nodemon - Live reload (installed as DevDependency) </li>
    <li> JOI - HTTP Request Validation for JSON request body </li>
    <li> Pino - Middleware for logging all requests to server </li>
    <li> JEST - Testing </li>
</ul>

### File structure:

```
mha-be-takehome/
├── .git/
├── node_modules/
├── .gitignore
├── app.js              // App's entry point
├── data.json           // Dummy data to be loaded
├── package-lock.json
├── package.json
├── README.md
└── utils.js            // Module for utility functions
```

## Implementation

### 1. Create a backend API using Express.js server with 3 endpoints:

#### 1.1. GET request to fetch an object by ID from JSON object.
