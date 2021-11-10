<template>
  <nav class="box columns m-0 is-mobile is-centered p-0 my-1">
    <div class="column is-2 p-0">
      <span @click="$router.go(-1)"><i class="is-size-3 bi bi-arrow-left"></i></span>
      <!-- <i class="is-size-3 bi bi-chevron-up mx-2"></i> -->

    </div>
    <div class="column is-8 p-0">
      
      <div class="is-hoverable pt-1">
        <p class="control has-icons-right">
          <input
            class="input is-rounded"
            type="search"
            placeholder="Search..."
          />
          <span class="icon is-small is-right">
            <i class="bi bi-search"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="column is-2 p-0" @click="showMobileMenu = !showMobileMenu">
      <i class="is-size-3 bi bi-list" :class="{'bi-x':!showMobileMenu}" ></i>
    </div>
  </nav>

  <aside class="menu mt-1 box mb-0" :class="{'is-hidden':showMobileMenu}">
    <ul v-if="$store.state.isAuth === false" class="menu-list">
      <li>
        <span><router-link to="/signup" class="is-link">Sign Up</router-link></span>
        <span><router-link to="/login" class="is-link">Log in</router-link></span>
      </li>
      <li><router-link to="/">Main</router-link></li>
    </ul>
    <ul class="menu-list" v-else>
      <li>
        <router-link to="/" class="has-text-primary">Home</router-link>
      </li>     
      <li><a>Saves</a></li>
      <li><a>help</a></li>
      <li><a>logout</a></li>
    </ul>
  </aside>

</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      showMobileMenu:true,
      showMenu: false,
      showNotification: false,
    };
  },
};
</script>
