## KnowMe

This is my full stack web development project KnowMe!

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

At this point in development Mailtrap is being utilized to test and view emails sent out to user's after they have succesfully registered to the platform to avoid spamming real emails. In order to make sure users receive an email in a timely manner we will need to run more than one consumer process (only neccessary for production). When you start the web app only one consumer process will be running.

__Assuming you have RabbitMQ already installed__

* start RabbitMQ server: `rabbitmq-server`

## Web App Setup

* clone repo: `git clone https://github.com/AbrahamLara/KnowMe-backend-server.git`
* install server dependencies: `npm install`
* install emailing dependencies: `npm emailing-install`
* install client dependencies: `npm client-install`
* run web app: `npm run dev`