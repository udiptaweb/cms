<template>
	<aside class="menu" style="position:sticky!important;">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/faculty_members/dashboard" class="side-menu-item">Dashboard</nuxt-link></li>
    </ul>
    <p class="menu-label ">
      Activities
    </p>
    <ul class="menu-list">
      <li>
        <a  :class="{'is-active':assignmentsTab}" @click="toggleAssignmentsTab" class="side-menu-item">Assignments <i class="fa fa-caret-right" aria-hidden="true"></i></a>
        <ul v-if="assignmentsTab">
          <li><nuxt-link to="/faculty_members/assignments" class="sub-menu-item">Assignments</nuxt-link></li>
          <li><nuxt-link to="/faculty_members/assignments/create" class="sub-menu-item">Create New</nuxt-link></li>
        </ul>
      </li>
      <li>
        <a  :class="{'is-active':materialsTab}" @click="toggleMaterialsTab" class="side-menu-item">Class Materials <i class="fa fa-caret-right" aria-hidden="true"></i></a>
        <ul v-if="materialsTab">
          <li><nuxt-link to="/faculty_members/materials" class="sub-menu-item">Recent Uploads</nuxt-link></li>
          <li><nuxt-link to="/faculty_members/materials/upload" class="sub-menu-item">Upload</nuxt-link></li>
        </ul>
      </li>
    </ul>
    <p class="menu-label">
      Dept Notification
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/faculty_members/notifications" class="side-menu-item">Recent Notifications</nuxt-link></li>
      <li><nuxt-link to="/faculty_members/notifications/create" class="side-menu-item">Create New</nuxt-link></li>
    </ul>
    <p class="menu-label">
      ATTENDENCE
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/faculty_members/attendences" class="side-menu-item">Attendences</nuxt-link></li>
      <li><nuxt-link to="/faculty_members/attendences/mark" class="side-menu-item">Mark Attendence</nuxt-link></li>
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
<style scoped>
.side-menu-item{
  color: #5696F8;
  font-size: 14px;
}
.fa-caret-right{
  color: #5696F8;
}
.menu-label{
color: #749FAA;
}
.sub-menu-item{
  color: #749FAA;
  font-size: 14px;
}
</style>