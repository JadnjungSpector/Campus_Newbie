Here’s the revised README with the requested directory structure and information:

---

# Campus Newbie

## Project Overview

**Campus Newbie** is a student-centric platform designed to help users discover campus hotspots, activities, events, and reviews. The platform offers a personalized experience, allowing users to filter based on audience, location, and safety ratings. A points-based system incentivizes engagement, and users can save events or activities for later. The platform includes verified postings and emphasizes community integration, making it a valuable resource for students, campus visitors, and event organizers.

### Functionality:
- Users can explore current events and register for them.
- Users can filter events based on audience, location, and safety ratings.
- A points-based system incentivizes engagement with the campus community.
- Event organizers can submit events for review.
- The platform currently supports the University of Washington but aims to handle multiple campuses in the future.

## Installation

### Prerequisites
Before starting, ensure you have the following installed:
- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher)
- **MongoDB** (version 5.0+ recommended for local development)
- **Git** for cloning the repository and managing code.

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/JadnjungSpector/Campus_Newbie.git
   cd Campus_Newbie
   ```

2. **Backend Setup:**
   1. Navigate to the backend directory:
      ```bash
      cd src/CampusReactApp/package/backend
      ```
   2. Install the backend dependencies:
      ```bash
      npm install
      ```
   3. Start the backend server:
      ```bash
      node server.js
      ```

3. **Frontend Setup:**
   1. Navigate to the frontend directory:
      ```bash
      cd ../src
      ```
   2. Install the frontend dependencies:
      ```bash
      npm install
      ```
   3. Start the frontend server:
      ```bash
      npm start
      ```

### Running the Software

1. Ensure that MongoDB, the backend, and the frontend servers are running.
2. Open a web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the app.

### Using the Software

- **Login/Register**: Access through the login page, using either OAuth or campus credentials (e.g., UW login).
- **Explore Events**: Use filters on the events page to find relevant campus activities.
- **Submit Events**: Event organizers can submit events for review from their profile.
- **Track Activities**: Users can access the profile page to see bookmarked activities and request completion review for points.

### Reporting Bugs
1. Go to the GitHub Issues tracker (link provided on the project’s GitHub page).
2. Provide the following details:
   - Description of the issue
   - Steps to reproduce
   - Expected and actual results
   - Screenshots or logs (if applicable)

### Known Bugs
Refer to the GitHub Issues tracker for an up-to-date list of known issues. This list is regularly updated based on development and testing feedback.

---

## Developer Documentation

### Obtaining the Source Code
Clone the repository from GitLab:
```bash
git clone https://github.com/JadnjungSpector/Campus_Newbie.git
```

### Directory Structure

- **`Campus_Newbie/src/CampusReactApp/package`**: Main application code for business logic, controllers, models, etc.
- **`Campus_Newbie/src/CampusReactApp/package/src/tests/`**: Test cases for each component, organized by package structure.
- **`Campus_Newbie/src/CampusReactApp/package/src/views/ui`**: Contains the React.js files and components for the user interface.
- **`Campus_Newbie/src/CampusReactApp/package/backend`**: Node.js backend with Express API endpoints.

### Building the Software

1. **Backend**: To start the server, run:
   ```bash
   node server.js
   ```
2. **Frontend**: To launch the app interface, run:
   ```bash
   npm start
   ```

### Testing the Software

- **Unit Tests**: Located in `Campus_Newbie/src/CampusReactApp/package/src/tests/` with tests for individual components.
- **System Testing**: Run the test suite using:
  ```bash
  npm test
  ```
- **Usability Testing**: Conduct user testing sessions to gather feedback.

### Adding New Tests

1. Navigate to the `src/tests/` directory.
2. Create a new test file in the appropriate package (e.g., `controller`, `model`).
3. Follow the naming convention (`<ComponentName>.test.js`) and structure the test cases accordingly.

### Building a Release

1. Update version numbers in code and documentation if needed.
2. Run the full test suite to ensure everything is stable.
3. Confirm any changes in the README or user documentation.
