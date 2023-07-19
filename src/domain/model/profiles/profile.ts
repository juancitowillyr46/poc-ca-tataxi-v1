import { CustomerSignUpM } from "../customers/customer-signup";

export class ProfileM {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    photo: string;
    userId: number;

    toProfileM(userId: number, signUp: CustomerSignUpM){
        this.email = signUp.email;
        this.firstName = signUp.firstName;
        this.lastName  = signUp.lastName;
        this.phoneNumber  = signUp.phoneNumber;
        this.photo = signUp.photo;
        this.userId = userId;
    }
}