"use server"

import { Lesson } from "@/models/lesson-model"
import { Module } from "@/models/module-model"
import { create } from "@/queries/lesson"
import mongoose from "mongoose"

export async function createLesson(data) {
     try {
        const title = data.get("title")
        const slug = data.get("slug")
        const moduleId = data.get("moduleId")
        const order = data.get("order")

        const createdLesson = await create({title, slug, moduleId, order})

        const singleModule = await Module.findById(moduleId)
        singleModule.lessonIds.push(createdLesson?._id)
        singleModule.save()

        return createdLesson;
        
     } catch (error) {
        throw new Error(error)
     }
    
}

export async function reOrderLesson(data) {
    try {
        await Promise.all(
            data.map( async (element) => {
                await Lesson.findByIdAndUpdate(element.id, {order: element.position})
            })
        )
        
    } catch (error) {
        throw new Error(error)
    }
    
}

export async function updateLesson(lessonId, data) {
  try{
    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (err) {
    throw new Error(err);
  }
}

export async function changeLessonPublishState(lessonId) {

  const lesson = await Lesson.findById(lessonId);

  try {
    const res = await Lesson.findByIdAndUpdate(lessonId, {active: !lesson.active}, {lean: true});
    return res.active
  }catch (err) {
    throw new Error(err);
  }
}

export async function deleteLesson(lessonId, moduleId) {
  try {
    const singleModule = await Module.findById(moduleId);
    singleModule.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
    await Lesson.findByIdAndDelete(lessonId);
    singleModule.save();
  } catch (err) {
    throw new Error(err);
  }
}