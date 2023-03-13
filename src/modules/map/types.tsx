export interface Zone {
  latitude: number;
  longitude: number;
}

export interface XyPoint {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface XyCenterMap {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Points {
  id: string;
  test: string;
  zone: Zone[];
  zone_origin: string;
  xy_point: XyPoint;
  raion: string;
  addr: string;
  xy_center_map: XyCenterMap;
  phone: string;
  phone_new: string;
  sum_div: string;
  organization: string;
  inn: string;
  ogrn: string;
  kpp: string;
  full_addr: string;
}

export interface City {
  id: string;
  name: string;
}

export interface mapState {
  loading: boolean;
  cities: City[];
  city: string;
  points: Points[];
  pointsZone: any[];
  map: any;
  changeCity: (event: { target: { value: string } }) => void;
  getDataForm: () => void;
  getOrders: () => void;
  loadMap: () => void;
}
