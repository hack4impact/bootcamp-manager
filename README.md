# H4I Bootcamp Manager

A slack bot/web app for managing Hack4Impact bootcamps. Provides a convienient interface for H4I bootcampers to submit their assignments to bootcamp leaders. Uses MongoDB Atlas, Airtable, Node.js w/ typescript, and the Slack Bolt API.

## How to install the project

1. Clone the repository.
2. Go to the project directory
3. Run `npm i`

## How to use the project

1. Head to the "env" folder
2. Create a personal slack workspace for the development of this project
3. Create an app in your workspace
4. Retrieve the Slack Signing Secret and Slack API Token for your slack app
5. Fill out the environment variables as described by .env.example
   1. Add a MongoDB Atlas URL
   2. Add your Airtable API key and base ID
   3. Add the Slack API secrets for your workspace
6. Run `npm run dev`
7. Install ngrok
8. On another terminal run `ngrok 8080` or whatever port you specify in .env
9. Go to your slack app settings and put `https://yourNgrokUrl/slack/events` as the URL for event subscriptions and interactivity
10. Head to your slack home in your workspace and you should see the app working!
