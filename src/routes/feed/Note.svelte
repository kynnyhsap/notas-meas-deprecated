<script lang="ts">
  import Time from 'svelte-time';
  import CopyIcon from './icons/CopyIcon.svelte';
  import CopiedIcon from './icons/CopiedIcon.svelte';

  export let note: {
    text: string;
    createdAt: number;
  };

  let copied = false;
  let copiedTimeoutId;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);

    if (!copiedTimeoutId) {
      copied = true;

      copiedTimeoutId = setTimeout(() => {
        copied = false;
        clearTimeout(copiedTimeoutId);
        copiedTimeoutId = null;
      }, 1500);
    }
  }
</script>

<div class="my-8" on:click={() => copyToClipboard(note.text)}>
  <div
    class="mx-4 px-4 border-l-2 border-l-gray-500 cursor-pointer flex justify-between"
    class:copied
  >
    <span>{note.text}</span>

    <span class="">
      {#if copied}
        <CopiedIcon />
      {:else}
        <CopyIcon />
      {/if}
    </span>
  </div>

  <div class="px-4 mx-4 my-2 text-sm text-gray-500 text-right">
    <Time format="MMM D, HH:mm" timestamp={note.createdAt} />
  </div>
</div>

<style lang="postcss">
  .copied {
    animation: copied-effect 1.5s ease-out;
  }

  @keyframes copied-effect {
    0% {
      @apply text-green-500;
    }
    100% {
      color: #cbd1d8;
    }
  }
</style>
