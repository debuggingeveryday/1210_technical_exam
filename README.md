# 1210 technical exam Task managing system

### Requirements

docker - https://www.docker.com/
git bash - https://git-scm.com/

## Installation

### Configuration (git bash or bash only)
```
git clone https://github.com/debuggingeveryday/1210_technical_exam.git
cd 1210_technical_exam
// build container
docker-compose up -d
// once if finish build the container then run to tty with container php
docker-compose exec php bash
cp .env.example .env
composer install
// once if finish installing composer package
npm install
php artisan key:generate
php artisan migrate
```

### Address location

for web project: http://localhost
for managing database: http://localhost:9090

### Run project

```
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

Admin can access all</br>
Manager can access all</br>
Assignee only can access - access task page, view task table, view task details, update status task

### Follow up update

Add docker-compose.yml update (Done)</br>
Add notification every actions(Done)</br>
Enhancement of web layouts</br>
Add more browser test</br>
Deployment to server</br>

### Reference

for Dockerfile: https://github.com/refactorian/laravel-docker/tree/laravel_10x
