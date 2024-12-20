# Interactive Approach to Backward To Backward Compatible Modular System Configuration

This Django-based tool provides an interactive platform to intelligently configure system parts and interfaces, incorporating user inputs to optimize setup and functionality. Ideal for complex systems needing tailored configurations, this tool guides the user through a series of steps to ensure all components are perfectly aligned with operational requirements.

## Features

- **Interactive Configuration**: Engage with dynamic forms that adapt based on previous user inputs to streamline the configuration process.
- **Modular Design**: Flexible architecture to add or modify system parts and interfaces without affecting the core functionality.
- **Intelligent Suggestions**: Utilizes advanced algorithms to suggest optimal configurations based on user inputs and system requirements.
- **Real-time Validation**: Instantly validates user inputs against predefined criteria to ensure compatibility and performance.
- **User-Friendly Interface**: Clean and intuitive user interface, designed for ease of use regardless of technical expertise.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Pre-requisites

Before you start, ensure you have the following installed:

1. **Node.js**
2. **Python**
3. **PIP**
4. **Microsoft Visual Studio Code (VS Code)**
5. **MySQL Workbench**

## MySQL/Database Configuration

1. **Access Credentials**: Enter the username and password provided by Dr. Yoo.
2. **Database**: We will use the `autowscs` database as it is linked to the `.jar` files.

## File Locations

- **Project Directory**: `C:\AutoPlan\automsc`
- **Git Directory**: `C:\AutoPlan\automsc\interactive.approach.to.backward.compatible.modular.system.configuration`

## GitHub Setup

1. **Account**: Create a GitHub account or use an existing one.
2. **Install Git Tools**:
   - Install GitBash and Git.
3. **Repository**:
   - Clone the repository from [v1.0 branch](https://github.com/ehvenga/interactive.approach.to.backward.compatible.modular.system.configuration).
   - **Repository URL**: `https://github.com/ehvenga/interactive.approach.to.backward.compatible.modular.system.configuration`

### Using Git

1. Open the Git directory using Bash (or any terminal).
2. Use the terminal in VS Code to navigate to the project files with `cd` commands.
3. Login to your Git account.
4. **Git Commands**:
   - `git clone` - Clone the repository.
   - `git pull` - Pull the latest changes.
   - `git push` - Push your changes.
   - Note: Do not push to the original repository; fork or clone it to maintain your own version.

## Frontend Setup

1. Navigate to the `/frontend` directory for React files.
2. Install dependencies by running:
   ```bash
   npm i
   ```
3. Use the following commands:
   - Start the development server (runs on port 3000):
     ```bash
     npm run dev
     ```
   - Build production files:
     ```bash
     npm run build
     ```
   - Run the production server (runs on port 3000):
     ```bash
     npm run start
     ```

## Backend Setup

1. Navigate to the `/server` directory for Django files.
2. Install dependencies by running:
   ```bash
   pip install -r requirements.txt
   ```
3. If any dependencies are missing, install them manually.
4. Start the server (runs on port 8002):
   ```bash
   py manage.py runserver 8002
   ```

---

Feel free to fork this repository and contribute! If you encounter any issues, please open an issue in the repository or contact the project maintainer
