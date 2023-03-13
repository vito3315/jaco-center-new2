import { create } from 'zustand';
import { mapState } from './types';
import { api } from '@/components/api';
// import ymaps from './ymaps.d';

export const useMap = create<mapState>((set, get) => ({
  loading: false,
  cities: [],
  city: '',
  points: [],
  pointsZone: [],
  map: null,

  // изменения Города в селекте
  changeCity(event) {
    set({ city: event.target.value });

    get().getOrders();
  },

  // получение данных для Form
  getDataForm: async () => {
    set({ loading: true });

    const data = {
      type: 'get_center_all',
    };

    const result = await api(data);

    set({
      cities: result.cities,
      city: result.cities[0].id,
      loading: false,
    });

    get().getOrders();
  },

  // получение заказов города и данных для Map
  getOrders: async () => {
    set({ loading: true });

    const data = {
      type: 'get_addr_zone',
      city_id: get().city,
    };

    const result = await api(data);

    let points_zone: any[] = [];

    result.map(function (point: { [x: string]: string }) {
      if (point['zone_origin'].length > 0) {
        points_zone.push(JSON.parse(point['zone_origin']));
      }
    });

    let unic_point: { id: string }[] = [],
      check = false;

    result.map(function (point: { id: string }) {
      check = false;

      unic_point.map(function (new_point) {
        if (parseInt(new_point.id) == parseInt(point.id)) {
          check = true;
        }
      });

      if (!check) {
        unic_point.push(point);
      }
    });

    set({
      points: result,
      pointsZone: points_zone,
      loading: false,
    });

    get().loadMap();
  },

  // создание Map
  loadMap: () => {
    if (!get().map) {
      ymaps.ready().then(() => {
        get().map = new ymaps.Map('ForMap', {
          center: [
            get().points[0]['xy_center_map']['latitude'],
            get().points[0]['xy_center_map']['longitude'],
          ],
          zoom: 10.8,
        });

        let HintLayout = ymaps.templateLayoutFactory.createClass(
          "<div class='my-hint'>" +
            '<b>{{ properties.address }}</b><br />' +
            'Зона {{ properties.zone }}<br />' +
            'График работы: c 10:00 до 21:30<br />' +
            'Стоимость доставки: {{ properties.sum_div }} руб.' +
            '</div>'
        );

        get().pointsZone.map((zone, key) => {
          get().map.geoObjects.add(
            new ymaps.Polygon(
              [zone],
              {
                address: get().points[key]['addr'],
                sum_div: get().points[key]['sum_div'],
                zone: get().points[key]['test'],
              },
              {
                hintLayout: HintLayout,
                fillColor: 'rgba(187, 0, 37, 0.25)',
                strokeColor: 'rgb(187, 0, 37)',
                strokeWidth: 5,
              }
            )
          );
        });

        get().points.map((point) => {
          get().map.geoObjects.add(
            new ymaps.Placemark(
              [point['xy_point']['latitude'], point['xy_point']['longitude']],
              {},
              {
                iconLayout: 'default#image',
                iconImageHref: '/img_other/Favikon.png',
                iconImageSize: [30, 30],
                iconImageOffset: [-12, -24],
                iconContentOffset: [15, 15],
              }
            )
          );
        });
      });
    } else {
      get().map.destroy();
      get().map = null;
      get().loadMap();
    }
  },
}));
