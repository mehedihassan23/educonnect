"use client"

import ReactPlayer from 'react-player/youtube'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

const LessonVideo = ({ courseId, lesson, module }) => {
    const [hasWindow, setHasWindow] = useState(false)
    const [started, setStarted] = useState(false)
    const [ended, setEnded] = useState(false)
    const [duration, setDuration] = useState(0)
    const router = useRouter()


    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true)
        }
    }, [])

    useEffect(() => {
        async function updateLessonWatch() {
            const response = await fetch("/api/watch-lesson", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courseId: courseId,
                    lessonId: lesson.id,
                    moduleSlug: module,
                    state: "started",
                    lastTime: 0
                })
            })

            if (response.status === 200) {
                const result = await response.text()
             
                setStarted(true)
            }

        }

        started && updateLessonWatch()
    }, [started])

    useEffect(() => {
         async function updateLessonWatch() {
            const response = await fetch("/api/watch-lesson", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courseId: courseId,
                    lessonId: lesson.id,
                    moduleSlug: module,
                    state: "completed",
                    lastTime: 0
                })
            })

            if (response.status === 200) {
                const result = await response.text()
                 setEnded(false);
                 router.refresh();
                setStarted(true)
            }

        }

        ended && updateLessonWatch()
     }, [ended])

    function handleOnStart() {
        setStarted(true)
    }
    function handleOnDuration(duration) {
        setDuration(duration)
    }
    function handleOnProgress(state) {

    }
    function handleOnEnded() {
        setEnded(true)
    }



    return (
        <>
            {hasWindow && (<ReactPlayer
                url={lesson.video_url}

                height="470px"
                controls={true}
                onStart={handleOnStart}
                onProgress={handleOnProgress}
                onDuration={handleOnDuration}
                onEnded={handleOnEnded}
            />)}
        </>
    )
}

export default LessonVideo
