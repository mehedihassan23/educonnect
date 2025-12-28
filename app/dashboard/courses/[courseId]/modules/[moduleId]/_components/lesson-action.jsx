"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { changeLessonPublishState, deleteLesson } from "@/app/actions/lessons";

export const LessonActions = ({lesson, moduleId, onDelete }) => {
    const [action, setAction] = useState(null)
    const [published, setPublished] = useState(lesson?.active)

   async function handleSubmit(event){
        event.preventDefault()
        
        try {
            switch (action) {
                case "change-action":{
                    const activeState = await changeLessonPublishState(lesson?.id)
                

                     setPublished(!activeState)
                     toast.success("Lesson published successfully")
                    
                    break;
            }
            case "delete":{
                
                if(published){
                    toast.error("Please unpublished first to delete")
                }else{
                    await deleteLesson(lesson?.id, moduleId)
                    onDelete()
                    toast.success("Lesson deleted successfully")
                }
                   
                    break;
            }
                default:{
                    throw new Error("Invalid action")
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

     

  return (
    <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-x-2">
        <Button variant="outline" size="sm" onClick={() => setAction("change-action")}>
            {published ? "Unpublish" : "Publish"}
        </Button>

        <Button size="sm" onClick={() => setAction("delete")}>
            <Trash className="h-4 w-4" />
        </Button>
        </div>
    </form>
  );
};
