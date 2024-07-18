# MedHub Frontend

The MedHub Frontend project is a web application developed using React, aimed at providing an intuitive and user-friendly interface for the MedHub system. This system is designed to streamline and manage a social media platform dedicated to medical staff and professionals.

## Features

- **Create React App:** The project is bootstrapped with Create React App, ensuring a robust setup for building and deploying the application.
- **Development Mode:** The application can be run in development mode using `npm start`, allowing developers to test and view changes in real-time.
- **CICD Pipeline:** Ensures only ready products are released for customer and user use.
- **Testing:** Integrated test runner launched via `npm test`, facilitating continuous testing and quality assurance.
- **Production Build:** Builds optimized for performance using `npm run build`, ensuring the application is ready for deployment.
- **ESLint:** Ensures the code is organized and free of unwanted syntax symbols or expressions.

## Installation Instructions

1. **Clone the Repository:** Clone the project repository to your local machine.
2. **Install Dependencies:** Navigate to the project directory and run `npm install` to install all necessary dependencies.
3. **Start the Application:** Use `npm start` to run the app in development mode.
4. **Run Tests:** Execute `npm test` to launch the test runner.
5. **Run ESLint:** Ensure that the code is free of syntax errors and follows our provided conventions.
6. **Build for Production:** Create a production build using `npm run build`.

## Usage Examples

- **Development:** Open [http://localhost:3000](http://localhost:3000) to view the application in your browser. The page will reload automatically upon making changes to the code.
- **Testing:** The test runner operates in interactive watch mode, allowing continuous testing as code is updated.
- **Production Deployment:** The application can be built for production, resulting in a minified and optimized version ready for deployment.

## ESLint Conventions

We follow specific coding conventions using ESLint to maintain code quality and consistency. Here are the rules we adhere to:

1. **Indentation:** Use 4 spaces for indentation.
2. **Quotes:** Use single quotes (`'`) for strings.
3. **Semicolons:** Do not use semicolons (`;`) at the end of statements.
4. **No `var`:** Use `let` or `const` instead of `var`.
5. **No Unused Variables:** Variables that are declared but not used are not allowed, except for function arguments.
6. **Comma Dangle:** Only use trailing commas in multiline statements.
7. **Arrow Spacing:** Ensure there is a space before and after the arrow (`=>`) in arrow functions.
8. **Array Bracket Spacing:** Do not use spaces inside array brackets.
9. **Object Curly Spacing:** Use spaces inside curly braces for objects.
10. **No Shadowing:** Variable declarations should not shadow outer scope variables.

These conventions help us maintain a clean and consistent codebase, making it easier to read and maintain.
