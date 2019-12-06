<template>
	<aside class="menu" style="position:sticky!important;">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/faculty_members/dashboard">Dashboard</nuxt-link></li>
    </ul>
    <p class="menu-label">
      Activities
    </p>
    <ul class="menu-list">
      <li>
        <a  :class="{'is-active':assignmentsTab}" @click="toggleAssignmentsTab">Assignments <i class="fa fa-caret-right" aria-hidden="true"></i></a>
        <ul v-if="assignmentsTab">
          <li><nuxt-link to="/faculty_members/assignments">Assignments</nuxt-link></li>
          <li><nuxt-link to="/faculty_members/assignments/create">Create New</nuxt-link></li>
        </ul>
      </li>
      <li>
        <a  :class="{'is-active':materialsTab}" @click="toggleMaterialsTab">Class Materials <i class="fa fa-caret-right" aria-hidden="true"></i></a>
        <ul v-if="materialsTab">
          <li><nuxt-link to="/faculty_members/materials">Recent Uploads</nuxt-link></li>
          <li><nuxt-link to="/faculty_members/materials/upload">Upload</nuxt-link></li>
        </ul>
      </li>
    </ul>
    <p class="menu-label">
      Dept Notification
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/faculty_members/notifications">Recent Notifications</nuxt-link></li>
      <li><nuxt-link to="/faculty_members/notifications/create">Create New</nuxt-link></li>
    </ul>
    <p class="menu-label">
      ATTENDENCE
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/faculty_members/attendences">Attendences</nuxt-link></li>
      <li><nuxt-link to="/faculty_members/attendences/mark">Mark Attendence</nuxt-link></li>
    </ul>
    
  </aside>
</template>
<script>
	export default{
		data(){
			return{
        assignmentsTab:false,
        materialsTab:false,
			}
		},
		methods:{
			toggleAssignmentsTab(){
				this.assignmentsTab = !this.assignmentsTab;
			},
      toggleMaterialsTab(){
        this.materialsTab = !this.materialsTab;
      }
		}
	}
</script>
<style type="text/css">

</style>