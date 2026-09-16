import { Provider } from "@prisma/client";
import { OAuthService } from "../oauth.service.interface";
import { OAuthRepository } from "@/repositories/oauth.repository.interface";

export class OAuthServiceImpl implements OAuthService{

    private readonly oAuthRepository: OAuthRepository;

    constructor(oAuthRepository: OAuthRepository){
        this.oAuthRepository=oAuthRepository;
    }

    async getUserWithEmail(provider: Provider, email: string): Promise<any> {
        return await this.oAuthRepository.getUserWithEmail(provider, email);
    }

    async linkUserWithOAuth(providerAccountId: string, provider: Provider, userId: number): Promise<any> {
        return await this.oAuthRepository.linkUserWithOAuth(providerAccountId, provider, userId);
    }

}