import { replaceMongoIdInObject } from "@/lib/convertData"
import { Lesson } from "@/models/lesson-model"
import { Module } from "@/models/module-model"

export async function create(moduleData) {
    try {
        const module = await Module.create(moduleData)
       
        return JSON.parse(JSON.stringify(module))
    } catch (error) {
        throw new Error(error)
    }
    
}

export async function getModule(moduleId) {
    try {
        const module = await Module.findById(moduleId).populate({
            path: "lessonIds",
            model: Lesson
        }).lean();

        return replaceMongoIdInObject(module);

    } catch (e) {
        throw new Error(e)
    }
}

export async function getModulesBySlug(moduleSlug) {
    try {
        const module = await Module.findOne({slug: moduleSlug}).lean()
        return replaceMongoIdInObject(module)
    } catch (error) {
        throw new Error(error)
    }
    
}