import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    async login(email:string, password:string) {
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign(
                {
                userId: user.id,
                role: user.role
                },
                process.env.JWT_SECRET!,
                {
                    expiresIn:"1d",
                }
            );

        return {token};
    }
}

export default new AuthService();