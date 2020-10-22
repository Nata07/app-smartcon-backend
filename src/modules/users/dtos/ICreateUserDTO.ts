export default interface ICreateUserDTO {
  name: string;
  email: string;
  phone: string;
  password: string;
  permission: 'ADMIN' | 'PROVIDER' | 'USER';
}
