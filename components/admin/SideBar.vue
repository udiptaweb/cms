<template>
	<aside class="menu" style="position:sticky!important;">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li ><nuxt-link to="/admin/dashboard" class="side-menu-item"><span >Dashboard</span></nuxt-link></li>
    </ul>
    <p class="menu-label">
      User Management
    </p>
    <ul class="menu-list">
      <li><router-link to="/admin/sub_employees"  class="side-menu-item"><span>Sub Employees</span></router-link></li>
      <li><nuxt-link to="/admin/students" class="side-menu-item"><span >Students</span></nuxt-link></li>
    </ul>
    <p class="menu-label">
      Faculty Management
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/admin/departments" class="side-menu-item"><span >Departments</span></nuxt-link></li>
      <li><nuxt-link to="/admin/semesters" class="side-menu-item"><span >Semesters</span></nuxt-link></li>
      <li><nuxt-link to="/admin/batches" class="side-menu-item"><span >Batches</span></nuxt-link></li>
      <li><nuxt-link to="/admin/faculty_members" class="side-menu-item"><span >Faculty Members</span></nuxt-link></li>
    </ul>
    <p class="menu-label">
      Settings
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/admin/settings/change_password" class="side-menu-item"><span >Change Password</span></nuxt-link></li>
    </ul>
  </aside>
</template>
<script>
	export default{
		data(){
			return{
				viewManageTeam:false,
			}
		},
		methods:{
			toggleManageManageTeam(){
				this.viewManageTeam=!this.viewManageTeam;
			},
		}
	}
</script>
<style scoped>
.menu{
  color: #749FAA;
}
.side-menu-item{
  color: #749FAA;
  font-weight: 400;
}
.menu-label{
  color: #72ABE6;
}
</style>