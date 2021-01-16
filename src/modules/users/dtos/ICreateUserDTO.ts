export default interface ICreateUserDTO {
  name: string;
  email: string;
  phone: string;
  register: string;
  about: string;
  password: string;
  permission: 'ADMIN' | 'PROVIDER' | 'USER';
}
