
import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { CourseSidebar } from "./_components/course-sidebar";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { redirect } from "next/navigation";
import { hasEnrollmentForCourse } from "@/queries/enrollments";

const CourseLayout = async ({ children, params: {id} }) => {
  const loggedInUser = await getLoggedInUser()
  if(!loggedInUser){
    return redirect("/login")
  }

  const isEnrolled = await hasEnrollmentForCourse(id, loggedInUser?.id)
  
  if(!isEnrolled){
    redirect("/")
  }
   
  return (
    <div className="">
      <div className="h-[80px] lg:pl-96 fixed inset-y-0 top-[60px] w-full z-10">
        <div className="p-4 border-b lg:hidden h-full flex items-center bg-white shadow-sm relative">
          {/* Course Sidebar For Mobile */}
          <CourseSidebarMobile courseId={id} />
          {/* <NavbarRoutes /> */}
        </div>
      </div>

  
       <div className="grid grid-cols-1 lg:grid-cols-12">

      <div className="top-[50px] hidden lg:flex h-full w-96 flex-col fixed inset-y-0 z-50">
        {/* sidebar starts */}
        <CourseSidebar courseId={id} />
        {/* sidebar ends */}
      </div>
      <main className="lg:pl-96 lg:ml-10 pt-[80px] h-full lg:pt-[20px] col-span-10 px-4">
        {children}
      </main>

      </div>

    </div>
  );
};
export default CourseLayout;
