React Frontend Application: Country Explorer

Project Overview
This is a frontend application built using React, designed to consume data from the REST Countries API to display information about various countries. The application allows users to search and filter countries by name, region, and language.
Table of Contents
1. Project Overview
2. Technology Stack
3. Setup Instructions
4. Usage Instructions
5. API Integration
6. Testing
7. Deployment


Technology Stack
Frontend: React (Functional Components)
Language: JavaScript
CSS Framework: Tailwind CSS
API: REST Countries API
Version Control: Git and GitHub
Testing: Jest, React Testing Library
Setup Instructions
1. Clone the repository:
   git clone https://github.com/IsuruJayarathne/AF-Assigment2.git
   cd country-explorer

2. Install dependencies:
   Ensure you have `npm` or `yarn` installed, then run:
   npm install

3. Start the development server:
   npm start
   This will run the app in development mode. Open http://localhost:3000 to view it in the browser.

4.Usage Instructions
- Search by Country: Use the search bar to search for a specific country by name.
- Filter by Region/Language: Use the dropdown menus to filter countries by region or language.
- View Country Details: Click on a country to view more details like its population, languages, and flag.

5.API Integration

The application fetches data from the REST Countries API. The following endpoints are used:
- GET /all - To get a list of all countries.
- GET /name/{name} - To search for a country by name.
- GET /region/{region} - To get countries from a specific region.
- GET /alpha/{code} - To get details of a country using a country code.

6.Testing

Unit and integration tests have been implemented using Jest and React Testing Library. To run the tests, use:
   npm test

7.Deployment
The application is deployed on Netlify. You can access the live version here:
   https://af-assigment2.vercel.app/
