<script>
  import '../app.css';

  import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<main>
  <SvelteToast />

  <slot />
</main>
