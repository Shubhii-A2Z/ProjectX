import { Provider } from "@prisma/client";
import { OAuthRepository } from "../oauth.repository.interface";
import prisma from "@/prisma/client";

export class OAuthRepositoryImpl implements OAuthRepository{

    async getUserWithEmail(provider: Provider, email: string): Promise<any> {
        return await prisma.oAuthAccount.findUnique({
            where:{
                provider: provider,
                providerAccountId: email
            },
            select:{
                user: true,
            }
        });
    }

    async linkUserWithOAuth(providerAccountId: string, provider: Provider, userId: number): Promise<any> {
        return await prisma.oAuthAccount.create({
            data:{
                providerAccountId: providerAccountId,
                provider: provider,
                user:{
                    connect:{
                        id: userId
                    }
                }
            }
        });
    }

    async getByProviderAccountId(provider: Provider, providerAccountId: string): Promise<any> {
        return await prisma.oAuthAccount.findUnique({
            where:{
                provider: provider,
                providerAccountId: providerAccountId
            },
            select:{
                user: true,
            }
        });
    }

}