import axios from 'axios';

export default axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.YOUTUBE_API_KEY!}`,
  },
	params: {
		part: 'snippet',
		type: 'video',
		maxResults: 5,
    key: "me"
	},
});

export const searchYoutube = async (term: string) => {

  const responce = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCXdy_ytPM9bE4hP3_yt4grDMlWxznEUA4`, {
    params:{
      q: term,
      part: 'snippet',
      maxResults: 1,
      type: 'video',
      key: process.env.YOUTUBE_API_KEY!,
    }
  });
  const data = await responce.data;
  return data;
}