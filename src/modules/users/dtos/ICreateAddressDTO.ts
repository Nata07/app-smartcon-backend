import User from '../infra/typeorm/entities/User';

export default interface ICreateAddressDTO {
  user_id: User;
  city: string;
  street_name: string;
  neighborhood: string;
  state: string;
  complement: string;
  number: string;
  postal_code: string;
}
