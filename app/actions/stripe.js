"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { formatAmoutForStripe } from "@/lib/stripe-helpers";
import { getCourseDetails } from "@/queries/courses";

const CURRENCY = "inr";

export async function createCheckoutSession(data) {
    const ui_mode = "hosted";
    const origin = headers().get("origin");
    const course = await getCourseDetails(data.get("courseId"))

    if(!course) throw new Error("Course not found")

        const courseName = course?.title
        const coursePrice = course?.price
    

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        submit_type: "auto",
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: CURRENCY,
                    product_data: { name: courseName },
                    unit_amount: formatAmoutForStripe(coursePrice, CURRENCY)
                }
            }
        ],

        ...(ui_mode === "hosted" && {
            success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${data.get("courseId")}`,
            cancel_url: `${origin}/courses`,
        }),

        ui_mode,
    });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url
    };
}

// export async function createPaymentIntent(data) {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: formatAmountForStripe(
//             data.get("coursePrice"),
//             CURRENCY
//         ),
//         automatic_payment_methods: { enabled: true },
//         currency: CURRENCY,
//     });
//     return { client_secret: paymentIntent.client_secret };
// }