<script lang="ts">
  import EpisodesThread from './EpisodeThread.svelte';
  // import { swipe } from 'svelte-gestures';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import type { HydratedEpisode } from "./+page.server";

  function handleSwipe(event: any) {
    const { direction } = event.detail;

    const daysBefore = Number($page.url.searchParams.get('daysBefore') ?? 0);

    if (direction === 'left') {
      if (!daysBefore) {
        return;
      }

      goto(`?daysBefore=${daysBefore - 1}`);
    } else if (direction === 'right') {
      goto(`?daysBefore=${daysBefore + 1}`);
    }
  }

  export let data: { feed: HydratedEpisode[]};
</script>

<!--<div-->
<!--  use:swipe={{ timeframe: 300, minSwipeDistance: 60, touchAction: 'pan-y' }}-->
<!--  on:swipe={handleSwipe}-->
<!--&gt;-->

<div>
  {#each data.feed as episode}
    <EpisodesThread {episode} />
  {/each}
</div>
