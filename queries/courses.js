import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData"
import { Category } from "@/models/category-model"
import { Course } from "@/models/course-model"
import { Module } from "@/models/module-model"
import { Testimonial } from "@/models/testimonial-model"
import { User } from "@/models/user-model"
import { getEnrollmentsForCourse } from "./enrollments"
import { getTestimonialsForCourse } from "./testimonials"
import { Lesson } from "@/models/lesson-model"
import { Quizset } from "@/models/quizset-model"
import { Quiz } from "@/models/quizzes-model"



export const getCourseList = async () => {
    const courses = await Course.find({active: true}).sort({ created: 1 }).select(["title", "subtitle", "thumbnail", "modules", "price", "category", "instructor"]).populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial
    }).populate({
        path: "modules",
        model: Module
    }).lean()

    return replaceMongoIdInArray(courses)
}

export async function courseDetails(id){
    
    const course = await Course.findById(id).populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial,
        populate:{
            path: "user",
            model: User
        }
    }).populate({
        path: "modules",
        model: Module
    }).lean()
    
    return replaceMongoIdInObject(course)
}

export async function getCourseDetails(id) {
    const course = await Course.findById(id)
    .populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial,
        populate: {
            path: "user",
            model: User
        }
    }).populate({
        path: "modules",
        model: Module,
        populate : {
            path: "lessonIds",
            model: Lesson
        }
    }).populate({
        path: "quizSet",
        model: Quizset,
        populate: {
            path: "quizIds",
            model: Quiz
        }
    }).lean();

    return replaceMongoIdInObject(course)
}

export async function getCourseDetailsByInstructor(instructorId, expand){
    const publishedCourses = await Course.find({instructor: instructorId, active: true})
    .populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial,
        populate:{
            path: "user",
            model: User
        }
    }).populate({
        path: "modules",
        model: Module
    })
    .lean()
   

    const enrollments = await Promise.all(
        publishedCourses.map(async (course) => {
          const enrollment = await getEnrollmentsForCourse(course._id.toString());
          return enrollment;
        })
    );

     
   

    const totalRevenue = publishedCourses.reduce((acc, course) => {
        return (acc +  Math.floor(Math.random() * 5) * course.price)
    }, 0);

    const totalEnrollments = enrollments.reduce(function (acc, obj) {
        return acc + obj.length;
    }, 0)


    const testimonials = await Promise.all(
        publishedCourses.map(async (course) => {
          const testimonial = await getTestimonialsForCourse(course._id.toString());
          return testimonial;
        })
      );

      const totalTestimonials = testimonials.flat();

      const avgRating = (totalTestimonials.reduce(function (acc, obj) {
            return acc + obj.rating;
        }, 0)) / totalTestimonials.length;
 
        if (expand) {
            const allCourses = await Course.find({instructor: instructorId}).lean()
            return {
                "courses": allCourses?.flat(),
                "enrollments": enrollments?.flat(),
                "reviews": totalTestimonials,
            }
        }

    return {
        "courses": publishedCourses.length,
        "enrollments": totalEnrollments,
        "reviews": totalTestimonials.length,
        "ratings": avgRating.toPrecision(2),
        "revenue": totalRevenue
    }

}


export async function create(courseData) {
    try{
        const course =  await Course.create(courseData);
        return JSON.parse(JSON.stringify(course));
    } catch(err) {
        throw new Error(err);
    }
}

