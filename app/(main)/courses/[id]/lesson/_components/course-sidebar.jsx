
 
import { CourseProgress } from "@/components/course-progress";


import GiveReview from "./give-review";
import DownloadCertificate from "./download-certificate";
import SidebalModules from "./sidebar-modules";
import { getCourseDetails } from "@/queries/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/models/watch-model";
import { getAReport } from "@/queries/reports";
import Quiz from "./quiz";


export const CourseSidebar = async ({courseId}) => {
   const course = await getCourseDetails(courseId);  
   const loggedinUser = await getLoggedInUser();
   const report = await getAReport({course: courseId, student: loggedinUser.id})
   const totalCompletedModeules = report?.totalCompletedModeules ? report?.totalCompletedModeules.length : 0
   const totalModules = course?.modules ? course?.modules.length : 0
   const totalProgress = (totalModules > 0) ? 
   (totalCompletedModeules/totalModules) * 100 : 0
    
     const updatedModules = await Promise.all(course?.modules.map(async (module) => {
        const moduleId = module._id.toString();
 
        const lessons = module?.lessonIds;

        const updatedLessons = await Promise.all(lessons.map(async (lesson) => {
          const lessonId = lesson._id.toString();
    
          const watch = await Watch.findOne({lesson: lessonId, module: moduleId, user: loggedinUser.id}).lean();
         

          if (watch?.state === 'completed') {
            lesson.state = 'completed';
          }
          return lesson;
        }))
        return module;
      }));

      const quizSet = course?.quizSet
      const isQuizComplete = report?.quizAssessment ? true : false;

  

      
     
     

  return (
    <>
      <div className="min-h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">
            {course?.title}
          </h1>
          {/* Check purchase */}
          {
            <div className="mt-10">
              <CourseProgress variant="success" value={totalProgress} />
            </div>
          }
        </div>
         
         <SidebalModules courseId={courseId} modules={updatedModules} />

        {quizSet && <Quiz courseId={courseId} quizSet={quizSet}
        isTaken={isQuizComplete} /> } 
         
         <div className="px-6">
          <DownloadCertificate courseId={courseId} totalProgress={totalProgress} />
          <GiveReview courseId={courseId} />
         </div>

      </div>

    </>
  );
};
