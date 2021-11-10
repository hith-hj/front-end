<template>
<h2>recipe</h2>   
  
</template>


<script>
export default {
  name:'Recipe',
  mounted() {
    console.log(this.$route.params.id);
  },
}
</script>