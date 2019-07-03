const express = require('express');
const ipfilter = require('express-ipfilter').IpFilter;
const bodyParser = require("body-parser");
const Discord = require('discord.js');
const chalk = require('chalk');
const path = require('path');
const config = require("./config.json");
global.client = new Discord.Client();
client.login(config.token)

const app = express();
let ips = config.whitelist;
app.use(ipfilter(ips, {mode: "allow"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function suc(){ console.log(chalk.green.italic('[SUCCESS]') + " " + chalk.bold(arguments[0])); };
function info(){ console.log(chalk.blue.italic('[INFO]') + " " + chalk.bold(arguments[0])); };
function err(){ console.log(chalk.red.italic('[ERROR]') + " " + chalk.bold(arguments[0])); };

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname+`/index.html`));
});

app.post('/v1/channels/:id/send', (req, res) => {
    if(!req.body.content){
        err('Send: No content.');
        return res.status(400).send({
            success: false,
            message: "Required: content."
        });
    };
    let channel = client.channels.get(`${req.params.id}`);
    channel.send(`${req.body.content}`);
    suc('Message sent.');
    return res.status(201).send({
        success: true,
        message: 'The message has been sent.'
    });
});

app.post('/v1/users/:id/dm', (req, res) => {
    if(!req.body.content){
        err("DM: No content.");
        return res.status(400).send({
            success: false,
            message: 'Required: content.'
        });
    };
    let user = client.users.get(`${req.params.id}`);
    user.send(`${req.body.content}`);
    suc('DM sent.');
    return res.status(201).send({
        success: true,
        message: 'The DM has been sent.'
    });
});

app.get('/v1/guilds', (req, res) => {
    let guilds = client.guilds;
    suc('Guilds given.');
    return res.status(200).send({
        success: true,
        message: `I gathered the guilds successfully.`,
        guilds
    });
});

app.get('/v1/channels', (req, res) => {
    let channels = client.channels;
    suc('Channels given.');
    return res.status(200).send({
        success: true,
        message: 'I gathered all the channels successfully.',
        channels
    });
});

app.get('/v1/users', (req, res) => {
    let users = client.users;
    suc('Users given.');
    return res.status(200).send({
        success: true,
        message: 'I gathered all the users successfully.',
        users
    });
});

app.post('/v1/guilds/:guildid/users/:userid/ban', (req, res) => {
    let guild = client.guilds.get(`${req.params.guildid}`);
    let member = guild.members.get(`${req.params.userid}`);
    member.ban();
    suc('Banned a user.');
    return res.status(200).send({
        success: true,
        message: 'I banned that member.'
    });
});

app.post('/v1/guilds/:guildid/users/:userid/kick', (req, res) => {
    let guild = client.guilds.get(`${req.params.guildid}`);
    let member = guild.members.get(`${req.params.userid}`);
    member.kick();
    suc('Kicked a user.');
    return res.status(200).send({
        success: true,
        message: 'I kicked that member.'
    });
});

app.get('/v1/users/:id', (req, res) => {
    let user = client.users.get(`${req.params.id}`);
    suc('User given.');
    return res.status(200).send({
        success: true,
        message: 'I gathered that user.',
        user
    });
});

app.get(`/v1/channels/:id`, (req, res) => {
    let channel = client.channels.get(`${req.params.id}`);
    suc('Channel given.');
    return res.status(200).send({
        success: true,
        message: 'I gathered that channel.',
        channel
    });
});

app.get('/v1/guilds/:id', (req, res) => {
    let guild = client.guilds.get(`${req.params.id}`);
    suc('Guild given.');
    return res.status(200).send({
        success: true,
        message: "I gathered that guild.",
        guild
    });
});

app.delete('/v1/channels/:id', (req, res) => {
    let channel = client.channels.get(`${req.params.id}`);
    channel.delete();
    suc('Deleted a channel.');
    return res.status(200).send({
        success: true,
        message: 'I deleted the channel.'
    });
});

app.listen(config.port, () => {
    console.log(chalk.bold.underline.green("RESTcord.js") + " by " + chalk.bold("Chiphyr\n"))

    info(`The server is running on port ${config.port}.\n`);
    info(`Whitelisted IP's:`);
    ips.forEach(ip => info(ip.split(":").slice(3)));
    console.log("\n");
});
