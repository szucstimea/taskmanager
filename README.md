
## About

This is a Task List application built with Laravel for the backend, Vue.js for the frontend, and styled by Tailwind CSS.
The registered users can make Task lists with:
-Title
-Description
-Deadline
-Status
and 
-Tasks whith title & status attributes

The authorized user can create, read, update, delete (CRUD) tasklists and tasks as well.

Try it for free!

## Requirements

-PHP: 8.0 or higher<br>
-composer: dependency manager for PHP<br>
-Node.js<br>
-npm<br>
-Laravel: 8.x or higher<br>
-Vue.js: 3.x or higher<br>
-Tailwind CSS: 3.x or higher<br>

## Setup commands
(running xampp Apache and MySQL)

1. git clone https://github.com/szucstimea/taskmanager.git
2. composer install
3. configure the .env file with the database
4. run the database migrations: php artisan migrate / import the taskmanager.sql into your database
5. npm install
6. Start the two servers: 
   php artisan serve
   npm run dev (in vue folder)

## Test user is created in the database.sql:
Full name: test<br>
email: test@test.hu<br>
Password: Test@test123<br>