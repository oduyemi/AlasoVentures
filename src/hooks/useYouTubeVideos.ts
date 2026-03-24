import { useEffect, useState } from "react";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

export const useYouTubeVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const data: Video[] = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  return videos;
};