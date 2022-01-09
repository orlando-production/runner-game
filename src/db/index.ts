import { dbConnect } from './init';

export function startApp() {
  dbConnect().then(async () => {
    /*
     *  Запуск приложения только после старта БД
     */
    console.log('dbconnect');
  });
}
