# Software Frameworks
### Node application that prints the hello world message

## How to Run
After cloning run: `npm install`
Then run: `node index.js`

## Run angular in cloud9
`ng serve --host $IP --port $PORT --public-host $C9_HOSTNAME`

## Update node version for angular
`nvm install 10.8.0 --reinstall-packages-from=node`

## MongoDB
`sudo apt-get install -y mongodb-org`

`cd ~/workspace && mkdir data`

`echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod`

`chmod a+x mongod`

### Mongo run
`./mongod`

Also start the node server for the rest api, located in assignment1/mongo-server

`npm start` <-this runs from package.json as a script to run nodemon

### Mongo unsafe shutdown
Delete ./data/mongod.lock

Run `./mongod` again


## Course Content

|  Week          |Content                        |
|----------------|-------------------------------|
|Week 1          |Hello world & string manip     |
|Week 2          |Git repo & merging             |
|Week 3          |Express & jQuery               |
|Week 4          |Angular-labs                   |
|Week 5          |Angular-login                  |
|Week 6          |Angular-Chat                   |
