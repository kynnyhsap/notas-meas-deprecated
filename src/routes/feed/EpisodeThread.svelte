<script lang="ts">
  import PodcastImage from './PodcastImage.svelte';
  import type { HydratedEpisode } from './+page.server';
  import Note from './Note.svelte';

  export let episode: HydratedEpisode;

  $: episodeTitle =
    episode.title.length > 100 ? episode.title.slice(0, 100) + '...' : episode.title;

  $: episodeNotes = episode.notes ?? [];
</script>

<div class="px-4 py-10 relative border-b border-b-gray-500">
  <div class="flex gap-4">
    <PodcastImage src={episode.podcast.image} />

    <div>
      <h2 class="font-bold text-md">{episodeTitle}</h2>
      <h3 class="text-sx text-gray-500">{episode.podcast.title}</h3>
    </div>
  </div>

  <ul>
    {#each episodeNotes as note}
      <li>
        <Note {note} />
      </li>
    {/each}
  </ul>
</div>
