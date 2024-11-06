# User Information

**Project Information**

Campus Newbie is a student-focused platform that provides personalized activity recommendations, campus hotspots, and event listings with safety ratings and user reviews. It uses a points-based system to encourage student exploration and engagement, while offering filters for tailored suggestions based on group type. By emphasizing community integration and verified events, Campus Newbie aims to enhance the college experience through safe, engaging, and inclusive campus discovery.
**Most functionalities work in progress**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


**Functionality**
User can look at current events as well as register one. However, for the time being, we are missing on the functionality of capable of handling multiple campus other than University of Washington. 
## Installation (Necessary for User and Developer)
**Prerequisites**

Node.js (v16.x or higher) and npm (v8.x or higher): Required for running both the frontend (React.js) and backend (Express).
MongoDB: For local development, MongoDB must be installed and running. Version 5.0+ is recommended.
Git: Necessary for cloning the repository and managing code.
##Installation Steps:
Clone the GitLab repository: Bash copy code
git clone https://github.com/JadnjungSpector/Campus_Newbie.git
Navigate to the project folder: bash copy code
cd Campus_Newbie

## Backend Setup:
Install backend dependencies: bash copy code
cd CampusNewbie
npm install
Configure MongoDB by updating the .env file with the MongoDB URI and JWT secret.
Start the backend server: bash copy code
	./node server.js


## Frontend Setup:
Install frontend dependencies: bash copy code
cd CampusReactApp
npm install
Start the frontend server: bash copy code
npm start
Running the Software
To start the software:
Start MongoDB, backend, and frontend servers as detailed in the installation section.
Open a web browser and navigate to http://localhost:3000 to access the app interface.
Using the Software
Login/Register: Access through the login page, using either OAuth or campus credentials (e.g., UW login).
Explore Events: Use filters on the events page to find relevant campus activities.
Submit Events: Event organizers can submit events for review from their profile.
Track Activities: Access the profile page to see bookmarked activities and request completion review for points.
Reporting Bugs
Go to the GitHub Issues tracker (link provided on the project’s GitHub page).
Provide details, including:
Description of the issue.
Steps to reproduce.
Expected and actual results.
Screenshots or logs if applicable.
Known Bugs
Refer to the GitHub Issues tracker for an up-to-date list of known issues. This is regularly updated to reflect the latest development and testing feedback.



---------------------------------------------------------------------------------------------------------------

# Developer Information

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `node server.js`

**Note: This is only to run the backend server to connect with the MongoDB database**

To run the server to connect to MongoDB, you must cd into CampusReactApp -> package -> backend then run the command to run the server.js file.



## Obtaining the Source Code
Clone the repository from GitLab:
bash
Copy code
git clone https://github.com/JadnjungSpector/Campus_Newbie.git

## Directory Structure
src/main/java: Main application code for business logic, controllers, models, etc.
src/test/java: Test cases for each component, organized by package structure.
frontend: Contains the React.js files and components for the user interface.
backend: Node.js backend with Express API endpoints.
Building the Software
Backend: Use ./node server.js in the backend directory to start the server.
Frontend: Use npm start in the frontend directory to launch the app interface.
Testing the Software
Unit Tests: Located in src/test/java, with tests for individual classes and components.
System Testing: Use Postman or Selenium for testing interactions between frontend and backend.
Usability Testing: Conduct user testing sessions and gather feedback.
Adding New Tests
Navigate to src/test/java.
Create a new test file in the appropriate package (e.g., controller, model).
Follow naming conventions (<ComponentName>Test.java) and structure.
Building a Release
Update version numbers in code and documentation if required.
Run a full test suite to ensure stability.
Confirm any changes in the README or user documentation.

## Test-Automation Infrastructure
Tools:
JUnit: Standard testing framework for Java with Maven integration.
Mocha: For Node.js backend testing.
Selenium: For integration testing between frontend and backend.
Adding a New Test:
Navigate to src/test/java.
Create a new class in the corresponding package.
Follow conventions to maintain organization and alignment with the project structure.
Continuous Integration (CI) Service: GitHub Actions
Why GitHub Actions: Integrated with GitHub, large action library, free usage limits.
CI Build Triggers: Any push to the main branch or new pull request.
CI Service Comparison
Service
Pros
Cons
GitHub Actions
Integrated with GitHub; free usage
Limited monitoring options
CircleCI
High scalability, detailed insights
Complex setup; paid beyond free tier
Azure Pipelines
Extensive language support, scalable
Complex UI; less intuitive interface

**Reference project design document for further testing information**

## Building a Release
Update version numbers in code and documentation if required.
Run a full test suite to ensure stability.
Confirm any changes in the README or user documentation.


## Tests Executed in CI Build
All backend tests


