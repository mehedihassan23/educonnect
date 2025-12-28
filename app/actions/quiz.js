import { replaceMongoIdInArray } from "@/lib/convertData";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Assessment } from "@/models/assesment-model";
import { getQuizSetById } from "@/queries/quizzes";
import { createAssessmentReport } from "@/queries/reports";
import mongoose from "mongoose";



export async function addQuizAssessment(courseId, quizSetId, answers) {
    try {
   
      const quizSet = await getQuizSetById(quizSetId);
      const quizzes = replaceMongoIdInArray(quizSet.quizIds);

      const assessmentRecord = quizzes.map((quiz) => {
        const obj = {};
        obj.quizId = new mongoose.Types.ObjectId(quiz.id);
        const found = answers.find((a) => a.quizId === quiz.id);
        if (found) {
          obj.attmpted = true;
        } else {
          obj.attmpted = false;
        }

        const mergedOptions = quiz.options.map((o) => {
          return {
            option: o.text,
            isCorrect: o.is_correct,
            isSelected: (function () {
              const found = answers.find((a) => a.options[0].option === o.text);
              if (found) {
                return true;
              } else {
                return false;
              }
            })(),
          };
        });

         obj["options"] = mergedOptions;
        return obj;
      });


       const assessmentEntry = {};
      assessmentEntry.assessments = assessmentRecord;
      assessmentEntry.otherMarks = 0;

      const assessment = await Assessment.create(assessmentEntry);
      const loggedInUser = await getLoggedInUser();

       await createAssessmentReport({courseId: courseId, userId: loggedInUser.id, quizAssessment: assessment?._id})

  

    } catch (err) {
       
      throw err;  
    }
  }