import { google } from "@/config/oauth.google";
import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class OAuthController{
 
    googleLogin=async(req: Request, resp: Response) =>{
        if((req as any).user){
            return resp.redirect('/');
        }

        const state=generateState();
        const codeVerifier=generateCodeVerifier();
        const url=google.createAuthorizationURL(state, codeVerifier,[
            "openid",
            "profile",
            "email",
        ]);

        resp.redirect(url.toString());
    }

    googleCallback=async(req: Request, resp: Response) =>{
        const {code, state}=req.query;
        const {google_oauth_state: storedState, google_code_verfier: codeVerifier}=req.cookies;

        if(!code || !state || !storedState || !codeVerifier || state!==storedState){
            return resp.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
                data: null
            });
        }

        const tokens=await google.validateAuthorizationCode(code as string, codeVerifier as string);

        const claims=await decodeIdToken(tokens.idToken());
        const {googleUserId, name, email}=claims;
    }
        
    
}