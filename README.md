# RESTcord.js
The RESTful API for Devo, a Discord bot.

I have made this public, so feel free to use the tutorial below to use it for your own needs!

## Installing
To start off, download this repository as a ZIP file. Follow by extracting it. That's the main thing downloaded! Now you need the dependencies.

If you don't have node.js installed, gte it at https://nodejs.org/.

Alrighty. To get the dependencies, open a terminal/command prompt window and paste in ```npm i express && npm i express-ipfilter && npm i body-parser && npm i discordjs/discord.js && npm i chalk && npm i path```. This is what the app relies on.

Once that's done, let's go on to the next step!

## Configuration
You will see there's a `config.json` file. Here's how to edit it to your preferences.

You'll see the `port` option, the `token` option, and the `whitelist` option.

Change the `port` option to the port you'd like the app to listen on. The default is 80.

Secondly, there's the `token`. Just change the value there to your bot token that you can get from https://discordapp.com/developers/applications/.

Lastly, the `whitelist`. This contains the IP addresses that the app will allow. Change the value there to your IP address, which you can find by googling 'what is my ip'. You can add to this list like so: `["ip 1", "ip 2", "ip 3", "etc"]`.

## Running
To run the application, in the terminal/command prompt just type `node app.js`. You should be able to access the API from `localhost:port` where `port` is replaced by the port you set in the config file. If the port is 80, you only need to go to `localhost`.