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
const[,,...args]=process.argv;



//Holding the path of the current working directory
let basePath=process.cwd();

const [type,...moduleName]=args;

if(!type){
  console.log('Available Commands');
  console.log('Commmands:');
  console.log();
  console.log('framework init                    -initialize the node.js setup');
  console.log('framework create-module           -Create the module in the apis folder');
  console.log('framework create-api              -Used to create a api in a particular module');
  console.log('framework create-middleware       -Used to create a middleware in module folder or global Middleware folder');
}

if(type==="--help"){
  console.log('Available Commands');
  console.log('Commmands:');
  console.log();
  console.log('framework init                    -initialize the node.js setup');
  console.log('framework create-module           -Create the module in the apis folder');
  console.log('framework create-api              -Used to create a api in a particular module');
  console.log('framework create-middleware       -Used to create a middleware in module folder or global Middleware folder');
}

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
const functionData=`module.exports={
  functionName:()=>{
    return 'Your function data';
  }
}`       
              
              
                fs.mkdirSync(path.join(basePath,'api',`${module}`),{recursive:true});
                fs.mkdirSync(path.join(basePath,'api',`${module}`,'controller'),{recursive:true});
                fs.mkdirSync(path.join(basePath,'api',`${module}`,'middleware'),{recursive:true});
                fs.mkdirSync(path.join(basePath,'api',`${module}`,'services'),{recursive:true});
                fs.mkdirSync(path.join(basePath,'api',`${module}`,'functions'),{recursive:true});
                fs.writeFileSync(path.join(basePath,'api',`${module}`,'controller',`${module}.js`),controllerData);
                fs.writeFileSync(path.join(basePath,'api',`${module}`,'services',`demo.js`),serviceData);
                fs.writeFileSync(path.join(basePath,'api',`${module}`,'functions',`${module}.js`),functionData);
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
    message:'Enter the action (fileName.actionName)',
    validate:function(value){
      if(value.length){
        return true
      }else{
        return 'Enter the action(fileName.actionName)'
      }
    }
  },{
    name:'middlewares',
    type:'input',
    message:'Enter the middleware(fileName.middlewareName fileName.middlewareName ...)'
  },{
    name:'globalMiddlewares',
    type:'input',
    message:'Enter the global middleware(fileName.globalMiddlewareName fileName.globalMiddlewareName)',
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
    globalMiddlewares=globalMiddlewares.replace(/\s+/g," ");


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
    
    if(endpoint.charAt(0)!=='/'){
      endpoint='/'+endpoint;
    }

    //Creating a globalMiddleware array so that we can append that in the routes.json file
    let newGlobalMiddlewareArray=[];
    if(globalMiddlewares.length!=0){
      let globalMiddlewareArray=globalMiddlewares.split(" ");
      for(let middleware of globalMiddlewareArray){
        newGlobalMiddlewareArray.push(`${middleware}`);
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

    const routes=require(path.join(basePath,'api',`${moduleName}`,'routes.json'));

    let actionArray=action.split('.');
    
    let correctMiddlewareFormat=true
    for(let middleware of newMiddlewareArray){
      let middlewareArray=middleware.split('.');
      if(middlewareArray.length!==2 || !middlewareArray[0] || !middlewareArray[1]){
        correctMiddlewareFormat=false;
        break;
      }
    }

    let correctGlobalMiddlewareFormat=true;
    for(let middleware of newGlobalMiddlewareArray){
      let middlewareArray=middleware.split('.');
      if(middlewareArray.length!==2 || !middlewareArray[0] || !middlewareArray[1]){
        correctMiddlewareFormat=false;
        break;
      }
    }

    let routeAlreadyExist=false;
    for(let route of routes){
      if(route.path===endpoint && route.method===method && route.pathFromRoot===res){
        routeAlreadyExist=true;
        break;
      }
    }
  
    if(routeAlreadyExist){
      console.log(chalk.bgRed('ERROR:')+chalk.red(' This path has already been used'))
    }else if(actionArray.length!=2 || !actionArray[0] || !actionArray[1]){
      console.log(chalk.bgRed('ERROR: ')+'You have not specified the action in correct format')
    }else if(!correctMiddlewareFormat){
      console.log(chalk.bgRed('ERROR: ')+'You have not specified the local middleware in correct format')
    }else if(!correctGlobalMiddlewareFormat){
      console.log(chalk.bgRed('ERROR: ')+'You have not specified the global middleware in correct format')
    }
    else{

      const [controllerFileName,actionName]=action.split('.');
      
      const {...actionFunctions}=require(path.join(basePath,'api',moduleName,'controller',controllerFileName));
  
      let actionAlreadyExist=false;
      if(actionFunctions[`${actionName}`]){
        console.log(chalk.bgYellow.black('WARNING: ')+'The action that you specified already exist')
        actionAlreadyExist=true;
      }

      
      if(actionAlreadyExist){
        new Confirm({message:'Do you want to use already existing action',default:false}).run()
        .then(answer=>{
          if(answer){
        
            routes.push(api);
            fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'routes.json'),JSON.stringify(routes,null," "));
        
            //TODO: Create a controller function 
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
            res.send('${actionName} page');
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
            
              for(let middleware of newGlobalMiddlewareArray){
                const [middlewareFileName,middlewareName]=middleware.split(".");
        
                if(!fs.existsSync(path.join(basePath,'Middleware',`${middlewareFileName}.js`))){
                const dummy=`module.exports={
          ${middlewareName}:(req,res,next)=>{
            //Your code will goes here
            next();    
        }
      }
      `
                    fs.writeFileSync(path.join(basePath,'Middleware',`${middlewareFileName}.js`),dummy);
                }else{
                  const {...func2}=require(path.join(basePath,'Middleware',`${middlewareFileName}`));
                  const fileData2=fs.readFileSync(path.join(basePath,'Middleware',`${middlewareFileName}.js`));
                  let dummyData2='';
                  if(!func2[`${middlewareName}`]){
        dummyData2+=`  ,
        ${middlewareName}:(req,res,next)=>{
            //Your code will go here
            next();
        }`
                  }
        dummyData2+=`
      }`
                      let fileString2=fileData2.toString();
                      const lastParanthesis2=fileString2.lastIndexOf('}');
                      fileString2=fileString2.slice(0,lastParanthesis2);
                      fileString2=fileString2+dummyData2;
                      fs.writeFileSync(path.join(basePath,'Middleware',`${middlewareFileName}.js`),fileString2);
                }
                }
         
            }
        
        
            console.log(chalk.green('Created api successfully'));
            }else{
              console.log(chalk.bgRed('ERROR:')+chalk.red('Not created the api because the action already exist'));
            }
        })
      }else{  
          routes.push(api);
          fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'routes.json'),JSON.stringify(routes,null," "));
      
          //TODO: Create a controller function 
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
      res.send('${actionName} page');
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
          
            for(let middleware of newGlobalMiddlewareArray){
              const [middlewareFileName,middlewareName]=middleware.split(".");
      
              if(!fs.existsSync(path.join(basePath,'Middleware',`${middlewareFileName}.js`))){
          const dummy=`module.exports={
    ${middlewareName}:(req,res,next)=>{
      //Your code will goes here
      next();    
  }
}
`
                  fs.writeFileSync(path.join(basePath,'Middleware',`${middlewareFileName}.js`),dummy);
              }else{
                const {...func2}=require(path.join(basePath,'Middleware',`${middlewareFileName}`));
                const fileData2=fs.readFileSync(path.join(basePath,'Middleware',`${middlewareFileName}.js`));
                let dummyData2='';
                if(!func2[`${middlewareName}`]){
  dummyData2+=`  ,
  ${middlewareName}:(req,res,next)=>{
      //Your code will go here
      next();
  }`
                }
  dummyData2+=`
}`
                    let fileString2=fileData2.toString();
                    const lastParanthesis2=fileString2.lastIndexOf('}');
                    fileString2=fileString2.slice(0,lastParanthesis2);
                    fileString2=fileString2+dummyData2;
                    fs.writeFileSync(path.join(basePath,'Middleware',`${middlewareFileName}.js`),fileString2);
              }
              }
       
          }
      
      
          console.log(chalk.green('Created api successfully'));
          
      }
    }
  }) 
}


if(type==="create-middleware"){
  inquirer.prompt([{
    type:'list',
    name:'option',
    message:'Choose the options',
    choices:['Module Middleware','Global Middleware']
  }]).then(answer=>{
    const {option}=answer;
    if(option==='Module Middleware'){
      const apis=fs.readdirSync(path.join(basePath,'api'),{withFileTypes:true})
      .filter((dirent)=>dirent.isDirectory())
      .map((dirent)=>dirent.name);

      let questions=[{
        type:'list',
        name:'module',
        message:'Choose the module',
        choices:apis
      },{
        type:'input',
        name:'middlewareName',
        message:'Enter the middleware Name(fileName.middlewareName)',
        validate:function(value){
          if(value.length){
            return true
          }else{
            return 'Enter the middlewareName(fileName.midllewareName)'
          }
        }
      }]
      inquirer.prompt(questions).then(answer=>{
        let {module,middlewareName}=answer;
        middlewareName=middlewareName.trim();
        middlewareName=middlewareName.replace(/\s+/g," ");

       let middlewareNameArray=middlewareName.split(" ");


        let correctMiddlewareFormat=true
        for(let middleware of middlewareNameArray){
          let middlewareArray=middleware.split('.');
          if(middlewareArray.length!==2 || !middlewareArray[0] || !middlewareArray[1]){
            correctMiddlewareFormat=false;
            break;
          }
        }

        if(!correctMiddlewareFormat){
          console.log(chalk.bgRed('ERROR: ')+'The middlware Name is not in the coreect format..please enter the correct format');
        }else{
          //we got the array
          const endpoints=require(path.join(basePath,'api',module,'routes.json'));

          let options=[];
          endpoints.forEach(endpoint=>{
            let str="";
            str+=`path:${endpoint.path}, method:${endpoint.method}, action:${endpoint.action}`;
            options.push(str);
          })

          inquirer.prompt([{
            type:'list',
            message:'Choose the endpoint where you want to add',
            name:'endpoints',
            choices:options
          }]).then(answer=>{
            const {endpoints}=answer;
            let endPointPath,method,action;
            const endPointArray=endpoints.split(',');
            endPointArray.forEach((data,index)=>{
              const[key,value]=data.split(':');
              if(index===0){
                endPointPath=value;
              }
               if(index===1){
                method=value;
              }
              if(index===2){
                action=value;
              }
            })
          const routes=require(path.join(basePath,'api',module,'routes.json'));
          routes.forEach(route=>{
            if(route.path===endPointPath && route.method===method && route.action===action){
              if(route['middlewares']){
                for(let middleware of middlewareNameArray){
                  if(!route[`middlewares`].includes(middleware)){
                    route['middlewares'].push(middleware);
                  }
                }
              }else{
                route['middlewares']=middlewareNameArray;
              }
            }
          })

          fs.writeFileSync(path.join(basePath,'api',module,'routes.json'),JSON.stringify(routes,null," "));




            let notCreated=[];
            let created=[];
            for(let middleware of middlewareNameArray){
              const [middlewareFile,middlewareFunction]=middleware.split('.');
              if(!fs.existsSync(path.join(basePath,'api',`${module}`,'middleware',`${middlewareFile}.js`))){
          let dummy=`module.exports={
  ${middlewareFunction}:(req,res,next)=>{
    //Your code will go here
    next();
  }
}`
               console.log(path.join(basePath,'api',`${module}`,'middleware',`new.js`));
                fs.writeFileSync(path.join(basePath,'api',`${module}`,'middleware',`${middlewareFile}.js`),dummy);
              }else{
               const {...func2}=require(path.join(basePath,'api',`${module}`,'middleware',`${middlewareFile}`));
               const fileData2=fs.readFileSync(path.join(basePath,'api',`${module}`,'middleware',`${middlewareFile}.js`));
               let dummyData2='';
     
               if(!func2[`${middlewareFunction}`]){
                 created.push(middlewareFunction);
  dummyData2+=`  ,
  ${middlewareFunction}:(req,res,next)=>{
      //Your code will go here
      next();
  }`
  dummyData2+=`
}`
                   let fileString2=fileData2.toString();
                   const lastParanthesis2=fileString2.lastIndexOf('}');
                   fileString2=fileString2.slice(0,lastParanthesis2);
                   fileString2=fileString2+dummyData2;
                   fs.writeFileSync(path.join(basePath,'api',`${module}`,'middleware',`${middlewareFile}.js`),fileString2);
               }else{
                 notCreated.push(middlewareFunction);
               }
              }
            }
            if(created.length!=0){
              console.log(chalk.green(`Created ${created} middleware sucessfully`));
            }
            if(notCreated.length!=0){
             console.log(chalk.red(`Unable to create ${notCreated} because they already exist in the file`))
            }
          })
         
        }

      })///yaha pae inquire complete ho raha hae
    }
    if(option==='Global Middleware'){
      const apis=fs.readdirSync(path.join(basePath,'api'),{withFileTypes:true})
      .filter((dirent)=>dirent.isDirectory())
      .map((dirent)=>dirent.name);

      let questions=[{
        type:'list',
        name:'module',
        message:'Choose the module',
        choices:apis
      },{
        type:'input',
        message:'Enter the global Middleware Name(fileName.middlewareName)',
        name:'middlewareName',
        validate:function(value){
          if(value.length){
            return true
          }else{
            return 'Enter the global Middleware Name'
          }
        }
      }]
      inquirer.prompt(questions).then(answer=>{
        let {module,middlewareName}=answer;
        middlewareName=middlewareName.trim();
        middlewareName=middlewareName.replace(/\s+/g," ");
        
        let middlewareNameArray=middlewareName.split(" ");

        
        let correctMiddlewareFormat=true;
        for(let middleware of middlewareNameArray){
          let middlewareArray=middleware.split('.');
          if(middlewareArray.length!==2 || !middlewareArray[0] || !middlewareArray[1]){
            correctMiddlewareFormat=false;
            break;
          }
        }

        if(!correctMiddlewareFormat){
          console.log(chalk.bgRed('ERROR: ')+'The middlware Name is not in the coreect format..please enter the correct format');
        }else{

          const endpoints=require(path.join(basePath,'api',module,'routes.json'));

          let options=[];
          endpoints.forEach(endpoint=>{
            let str="";
            str+=`path:${endpoint.path}, method:${endpoint.method}, action:${endpoint.action}`;
            options.push(str);
          })

          inquirer.prompt([{
            type:'list',
            message:'Choose the endpoint where you want to add',
            name:'endpoints',
            choices:options
          }]).then(answer=>{
            const {endpoints}=answer;
            let endPointPath,method,action;
            const endPointArray=endpoints.split(',');
            endPointArray.forEach((data,index)=>{
              const[key,value]=data.split(':');
              if(index===0){
                endPointPath=value;
              }
               if(index===1){
                method=value;
              }
              if(index===2){
                action=value;
              }
            })
          const routes=require(path.join(basePath,'api',module,'routes.json'));
          routes.forEach(route=>{
            if(route.path===endPointPath && route.method===method && route.action===action){
              if(route['globalMiddlewares']){
                for(let middleware of middlewareNameArray){
                  if(!route[`globalMiddlewares`].includes(middleware)){
                    route['globalMiddlewares'].push(middleware);
                  }
                }
              }else{
                route['globalMiddlewares']=middlewareNameArray;
              }
            }
          })

          fs.writeFileSync(path.join(basePath,'api',module,'routes.json'),JSON.stringify(routes,null," "));
          let created=[];
          let notCreated=[];
          for(let middleware of middlewareNameArray){
  
            const [fileName,globalMiddlewareFunction]=middleware.split('.');
            if(!fs.existsSync(path.join(basePath,'Middleware',`${fileName}.js`))){
  let dummy=`module.exports={
  ${globalMiddlewareFunction}:(req,res,next)=>{
    //Your code will go here
    next();
  }
}`
              fs.writeFileSync(path.join(basePath,'Middleware',`${fileName}.js`),dummy);
            }else{
              const {...func2}=require(path.join(basePath,'Middleware',`${fileName}`));
              const fileData2=fs.readFileSync(path.join(basePath,'Middleware',`${fileName}.js`));
              let dummyData2='';
              if(!func2[`${globalMiddlewareFunction}`]){
                created.push(globalMiddlewareFunction);
  dummyData2+=`  ,
    ${globalMiddlewareFunction}:(req,res,next)=>{
    //Your code will go here
    next();
    }`
    dummyData2+=`
}`
                  let fileString2=fileData2.toString();
                  const lastParanthesis2=fileString2.lastIndexOf('}');
                  fileString2=fileString2.slice(0,lastParanthesis2);
                  fileString2=fileString2+dummyData2;
                  fs.writeFileSync(path.join(basePath,'Middleware',`${fileName}.js`),fileString2);
              }else{
                notCreated.push(globalMiddlewareFunction);
              }
            }
          }
          if(created.length!=0){
            console.log(chalk.green(`Created ${created} middleware successfully`));
          }
          if(notCreated.length!=0){
            console.log(chalk.red(`Not created ${notCreated} middleware because it already exist`));
          }
          })//then block
        } //else bloc
      })
    }//yae global middleware ka ending hae
  })
}







