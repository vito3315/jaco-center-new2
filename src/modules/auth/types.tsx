export interface authState {
  loading: boolean;
  number: string;
  password: string;
  openAlert: boolean;
  status: boolean;
  text: string;
  login: () => void;
  enter: (event: { key: string } ) => void;
  changeNumber: (event: { target: { value: string } }) => void;
  changePassword: (event: { target: { value: string } }) => void;
}
