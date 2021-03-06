
# Glib App

A Web Chat Application which provide user with various features :

* One to One Chatting
* Open Channel where anyone can chat
* A private channel whose contents are visible only to the channel members
* File sharing(.png|.jpeg|.txt|.mp3|.mp4|.pdf|.zip|Code Snippets etc) 
* Upload Profile picture
* Video Calling with a better UI and Ux where user can chat and recieve video call simuntaneouly
* Provide snapshots of websites with the provided links(eg. youtube video links and can also play at the same time.)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
* Updated version of Node.js
* Angular 4
* MongoDB 
```
### Installing

A step by step series of examples that tell you have to get a development env running

### Installing NodeJs

<p align="center">
  <a href="https://nodejs.org/">
    <img alt="Node.js" src="https://nodejs.org/static/images/logo-light.svg" width="400"/>
  </a>
</p>
<p align="center">
  <a title="CII Best Practices" href="https://bestpractices.coreinfrastructure.org/projects/29"><img src="https://bestpractices.coreinfrastructure.org/projects/29/badge"></a>
</p>

```
Binaries, installers, and source tarballs are available at https://nodejs.org.
```

### Installing Angular 4

```
   1. Make sure you have node version above 6.9 and npm above 3
   2. Check the version by using node --version and npm --version
   3. Install angular cli using npm install -g @angular/cli
   4. -g installs the angular globally on your system and you just have to run this command only once
   5. Create the angular project using ‘ng new angularprojectname’
   6. Go to that project folder and check the angular version by ‘ng -v’

    Upgrade this version to angular 4 by running this command-

    For Windows- npm install @angular/common@next @angular/compiler@next @angular/compiler-cli@next @angular/core@next @angular/forms@next @angular/http@next @angular/platform-browser@next @angular/platform-browser-dynamic@next @angular/platform-server@next @angular/router@next @angular/animations@next --save

For Linux/Mac- npm install @angular/{common,compiler,compiler-cli,core,forms,http,platform-browser,platform-browser-dynamic,platform-server,router,animations}@next --save

Make sure to upgrade the typescript version by running command- npm install typescript@2.2.1 --save

Ignore whatever warning it shows up and now check the angular version by ‘ng -v’ The version has changed from 2.2.4 to 4.1.0

You can also check all the info about your angular cli in package.json file.

```
### Installing MongoDB
```
Run this command to install mongoDB-
npm install --save mongodb
```
## Quick start

```bash
# clone the repo
git clone https://github.com/stackroute/glibapp.git 

# change into the repo directory
cd client
# install 
npm install
cd server
# install 
npm install

# run
npm start to start client side
node app.js to start server side
```
