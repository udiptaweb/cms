<template>
	<aside class="menu" style="position:sticky!important;">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/admin/dashboard">Dashboard</nuxt-link></li>
    </ul>
    <p class="menu-label">
      User Management
    </p>
    <ul class="menu-list">
      <li><router-link to="/admin/sub_employees">Sub Employees</router-link></li>
      <li><nuxt-link to="/admin/students">Students</nuxt-link></li>
    </ul>
    <p class="menu-label">
      Faculty Management
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/admin/departments">Departments</nuxt-link></li>
      <li><nuxt-link to="/admin/semesters">Semesters</nuxt-link></li>
      <li><nuxt-link to="/admin/batches">Batches</nuxt-link></li>
      <li><nuxt-link to="/admin/faculty_members">Faculty Members</nuxt-link></li>
    </ul>
    <p class="menu-label">
      Settings
    </p>
    <ul class="menu-list">
      <li><nuxt-link to="/admin/settings/change_password">Change Password</nuxt-link></li>
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
<style type="text/css">

</style>