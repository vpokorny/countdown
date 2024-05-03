# Introduction

This is an open-source application that does the countdown mechanism in Electron framework.

---

# Description

This application consists of two windows. The first window controls the counter value to be set in the second window.
The second window does the visualisation of the countdown itself. The intentional usage is that in the control window 
you set the time from which you want to count to `00:00:00`. Then you use the action buttons to start the countdown
on the second window.

## Real usage

I am using this application for time countdown during the presentations' visualization on a conferences. The first 
window is located on my main notebook's display and the second window is located on a timer screen located on the stage
in the fullscreen mode window switched on by `F11` button.

---

# Installation guide

The application is written in electron framework that is based on the javascript. TBD

## Install Node.js on your machine

For windows go to the https://nodejs.org/en/download page and download the Node.js. Follow the installation guide and 
make sure that at the end you are able to run the following command:
```shell
npm --version
```

## Install dependencies

The next step is to install the dependencies. To do so, navigate to the root directory of this project
where the `package.json` file is located and run
```shell
npm install
```

> **NOTE:** That this utility has been developed quite a while ago and therefore the dependencies
> versions are not fully up-to-date.

## Run the contdown

To run the countdown please in the root directory execute:
```shell
npm run start
```

---

# Contacts

* Maintainer: [Vaclav Pokorny](mailto:pokorny.vena@gmail.com)

