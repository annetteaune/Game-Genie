import { client } from "./client";

//hente alle spill i sanity
//kilde for imageurl:
//https://www.sanity.io/docs/presenting-images
export const fetchMyGames = async () => {
	const data = await client.fetch(
		`*[_type == "game"]{title, slug, apiid, _id, hoursplayed, image, "imageUrl": image.asset->url, genre->}`
	);
	return data;
};

//hente ett enkelt spill
export const fetchSanityGame = async (slug) => {
	const data = await client.fetch(
		`*[_type == "game" && slug.current == $slug]{title, slug, apiid, _id, hoursplayed, image, "imageUrl": image.asset->url, genre->}`,
		{ slug }
	);
	return data;
};


