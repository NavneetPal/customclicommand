#!/usr/bin/env node
const {program}=require('commander');
const inquirer=require('inquirer');
const fs=require('fs');
const path=require('path');
const chalk=require('chalk');
const Confirm=require('prompt-confirm');
const Spinner=require('cli-spinner').Spinner;
const shell=require('shelljs');

const basePath=process.cwd();


const {
    init,
    createApi,
    createMiddleware,
    createModule,
    createService,
    createFunction
}=require('./index');

program 
    .version('1.3.4')
    .description('Node setup Management')

program
    .command('init')
    .alias('i')
    .description('Initializes the nodejs setup')
    .action(()=>{
        init(basePath);
    })

program
    .command('create-api')
    .alias('a')
    .description('Create api for the particular module')
    .action(()=>{
        createApi(basePath);
    })

program
    .command('create-middleware')
    .alias('m')
    .description('Create a module/global middleware for the specific endpoint')
    .action(()=>{
        createMiddleware(basePath);
    })

program
    .command('create-module <moduleName...>')
    .alias('cm')
    .description('Create a new module in the apis')
    .action((moduleName)=>{
        createModule(basePath,moduleName);
    })

program
    .command('create-service')
    .alias('cs')
    .description('Create a module/global services')
    .action(()=>{
      createService(basePath);
    })

program
    .command('create-function')
    .alias('cf')
    .description('Create a module/global function')
    .action(()=>{
      createFunction(basePath);
    })


program.parse(process.argv)






