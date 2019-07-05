const chalk = require('chalk');

module.exports.suc = () => { console.log(chalk.green.italic('[SUCCESS]') + " " + chalk.bold(arguments[0])); };
module.exports.info = () => { console.log(chalk.blue.italic('[INFO]') + " " + chalk.bold(arguments[0])); };
module.exports.err = () => { console.log(chalk.red.italic('[ERROR]') + " " + chalk.bold(arguments[0])); };