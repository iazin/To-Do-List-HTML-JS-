# ToDo-List

## Description

ToDo-List is a web application that allows users to create, edit, delete tasks, and manage their daily activities efficiently. The application supports data export and import in JSON format and includes autosave functionality using IndexedDB.

## Features

- *Task Management:* Create, edit, delete tasks.
- *Data Handling:* Export and import data in JSON format.
- *Autosave:* Automatically saves data to IndexedDB.
- *Task Fields:* Each task includes the following fields:
  - *Task Name:* The name of the task.
  - *Date:* The due date of the task.
  - *Priority:* The priority level of the task.
  - *Status:* The current status of the task.
  - *Countdown:* Time remaining until the task is due.

## Technology Stack

- *Frontend:* HTML, JavaScript, Bootstrap.
- *Backend:* All logic is implemented using JavaScript.

## Getting Started

### Prerequisites

To run this project locally, you will need a web browser that supports IndexedDB.

### Installation

1. Clone the repository:
```sh
   git clone https://github.com/iazin/ToDo-List.git
```
   
3. Navigate to the project directory:
```sh
   cd todo-list
```
   
3. Open index.html in your web browser to start using the ToDo-List application.

### Live Demo

You can also run the project directly from GitHub Pages using the following link:

[Live Demo on GitHub Pages](https://iazin.github.io/ToDo-List/)

## Usage

1. *Creating a Task:* Fill in the task details, and click on the "Add Task" button to save.
2. *Editing a Task:* Click on the task you want to edit, update the details, and save.
3. *Deleting a Task:* Click on the delete icon next to the task you want to remove.
4. *Exporting Data:* Click on the "Export" button to download your tasks in JSON format.
5. *Importing Data:* Click on the "Import" button and select a JSON file to load your tasks.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
