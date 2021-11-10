<template>
  <div id="Footer" class="navbar is-fixed-bottom columns is-mobile m-0 is-hidden-desktop">
    <div class="column is-clickable is-size-4 box m-0"><i class="bi bi-search"></i> </div>  
    <div class="column is-clickable is-size-4 box m-0"><i class="bi bi-circle"></i> </div>  
    <div class="column is-clickable is-size-4 box m-0"><i class="bi bi-house"></i> </div>  
    <div class="column is-clickable is-size-4 box m-0"><i class="bi bi-star"></i> </div>  
    <div class="column is-clickable is-size-4 box"> <i class="bi bi-person"></i> </div>  
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scope> 
  #Footer{
    position: fixed;
    bottom:0;
    right: 0;
    left: 0;
  }
</style>
