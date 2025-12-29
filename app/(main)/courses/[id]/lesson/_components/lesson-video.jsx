"use client";

import ReactPlayer from "react-player/youtube";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LessonVideo = ({ courseId, lesson, module }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  async function handleOnStart() {
    await fetch("/api/watch-lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        lessonId: lesson.id,
        moduleSlug: module,
        state: "started",
        lastTime: 0
      })
    });
  }

  async function handleOnEnded() {
    await fetch("/api/watch-lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        lessonId: lesson.id,
        moduleSlug: module,
        state: "completed",
        lastTime: 0
      })
    });

    router.refresh();
  }

  return (
    <>
      {hasWindow && (
        <ReactPlayer
          url={lesson.video_url}
          height="470px"
          controls
          onStart={handleOnStart}
          onEnded={handleOnEnded}
        />
      )}
    </>
  );
};

export default LessonVideo;
