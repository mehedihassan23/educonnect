
import { AccordionContent } from "@/components/ui/accordion"
import SidebarLessonsItem from "./sidebar-lessons-item";
import { replaceMongoIdInArray } from "@/lib/convertData";

const SidebarLesson = ({courseId, lesson, module}) => {
    const alllesson = replaceMongoIdInArray(lesson).toSorted((a, b) => a.order - b.order)
 
    return (
        <>
            <AccordionContent>
                <div className="flex flex-col w-full gap-3">
                   
                    {alllesson.map(lesson => (<SidebarLessonsItem 
                    key={lesson.id} 
                    lesson={lesson} 
                    courseId = {courseId}
                    module={module}
                    />))}
                   
                </div>
            </AccordionContent>
        </>
    )
}

export default SidebarLesson
