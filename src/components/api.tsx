import queryString from 'query-string';

export async function api(data = {}) {
  const urlApi = 'https://jacochef.ru/api/site/test_app.php';

  try {
    const res = await fetch(urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
      cache: 'no-store',
    });

    if (!res.ok)
      throw new Error('Не удалось извлечь данные! Попробуйте снова.');

    const json = await res.json();

    if (json.st === false && json.type == 'redir') {
      window.location.pathname = '/';
      return;
    }

    if (json.st === false && json.type == 'auth') {
      window.location.pathname = '/auth';
      return;
    }
    return json;
  } catch (err) {
    console.log(err);
  }
}
