# 1210 technical exam Task managing system

## Installation

### Steps
```
git clone https://github.com/debuggingeveryday/1210_technical_exam.git
cd 1210_technical_exam
cp .env.example .env
// configure your env base in your local
php artisan migrate
npm install
// run watch
npm run watch
// to build
npm run build
```

### Format files
```
// TSX or TS files
npm run format-ts
// php format
npm run format-php
```

### Credentials

Admin
user: admin@system.com
pass: admin12345

Manager
user: manager@system.com
pass: manager12345

Assignee
user: assignee@system.com
pass: assignee12345

### Roles and Permissions:

Admin can access all
Manager can access all
Assignee only can access - access task page, view task table, view task details, update status task

### Follow up update

Add docker-compose.yml update
Add notification every actions
Deployment to server
