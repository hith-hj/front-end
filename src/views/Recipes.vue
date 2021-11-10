<template>
recipes    
  
</template>

<script>
export default {
  name:'Recipes',
  mounted() {
    console.log(this.$route.params);
    this.$store.commit('setIsLoading',false);
  },
  methods: {
    async getRecipes(){
      let url = 'recipes';
      await axios
        .post(url,this.$route.params.fields)
        .then((res) =>{

          this.$router.push(url);
          let data = res.data;
          console.log(data);
          return this.$store.commit('setIsLoading',false);
        })
        .catch((err) =>{
          for (let proprity in err.response.data) {
            if (typeof(err.response.data[proprity]) !== 'object') {
                this.errors.push(`${proprity} : ${err.response.data[proprity]}`);
            } else {
                for (let prop in err.response.data[proprity]) {
                  this.errors.push(`${prop} : ${err.response.data[proprity][prop]}`);
                }
            }
          }
          noti('Something went wrong','is-danger');
          return this.$store.commit('setIsLoading',false);
        });
    }
  },
}
</script>