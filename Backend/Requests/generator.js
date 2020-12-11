const config = require('../config');
const { auth } = require('../tools');
const fs = require('fs');
const { exec } = require('child_process');
// const { exec } = require('child_process');


const reCreateProject = async function (request, response) {
    try {
        auth(request.headers.key, request.app.keys);
      } catch (err) {
        response.status(401);
        response.end();
        return;
      }

    const json = JSON.stringify(request.body,null, 2);
    console.log('Creating json')
    if (request.body.type === "web") {
        name = request.body.name.toLowerCase() + '-web';
    } else {
        name = name = request.body.name.toLowerCase() + '-mobil-web';
    }

    const exist = fs.existsSync(config.generator.repoPath + '/' + name + '.json');

    try {
        if (exist === true) {
            console.log('Json exist')
            fs.unlinkSync(config.generator.repoPath + '/' + name + '.json');
            fs.writeFileSync(config.generator.repoPath + '/' + name + '.json', json);
            process.chdir(config.generator.scriptPath)
            console.log('Start regenerate')
            exec('bash recreate.sh ' + name + '.json > /tmp/generate.log 2>&1');
            process.chdir(config.generator.backendPath)
            console.log('sending status')
            response.send(JSON.stringify({ "status": "okay"}));
            console.log('Response ended')
            response.end();
        } else {
            fs.writeFileSync(config.generator.repoPath + '/' + name + '.json', json);
            process.chdir(config.generator.scriptPath)
            exec('bash recreate.sh ' + name + '.json');
            process.chdir(config.generator.backendPath)
            response.send(JSON.stringify({ "status": "okay"}));
            response.end();
        }
    } catch(err) {
        response.send(JSON.stringify({"status": "failed"}));
    }
    response.end();
}

const createProject = async function (request, response) {
    try {
        auth(request.headers.key, request.app.keys);
      } catch (err) {
        response.status(401);
        response.end();
        return;
      }
    console.log('Creating new json')
    const json = JSON.stringify(request.body,null, 2);
    if (request.body.type === "web") {
        name = request.body.name.toLowerCase() + '-web';
    } else {
        name = name = request.body.name.toLowerCase() + '-mobil-web';
    }

    const exist = fs.existsSync(config.generator.repoPath + '/' + name + '.json');
    
    try {
        if (exist === true) {
            console.log('Project already exist')
            response.send(JSON.stringify({ "status": "exist"}));
        } else {
            fs.writeFileSync(config.generator.repoPath + '/' + name + '.json', json);
            console.log('Generator: writing json')
            process.chdir(config.generator.scriptPath)
            console.log('Generator: starting script')
            exec('bash main.sh > /tmp/recreate.log 2>&1');
            process.chdir(config.generator.backendPath)
            console.log('Generator: sending status')
            response.send(JSON.stringify({ "status": "okay" }));
        }
    } catch(err) {
        console.log('Something happened :(')
        response.send(JSON.stringify({"status": "failed"}));
    }
    response.end();
}

module.exports = {
    reCreateProject,
    createProject
};