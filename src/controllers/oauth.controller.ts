import serverConfig from "@/config/server.config";
import axios from "axios";
import { Request, Response } from "express";
import { OAuthService } from "@/services/oauth.service.interface";
import { JWTToken } from "@/utils/common/auth.util";

export class OAuthController{

    private readonly oauthService: OAuthService;

    constructor(oauthService: OAuthService){
        this.oauthService=oauthService;
    }

    googleLogin=async(_: Request, resp: Response) =>{
        const redirectUri="http://localhost:3000/api/v1/oauth/google/callback";
        const clientId=serverConfig.GOOGLE_CLIENT_ID as string;

        const url=`https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
        
        resp.redirect(url);
    }

    googleCallback=async(req: Request, resp: Response) =>{
        const code=req.query.code;
        const redirectUri="http://localhost:3000/api/v1/oauth/google/callback";

        try{
            const tokenResp=await axios.post('https://oauth2.googleapis.com/token', {
                code,
                redirect_uri: redirectUri,
                client_id: serverConfig.GOOGLE_CLIENT_ID,
                client_secret: serverConfig.GOOGLE_CLIENT_SECRET,
                grant_type: 'authorization_code',
            });
            
            const accessToken=tokenResp.data.access_token as string;
            const userResp=await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            
            const userData=userResp.data;
            const user=await this.oauthService.handleGoogleAuth(userData);
            const token=JWTToken.generateJWTToken({
                id: user.id,
                email: user.email
            });

            resp.redirect(`http://localhost:5173/app?token=${token}`);
        }
        catch(error){
            console.log("OAuth Error: ",error);
            resp.redirect("http://localhost:5173/auth/login?error=oauth_failed");
        }
    }
        
    
}