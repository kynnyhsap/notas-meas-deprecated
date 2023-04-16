<script lang="ts">
  export let src: string | undefined | null;

  const defaultSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYYrforMkr144F0NYn1m8R3yQzJUWzkDhVQ&usqp=CAU';
</script>

<div>
  {#if src}
    <img {src} alt="Podcast image" class="image" />
  {:else}
    <img src={defaultSrc} alt="Podcast cover image" class="image" />
  {/if}
</div>

<style lang="postcss">
  .image {
    --size: 100px;

    @apply rounded border border-white;
    max-width: var(--size);
    max-height: var(--size);
    min-width: var(--size);
    min-height: var(--size);
  }
</style>
