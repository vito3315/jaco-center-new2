import { useOrders } from '../orders/store';
import queryString from 'query-string';

type Data = {
  type?: string;
  token?: string;
  point_id?: number | string;
  date?: Date | string;
};

export async function getData(method: string, dataType?: Data) {
  useOrders.setState({ loading: true });

  try {
    const data: Data = {
      type: method,
      token: '',
      point_id: dataType?.point_id,
      date: dataType?.date,
    };

    // data.token = itemsStore.getToken();

    const res = await fetch('https://jacochef.ru/api/site/test_app.php',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: queryString.stringify(data),
        cache: 'no-store',
      }
    );

    if (!res.ok) throw new Error('Не удалось извлечь данные! Попробуйте снова.');

    const result = await res.json();

    console.log(result);

    if (result.st === false && result.type == 'redir') {
      window.location.pathname = '/';
      return;
    }

    if (result.st === false && result.type == 'auth') {
      window.location.pathname = '/auth';
      return;
    }

    switch (method) {
      case 'get_center_all':
        useOrders.setState({ cities: result.cities, points: result.points, allItems: result.all_items });
        break;
      case 'get_orders':
        useOrders.setState({ orders: result.orders });
        break;
      default:
      throw new Error('Не удалось извлечь данные! Попробуйте снова.');
    }

    useOrders.setState({ loading: false, error: null });

  } catch (error) {

    useOrders.setState({ error: error.message });
  }

  console.log('fetching getData');
}
