<script lang="ts">
  export let src: string | undefined | null;

  const defaultSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsYYrforMkr144F0NYn1m8R3yQzJUWzkDhVQ&usqp=CAU';
</script>

<div>
  {#if src}
    <img {src} alt="Podcast cover image" class="image" />
  {:else}
    <img src={defaultSrc} alt="Podcast cover image" class="image" />
  {/if}
</div>

<style lang="postcss">
  .image {
    @apply rounded-full border border-white;
    max-width: 40px;
    max-height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
</style>
