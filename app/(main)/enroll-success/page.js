import { auth } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { SendEmail } from "@/lib/email";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { enrollForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { Check } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success =  async ({searchParams}) => {
  const {session_id, courseId } = searchParams
  const user_session = await auth()

  if(!session_id) throw new Error("Please provide a valid session id")

  if(!user_session?.user?.email){
    redirect("/login")
  }
  const course = await  getCourseDetails(courseId)
 
  
  const loggedInUser = await getUserByEmail(user_session?.user?.email)
  
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"]
  })
 
  const paymentStatus = checkoutSession?.payment_intent?.status

  // Cutomer info
  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const customerEmail = loggedInUser?.email;
  const productName = course?.title;
  

  if(paymentStatus === "succeeded"){
    //save informatin to database
    await enrollForCourse(course?.id, loggedInUser?.id, "stripe")
    //send email 
    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`
    const instructorEmail = `${course?.instructor?.email}`


    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New Enrollment for ${productName}.`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
      },
      {
        to: customerEmail,
        subject: `Enrollment Success for ${productName}`,
        message: `Hey ${customerName} You have successfully enrolled for the course ${productName}`,
      }
    ];

  

   await SendEmail(emailsToSend)
  


  }

  
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
       
        {
          paymentStatus === "succeeded" && (<> <Check className="text-green-700" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations <span  className="font-bold text-green-500">{loggedInUser?.firstName + " " + loggedInUser?.lastName} </span> ! You Enrollment was Successful for course <span classname="font-bold text-green-500">{course?.title}</span>
            </h1></> )
        }

        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/courses/${courseId}/lesson`}>Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Success;