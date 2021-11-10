<!--<div
    class=" 
      fixed-top
      box
      columns
      is-multiline
      is-mobile 
      is-centered
      m-0
      p-0
      mb-1
    "
  >
    <div
      class="p-0 column is-1 is-hoverable"
      @click="showNotification = !showNotification"
    >
      <i class="bi bi-bell is-size-3"></i>
    </div>
    <div class="p-0 column is-8 mx-4">
      <div class="is-hoverable">
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
    <div class="p-0 column is-1 is-hoverable" @click="showMenu = !showMenu">
      <i class="bi bi-list is-size-3"></i>
    </div>
    <div
      class="column is-12 columns has-background-light m-0"
      v-if="showMenu || showNotification"
        >
      <div class="column is-12 " v-if="showMenu">menu</div>
      <div class="column is-12 " v-if="showNotification">Notification</div>
    </div>
  </div>-->