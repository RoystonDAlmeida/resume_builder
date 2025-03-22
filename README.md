# Resume Builder Application

This is a web-based resume builder application that empowers users to create professional and customized resumes effortlessly. The application guides users through a structured process, covering essential resume sections and offering features like input validation, data persistence, and PDF generation.

## Key Features

*   **Structured Resume Sections:** The application breaks down the resume creation process into logical, easy-to-follow sections:
    *   Contact Information
    *   Objective
    *   Education
    *   Technical Skills
    *   Soft Skills
    *   Work Experience
*   **Dynamic Input Fields:** Users can add multiple entries for education, technical skills, and work experience, allowing for comprehensive resume content.
*   **Input Validation:** The application incorporates robust input validation to ensure data accuracy and consistency (e.g., phone number format, email format, LinkedIn URL format).
*   **Data Persistence:** User data is automatically saved in the browser's `localStorage`, enabling users to resume their work.
*   **PDF Generation:** The application can generate a well-formatted PDF version of the completed resume, ready for download and sharing.
*   **Responsive Design:** The application is designed to be responsive and adapt seamlessly to various screen sizes, ensuring a consistent user experience across devices.
*   **Intuitive Navigation:** Users can easily navigate between different resume sections using a clear and intuitive navigation system.
*   **Helpful Error Messages:** The application provides informative error messages to guide users in correcting invalid data entries.

## Technologies Used

*   **Vue.js 3:** The core JavaScript framework for building the dynamic and interactive user interface.
*   **Vuetify 3:** A Material Design component framework for Vue.js, providing a rich set of pre-built UI components and a consistent design language.
*   **jsPDF:** A JavaScript library for generating PDF documents directly in the browser.
*   **npm:** The Node.js package manager for managing project dependencies.
*   **localStorage:** The browser's local storage mechanism for persisting user data.
*   **Docker:** Used for containerization, simplifying deployment and ensuring consistent environments.


## Getting Started

This project can be run either directly using Node.js and npm or within a Docker container. Choose the method that best suits your needs.

### Prerequisites

*   **Node.js:** (version 18 or higher recommended)
*   **npm:** (usually comes with Node.js)
*   **Docker:** (if you want to use the Docker setup)

### Running with Docker

Docker provides a convenient way to run the application in an isolated environment, ensuring consistency across different systems.

1.  **Clone the Repository:**
    ```bash
    git clone git@github.com:RoystonDAlmeida/resume_builder.git
    ```

2.  **Navigate to the Project Directory:**
    ```bash
    cd resume_builder/
    ```

3.  **Build the Docker Image:**
    ```bash
    docker build -t resume-builder .
    ```
    *   This command builds a Docker image named `resume-builder` using the `Dockerfile` in the current directory.

4.  **Run the Docker Container:**
    ```bash
    docker run -p 5173:5173 -v $(pwd):/app resume-builder
    ```
    *   `-p 5173:5173`: Maps port 5173 on your host machine to port 5173 in the container, allowing you to access the application in your browser.
    *   `-v $(pwd):/app`: Mounts your current working directory (`$(pwd)`) to the `/app` directory inside the container. This enables live reloading and allows you to edit files on your host machine and see the changes reflected in the container.
    *   `resume-builder`: The name of the Docker image you built.

5.  **Access the Application:**
    *   Open your web browser and go to `http://localhost:5173/`.

### Running without Docker

If you prefer not to use Docker, you can run the application directly using Node.js and npm.

1.  **Clone the Repository:**
    ```bash
    git clone git@github.com:RoystonDAlmeida/resume_builder.git
    ```

2.  **Navigate to the Project Directory:**
    ```bash
    cd resume_builder/
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

5.  **Access the Application:**
    *   Open your web browser and go to the URL provided in the terminal (usually `http://localhost:5173/`).

## Key Components and Composables

*   **`BaseSection.vue`:** A reusable component that provides a consistent layout for each section of the resume. It handles navigation between sections and validation.
*   **`ContactInfoComponent.vue`:** Manages the collection and validation of contact information.
*   **`EducationComponent.vue`:** Manages the education section, allowing users to add multiple educational entries.
*   **`TechnicalSkillsComponent.vue`:** Manages the technical skills section, allowing users to add multiple categories and subcategories.
*   **`useDataPersistence.js`:** A composable that handles saving and loading data to and from `localStorage`.
*   **`useFieldValidation.js`:** A composable that provides field validation logic.
*   **`pdfFormatter.js`:** A utility file that contains the logic for formatting the resume data and generating the PDF using `jsPDF`.

## Data Flow

1.  **User Input:** Users enter data into the input fields in the various components.
2.  **Validation:** Input fields are validated using the `useFieldValidation` composable.
3.  **Data Persistence:** Data is saved to `localStorage` using the `useDataPersistence` composable.
4.  **PDF Generation:** When the user clicks the "Generate PDF" button, the `pdfFormatter.js` utility is used to generate the PDF.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your forked repository.
5.  Submit a pull request.