import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Provider } from "@prisma/client";

import { OAuthService } from "../oauth.service.interface";
import { OAuthRepository } from "@/repositories/oauth.repository.interface";
import { UserRepository } from "@/repositories/user.repository.interface";

export class OAuthServiceImpl implements OAuthService{

    private readonly oAuthRepository: OAuthRepository;
    private readonly userRepository: UserRepository;

    constructor(oAuthRepository: OAuthRepository, userRepository: UserRepository){
        this.oAuthRepository=oAuthRepository;
        this.userRepository=userRepository;
    }

    async handleGoogleAuth(userData: any): Promise<any> {
        const provider=Provider.GOOGLE;
        const providerAccountId=userData.id;
        const email=userData.email;

        // CASE 1: User already exists in OAuth table
        const existingOAuth=await this.oAuthRepository.getByProviderAccountId(provider, providerAccountId);
        if(existingOAuth && existingOAuth.user){
            return existingOAuth.user;
        }

        // CASE 2: User exists in User table (by email), but not in OAuth table
        const existingUser=await this.userRepository.getByEmail(email);
        if(existingUser){
            // Link existing user account with Google OAuth
            await this.oAuthRepository.linkUserWithOAuth(providerAccountId, provider, existingUser.id);
            return existingUser;
        }

        // CASE 3: User does not exist in either table
        // Note: Prisma User schema requires a password, so generate a secure random one
        const randomPassword=crypto.randomBytes(16).toString('hex');
        const hashedPassword=bcrypt.hashSync(randomPassword, 10);

        // Generate username (e.g. "shubham_a1b2")
        const baseUsername = (userData.name || email.split("@")[0]).toLowerCase().replace(/\s+/g, "_");
        const uniqueUsername = `${baseUsername}_${crypto.randomBytes(2).toString("hex")}`;

        const newUser=await this.userRepository.create({
            email: email,
            username: uniqueUsername,
            password: hashedPassword,
            avatar: userData.picture || null
        });

        if(newUser==null){
            throw new Error("Failed to create user from Google profile");
        }

        // Create the OAuthAccount link
        await this.oAuthRepository.linkUserWithOAuth(providerAccountId, provider, newUser.id);
        return newUser
    }

    async linkUserWithOAuth(providerAccountId: string, provider: Provider, userId: number): Promise<any> {
        return await this.oAuthRepository.linkUserWithOAuth(providerAccountId, provider, userId);
    }

}