<script lang="ts">

  const calculate = (bottom, top) =>
    bottom < top ?
      new Array(top - bottom).map((_, i) => bottom + i).filter(e => e % 2 === 0)
      : 0;
</script>

<div>notes</div>