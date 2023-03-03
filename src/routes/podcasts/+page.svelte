<script lang="ts">
  import PodcastsList from "./PodcastsList.svelte";

  export let data: { podcasts: { title: string }[] };
</script>

<div class="p-4">
    <h1 class="text-2xl my-8 font-bold text-right">Podcasts</h1>
    <PodcastsList podcasts={data.podcasts} />
</div>