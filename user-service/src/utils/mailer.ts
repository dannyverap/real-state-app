import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import dotenv from "dotenv";

dotenv.config();

const ses = new SESClient({ region: "eu-north-1" });

const createSendEmailCommand = async (
    toAddress: string,
    fromAddress: string,
    message: string
) => {
    return new SendEmailCommand({
        Destination: {
            ToAddresses: [toAddress],
        },
        Source: fromAddress,
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: "Your verification code",
            },
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: message,
                },
            },
        },
    });
};

export const SendVerificationCode = async (mail: string, verificationCode: number) => {
    const message = `Your verification code is: ${verificationCode}!`;
    const command = await createSendEmailCommand(
        mail,
        "danny.verap@gmail.com",
        message
    );

    try {
        return await ses.send(command);
    } catch (error) {
        console.log(error);
    }
};
