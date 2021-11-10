<template>
  <div class="signup box my-1 p-0 scrollable" >
    <div class="mb-1 mt-3">
      <p class="title is-size-4 has-text-centered mb-1" @click="$router.push('/favorits')"><i class="bi bi-bookmark-star"></i> Best</p>
      <small class="subtitle has-text-primary is-size-7 ">Most Rated Recipes</small>
    </div>      
    
    <div v-if="recipes.length > 0" class="columns is-multiline is-variable is-1 m-0">
      <Lister :list = "recipes" />     
    </div>
    
    <div v-else>
      <div class="notification is-danger is-light p-0 m-1" v-if="!$store.state.isConnected" >
        <span class="p-0">No Connection !!</span>
      </div>
    </div>
  </div>
</template>

<script>
import Lister from '@/components/util/Lister';
export default {
  name:'Favorits',
  data(){
    return {
      recipes:[],
    }
  },
  components:{
    Lister,
  },
  computed: {
    connectionStat () {
      return this.$store.state.isConnected;
    }
  },
  watch:{
    connectionStat(status) {
      if(status){
        this.getRecipes();
      }
    }
  },
  mounted() {
    this.getRecipes();
  },
  methods:{
    async getRecipes(){
      this.$store.commit('setIsLoading',true);
      let url = `recipes/favorits`;
      await axios.get(url)
      .then((res)=>{
        this.recipes = res.data;
      })
      .catch((err)=>{
        console.log(err);
      });
      this.$store.commit('setIsLoading',false);
    },
  },
}
</script>
