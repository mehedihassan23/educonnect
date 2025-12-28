"use client"

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { createCheckoutSession } from "@/app/actions/stripe";


const EnrollCourse = ({asLink, course}) => {

    const formAction = async (data) => {
        //server action for stripe
        const {url} = await createCheckoutSession(data)
        window.location.assign(url)
    }
     
  return (
    <>
       <form action={formAction}> 
      
        <input type="hidden" name="courseId" value={course} />
       
       {asLink ? (<Button 
                           variant="ghost"
                           className="text-xs t text-sky-700 h-7 gap-1"
                           type="submit"
                         >
                           Enroll
                           <ArrowRight className="w-3" />
                         </Button>) : ( <Button 
                         type="submit"
                         className={cn(buttonVariants({ size: "lg" }))}>
                    Enroll Now
                  </Button>) } 
      </form>          
    </>
  )
}

export default EnrollCourse
