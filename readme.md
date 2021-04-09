# Custom Command for nodejs setup 

This is the app for creating a nodejs setup fastly with the custom command.

Documentaion for the project [Documentation](https://docs.google.com/document/d/1nvl6XyJ0tTe_qsHYRHrvis4ZsHNgcWNcEl2cZdB2WQ8/edit)


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

>The above command will create a module with three folder and a routes.json file. The three folder will be middleware,controller and services and every folder will contains a file with the dummy data inside it.You can change it according to your need in future

```bash
$ framework create-api
# For creating a new api
# will Prompt the following questions 
#Enter the moduleName for the api
#Choose the method (i.e get,patch,post,put,delete)
#Enter the action for the api (enter the controller function name here)
#Enter the middleware for the api (enter the middleware name  separated by space if you have more than one middleware)
#Enter the endpoint for the api
#Want the path from root
```

>The above command will create a new api in the routes.json of that particular module and also create the action,middleware function in controller and middleware files respectively that you have passed during propmt 



```bash
$ framework create-middleware
# will prompt the following questions
# Choose the options: Module Middleware or GlobalMiddleware
# If user choose module Middleware will get the module name for selecting the module
# Enter the middlewareName in format fileName.middlewareName


# If user choose the global Middleware
# then user have to enter the global Middlewrae name in format fileName.middlewareName
```
>The above command will create a middlewarefunction in the module middleware of apis folder if user chooses the moduleMiddleware option and if user chooses the globalMiddleware option then the command will create a function in the particular file specified by the user.If it already exist in that particular file then the function will not be created.