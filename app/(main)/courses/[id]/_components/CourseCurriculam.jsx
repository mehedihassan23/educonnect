import { BookCheck } from "lucide-react";
import { Clock10 } from "lucide-react";
import { Radio } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Video } from "lucide-react";
import { NotepadText } from "lucide-react";
import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tv } from "lucide-react";
import { StickyNote } from "lucide-react";
import CourseModuleList from "./module/CourseModuleList";


const CourseCurriculam = ({ course }) => {
 

  const duration = course?.modules?.map((item) => {
    return item.lessonIds.reduce((acc, obj) => {
      return acc + parseInt(obj.duration)
    }, 0)
  })

  const totalDuration = duration.reduce((sum, acc) => sum + acc, 0)

 


  return (
    <>
      {/* each tab content can be independent component */}
      <div class="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {totalDuration / 3600}+ Hours
        </span>
        <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />4 Live Class
        </span>
      </div>

      {/* contents */}
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        collapsible
        className="w-full"
      >
        {
          course?.modules && course?.modules.map(module => (
            <CourseModuleList module={module} />
          ))
        }


      </Accordion>
      {/* contents end */}
    </>
  )
}

export default CourseCurriculam
