"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { changeCoursePublishState, deleteCourse } from "@/app/actions/course";
import { toast } from "sonner";

export const CourseActions = ({ courseId, isActive }) => {
  const [action, setAction] = useState(null)
  const [published, setPublished] = useState(isActive)
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      switch (action) {
        case "change-action":{
         const activeState = await changeCoursePublishState(courseId)
         setPublished(!activeState)
         toast.success("Course update successfully!")
         router.refresh()
         break;
        }

        case "delete" : {
           
          if(published){
                toast.error("Unpublished first to delete Course")
            }else{
            
              await deleteCourse(courseId) 
            
              router.push(`/dashboard/courses`)

            }
            break;
           }
  
        default:{
          throw new Error("Invalid action")
          
        }
      }
      
    } catch (error) {
      throw new Error(error.message)
    }
  
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm" onClick={() => setAction('change-action')} >
        {published ? "Unpublish" : "Publish"}
      </Button>

      <Button size="sm" onClick={() => setAction("delete")}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
    </form>
  )
}
