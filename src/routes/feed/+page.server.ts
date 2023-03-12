import { xata } from '../../xata';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const podcastEpisodeNotes = await xata.db.PodcastEpisodeNotes.sort('createdAt', 'desc').getAll();
	// const bookHighlights = await xata.db.BookHighlights.sort('createdAt').getAll();

	return {
		podcastEpisodeNotes
		// bookHighlights,
	};
};
