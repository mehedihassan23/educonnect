"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { changeModulePublishState, deleteModule } from "@/app/actions/modules";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const ModuleActions = ({module, courseId}) => {
     const [action, setAction] = useState(null)
     const [published, setPublished] = useState(module?.active)
     const router = useRouter()

     const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            switch (action) {
                case "change-action": {
                    const activeState = await changeModulePublishState(module?.id) 
                    setPublished(!activeState)
                    toast.success("Module has been changed successfully")
                    router.refresh()
                    break;
                }

                case "delete" : {
                    if(published){
                        toast.error("Unpublished first to delete Module")
                    }else{
                    await deleteModule(module?.id, courseId) 
                    
                    router.push(`/dashboard/courses/${courseId}`)

                    }
                    break;
                }
            
                default:{
                    throw new Error("Invalid actions")
                }
            }
            
        } catch (error) {
            throw new Error(error.message)
        }
     }
    

  return (
    <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-x-2">
        <Button variant="outline" size="sm" onClick={() => setAction("change-action")}>
            {published  ? "Unpublish" : "Publish"}
        </Button>

        <Button size="sm" onClick={() => setAction("delete")}>
            <Trash className="h-4 w-4" />
        </Button>
        </div>
    </form>
  );
};
