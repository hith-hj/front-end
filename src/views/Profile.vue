<template>
  <div class="card">
    <div class="card-image ">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content p-1">
      <div class="media mb-1">
        <div class="media-content">
          <p class="title is-4">{{user.name}}</p>
          <p class="subtitle is-6 mb-0">{{user.email}}</p>
        </div>
      </div>
      <div class="content mb-1">
        <p class="title is-4" @click="logout()" >
          <i class="bi bi-door-closed"></i>
        </p>
      </div>
      <div class="content">
        some content about this fucker
        <br>
        <time datetime="2016-1-1" >{{user.created_at}}</time>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"profile",
  data(){
    return{
      id : '',
      user:{},
    }
  },
  beforeMount() {
    if(this.$route.params.id !== undefined ){
      this.id = this.$route.params.id;
    }else{
      this.id = this.$store.state.user;
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser(){
      let url = `user/${this.id}`;
      await axios.get(url)
      .then((res)=>{
        this.user = res.data.user;
        document.title = this.user.name + ' Profile';
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    async logout(){
      let url =`logout`;
      await axios.post(url)
      .then((res)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = '';
        this.$store.commit('removeToken');
        this.$store.commit('removeUser');
        this.$store.commit('setAuthMethod', 'login');
        this.$router.push('/');
      })
      .catch((err)=>{
        console.log(err);
      });
    },
  },
}
</script>
