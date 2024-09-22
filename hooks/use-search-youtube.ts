import youtube, { searchYoutube } from '@/actions/youtube';
import {useState, useEffect} from 'react';
type Video = {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
}
const useVideos = (defaultSearchTerm: string) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
		search(defaultSearchTerm);
	}, [defaultSearchTerm]);

  const search = async (term: string) => {
		const data = await searchYoutube(term);
    
    const videos = data.items.map((video: any) => ({
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.default.url,
      publishedAt: video.snippet.publishedAt,
    }));

		setVideos(videos);
	};

  return {videos, search};
};

export default useVideos;