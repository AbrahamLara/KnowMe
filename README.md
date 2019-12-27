# KnowMe

This is my full stack web development project KnowMe! The backend to this project exists in this directory. This project allows for user authentication with jsonWebTokens and an emailing service for sending confirmation emails to newly registered users. There are still more features/improvements planned for this project.

* Learn more about the client side [here](client/README.md).
* Learn more about the emailing service [here](emailing/README.md).

## Requirements

* npm (Node Package Manager) latest version
* MongoDB   - Local or Cloud
* RabbitMQ  - [download/tutorial](https://www.rabbitmq.com/#getstarted)
* Mailtrap API - [link](https://mailtrap.io)

## Database Setup

* create folder in root directory: `sudo mkdir data/db`
* give ownership of directory to self: `sudo chown -R $USER data/db`
* start mongod: `mongod --dbpath data/db`
* start mongo in seperate window: `mongo`
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

## RabbitMQ Setup

* start RabbitMQ server: `rabbitmq-server`

The recievers are automatically intialized for you once you run the web app.

**The /emaliling folder has the more details on setting up mailtrap. Click [here](emailing/README.md).**

## Web App Setup

* clone repo: `git clone https://github.com/AbrahamLara/KnowMe.git`
* install server dependencies: `npm install`
* install emailing dependencies: `npm emailing-install`
* install client dependencies: `npm client-install`
* run web app: `npm run dev`