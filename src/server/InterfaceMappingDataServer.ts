export interface ITrainer {
  fullName: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  birthday: Date;
  avatar: string;
  createdAt: Date;

  uuid: string;
  role: string;
  skills: string[];

  rate: number;
  certificates: string[];
}
