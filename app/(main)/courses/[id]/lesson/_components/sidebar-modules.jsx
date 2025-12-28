 "use client"

 import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SidebarLesson from "./sidebar-lesson";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { useSearchParams } from "next/navigation";


const SidebalModules = ({courseId, modules}) => {
    const allModules = replaceMongoIdInArray(modules).toSorted((a, b) => a.order - b.order)
    const searchParams = useSearchParams()
    const query = searchParams.get("name")

    const expandedModule = allModules.find( module => {
        return module.lessonIds.find(lesson => {
            return lesson.slug === query
        })
    } )

    const expandedModuleId = expandedModule?.id ?? allModules[0].id
   
     
      
    return (
        < >
            <Accordion
                defaultValue={expandedModuleId}
                type="single"
                collapsible
                className="w-full px-6"
            >
                 {allModules?.map(  (module, index) => (
                <AccordionItem key={index} className="border-0" value={module.id} >
                    <AccordionTrigger> 
                        {module.title}
                    </AccordionTrigger>


                    <SidebarLesson courseId={courseId} lesson={module.lessonIds} module={module.slug} />       
                </AccordionItem>
                 ) )}

            </Accordion>

        </ >
    )
}

export default SidebalModules
