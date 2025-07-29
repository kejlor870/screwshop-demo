A simple online shop created as part of a programming course from Udemy. The project demonstrate basic front-end features and basic user interaction.

🛠️ Tech: HTML, CSS, JavaScript  
🛒 Theme: Screws, nuts, bolts – hardware shop  
🎯 Goal: Practice responsive layout, styling and JS interactivity

## 📁 Project files overview
The repository contains files and folders directly related to the project, such as:
- index.html - main HTML file of the app
- mainStyle.css - CSS style file
- scripts.js - Vanilla JavaScript file
- main-jquery.js - jQuery file
- ajax.js - sending query to PHP file, downloading data from PHP file using AJAX
- getProductInfo.php - generate XML structure from database, using query from ajax.js
- images/ - images and icons

There are also auxiliary files and folders that are not part of the core source code, for example:
- node_modules/ - installed npm modules
- package.json and package-lock.json - npm configuration files

This distinction helps to keep track of what is actual project code and what is environment or dependency related.

## 🔧 Installation

To run the project locally, follow these steps:

### 1. Cloning the repository

```bash
git clone https://github.com/kejlor870/screwshop-demo.git
```

### 2. Set up a local server (e.g. XAMPP):

This project includes PHP and AJAX calls, so it must be run on a local server environment like XAMPP, MAMP, or similar.
1. Install XAMPP if you haven't already.
2. Open the XAMPP Control Panel and start Apache (and MySQL, if the project uses a database).
3. Move the cloned project folder (screwshop-demo) into the htdocs directory of your XAMPP installation.
   
Default path on Windows:
```bash
C:\xampp\htdocs\screwshop-demo
```
### 3. Import the database:
- Open phpMyAdmin
- Create a new database (e.g., warehouse_nuts)
- Import the SQL file located in the project (e.g., warehouse_nuts.sql) via the Import tab in phpMyAdmin

### 4. Configure database connection:
- Edit the PHP file(s) responsible for database connection (e.g., getProductInfo.php) and update the database name, username, and password accordingly.
  
### 5. In your browser, go to:
```bash
http://localhost/screwshop-demo/
```
This will load ```index.html``` through the local server and allow AJAX and PHP functionality to work correctly.
