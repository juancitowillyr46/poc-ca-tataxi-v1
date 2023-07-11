export class SignUpM {
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