<script lang="ts">
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import SiApplepodcasts from 'svelte-icons-pack/si/SiApplepodcasts';
  import Time from 'svelte-time';
  import { eachDayOfInterval, subYears } from 'date-fns';
  import type { PodcastEpisodeNotes, BookHighlights, Notes } from '../../xata';
  import PodcastImage from './PodcastImage.svelte';

  export let data;

  $: console.log(data);
</script>

<div class="m-4" />
