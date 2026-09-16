import { Provider } from "@prisma/client";

export interface OAuthRepository{
    getUserWithEmail(provider: Provider, email: string): Promise<any>;
    linkUserWithOAuth(providerAccountId: string, provider: Provider, userId: number): Promise<any>;
}