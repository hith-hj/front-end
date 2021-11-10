<template>
  <div class="signup box my-1 p-0" >
    <div class="columns m-0 is-centered">
      <div class="column is-12 ">        
        <p class="title is-size-4 has-text-centered mb-1">Sign Up</p>
        <small class="subtitle has-text-primary is-size-7 ">Publish your own recipies</small>
        <div class="notification is-danger is-light" v-if="errors.length">
          <button class="delete" @click="errors = []"></button>
          <p v-for="err in errors" :key="err">{{err}}</p>
        </div>
        <form @submit.prevent="submitForm" class="mt-3">
          <div class="field is-hoverable">
            <p class="control has-icons-right">
              <input type="text" class="input is-rounded" v-model="username" placeholder="Name">
              <span class="icon is-small is-right">
                <i class="bi bi-person"></i>
              </span>
            </p>
          </div>
          <div class="field is-hoverable">
            <p class="control has-icons-right">
              <input type="text" class="input is-rounded" v-model="email" placeholder="Email">
              <span class="icon is-small is-right">
                <i class="bi bi-@">@</i>
              </span>
            </p>
          </div>
          <div class="field is-hoverable">
            <p class="control has-icons-right">
              <input type="password" class="input is-rounded" v-model="password" placeholder="Password">
              <span class="icon is-small is-right">
                <i class="bi bi-lock"></i>
              </span>
            </p>
          </div>
          <div class="field is-hoverable">
            <p class="control has-icons-right">
              <input type="password" class="input is-rounded" v-model="confirm" placeholder="Confirm Password">
              <span class="icon is-small is-right">
                <i class="bi bi-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-fullwidth is-outlined is-success is-rounded">Sign up</button>
            </div>
          </div>
          <hr class="has-text-primary m-1">
          <div class="field">
            <div class="control has-text-centered">
              <span class="is-link" @click="setAuthMethod()">Login</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'sign up',
  data(){
    return {
      username : '',
      email : '',
      password : '',
      confirm : '',
      errors : [],
    }
  },
  mounted() {
    document.title = window.$appName+' | Sign Up';
  },
  methods: {
      async submitForm(){
      this.errors = []
      if(this.username === ''){
        this.errors.push('Username Missing');
      }
      if(this.email === ''){
        this.errors.push('Email Missing');
      }
      if(this.password === ''){
        this.errors.push('Password Missing');
      }
      if(this.confirm !== this.password){
        this.errors.push('Password not matched');
      }
      if(this.errors.length > 0){
        return noti('fill info','is-danger');
      }
      this.$store.commit('setIsLoading',true);

      const fd = {
        username:this.username,
        email:this.email,
        password:this.password,
      }
      let url = `register`;
      await axios.post(url,fd)
      .then((res)=>{
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        this.$store.commit('setUser', user);
        this.$store.commit('setToken', token);
        this.$store.commit('setAuthMethod','profile');
        axios.defaults.headers.common['Authorization'] = 'token' + token;
        noti('logged in','is-primary');
      })
      .catch((err)=>{
        if(err.response){
          for(let proprity in err.response.data){
            if(typeof(err.response.data[proprity]) !== 'object' ){
              this.errors.push(`${proprity} : ${err.response.data[proprity]}`);
            }else{
              for(let prop in err.response.data[proprity]){
                this.errors.push(`${prop} : ${err.response.data[proprity][prop]}`);
              }
            }
          }
          console.log(JSON.stringify(err));
        }else if (err.message){
          this.errors.push('Somthing went wrong,Try again later');
          console.log(JSON.stringify(err.message));
        }
      });  
      this.$store.commit('setIsLoading',false);
    },
    setAuthMethod(){
      this.$store.commit('setAuthMethod','login');
    },
  },
}
</script>


