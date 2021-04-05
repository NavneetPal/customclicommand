# Custom Command for nodejs setup 

This is the app for creating a nodejs setup fastly with the custom command.


## Version: 1.3.3

## Usage

```bash
$ npm install
```

```bash
$ npm link
# For using command locally on your computer
```

>You can get the package for the same on npm [@navneet1998/customcmd](https://www.npmjs.com/package/@navneet1998/customcmd) Install it as global package

**Custom Command**

1. framework init
2. framework create-module moduleName **Or** framework create-module moduleName1 moduleName2 ....
3. framework create-api

## Usage of Custom Command

```bash
$ framework init
# will create the nodejs setup and install the following packages needed if the root doesn't contains any files or folder
```


>The above command will create a nodejs setup for you and install the following npm packages automaticcaly while it is installing the package do not type `CTRL + C` on your terminal

```bash
$ framework create-module mouleName
# Example framework create-module user
# For creating a single module in the api folder

$ framework create-module moduleName1 moduleName2 mmoduleName3 ...
# Example: framework create-module user blog admin
# For creating a multiple module at the same time
# Note: ModuleName should be separted by spaces
```

>The above command will create a module with three folder and a routes.json file. The three folder will be middleware,controller and services and every folder will contains afile with the dummy data inside it.You can change it according to your need