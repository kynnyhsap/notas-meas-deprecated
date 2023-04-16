<script lang="ts">
  import Time from 'svelte-time';
  import PodcastImage from './PodcastImage.svelte';
  import { toast } from '@zerodevx/svelte-toast';
  import type { HydratedEpisode } from './+page.server';

  export let episode: HydratedEpisode;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);

    toast.push('Copied!', {
      duration: 1000,
      dismissable: false,
      theme: {
        '--toastColor': 'mintcream',
        '--toastBackground': 'rgba(72,187,120,1)',
        '--toastBarBackground': '#2F855A'
      }
    });
  }

  $: notesByDate = Object.entries(
    episode.notes.reduce((acc, note) => {
      const date = new Date(note.createdAt).getDate();
      acc[date] = acc[date] || [];

      acc[date].push(note);
      return acc;
    }, {} as Record<number, typeof episode.notes>)
  )
    .sort((a, b) => b[0] - a[0])
    .map(([date, notes]) => ({ date, notes }));

  $: episodeTitle =
    episode.title.length > 100 ? episode.title.slice(0, 100) + '...' : episode.title;
</script>

<div class="mx-4 my-10 relative">
  <div class="border border-gray-500 h-full w-0 absolute -z-10" style="left: 50px;" />

  <div class="flex gap-4">
    <PodcastImage src={episode.podcast.image} />

    <div>
      <h2 class="font-bold text-lg">{episodeTitle}</h2>
      <h3 class="text-sx text-gray-500">{episode.podcast.title}</h3>
    </div>
  </div>

  <ul class="ml-4">
    {#each notesByDate as { notes }}
      <span class="border-2 border-gray-500 rounded-full p-2 bg-black">
        <Time format="MMM D" timestamp={notes[0].createdAt} />
      </span>

      {#each notes as note}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          class="my-6 flex items-start gap-4 active:text-gray-500"
          on:click={() => copyToClipboard(note.text)}
        >
          <span class="border-2 border-gray-500 rounded-full p-2 bg-black">
            <Time format="HH:mm" timestamp={note.createdAt} />
          </span>

          <span class="mt-2.5">{note.text}</span>
        </li>
      {/each}
    {/each}
  </ul>
</div>
