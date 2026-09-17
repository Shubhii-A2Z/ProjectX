import { Provider } from "@prisma/client";

export interface OAuthService{
    handleGoogleAuth(userData: any): Promise<any>;
    linkUserWithOAuth(providerAccountId: string, provider: Provider, userId: number): Promise<any>;
}