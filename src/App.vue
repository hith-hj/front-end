<template>
  <div id="MainApp" class="columns is-desktop is-multiline m-auto">
    
    <div class="column is-3 p-1 is-hidden-touch ">
      <Favorits v-on:reConnect="checkConnection()"/>
      <div class="has-background-info mt-2 has-text-white">Add here</div>
    </div>
    <div class="column is-6 p-1">
      <div class="notification is-danger p-0 my-1" v-if="!$store.state.isConnected" >
        <span class="p-0">No Connection !! 
          <span @click="checkConnection()" class="is-link"> <i class="bi bi-arrow-clockwise"></i> Refresh</span>
        </span>
      </div>
      <Nav />
      <div
        class="is-loading-bar has-text-centered"
        :class="{ 'is-loading' : $store.state.isLoading }" >
        <div class="lds-dual-ring"></div>
      </div>
      <section class="section p-0" >
        <router-view />
      </section>
    </div>
    <div class="column is-3 p-1 is-hidden-touch ">
      <div v-if="$store.state.authMethod === 'signup' ">
        <Signup />
      </div>
      <div v-else-if="$store.state.authMethod === 'login' ">
        <Login />
      </div>
      <div v-else>
        <Profile  />
      </div>
      <small class="is-size-7" >All right Recirved <strong>Rescoly</strong> &copy; 2022</small>
    </div>
    <Footer /> 
    
  </div>
</template>

<script>
import Nav from "@/components/util/Nav";
import Footer from "@/components/util/Footer";
import Favorits from '@/views/Favorits';
import Profile from '@/views/Profile';
import Signup from '@/views/Signup';
import Login from '@/views/Login';
export default {
  name: "App",
  components: {
    Nav,
    Footer,
    Favorits,
    Profile,
    Signup,
    Login,
  },
  data(){
    return {
      id:'',
    }
  },
  beforeCreate() {
    this.$store.commit('initStore');
    const token = this.$store.state.token;
    this.id = this.$store.state.user;
    if(token){
      axios.defaults.headers.common['Authorization'] = 'token'+token;
    }else{
      axios.defaults.headers.common['Authorization'] = '';
    }
  },
  mounted() {
    this.checkConnection();
  },
  methods: {
    async checkConnection(){
      this.$store.commit('setIsLoading',true);
      let url = `categories`;
      await axios.get(url)
            .then((res)=>{
              this.$store.commit('setIsConnected',true);
            })
            .catch((err)=>{
              console.log(err);
              this.$store.commit('setIsConnected',false);
            });   
      this.$store.commit('setIsLoading',false);
    },
  },
};
</script>

<style lang="scss">
  @import '../node_modules/bulma';
</style>