<script lang="ts">
  import Time from 'svelte-time';
  import PodcastImage from './PodcastImage.svelte';
  import type { HydratedEpisode } from './+page.server';

  export let episode: HydratedEpisode;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  $: episodeTitle =
    episode.title.length > 100 ? episode.title.slice(0, 100) + '...' : episode.title;
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
    {#each episode.notes as note}
      <li class="my-8" on:click={() => copyToClipboard(note.text)}>
        <div class="mx-4 px-4 border-l-2 border-l-gray-500 note-text">
          <span>{note.text}</span>
        </div>

        <div class="m-2 text-sm text-gray-500 text-right">
          <Time format="MMM D, HH:mm" timestamp={note.createdAt} />
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .note-text:active {
    animation: copied-effect 0.5s ease-out;
  }

  @keyframes copied-effect {
    0% {
      color: white;
    }
    80% {
      color: forestgreen;
    }
  }
</style>
