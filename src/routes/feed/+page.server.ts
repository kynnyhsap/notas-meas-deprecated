import { xata } from '../../xata';

export const load = async () => {
  const feed = await xata.db.PodcastEpisodeNotes.sort('createdAt', 'desc')
    .select(['*', 'podcastEpisode.*', 'podcastEpisode.podcast.*'])
    .getMany();

  return {
    feed
  };
};
