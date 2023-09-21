
# Cloud storage based on Telegram

App build frontend server to cloud storage. The user can work with both the telegram bot and the web version

Code is written in Typescript (React.js).

## Timelapse
This is frontend client for my [project](https://github.com/egor-denisov/golang-tg-cloud) on Golang.

The project was launched in July 2023 and is still in development.

## Content
- [Live Demo](https://github.com/egor-denisov/web-tg-cloud#live-demo)
- [Final product](https://github.com/egor-denisov/web-tg-cloud#final-product)
- [Running the project](https://github.com/egor-denisov/web-tg-cloud#running-the-project)
- [About the app](https://github.com/egor-denisov/web-tg-cloud#about-the-app)
- [Dependencies](https://github.com/egor-denisov/web-tg-cloud#dependencies)
- [Credits](https://github.com/egor-denisov/web-tg-cloud#credits)

## Live Demo
Live demo is available at the link: https://web-tg-cloud.vercel.app/
## Final product

At this stage, the application looks like this:

- Login page:
![](https://sun9-33.userapi.com/impg/yxXvwaBgQKcgmni529yaqQEiH9FxQYdHUcE2Lg/7XhlsR535fg.jpg?size=1920x1033&quality=95&sign=fdac6be833147511ee3fda94296dd916&type=album "Login page")

- Folder content:
![](https://sun9-62.userapi.com/impg/iFgJut9DmHAZypvpTMN6hfCYS0kgnNXcUp2LuQ/x7wzbDpgoCI.jpg?size=1920x1033&quality=95&sign=64e29b9a9595d35e27d52b94bcfce334&type=album "Folder content")

- Preview:
![](https://sun9-12.userapi.com/impg/UT3ItuiT8AzmX1eukm91QWYDEy5Z132XLfBIbA/JQl26RdJ_xs.jpg?size=1920x1033&quality=95&sign=d04586815e73872cdeb8df8d9ced4ac1&type=album "Preview")

- Deleting file:
![](https://sun9-22.userapi.com/impg/XSYD0x1HVCaW0m28EhpK8FTEJL7bfzbpLOonKg/gH1rGwm9zKk.jpg?size=1920x1033&quality=95&sign=5961ba1aaad2674e8d1a460965789c08&type=album "Deleting file")

- Uploading files:
![](https://sun9-72.userapi.com/impg/okfS5Br5cVIgm_yrP0FoPbjDRM5xwWdYK_y3jQ/LdMrYY0y18I.jpg?size=1920x1033&quality=95&sign=22ec5b64234498ddf96a5ac7b3dcf8f5&type=album")

## Running the project
To run the project go to the downloaded directory. Then run the commands:
```
# Run client-side on 80 port
# Go to folder client
cd client
# Install missing packages
npm install
# Start index.js
npm start
```
Аfter executing these commands, you can go to http://localhost:80/

## About the app

This application is designed to provide a graphical interface to a cloud storage project. A minimal cloud storage interface is implemented and linked to an already written backend.

## Dependencies
- React v18.2.0
- Redux v8.1.2
- Typescript v4.9.5
- Sass

## Credits
- Icons were taken from [iconer.app](https://iconer.app/iconic/)
- Most of the components were taken from [rsuite](https://v4.rsuitejs.com/)
