#!/usr/bin/env node
const shell = require('shelljs')
const fs=require('fs');
const path=require('path');
const chalk=require('chalk');
const download=require('download-git-repo');
const Confirm=require('prompt-confirm');
const inquirer=require('inquirer');
const Spinner=require('cli-spinner').Spinner;

//Grab provided args
const[,,...args]=process.argv

//Holding the path of the current working directory
let basePath=process.cwd();

const [type,...moduleName]=args;


if(type==="create-module"){


    if(fs.existsSync(path.join(basePath,'api'))){
        if(moduleName){
            let notCreated=[];
            let created=[]
            for(let module of moduleName){
              if(!fs.existsSync(path.join(basePath,'api',module))){

                created.push(module);

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
              }else{
                notCreated.push(module);
              }
            }
            if(created.length!=0){
             console.log(chalk.green(`Created ${created} module sucessFully`));
            }
            if(notCreated.length!=0){
              console.log(chalk.bgYellow.black('WARN:')+`Not created `+ chalk.yellow(`${notCreated}`) +` module because the module already exist`)
            }
        }else{
            console.log("Please enter the module-name");
        }
    }
   
}

const githubrepoLink='https://github.com/NavneetPal/cybercomnodesetup'

if(type==="init"){
    let spinner=new Spinner('Creating the setup.... %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();
    if(moduleName.length!=0){
        console.log("Command not found(only write 'framework init')");
    }else{
        download(`direct:${githubrepoLink}`,basePath,{clone:true}, function (err) {
          spinner.stop(true);
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
     // shell.cd(path.join(basePath));
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
                console.log(chalk.yellow('Installing the packages. Dont write Ctrl+C on terminal otherwise you have to manually install the packages.'));
                let spinner=new Spinner('Instaling Packages.... %s');
                spinner.setSpinnerString('|/-\\');
                spinner.start();
                shell.exec("npm install",(code,stdout,stderr)=>{
                  spinner.stop(true);
                  if(code===0)
                  console.log(chalk.green('Successfully installed the packages'));
                  else
                  console.log(chalk.red(`Error occured during installing...${stderr}`))
                });
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
                  console.log(chalk.yellow('Installing the packages. Dont write Ctrl+C on terminal otherwise you have to manually install the packages.'))
                  let spinner=new Spinner('Instaling Packages.... %s');
                  spinner.setSpinnerString('|/-\\');
                  spinner.start();
                  shell.exec("npm install",(code,stdout,stderr)=>{
                    spinner.stop(true);
                    if(code===0)
                     console.log(chalk.green('Successfully installed the packages'));
                    else
                     console.log(chalk.red(`Error occured during installing...${stderr}`))
                  });
                  })
                }else{
                  fs.writeFileSync(path.join(__dirname,'config','database.json'),databaseJsonData);

                  console.log(chalk.yellow('Installing the packages. Dont write Ctrl+C on terminal otherwise you have to manually install the packages.'))
                  let spinner=new Spinner('Instaling Packages.... %s');
                  spinner.setSpinnerString('|/-\\');
                  spinner.start();
                  shell.exec("npm install",(code,stdout,stderr)=>{
                    spinner.stop(true);
                    if(code===0)
                    console.log(chalk.green('Successfully installed the packages'));
                    else
                    console.log(chalk.red(`Error occured during installing...${stderr}`))
                  });
                }
              })
            }
          })
        }else{
          fs.writeFileSync(path.join(basePath,'config','database.json'),databaseJsonData);
          console.log(chalk.yellow('Installing the packages. Dont write Ctrl+C on terminal otherwise you have to manually install the packages.'))
          let spinner=new Spinner('Instaling Packages.... %s');
          spinner.setSpinnerString('|/-\\');
          spinner.start();
          shell.exec("npm install",(code,stdout,stderr)=>{
            spinner.stop(true);
            if(code===0)
             console.log(chalk.green('Successfully installed the packages'));
            else
             console.log(chalk.red(`Error occured during installing...${stderr}`))
          });
        }
      })
    }else{
      console.log(chalk.red('Error in downloading the folder structure'));
    }
    })
       
    }
}

if(type==="create-api"){
 
  const apis=fs.readdirSync(path.join(basePath,'api'),{withFileTypes:true})
  .filter((dirent)=>dirent.isDirectory())
  .map((dirent)=>dirent.name);


  let questions=[{
    name:'moduleName',
    type:'list',
    message:'Select the module for the api',
    choices:apis
  },{
    name:'method',
    type:'list',
    message:'Choose the method',
    choices:['get','post','patch','delete','put']
  },{
    name:'action',
    type:'input',
    message:'Enter the action for the api',
    validate:function(value){
      if(value.length){
        return true
      }else{
        return 'Enter the action for the api'
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
    name:'globalMiddlewares',
    type:'input',
    message:'Enter the global middleware for the api',
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

  inquirer.prompt(questions).then(answer=>{
    let {moduleName,method,action,middlewares,globalMiddlewares,endpoint,pathFromRoot}=answer;

    //Triming all the values before performing validations on it
    moduleName=moduleName.trim();
    action=action.trim();
    middlewares=middlewares.trim();
    globalMiddlewares=globalMiddlewares.trim();
    endpoint=endpoint.trim();
    middlewares=middlewares.replace(/\s+/g," ");


    let res=pathFromRoot?true:false;
    
    let newMiddlewareArray=[];
    //checking if the middlwares passed by the user is empty or not
    //if not empty then we are creating the middlewares
    if(middlewares.length!=0){
      let middlewareArray=middlewares.split(" ");
      for(let middleware of middlewareArray){
        newMiddlewareArray.push(`${middleware}`);
      }
    }
    


    let newGlobalMiddlewareArray=[];
    if(globalMiddlewares.length!=0){
      let globalMiddlewareArray=globalMiddlewares.split(" ");
      for(let middleware of globalMiddlewareArray){
        newGlobalMiddlewareArray.push(`middleware.${middleware}`);
      }
    }
  
    let api={
      "path":endpoint,
      "method":method,
      "action":`${action}`,
      "globalMiddlewares":newGlobalMiddlewareArray,
      "middlewares":newMiddlewareArray,
      "pathFromRoot":res
      }
   
    const routes=require(path.join(basePath,'api',`${moduleName}`,'routes.json'))
    routes.push(api);
    fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'routes.json'),JSON.stringify(routes,null," "));

    //TODO: Create a controller function 
    const [controllerFileName,actionName]=action.split('.');
    //if controllerFile doesn't exist then we will create it
    //if it exist then we will append the function to it
    if(!fs.existsSync(path.join(basePath,'api',`${moduleName}`,`controller`,`${controllerFileName}.js`))){
      const dummyData=`module.exports={
    ${actionName}:(req,res,next)=>{
      //Your code will go here
      res.send('${actionName} page');
    }
}
`
      fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,`controller`,`${controllerFileName}.js`),dummyData);
    }else{
      const fileData=fs.readFileSync(path.join(basePath,'api',`${moduleName}`,'controller',`${controllerFileName}.js`));
      const dummyData=` ,
  ${actionName}:(req,res,next)=>{
      //Your code will go here
      res.send('${action} page');
  }
}`
       const {...func}=require(path.join(basePath,'api',`${moduleName}`,'controller',`${controllerFileName}`));
        let fileString=fileData.toString();
        const lastParanthesis=fileString.lastIndexOf('}')
        fileString=fileString.slice(0,lastParanthesis);
        // if function already exist then do not create it
    if(func[`${actionName}`]){
      fileString=fileString+`
}`;
    }else{
      fileString=fileString+dummyData;
    }
        fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'controller',`${controllerFileName}.js`),fileString);
    }



    //TODO: Create a middleware function

    //checking first if that middleware is empty or not if not empty then we will perform action otherwise no need
    if(newMiddlewareArray.length!=0){
      for(let middleware of newMiddlewareArray){
        let dummyData1='';
        const[middlewareFileName,middlewareName]=middleware.split(".");

        // if that file doesn't exist we will create it 
        if(!fs.existsSync(path.join(basePath,'api',`${moduleName}`,'middleware',`${middlewareFileName}.js`))){
          const dummyData=`module.exports={
          ${middlewareName}:(req,res,next)=>{
            //Your code wiil go here
            next();
          }
      }
      `
          fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'middleware',`${middlewareFileName}.js`),dummyData);
        }else{
          const {...func1}=require(path.join(basePath,'api',`${moduleName}`,'middleware',`${middlewareFileName}`));
          const fileData1=fs.readFileSync(path.join(basePath,'api',`${moduleName}`,'middleware',`${middlewareFileName}.js`));
  
          if(!func1[`${middlewareName}`]){
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
              fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'middleware',`${middlewareFileName}.js`),fileString1);
        }
}
    }




    //TODO: Create a global Middlewares

    //checking first if global middlewares is empty or not if not then perform action otherwise no need to perform
    if(newGlobalMiddlewareArray.length!=0){
      const {...func2}=require(path.join(basePath,'Middleware','middleware'));
      const fileData2=fs.readFileSync(path.join(basePath,'Middleware','middleware.js'));
      let dummyData2='';
      for(let middleware of newGlobalMiddlewareArray){
        let middlewareName=middleware.split('.')[1];
        if(!func2[`${middlewareName}`]){
    dummyData2+=`  ,
    ${middlewareName}:(req,res,next)=>{
        //Your code will go here
        next();
    }`
        }
  
      }
      dummyData2+=`
}`
      let fileString2=fileData2.toString();
      const lastParanthesis2=fileString2.lastIndexOf('}')
      fileString2=fileString2.slice(0,lastParanthesis2);
      fileString2=fileString2+dummyData2;
      fs.writeFileSync(path.join(basePath,'Middleware','middleware.js'),fileString2);
    }


    console.log(chalk.green('Created api successfully'));

  })
}








