import EmailTemplete from '@/components/email-templete';
import { Resend } from 'resend';

const resend = new Resend('re_5hi39gD2_NDi5cSBjJdTkKSpZ3Y5P6R6v');

export const SendEmail = async (emailInfo) =>{
    if(!emailInfo) return null;

    const response = Promise.allSettled( emailInfo.map(async (data) => {
        const {to, subject, message} = data

        if (to && subject && message) {
            const sentInfo = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to, subject,
                react: EmailTemplete({message})
              });
              return sentInfo;
        } else {
            const rejectedPromise = new Promise((reject) => {
                return reject(
                    new Error("Couldn't sent email")
                )
            })
            return rejectedPromise
        }
     }))

     return response

}