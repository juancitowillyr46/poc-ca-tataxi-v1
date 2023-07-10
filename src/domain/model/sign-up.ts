export class SignUpM {
    username: string;
    password: string;
    confirmPassword: string;

    validateConfirmPassword(password:string, confirmPassword: string): boolean {
        let validate = true;
        if(password != confirmPassword) {
            validate = false;
        }
        return validate;
    }
} 