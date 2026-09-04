export class SignupTemplate {

    static generate(username: string): string {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to ProjectX</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #0b0b0f;
            font-family: Arial, Helvetica, sans-serif;
            color: #ffffff;
        ">

            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td align="center" style="padding: 50px 20px;">

                        <!-- Main Container -->
                        <table
                            width="600"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="
                                max-width: 600px;
                                width: 100%;
                                background-color: #111116;
                                border: 1px solid #25252d;
                                border-radius: 16px;
                                overflow: hidden;
                            "
                        >

                            <!-- Logo / Brand -->
                            <tr>
                                <td align="center" style="padding: 45px 40px 25px;">

                                    <div style="
                                        font-size: 32px;
                                        font-weight: 800;
                                        letter-spacing: -1px;
                                    ">
                                        Project<span style="color: #8b5cf6;">X</span>
                                    </div>

                                    <div style="
                                        margin-top: 10px;
                                        font-size: 12px;
                                        letter-spacing: 3px;
                                        color: #777783;
                                        text-transform: uppercase;
                                    ">
                                        One place. Everything.
                                    </div>

                                </td>
                            </tr>


                            <!-- Hero -->
                            <tr>
                                <td style="padding: 35px 50px 20px;">

                                    <div style="
                                        font-size: 42px;
                                        line-height: 1.1;
                                        font-weight: 800;
                                        letter-spacing: -1.5px;
                                    ">
                                        Welcome,<br>
                                        ${username}.
                                    </div>

                                    <p style="
                                        margin: 25px 0 0;
                                        font-size: 17px;
                                        line-height: 1.7;
                                        color: #a5a5b0;
                                    ">
                                        You're officially part of ProjectX.
                                    </p>

                                    <p style="
                                        margin: 5px 0 0;
                                        font-size: 17px;
                                        line-height: 1.7;
                                        color: #a5a5b0;
                                    ">
                                        And this is only the beginning.
                                    </p>

                                </td>
                            </tr>


                            <!-- Big Statement -->
                            <tr>
                                <td style="padding: 35px 50px;">

                                    <div style="
                                        border-left: 3px solid #8b5cf6;
                                        padding-left: 20px;
                                    ">

                                        <div style="
                                            font-size: 24px;
                                            line-height: 1.4;
                                            font-weight: 700;
                                        ">
                                            Communication is changing.
                                        </div>

                                        <div style="
                                            margin-top: 8px;
                                            font-size: 24px;
                                            line-height: 1.4;
                                            font-weight: 700;
                                            color: #8b5cf6;
                                        ">
                                            ProjectX is here for it.
                                        </div>

                                    </div>

                                </td>
                            </tr>


                            <!-- Divider -->
                            <tr>
                                <td style="padding: 0 50px;">
                                    <div style="
                                        height: 1px;
                                        background-color: #25252d;
                                    "></div>
                                </td>
                            </tr>


                            <!-- Message -->
                            <tr>
                                <td style="padding: 30px 50px 40px;">

                                    <p style="
                                        margin: 0;
                                        font-size: 15px;
                                        line-height: 1.8;
                                        color: #90909b;
                                    ">
                                        ProjectX brings your conversations,
                                        communities and collaboration together
                                        in one place.
                                    </p>

                                    <p style="
                                        margin: 18px 0 0;
                                        font-size: 15px;
                                        line-height: 1.8;
                                        color: #90909b;
                                    ">
                                        You’re here early. That matters.
                                    </p>

                                </td>
                            </tr>


                            <!-- Footer -->
                            <tr>
                                <td align="center" style="
                                    padding: 25px 40px;
                                    background-color: #0d0d11;
                                    border-top: 1px solid #202027;
                                ">

                                    <div style="
                                        font-size: 13px;
                                        color: #666671;
                                    ">
                                        ProjectX
                                    </div>

                                    <div style="
                                        margin-top: 7px;
                                        font-size: 11px;
                                        color: #4f4f59;
                                    ">
                                        Something big is being built.
                                    </div>

                                </td>
                            </tr>

                        </table>

                    </td>
                </tr>
            </table>

        </body>
        </html>
                `;
    }
    
}