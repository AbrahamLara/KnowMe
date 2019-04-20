## KnowMe

This is my full stack web development project KnowMe!

## Database Setup

__Assuming MongoDB is already installed__

* Start MongoDB without access control: `mongod --port 27017 --dbpath /data/db`
* Connect to instance: `mongo --port 27017`
* Run inside instance:
```
use knowme
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "knowme" }]
})
```

## Emailing server

At this point in development Mailtrap is being utilized to test and view emails sent out to user's after they have succesfully registered to the platform to avoid spamming real emails. In order to be able to send out multiple emails in the event users are registering to the platform at the same time RabbitMQ will be used as our dedicated queue manager.<br>We have to run the receiver.js file in a seperate shell if we want to create more than one worker.

## Web App Setup

* clone repo: `git clone https://github.com/AbrahamLara/KnowMe-backend-server.git`
* install server dependencies: `npm install`
* install emailing dependencies: `npm emailing-install`
* install client dependencies: `npm client-install`
* run web app: `npm run dev`