<template>
  <div class="home scrollable">
    <div v-if="recipes.length === 0" class="box my-1 p-2">
      <h3 class="is-size-3 title has-text-centered">Rescolly</h3>
      <div class="notification is-danger is-light p-0" v-if="errors.length">
        <button class="delete is-small" @click="errors = []"></button>
        <p v-for="err in errors" :key="err" class="p-0">{{err}}</p>
      </div>
      <form id="ingredientsForm" @submit.prevent="submitForm" class="form">
        <div class="select is-rounded is-fullwidth" >
          <select name="type" class="input " >
            <option value="">Chose Type</option>
            <option v-for="cat in categories" :key="cat" 
            :value="cat.slug">{{cat.name}}</option>
            <option value="Random" >Randome</option>
          </select>
        </div>
        <div class="field my-1">
          <div id="ingInput" class="control">
            <input type="text" class="input is-rounded" name="ing_1" placeholder="ingredient">
          </div>
        </div>
        <button class="button is-outlined is-success is-fullwidth is-rounded mt-2" type="submit">Get Recipe</button>
      </form>
      <span class="is-size-6 has-text-danger is-hoverable" :class="{'is-hidden':groupEmpty}" @click="formReset()"> 
        <i class="bi bi-arrow-clockwise"></i> reset 
      </span>
      <span class="is-clickable is-hoverable has-text-info" @click="addIngrField()">
        <i class="bi bi-plus"></i> Add Ingredient
      </span>
    </div>
    <div v-else class="box my-1 p-2">
      <div class="mb-1 mt-3">        
        <p class="title is-size-4 has-text-centered mb-1">Recipes {{recipes.length}}</p>
        <small class="is-size-7 is-link" @click="reSearch()">Research</small>
      </div>
      <div class="columns is-multiline is-variable is-1 m-0 pb-4">
        <Lister :list = "recipes" />
        <button class="button is-info is-outline is-fullwidth">More</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Lister from '@/components/util/Lister'
export default {
  name:'Home',
  components :{
    Lister,
  },
  data(){
    return{
      groupEmpty:true,
      categories : [],
      errors:[],
      recipes : [],
    }
  },
  mounted() {
    document.title = window.$appName+' | Home';
    this.getCategory();
  },
  computed: {
    connectionStat () {
      return this.$store.state.isConnected
    }
  },
  watch:{
    connectionStat(status) {
      if(status){
        this.getCategory();
      }else{
        this.$store.commit('setIsConnected',false);
      }
    }
  },
  methods: {
    async getCategory(){
      this.$store.commit('setIsLoading',true);
      let url = `categories`;
      await axios.get(url)
            .then((res)=>{
              this.categories = res.data;
            })
            .catch((err)=>{
              console.log(err);
            })
      this.$store.commit('setIsLoading',false);
    },
    async submitForm(){
      this.errors = [];
      let fields = {};
      this.$store.commit('setIsLoading',true)
      let form = document.querySelector("#ingredientsForm");
      for(let i = 0 ; i < form.length ; i++){
        if(form[i].classList.contains('input')){
          if(form[i].value === ''){
            this.errors.push(`{ ${form[i].name} } is empty`);
          }else{
            fields[form[i].name] = form[i].value;
          }
        }
      }

      if(this.errors.length > 0){
        this.$store.commit('setIsLoading',false);
        return noti('Error','is-danger');
      }
      // form.reset();
      let url = 'recipes';
      await axios
        .post(url,fields)
        .then((res) =>{
          this.recipes = res.data;
          document.title = window.$appName+` | recipes for ${fields['ing_1']}`;
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
      return this.$store.commit('setIsLoading',false);
    },
    addIngrField(){
      this.groupEmpty = false;
      const group = document.querySelector("#ingInput");
      if(group && group.children.length < 5 ){
        let input = document.createElement("input");
        input.setAttribute('class','input is-rounded mt-1');
        input.setAttribute('type','text');
        input.setAttribute('name',`ing_${group.children.length + 1}`);
        input.setAttribute('placeholder',`ingredient ${group.children.length + 1}`);
        return group.appendChild(input); 
      }else{
        return noti(' 5 ingredient max ','is-danger');
      }
    },
    formReset(){
      this.groupEmpty = true;
      let group = document.querySelector("#ingInput");
      while (group.children.length > 1) {
          group.removeChild(group.children[1]);
      }
      return noti('Fields is Cleared','is-info');
    },
    reSearch(){
      this.recipes = [];
      document.title = window.$appName + ' | home'
    },
  },
}

</script>
