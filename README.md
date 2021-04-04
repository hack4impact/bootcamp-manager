<h1 align="center">H4I Bootcamp Manager</h1>

<p align="center">
   <img src="https://github.com/hack4impact/bootcamp-manager/blob/main/static/logo.png?raw=true" alt="Project Logo" style="height: 220px; width: 220px;">
</p>

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/hack4impact/bootcamp-manager/Integrate)
![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

A slack bot/web app for managing Hack4Impact bootcamps. Provides a convienient interface for H4I bootcampers to submit their assignments to bootcamp leaders. Uses MongoDB Atlas, Airtable, Node.js w/ typescript, and the Slack Bolt API.

## How to install the project

1. Clone the repository.
2. Go to the project directory
3. Run `npm i`

## How to use the project

1. Create a personal slack workspace for the development of this project
2. Create an app in your workspace
3. Retrieve the Slack Signing Secret and Slack API Token for your slack app
4. Head to the "env" folder and create a file named .env
5. Fill out the environment variables in ".env" as specified by ".env.example"
   1. Add a MongoDB Atlas URL
   2. Add your Airtable API key and base ID
   3. Add the Slack API secrets for your workspace
6. Install ngrok
7. Run `npm run dev`
8. On another terminal run `ngrok http 8080` or whatever port you specify in .env
9. Go to your slack app settings and put `https://yourNgrokUrl/slack/events` as the URL for event subscriptions and interactivity
10. Head to your app home in your slack workspace and you should see the app working!

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/subatuba21"><img src="https://avatars.githubusercontent.com/u/34824571?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Subha Das</b></sub></a><br /><a href="https://github.com/Hack4Impact/Bootcamp Manager/commits?author=subatuba21" title="Documentation">📖</a> <a href="https://github.com/Hack4Impact/Bootcamp Manager/commits?author=subatuba21" title="Code">💻</a> <a href="#ideas-subatuba21" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://bholmes.dev/"><img src="https://avatars.githubusercontent.com/u/31811199?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Benjamin Holmes</b></sub></a><br /><a href="#ideas-Holben888" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-Holben888" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
