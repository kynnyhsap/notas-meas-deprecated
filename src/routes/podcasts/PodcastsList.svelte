<script lang="ts">
  import { Podcasts } from '../../xata';

  export let podcasts: Podcasts[];
</script>

<div class="flex flex-col gap-4">
  {#each podcasts as podcast}
    <a href={`/podcasts/${podcast.id}`} class="p-4 border border-2 border-amber-300 rounded transition ease-in hover:border-amber-500 flex items-center gap-3">
      <div class="w-10 h-10 bg-gray-400 rounded"></div>
      <p class="truncate text-ellipsis">{podcast.title}</p>
    </a>
  {/each}
</div>



