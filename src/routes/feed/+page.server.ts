import { xata } from '../../xata';
import type { PodcastEpisodeNotesRecord } from '../../xata';

export const load = async () => {
  const feed = await getHydratedEpisodes();

  return { feed };
};

async function getHydratedEpisodes() {
  const hydratedNotes = await xata.db.PodcastEpisodeNotes.sort('createdAt', 'desc')
    .select(['*', 'podcastEpisode.*', 'podcastEpisode.podcast.*'])
    .getAll();

  const flattened = hydratedNotes.map(flatHydratedNote).filter(Boolean);

  return Object.values(
    flattened.reduce((episodes, flattenedNote) => {
      if (!flattenedNote) {
        return episodes;
      }

      const {
        episodeId,
        episodeTitle,
        text,
        createdAt,
        podcastTitle,
        podcastId,
        podcastImage,
        id
      } = flattenedNote;

      if (episodeId in episodes) {
        if (!episodes[episodeId].notes) {
          episodes[episodeId].notes = [];
        }

        episodes[episodeId].notes.push({
          id,
          text,
          createdAt
        });
      } else {
        episodes[episodeId] = {
          id: episodeId,
          title: episodeTitle,
          podcast: {
            id: podcastId,
            title: podcastTitle,
            image: podcastImage
          },
          notes: [
            {
              id,
              text,
              createdAt
            }
          ]
        };
      }

      return episodes;
    }, {} as Record<string, HydratedEpisode>)
  );
}

function flatHydratedNote(hydratedNote: PodcastEpisodeNotesRecord): null | FlatHydratedNote {
  if (!hydratedNote || !hydratedNote.podcastEpisode || !hydratedNote.podcastEpisode.podcast) {
    return null;
  }

  return {
    id: hydratedNote.id,
    text: hydratedNote.text as string,
    createdAt: hydratedNote.createdAt as never as string,

    episodeId: hydratedNote.podcastEpisode.id as string,
    episodeTitle: hydratedNote.podcastEpisode.title as string,

    podcastId: hydratedNote.podcastEpisode.podcast.id as string,
    podcastTitle: hydratedNote.podcastEpisode.podcast.title as string,
    podcastImage: hydratedNote.podcastEpisode.podcast.image as string
  };
}

type FlatHydratedNote = {
  id: string;
  text: string;
  createdAt: string;

  episodeTitle: string;
  episodeId: string;

  podcastId: string;
  podcastTitle: string;
  podcastImage?: string;
};

export type HydratedEpisode = {
  id: string;
  title: string;
  podcast: {
    id: string;
    title: string;
    image?: string;
  };
  notes: {
    id: string;
    text: string;
    createdAt: string;
  }[];
};
