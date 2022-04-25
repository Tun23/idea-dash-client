<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="Argon" title="Argon">
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Home',
            icon: 'ni ni-world text-primary',
            path: '/home',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Report',
            icon: 'ni ni-chart-pie-35 text-primary',
            path: '/report',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Category',
            icon: 'ni ni-book-bookmark text-blue',
            path: '/category',
          }"
        />
        <sidebar-item
          :link="{
            name: 'User',
            icon: 'fa fa-users text-blue',
            path: '/user',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Department',
            icon: 'ni ni-badge text-blue',
            path: '/department',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <slot />
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
  },
}
</script>
<style lang="scss"></style>
