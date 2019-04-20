## KnowMe

This is my full stack web development project KnowMe! The backend to this project exists in this directory. This project allows for user authentication with jsonWebTokens and an emailing service for sending confirmation to newly registered users. There are still more features planned for this project.

* Learn more about the client side [here](client/README.md).
* Learn more about the emailing service [here](emailing/README.md).

## Database Setup

__Assuming you have MongoDB already installed__

* start MongoDB without access control: `mongod --port 27017 --dbpath /data/db`
* connect to instance: `mongo --port 27017`
* run inside instance:
```
use knowme
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "knowme" }]
})
quit()
```

## Emailing Setup

__Assuming you have RabbitMQ already installed__

* start RabbitMQ server: `rabbitmq-server`

## Web App Setup

* clone repo: `git clone https://github.com/AbrahamLara/KnowMe.git`
* install server dependencies: `npm install`
* install emailing dependencies: `npm emailing-install`
* install client dependencies: `npm client-install`
* run web app: `npm run dev`