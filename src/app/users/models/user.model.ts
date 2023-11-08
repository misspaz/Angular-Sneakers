export interface IUser {

    id: number;
    email: string;
    usernames: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
      };

}
