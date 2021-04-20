const inquirer=require('inquirer');
const fs=require('fs');
const path=require('path');
const chalk=require('chalk');
const Confirm=require('prompt-confirm');
const Spinner=require('cli-spinner').Spinner;
const shell=require('shelljs');
const download=require('download-git-repo');
const githubrepoLink='https://github.com/NavneetPal/cybercomnodesetup'

const giveApis=(basePath)=>{
    return fs.readdirSync(path.join(basePath,'api'),{withFileTypes:true})
    .filter((dirent)=>dirent.isDirectory())
    .map((dirent)=>dirent.name);
}

const correctFormat=(name)=>{
    name=name.trim();
    name=name.replace(/\s+/g," ");
    let nameArray=name.split(" ");
    let correctNameFormat=true
    for(let names of nameArray){
        let middlewareArray=names.split('.');
        if(middlewareArray.length!==2 || !middlewareArray[0] || !middlewareArray[1]){
            return false;
        }
    }
    return correctNameFormat;
}


const init=(basePath)=>{
    let spinner=new Spinner('Creating the setup.... %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();
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




const createMiddleware=(basePath)=>{
    inquirer.prompt([{
        type:'list',
        name:'option',
        message:'Choose the options',
        choices:['Module Middleware','Global Middleware']
    }]).then(answer=>{
        const {option}=answer;
        if(option==='Module Middleware'){
        const apis=giveApis(basePath);
    
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


const createModule=(basePath,moduleName)=>{
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

const controllerData=`module.exports={
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

const createService=(basePath)=>{
    let question=[{
        message:'Select the option',
        name:'option',
        type:'list',
        choices:['Module Service','Global Service']
    }]

    inquirer.prompt(question).then(answer=>{
        const {option}=answer;
        if(option==='Module Service'){
            let questions=[{
                message:'Select the module',
                type:'list',
                name:'module',
                choices:giveApis(basePath)
            },{
                message:'Enter the service (fileName.serviceName)',
                type:'input',
                name:'service',
                validate:function(value){
                    if(value.length){
                        return true
                    }else{
                        return 'Enter the service (fileName.midllewareName)'
                    }
                }
            }]
            inquirer.prompt(questions).then(answer=>{
                let {module,service}=answer;
                if(correctFormat(service)){
                    service=service.trim();
                    service=service.replace(/\s+/g," ");
                    const serviceArray=service.split(" ");
                    let created=[];
                    let notCreated=[];
                    for(let service of serviceArray){
                        const [serviceFile,serviceName]=service.split('.');
                        let filePath=path.join(basePath,'api',module,'services',`${serviceFile}.js`);
                        if(!fs.existsSync(path.join(basePath,'api',module,'services',`${serviceFile}.js`))){
                            created.push(serviceName);
                            createFile(filePath,serviceName);
                        }else{
                           let[create,notCreate]=appendFunction(filePath,serviceName);
                           created.push(...create);
                           notCreated.push(...notCreate);
                        }
                    }
                    if(created.length!=0){
                        console.log(chalk.green(`Successfully created ${created} services `));
                    }
                    if(notCreated.length!=0){
                        console.log(chalk.bgYellow.black('WARN:')+`Not created ${notCreated} services bcz already exist`);
                    }
                }else{
                    console.log(chalk.bgRed('ERROR:')+'Service is not in correct Format');
                }
            })
        }
        if(option==='Global Service'){
            if(!fs.existsSync(path.join(basePath,'services'))){
                fs.mkdirSync(path.join(basePath,'services'));
            }
            let question=[{
                message:'Enter service (fileName.serviceName fileName.serviceName ...)',
                type:'input',
                name:'service',
                validate:function(value){
                    if(value.length){
                        return true;
                    }else{
                        return 'Enter service (fileName.serviceName fileName.serviceName ...)';
                    }
                }
            }]
            inquirer.prompt(question).then(answer=>{
                let {service}=answer;
                if(correctFormat(service)){
                    service=service.trim();
                    service=service.replace(/\s+/g," ");
                    const serviceArray=service.split(" ");
                    let created=[];
                    let notCreated=[];
                    for(let service of serviceArray){
                        const [serviceFile,serviceName]=service.split('.');
                        let filePath=path.join(basePath,'services',`${serviceFile}.js`);
                        if(!fs.existsSync(filePath)){
                            created.push(serviceName);
                            createFile(filePath,serviceName);
                        }else{
                           let[create,notCreate]=appendFunction(filePath,serviceName);
                           created.push(...create);
                           notCreated.push(...notCreate);
                        }
                    }
                    if(created.length!=0){
                        console.log(chalk.green(`Successfully created ${created} services `));
                    }
                    if(notCreated.length!=0){
                        console.log(chalk.bgRed('ERROR:')+`Not created ${notCreated} services bcz already exist`);
                    }
                }else{
                    console.log(chalk.bgRed('ERROR: ')+'service is not in proper format')
                }
            })
        }
    })
}

const createFunction=(basePath)=>{
    let questions=[{
        message:'select the option',
        name:'option',
        type:'list',
        choices:['Module Function','Global Function']
    }]

    inquirer.prompt(questions).then(answer=>{
        const {option}=answer;
        if(option==='Module Function'){
            
            let questions=[{
                message:'Choose the module',
                name:'module',
                type:'list',
                choices:giveApis(basePath)
            },{
                message:'Enter the function Name (fileName.functionName)',
                name:'functionName',
                type:'input',
                validate:function(value){
                    if(value.length){
                        return true;
                    }else{
                        return 'Enter the function Name (fileName.functionName)'
                    }
                }
            }]
            inquirer.prompt(questions).then(answer=>{
                let {module,functionName}=answer;

                if(correctFormat(functionName)){
                  functionName=functionName.trim();
                  functionName=functionName.replace(/\s+/g," ");
                  
                  let functionArray=functionName.split(" ");
                  let created=[];
                  let notCreated=[];
                  for(let eachFunction of functionArray){
                      const [functionFile,functionName]=eachFunction.split('.');
                      let filePath=path.join(basePath,'api',module,'functions',`${functionFile}.js`);
                      if(!fs.existsSync(filePath)){
                          created.push(functionName);
                          createFile(filePath,functionName);
                      }else{
                         let[create,notCreate]=appendFunction(filePath,functionName);
                         created.push(...create);
                         notCreated.push(...notCreate);
                      }
                  }
                  if(created.length!=0){
                    console.log(chalk.green(`Successfully created ${created} functions `));
                  }
                  if(notCreated.length!=0){
                      console.log(chalk.bgYellow.black('WARN:')+`Not created ${notCreated} function bcz already exist`);
                  }
                }else{
                    console.log(chalk.bgRed('ERROR: ')+'Function Name is not in correct format')
                }

            })
        }
        if(option==='Global Function'){
            let question=[{
                message:'Enter the functionName (folderName.anotherfolderName.fileName.functionName)',
                type:'input',
                name:'functionName',
                validate:function(value){
                    if(value.length){
                        return true;
                    }else{
                        return 'Enter the functionName (folderName.anotherfolderName.fileName.functionName)'
                    }
                }
            }]

            inquirer.prompt(question).then(answer=>{
                let {functionName}=answer;
                if(correctGlobalFunctionFormat(functionName)){
                    functionName=functionName.trim();
                    functionName=functionName.replace(/\s+/g," ");
                    let functionNameArray=functionName.split(" ");
                    let created=[];
                    let notCreated=[];
                    for(let eachFunctionName of functionNameArray){
                        const functionArray=eachFunctionName.split('.');
                        if(functionArray.length===2){
                            const [functionFile,functionName]=functionArray;
                            let functionPath=path.join(basePath,'functions',`${functionFile}.js`);
                            if(!fs.existsSync(functionPath)){
                                created.push(functionName);
                                createFile(functionPath,functionName);
                            }else{
                               let [create,notCreate]=appendFunction(functionPath,functionName);
                               created.push(...create);
                               notCreated.push(...notCreate);
                            }
                        }else{
                            let newPath=path.join(basePath,'functions');
                            let n=functionArray.length;
                            for(let i=0;i<n-1;i++){
                                if(i===n-2){
                                
                                newPath=path.join(newPath,`${functionArray[i]}.js`);
                           
                                if(!fs.existsSync(newPath)){
                                    created.push(functionArray[n-1]);
                                    createFile(newPath,functionArray[n-1]); 
                                }else{
                                   let[create,notCreate]=appendFunction(newPath,functionArray[n-1]);
                                   created.push(...create);
                                   notCreated.push(...notCreate);
                                }
                                }else{
                                    newPath=path.join(newPath,functionArray[i]);
                                    if(!fs.existsSync(newPath)){
                                        fs.mkdirSync(newPath);
                                    } 
                                }
                            }
                        }
                    }
                    if(created.length!=0){
                        console.log(chalk.green(`Successfully created ${created} functions `));
                    }
                    if(notCreated.length!=0){
                        console.log(chalk.bgYellow.black('WARN:')+`Not created ${notCreated} function bcz already exist`);
                    }
                }else{
                    console.log(chalk.bgRed('ERROR: ')+'You have not written the function in correct format')
                }
                
            });
        }
    })
}


const createFile=(filePath,functionName)=>{
let dummy=`module.exports={
  ${functionName}:()=>{
      //Your code will go here
      return ('Your code here');
  }
}`
    fs.writeFileSync(filePath,dummy);
}

const createControllerFile=(filePath,functionName)=>{
let dummy=`module.exports={
  ${functionName}:(req,res,next)=>{
      //Your code will go here
      res.send('${functionName} page');
  }
}`
    fs.writeFileSync(filePath,dummy);
}

const createMiddlewareFile=(filePath,functionName)=>{
let dummy=`module.exports={
  ${functionName}:(req,res,next)=>{
      //Your code will go here
      next();
  }
}`
    fs.writeFileSync(filePath,dummy);
}



const appendFunction=(filePath,functionName)=>{
        let created=[];
        let notCreated=[];
        const {...func2}=require(filePath);
        const fileData2=fs.readFileSync(filePath);
        let dummyData2='';
        if(!func2[`${functionName}`]){
            created.push(functionName);
dummyData2+=`  ,
  ${functionName}:(req,res,next)=>{
  //Your code will go here
      return('Your code will come here');
  }`
dummyData2+=`
}`
            let fileString2=fileData2.toString();
            const lastParanthesis2=fileString2.lastIndexOf('}');
            fileString2=fileString2.slice(0,lastParanthesis2);
            fileString2=fileString2+dummyData2;
            fs.writeFileSync(filePath,fileString2);
        }else{
            notCreated.push(functionName);
        }
        return [created,notCreated];
}
const appendControllerFunction=(filePath,functionName)=>{
        let created=[];
        let notCreated=[];
        const {...func2}=require(filePath);
        const fileData2=fs.readFileSync(filePath);
        let dummyData2='';
        if(!func2[`${functionName}`]){
            created.push(functionName);
dummyData2+=`  ,
  ${functionName}:(req,res)=>{
  //Your code will go here
      res.send('${functionName} page');
  }`
dummyData2+=`
}`
            let fileString2=fileData2.toString();
            const lastParanthesis2=fileString2.lastIndexOf('}');
            fileString2=fileString2.slice(0,lastParanthesis2);
            fileString2=fileString2+dummyData2;
            fs.writeFileSync(filePath,fileString2);
        }else{
            notCreated.push(functionName);
        }
        return [created,notCreated];
}
const appendMiddlewareFunction=(filePath,functionName)=>{
        let created=[];
        let notCreated=[];
        const {...func2}=require(filePath);
        const fileData2=fs.readFileSync(filePath);
        let dummyData2='';
        if(!func2[`${functionName}`]){
            created.push(functionName);
dummyData2+=`  ,
  ${functionName}:(req,res)=>{
      //Your middleware code will go here
       next()
  }`
dummyData2+=`
}`
            let fileString2=fileData2.toString();
            const lastParanthesis2=fileString2.lastIndexOf('}');
            fileString2=fileString2.slice(0,lastParanthesis2);
            fileString2=fileString2+dummyData2;
            fs.writeFileSync(filePath,fileString2);
        }else{
            notCreated.push(functionName);
        }
        return [created,notCreated];
}

const correctGlobalFunctionFormat=(functionName)=>{
   functionName=functionName.trim();
   functionName=functionName.replace(/\s+/g," ");
    let correctFormat=true;
    let functionArray=functionName.split(".");
    if(functionArray.length<2)
     return false;
    for(let eachFunction of functionArray){
        if(!eachFunction){
            return false;
        }
    }
    return correctFormat;
}


const createApi=(basePath)=>{
    let questions=[{
        name:'moduleName',
        type:'list',
        message:'Select the module for the api',
        choices:giveApis(basePath)
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
        action=action.trim();
        middlewares=middlewares.trim();
        globalMiddlewares=globalMiddlewares.trim();
        if(endpoint.charAt(0)!=='/'){
            endpoint='/'+endpoint;
        }
        
        let correctActionFormat=correctFormat(action);

        let correctMiddlewareFormat=true;
        let correctGlobalMiddlewareFormat=true;
        if(!middlewares==="")
            correctMiddlewareFormat=correctFormat(middlewares);
        if(!globalMiddlewares==='')
            correctGlobalMiddlewareFormat=correctFormat(globalMiddlewares);

        if(!correctActionFormat || !correctMiddlewareFormat || !correctGlobalMiddlewareFormat){
            console.log(chalk.bgRed('ERROR: ')+'You have not correctly specified the format')
        }else{
            const routes=require(path.join(basePath,'api',`${moduleName}`,'routes.json'));
            let routeAlreadyExist=false;
            for(let route of routes){
            if(route.path===endpoint && route.method===method && route.pathFromRoot===pathFromRoot){
                routeAlreadyExist=true;
                break;
            }
            }
            if(routeAlreadyExist){
                console.log(chalk.bgRed('ERROR: ')+'API already exist with the same endpoint')
            }else{
                let newGlobalMiddlewareArray=[];
                let newMiddlewareArray=[];
                if(globalMiddlewares.length!=0){
                    let globalMiddlewareArray=globalMiddlewares.split(" ");
                    for(let middleware of globalMiddlewareArray){
                        newGlobalMiddlewareArray.push(`${middleware}`);
                    }
                }
                if(middlewares.length!=0){
                    let middlewareArray=middlewares.split(" ");
                    for(let middleware of middlewareArray){
                        newMiddlewareArray.push(`${middleware}`);
                    }
                }
                const api={
                    "path":endpoint,
                    "method":method,
                    "action":`${action}`,
                    "globalMiddlewares":newGlobalMiddlewareArray,
                    "middlewares":newMiddlewareArray,
                    "pathFromRoot":pathFromRoot
                }
                routes.push(api);


                const [controllerFileName,actionName]=action.split('.');
                let controllerFilePath=path.join(basePath,'api',`${moduleName}`,`controller`,`${controllerFileName}.js`)
                if(!fs.existsSync(controllerFilePath)){
                    createControllerFile(controllerFilePath,actionName);
                    fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'routes.json'),JSON.stringify(routes,null," "));
                    createApiSetup(basePath,moduleName,newMiddlewareArray,newGlobalMiddlewareArray);
                    console.log(chalk.green('Created api Successfully'));
                }else{
                    const {...actionFunctions}=require(path.join(basePath,'api',moduleName,'controller',controllerFileName));
                    let actionAlreadyExist=false;
                    if(actionFunctions[`${actionName}`]){
                        console.log(chalk.bgYellow.black('WARNING: ')+'The action that you specified already exist')
                        actionAlreadyExist=true;
                    }
    
                    if(actionAlreadyExist){
                        let question=[{
                            type:'confirm',
                            message:'Do you want to use already existing action',
                            default:true,
                            name:'usedit'
                        }]
                        inquirer.prompt(question).then(answer=>{
                            const {usedit}=answer;
                            if(usedit){
                                fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'routes.json'),JSON.stringify(routes,null," "));
                                createApiSetup(basePath,moduleName,newMiddlewareArray,newGlobalMiddlewareArray);
                                console.log(chalk.green('Created api Successfully'));
                            }else{
                                console.log(chalk.bgRed('ERROR: ')+'Action already exist');
                            }
                        })
                    }else{
                        fs.writeFileSync(path.join(basePath,'api',`${moduleName}`,'routes.json'),JSON.stringify(routes,null," "));
                        appendControllerFunction(controllerFilePath,actionName);
                        createApiSetup(basePath,moduleName,newMiddlewareArray,newGlobalMiddlewareArray);
                        console.log(chalk.green('Created api Successfully'));
                    }
                }
            }
        }
    })
}


const createApiSetup=(basePath,moduleName,newMiddlewareArray,newGlobalMiddlewareArray)=>{
    if(newMiddlewareArray.length!=0){
        let created=[];
        let notCreated=[];
        for(let middleware of newMiddlewareArray){
            const[middlewareFileName,middlewareName]=middleware.split(".");
            let middlewareFilePath=path.join(basePath,'api',`${moduleName}`,'middleware',`${middlewareFileName}.js`);
            if(!fs.existsSync(middlewareFilePath)){
                created.push(middlewareName);
                createMiddlewareFile(middlewareFilePath,middlewareName);
            }else{
                let [create,notCreate]=appendMiddlewareFunction(middlewareFilePath,middlewareName);
                created.push(...create);
                notCreated.push(...notCreate);
            }
        }
        if(created.length!=0){
            console.log(chalk.green(`You have successfully created the ${created} local middleware`))
        }
        if(notCreated.length!=0){
            console.log(chalk.bgYellow.black('WARN: ')+`Unable to create ${notCreated} local middleware bcz it already exist`);
        }
    }
        
    if(newGlobalMiddlewareArray.length!=0){
        let created=[];
        let notCreated=[];
        for(let middleware of newGlobalMiddlewareArray){
            const [middlewareFileName,middlewareName]=middleware.split(".");
            let globalMiddlewareFilePath=path.join(basePath,'Middleware',`${middlewareFileName}.js`);
            if(!fs.existsSync(globalMiddlewareFilePath)){
                created.push(middlewareName);
                createMiddlewareFile(globalMiddlewareFilePath,middlewareName);
            }else{
                let [create,notCreate]= appendMiddlewareFunction(globalMiddlewareFilePath,middlewareName);
                created.push(...create);
                notCreated.push(...notCreate);
            }
        }
        if(created.length!=0){
            console.log(chalk.green(`You have successfully created the ${created} global middleware`))
        }
        if(notCreated.length!=0){
            console.log(chalk.bgYellow.black('WARN: ')+`Unable to create ${notCreated} global middleware bcz it already exist`);
        }
    }
}


module.exports={
    init,
    createApi,
    createMiddleware,
    createModule,
    createService,
    createFunction
}
