import { xata } from '../../../xata';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const episodes = await xata.db.PodcastEpisodes.getAll();

	return {
		episodes
	};
};
