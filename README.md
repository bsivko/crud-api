# crud-api
RS-School CRUD API

## Way of start

Run at console:

`npm run start:dev`

The server starts at `http://localhost:8000` by default.

## Usage

GET all example:

`curl -X GET http://localhost:8000/api/users -H "Content-Type: application/json"`

POST to add user example:

`curl -X POST http://localhost:8000/api/users -H "Content-Type: application/json" -d '{"age": 123456, "username": "12", "hobbies": ["hiking", "pissing"]}' `

GET by ID example:

`curl -X GET http://localhost:8000/api/users/dc3e7596-c329-43dc-b8e9-e908f313eb6d -H "Content-Type: application/json" `

PUT by ID example:

`curl -X PUT http://localhost:8000/api/users/68790ecb-c8cd-493e-bb4e-0cf346ac64d4 -H "Content-Type: application/json" -d '{"age": 126, "username": "asd", "hobbies": []}'`

DELETE by ID example:

`curl -X DELETE http://localhost:8000/api/users/dc3e7596-c329-43dc-b8e9-e908f313eb6d -H "Content-Type: application/json" `


