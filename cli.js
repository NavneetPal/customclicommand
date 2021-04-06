#!/usr/bin/env node
const shell = require('shelljs')
const fs=require('fs');
const path=require('path');
const chalk=require('chalk');
const download=require('download-git-repo');
const Confirm=require('prompt-confirm');
const inquirer=require('inquirer');

//Grab provided args
const[,,...args]=process.argv

//Holding the path of the current working directory
let basePath=process.cwd();

const [type,...moduleName]=args;


if(type==="create-module"){


    if(fs.existsSync(path.join(basePath,'api'))){
        if(moduleName){
            for(let module of moduleName){
const routesJsonData=`[{
    "path":"/", 
    "method":"get", 
    "action":"${module}.controllerName",
    "globalMiddlewares":[],
    "middlewares":["${module}.middlewareName"],
    "pathFromRoot":true
}]`

const controllerData=`
module.exports={
  controllerName:(req,res,next)=>{
    //Your controller codes will go here
    res.send(setup.services['${module}']['demo']['serviceName']());
  }
}
`
const middlewareData=`module.exports={
  middlewareName:(req,res,next)=>{
    //Your middleware codes will go here
    next();
  }
}
`               
const serviceData=`module.exports={
  serviceName:()=>{
    //Your service codes will go here
    return "service has been called"
  }
}
`               


                fs.mkdirSync(path.join(basePath,'api',`${module}`),{recursive:true});
                fs.mkdirSync(path.join(basePath,'api',`${module}`,'controller'),{recursive:true});
                fs.mkdirSync(path.join(basePath,'api',`${module}`,'middleware'),{recursive:true});
                fs.mkdirSync(path.join(basePath,'api',`${module}`,'services'),{recursive:true});
                fs.writeFileSync(path.join(basePath,'api',`${module}`,'controller',`${module}.js`),controllerData);
                fs.writeFileSync(path.join(basePath,'api',`${module}`,'services',`demo.js`),serviceData);
                fs.writeFileSync(path.join(basePath,'api',`${module}`,'routes.json'),routesJsonData);
                fs.writeFileSync(path.join(basePath,'api',`${module}`,'middleware',`${module}.js`),middlewareData);
            }
            console.log(chalk.green(`Created ${moduleName} module sucessFully`));
        }else{
            console.log("Please enter the module-name");
        }
    }
   
}


if(type==="init"){
    if(moduleName.length!=0){
        console.log("Command not found(only write 'framework init')");
    }else{
        download('direct:https://github.com/PriteeCybercom/Demo-Node.git#main',basePath,{clone:true}, function (err) {
    if(!err){
     let devusername="root";
     let devpassword=null;
     let devdatabase="database_development";
     let prousername="root";
     let propassword=null;
     let prodatabase="database_production";
let databaseJsonData=`{
  "development": {
    "username": "${devusername}",
    "password": "${devpassword}",
    "database": "${devdatabase}",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "${prousername}",
    "password": "${propassword}",
    "database": "${prodatabase}",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}`
      shell.cd(path.join(basePath));
      new Confirm({message:"Wants to configure db right now?",default:false}) .run()
      .then(answer=>{
        if(answer){
          new Confirm({message:"Do you want to setup development env?(yes,no)",default:false}).run()
          .then(answer=>{
            if(answer){
              let questions=[{
                name:'username',
                type:'input',
                message:'Enter the username:',
                validate: function( value ) {
                    if (value.length) {
                      return true;
                    } else {
                      return 'Enter the username';
                    }
                  }
            },{
                name:'password',
                type:'password',
                message:'enter the password of your database',
                validate: function( value ) {
                    if (value.length) {
                      return true;
                    } else {
                      return 'Please enter the password of your database.';
                    }
                  }
            },{
                name:'database',
                type:'input',
                message:'Please enter the database name',
                validate: function( value ) {
                    if (value.length) {
                      return true;
                    } else {
                      return 'Please enter the database name.';
                    }
                  }
              }]  
              inquirer.prompt(questions).then(answer=>{
                  devusername=answer.username;
                  devpassword=answer.password;
                  devdatabase=answer.database;
databaseJsonData=`{
"development": {
  "username": "${devusername}",
  "password": "${devpassword}",
  "database": "${devdatabase}",
  "host": "127.0.0.1",
  "dialect": "mysql"
},
"production": {
  "username": "${prousername}",
  "password": "${propassword}",
  "database": "${prodatabase}",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
}`
                fs.writeFileSync(path.join(basePath,'config','database.json'),databaseJsonData);
                shell.exec("npm install");
              })
            }else{
              new Confirm({message:"Do you want to setup production env?(yes/no)",default:false}).run()
              .then(answer=>{
                if(answer){
                  let questions=[{
                    name:'username',
                    type:'input',
                    message:'Enter the username:',
                    validate: function( value ) {
                        if (value.length) {
                          return true;
                        } else {
                          return 'Enter the username';
                        }
                      }
                },{
                    name:'password',
                    type:'password',
                    message:'enter the password of your database',
                    validate: function( value ) {
                        if (value.length) {
                          return true;
                        } else {
                          return 'Please enter the password of your database.';
                        }
                      }
                },{
                    name:'database',
                    type:'input',
                    message:'Please enter the database name',
                    validate: function( value ) {
                        if (value.length) {
                          return true;
                        } else {
                          return 'Please enter the database name.';
                        }
                      }
                  }]  
                  inquirer.prompt(questions).then(answer=>{
                    prousername=answer.username;
                    propassword=answer.password;
                    prodatabase=answer.database;
databaseJsonData=`{
  "development": {
    "username": "${devusername}",
    "password": "${devpassword}",
    "database": "${devdatabase}",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "${prousername}",
    "password": "${propassword}",
    "database": "${prodatabase}",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}`
                  fs.writeFileSync(path.join(basePath,'config','database.json'),databaseJsonData);
                  shell.exec("npm install");
                  })
                }else{
                  fs.writeFileSync(path.join(__dirname,'config','database.json'),databaseJsonData);
                  shell.exec('npm install');
                }
              })
            }
          })
        }else{
          fs.writeFileSync(path.join(basePath,'config','database.json'),databaseJsonData);
          shell.exec("npm install");
        }
      })
    }
})
       
    }
}

if(type==="create-api"){
  let questions=[{
    name:'moduleName',
    type:'input',
    message:'Enter the moduleName for the api',
    validate:function(value){
      if(value.length){
        return true
      }else{
        return 'Enter the moduleName for the api'
      }
    }
  },{
    name:'method',
    type:'list',
    message:'Choose the method',
    choices:['get','post','patch','delete','put'],
    validate:function(value){
      if(value.length){
        return true
      }else{
        return 'Choose the method'
      }
    }
  },{
    name:'action',
    type:'input',
    message:'Enter the action for the api',
    validate:function(value){
      if(value.length){
        return true
      }else{
        return 'Enter the action for userthe api'
      }
    }
  },{
    name:'middlewares',
    type:'input',
    message:'Enter the middleware for the api',
    validate:function(value){
      if(value.length){
        return true
      }else{
        return 'Enter the middleware for the api'
      }
    }
  },{
    name:'endpoint',
    type:'input',
    message:'Enter the endpoint for the api',
    validate:function(value){
      if(value.length){
        return true
      }else{
        return 'Enter the endpoint for the api'
      }
    }
  },{
    name:'pathFromRoot',
    type:'confirm',
    message:'Want the path from root',
    default:false
  }]
  let api;
  inquirer.prompt(questions).then(answer=>{
    const {moduleName,method,action,middlewares,endpoint,pathFromRoot}=answer;
    let res=pathFromRoot?true:false;
    let middlewareArray=middlewares.split(" ");
    let newMiddlewareArray=[];
    for(let middleware of middlewareArray){
      newMiddlewareArray.push(`${moduleName}.${middleware}`);
    }

     api={
      "path":endpoint,
      "method":method,
      "action":`${moduleName}.${action}`,
      "middlewares":newMiddlewareArray,
      "pathFromRoot":res
      }
   
    const routes=require(path.join(basePath,'api',`${moduleName}`,'routes.json'))
    routes.push(api);
    fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'routes.json'),JSON.stringify(routes,null," "));

    //TODO: Create a controller function 

    const fileData=fs.readFileSync(path.join(basePath,'api',`${moduleName}`,'controller',`${moduleName}.js`));
  const dummyData=` ,
  ${action}:(req,res,next)=>{
     //Your code will go here
     res.send('${action} page');
  }
}`
   const {...func}=require(path.join(basePath,'api',`${moduleName}`,'controller',`${moduleName}`));
    let fileString=fileData.toString();
    const lastParanthesis=fileString.lastIndexOf('}')
    fileString=fileString.slice(0,lastParanthesis);
    // if function already exist then do not create it
    if(func[`${action}`]){
     fileString=fileString+`
}`;
    }else{
     fileString=fileString+dummyData;
    }
    fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'controller',`${moduleName}.js`),fileString);

    //TODO: Create a middleware function
    const fileData1=fs.readFileSync(path.join(basePath,'api',`${moduleName}`,'middleware',`${moduleName}.js`));
    let dummyData1='';
    for(let middleware of newMiddlewareArray){
      let middlewareName=middleware.split('.')[1];
      dummyData1+=` ,
  ${middlewareName}:(req,res,next)=>{
     //Your code will go here
     next();
  }`
    }
    dummyData1+=`
}`
    let fileString1=fileData1.toString();
    const lastParanthesis1=fileString1.lastIndexOf('}')
    fileString1=fileString1.slice(0,lastParanthesis1);
    fileString1=fileString1+dummyData1;
    fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'middleware',`${moduleName}.js`),fileString1);

    console.log(chalk.green('Created api successfully'));
  })
}








