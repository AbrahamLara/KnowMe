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

## Web App Setup

* clone repo: `git clone https://github.com/AbrahamLara/KnowMe-backend-server.git`
* install server dependencies: `npm install`
* install client dependencies: `npm client-install`
* run server: `npm run dev`