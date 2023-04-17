<script lang="ts">
  import EpisodesThread from './EpisodeThread.svelte';
  import type { HydratedEpisode } from './+page.server';

  export let data: { feed: HydratedEpisode[] };
</script>

<div class="feed">
  {#each data.feed as episode}
    <EpisodesThread {episode} />
  {/each}
</div>

<style lang="postcss">
  .feed {
    @apply m-auto max-w-2xl;
  }

  @media screen and (min-width: 42rem) {
    .feed {
      @apply border-l border-r border-l-gray-500 border-r-gray-500;
    }
  }
</style>
