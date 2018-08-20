# 3813ICT Chat Assignment

### Note

This assignment also includes the mongoDB and socket.io implementation. To adhere to marking, some information is also saved to localstorage.

## Git

The repository used contains all of the software frameworks lab exercises as well as the assignment.

The workflow was as such:

Create feature branch from master

The feature branch created will have the new code changes pushed into it

Once the feature is deemed complete, testing occurs

Once testing is complete, a pull request is then made (feature =\&gt; master)

Pull request confirmed and master branch is now updated.

[https://github.com/terraseraph/software-frameworks](https://github.com/terraseraph/software-frameworks)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAt0AAADiCAYAAACShHujAAAgAElEQVR4Ae3dC5BU1b3v8T/yVCDAAUGIKAHERHMEldESvSFaURRBjF5JoSjkEjSapDRGMSdX4jOJMQJGjUoUC6OIhVZFJDEaPUbOFS1BoqAQVMDBwOAgyGPgAOYgt35LV9vT093T072796O/uwq692vttT5r9+7/rF577Var3qvdf/ihvYwJAQQQQAABBBBAAAEEghFYt77ejhx4eCqxA/Z+8klqhjcIIIAAAggggAACCCBQukBmjH1A6UmSAgIIIIAAAggggAACCOQTIOjOp8M6BBBAAAEEEEAAAQQCECDoDgCRJBBAAAEEEEAAAQQQyCdA0J1Ph3UIIIAAAggggAACCAQgQNAdACJJIIAAAggggAACCCCQT4CgO58O6xBAAAEEEEAAAQQQCECAoDsARJJAAAEEEEAAAQQQQCCfAEF3Pp0ErKurq0tAKSgCAggggAACCCAQbwGC7njXH7lHAAEEEEAAAQQQiIEAQXcMKoksIoAAAggggAACCMRbgKA73vVH7hFAAAEEEEAAAQRiINAmBnlMZXH9+vX26KOP2p49e9yyo48+2i644ILUet4ggAACCCCAAAIIIBBFgdgE3StXrrSnn37axo8fb4ceeqizfOKJJ2zWrFl20UUXWYcOHaLoS54QQACBUAVmz55tL774op122mk2ceLEUPPCwRFAAIFqFohF0K2W7VdffdXOOeecVMCtShs9erTNmTPH1q5dax999JFt2rTJtXzv2LHDBeMjRoywo446yhSwa/9TTz3Vnn32WWvfvr3985//dPU+duxYt41mtN28efPc8r59+7pgXjM6xt69e1362l6T365Lly42adIk+9KXvuSW8x8CCCAQFYFt27bZP/7xD5cdvWq+a9euUcke+UAAAQSqSiAWfbo3b97sgl7fwu1rSK3bCnZXrFhhAwYMsE8++cR1PVHQrcBar5oUkA8cONDatWvnlun9jTfeaOqeomBcQb26rigg/973vmc//elP3X4LFizwh7KDDz7Y7aM8vPTSS247pXHcccfZG2+8kdqONwgggEBUBD744APbuHGja+XWq+b9tG7dOvvBD35gzz33nFu0fPlyu+SSS0yvmvx6LZs2bZpdd911plZzJgQQQACB4gRiEXTnK1rPnj3dagXf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)

## Models

### Server/MongoDB Models:

User schema

| **Name** | **Type** |
| --- | --- |
| username | { type: String, required: true, index: { unique: true } } |
| password | { type: String, required: true } |
| email | String |
| role | String |
| groups | Object |
| details | Object |

Group Schema

| **Name** | **Type** |
| --- | --- |
| group\_name | { type: String, required: true, index: { unique: true } } |
| group\_admins | Array |
| group\_users | Array |



Channel Schema

| **Name** | **Type** |
| --- | --- |
| channel\_name | { type: String, required: true, index: { unique: true } } |
| group\_id | { type: String, required: true, index: { unique: true } } |
| channel\_users | Array |



Message Schema

| **Name** | **Type** |
| --- | --- |
| channel\_id | { type: String, required: true, index: { unique: true } } |
| message | { type: String, required: true, index: { unique: true } } |
| username | { type: String, required: true, index: { unique: true } } |





### Client models

mongo.service.ts

Holds the following globals for components to access:

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| user\_data | Object | Holds logged in user data |
| user\_list | Object | Holds all users |
| groups\_list | Object | Holds all groups |
| channels\_list | Object | Holds all channels |
| channel\_id | String | Current subscribed channel |
| logged\_in | Boolean | State of user logged in |



## Client / Server relationship

The full application is separated into two (2) components:

- Client/front end (Angular)
- Server/database (Node/mongoDB/Socket.io)

The client is running angular (also running on a node server) this allows for easy to use MVC (model, view, controller) methods and a well documented application structure. The angular client is able to call the server&#39;s api to return any data that is needed upon request, allowing for dynamic and real time updates. Angular is also very good at live dynamic updates with subscriptions, therefore with any data changes it can reflect this to the user.

The angular client also has Socket.io enabled to access the servers methods enabling subscription to chat channels, allowing for realtime chat via websockets.

The server is running node express with mongoose, this provides access to the mongoDB database, and enables an easy to setup REST API endpoint for storing and retrieving data for the application.

In addition the server also provides a Socket.io connection, which provides a websocket service to facilitate the chat protocols.



## REST API

Server/mongoDB API.

(Note: all routes prepended with /api. Eg: &quot;/api/group&quot; returns all groups)

| **Route** | **Parameter** | **Method** | **Return Value** | **Purpose** |
| --- | --- | --- | --- | --- |
| /users |   | GET | User : Object | Get all users |
|   | POST | User : Object | Add new user |
| /users/edit |   | POST | User : Object | Update user |
| /users/:id | id:String | GET | User : Object | Get a users details |
| /users/remove |   | POST | Success : Object | Remove user |
| /users/login |   | POST | User :object | Check login credentials. |
| /group |   | GET | Group :Object | Get all groups |
| /group/add\_group |   | POST | Group : Object | Add new group |
| /group/update\_group |   | POST | Group : Object | Update group |
| /group/:id | id:String | GET | Group : Object | Get single group data |
| /group/remove\_group |   | POST | Success : Object | Remove a group |
| /channel |   | GET | Channel : Object | Get all channels data |
| /channel/add\_channel |   | POST | Channel : Object | Add new channel |
| /channel/update\_channel |   | POST | Channel : Object | Update channel |
| /channel/:id | Id:String | GET | Channel : Object | Get single channel data |
| /channel/remove\_channel |   | POST | Success : Object | Remove a channel |
| /chat/message |   | POST | Message : Object | Post a message |
| /chat/room\_messages |   | POST | Message : Object | Get all room messages |



## Angular Architecture

### Routes

app.module.ts

| **Path** | **Component** | **Parameter** |
| --- | --- | --- |
| /login | LoginComponent |   |
| /main | MainComponent |   |
| /menu | MenuComponent |   |
| /rooms | RoomsListComponent |   |
| /settings | SettingsComponent |   |
| /chat-room | ChatRoomComponent | /:id/:name |



### Components

| **Component** | **Purpose** |
| --- | --- |
| AppComponent | Application entry point |
| LoginComponent | Then users is not logged in, this page is the path users will be redirected to. |
| MainComponent | Holds users profile information to edit and save personal information. |
| MenuComponent | Holds the menu components for routing. |
| RoomsListComponent | Contains the list of groups and channels available to the logged in user, provides links to those channels. |
| ChatRoomComponent | The dynamic loading of each chat channel is provided here. |
| SettingsComponent | Contains the essential UI CRUD operations to administer the users, groups &amp; channels. |



### Services

| **Service** | **Purpose** |
| --- | --- |
| mongo | Provides the api calls to the mongo server, returns observables and holds user data. |
| socket | Manages the connections to the websockets provided by the server. |
| authguard | Checks if the user is currently logged in, redirects to login if false. |
| methods | Observable from channel to channel for subscribing/unsubscribing from a channel. |
