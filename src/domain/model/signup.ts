import { ProfileM } from "./profiles/profile";

export class SignUpM extends ProfileM {
    
    username: string;
    password: string;
    confirmPassword: string;
 
    async validateConfirmPassword(password:string, confirmPassword: string): Promise<boolean> {
        let validate = true;
        if(password != confirmPassword) {
            validate = false;
        }
        return await validate;
    }

} 