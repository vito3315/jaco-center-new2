import ky from 'ky';

export const api = ky.create({ prefixUrl: 'https://jacochef.ru/api/site/test_app.php' });
