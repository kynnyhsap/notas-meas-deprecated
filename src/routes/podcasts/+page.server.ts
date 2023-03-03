import { xata } from '../../xata';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const podcasts = await xata.db.Podcasts.getAll();

	return {
		podcasts
	};
};
