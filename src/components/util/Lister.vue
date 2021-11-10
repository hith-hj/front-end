<template>
  <div 
    v-for="(item, index) in list" 
    :key="item" 
    name="lister" 
    class="column p-1" 
    :class="index % 3 === 0 ? 'is-12' : ''">
    <div class="box p-0">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
      <div class="p-2">
        <div class="has-text-rightt">
          <p class="title is-size-4 mb-0"> <strong>{{item.name}}</strong> </p>
          <small class="subtitle is-size-7">username </small>
        </div>
        <div class="level is-mobile">
          <p class="has-text-gray"><i class="bi bi-share "></i> right</p>
          <p class="has-text-gray"><i class="bi bi-justify-left "></i> Rates</p>
          <p class="has-text-gray"><i class="bi bi-justify-left "></i> left</p>
        </div>
        <button 
          class="button is-info is-outlined is-fullwidth" 
          @click="$router.push(`/recipe/${item.name}`)">View</button>
      </div>
    </div>
  </div>      
   
</template>

<script>
export default {
  props:{
    list : [],
  },
}
</script>