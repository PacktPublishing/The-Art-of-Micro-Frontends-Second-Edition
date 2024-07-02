<script>
  export let amount;
  export let location;
</script>

<div>
  {#if location === "Germany"}
    <span>
      <b>Yes</b> ({(parseFloat(amount) * 0.19).toFixed(2)} €)
    </span>
  {:else}
    <span>
      <b>No</b> (0 €)
    </span>
  {/if}
</div>

<style>
  div {
    border: 3px dashed orange;
  }
</style>
