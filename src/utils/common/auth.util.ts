import serverConfig from '@/config/server.config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class JWTToken{

    static generateJWTToken(obj: any): string{
        return jwt.sign(obj, serverConfig.AUTH_SECRET, {expiresIn: '8h'});
    }

    static verifyToken(token: string): string | JwtPayload{
        return jwt.verify(token, serverConfig.AUTH_SECRET);
    }
    
}