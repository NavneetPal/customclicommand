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
```
Commands:
  init|i                            Initializes the nodejs setup
  create-api|a                      Create api for the particular module
  create-middleware|m               Create a module/global middleware for the specific endpoint
  create-module|cm <moduleName...>  Create a new module in the apis
  create-service|cs                 Create a module/global services
  create-function|cf                Create a module/global function
  help [command]                    display help for command
```

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
# If user choose module Middleware will get the list of module name for selecting the module
# Enter the middlewareName in format fileName.middlewareName


# If user choose the global Middleware
# then user have to enter the global Middlewrae name in format fileName.middlewareName
```
>The above command will create a middlewarefunction in the module middleware of apis folder if user chooses the moduleMiddleware option and if user chooses the globalMiddleware option then the command will create a function in the particular file specified by the user.If it already exist in that particular file then the function will not be created.

```bash
$ framework create-service
# the following question will be prompted: Wants to create global srvice or module service
# the enter fileName.serviceName for the service that you want to make
```

>The above command will create a service on the basis of your choices whether you wnat to kae it global service or module service
NOTE: if you want to add more that one services at a time then they shoul be separted by spaces

```bash
$ framework create-function
# the following command will create a module fiunction or global function on tyour choice
# NOTE: if you are making global function then the format will be folderName.anotherFolderName.fileName.functionName
# if you want to create a file in roots functions folder then write fileName.functionName
```

>The above command will create a local function or golobal function on your choices. When you are creating a local function then the syntax for specifying the function Name is fileName.functionName and when it comes to the global function then the syntax will vary where you want to add that function so the basic synax will be first specify the folder then the fileName then the functionName.

```bash
$ framework --help
# Output 
Usage: cli [options] [command]

Node setup Management

Options:
  -V, --version                     output the version number
  -h, --help                        display help for command

Commands:
  init|i                            Initializes the nodejs setup
  create-api|a                      Create api for the particular module
  create-middleware|m               Create a module/global middleware for the specific endpoint
  create-module|cm <moduleName...>  Create a new module in the apis
  create-service|cs                 Create a module/global services
  create-function|cf                Create a module/global function
  help [command]                    display help for command
```

```bash
$ framework --version
# Will gives you the current version of the cli
```