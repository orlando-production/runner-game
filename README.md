# Учебный проект-игра для Яндекс.Практикум.
## Описание
Вы любите зиму или играть в игры? Если да, то вы пришли по адресу, если же нет, то точно полюбите :)  
Представляем вашему вниманию проект команды "Орландо"!   
Это не просто игра, это целый портал с регистрацией, форумом и рейтингом участников.  
А вы верите в Дед-Мороза? Он несомненно существует, в нашей игре так точно!
Дедушка в новогодней суете растерял подарки, пока летел на своих санях до снегурочки.   
Мы уверены, ты сможешь ему помочь собрать подарки. Но будь аккуратен, в лесу много препятствий, а Новый Год совсем уж скоро, поэтому стоит поторопиться!

## Управление
**SPACE** - прыжок   
**K** - поток огня(разрушает не только препятствие, но и подарки!)
## Команды для запуска
**Установка**   
``npm run install``  
**Build**   
``npm run build``  
**Запуск базы данных**   
``docker-compose up``   
**Запуск сервера**  
``npm run start``  
**Dev-режим(watcher)**  
``npm run dev``
## Полезные ссылки
* Репозиторий: https://github.com/orlando-production/runner-game
* Макет:  https://www.figma.com/files/project/41798105/Team-project?fuid=1009449935119434695
## Используемые технологии, подходы
* Typescript
* React
* Redux Toolkit
* Axios
* SSR(самописный)
* Docker, docker-compose
* Node
* Postgres, sequelize
* Testing Library
## MEMORYLEAKS
В проекте были обнаружены и успешно исправлены утечки памяти, связанные с таймером в игре:
таймер не останавливался после завершения игры.
Была создана переменная currentInterval, в которой теперь хранится setInterval, в дальнейшем он передается в clearInterval для очистки.
Также сам clearInterval был добавлен в useEffect.
## Качество кода
* eslint: ``npm run linter``  
* tsconfig: ``tsc --noEmit``  
* stylelint: ``npm run stylelint``


  