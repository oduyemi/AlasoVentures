import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}&channelId=UCkpv621zOI-JPHpELZZYT5Q&part=snippet,id&order=date&maxResults=6`
    );

    const data = await response.json();
    if (!data.items) {
      console.error("YouTube API error:", data);
      return NextResponse.json([], { status: 200 }); 
    }

    const videos = data.items
      .filter((item: any) => item.id?.videoId)
      .map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
      }));

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json([], { status: 500 });
  }
}