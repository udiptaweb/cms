<template>
	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
	    <div class="navbar-brand">
	      <span class="navbar-item" href="/">
	        <nuxt-link to="/">
		        <img src="~assets/logo.png" width="98" height="28">
		    </nuxt-link>
	      </span>

	      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleTopMenu">
	        <span aria-hidden="true"></span>
	        <span aria-hidden="true"></span>
	        <span aria-hidden="true"></span>
	      </a>
	    </div>
	    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active':showTopMenu}">
			<div class="navbar-start" v-if="showTopMenu">
				<a class="navbar-item">
				   <nuxt-link to="/admin/dashboard">Dashboard</nuxt-link>
				</a>
				<div class="navbar-item has-dropdown is-hoverable">
				    <a class="navbar-link" @click="toggleUserManagementMenu"> 
				      User Management
				    </a>

					<div class="navbar-dropdown" v-if="showUserManagementMenu">
					    <a class="navbar-item">
					      <router-link to="/admin/sub_employees">Sub Employees</router-link>
					    </a>
					    <a class="navbar-item">
					      <nuxt-link to="/admin/students">Students</nuxt-link>
					    </a>
					</div>
				</div>
				<div class="navbar-item has-dropdown is-hoverable">
				    <a class="navbar-link" @click="toggleFacultManagementMenu">
				      Faculty Management
				    </a>

					<div class="navbar-dropdown" v-if="showFacultyManagementMenu">
					    <a class="navbar-item">
					      <nuxt-link to="/admin/departments">Departments</nuxt-link>
					    </a>
					    <a class="navbar-item">
					      <nuxt-link to="/admin/semesters">Semesters</nuxt-link>
					    </a>
					    <a class="navbar-item">
					      <nuxt-link to="/admin/batches">Batches</nuxt-link>
					    </a>
					    <a class="navbar-item">
					      <nuxt-link to="/admin/faculty_members">Faculty Members</nuxt-link>
					    </a>
					</div>
				</div>
				<div class="navbar-item has-dropdown is-hoverable">
				    <a class="navbar-link" @click="toggleSettingsMenu">
				      Settings
				    </a>

					<div class="navbar-dropdown" v-if="showSettingsMenu">
					    <a class="navbar-item">
					      <nuxt-link to="/admin/settings/change_password">Change Password</nuxt-link>
					    </a>
					</div>
				</div>
			</div>

			<div class="navbar-end">
				<div class="navbar-item" v-if="$store.state.admin_user">
				  <div class="buttons">
				    <a class="button is-success is-light is-small is-rounded">
				        <span class="icon">
				          <i class="fa fa-user-circle" aria-hidden="true"></i>
				        </span>
				        <span>{{$store.state.admin_user.name}}</span>
				    </a>
				    <a class="button is-info is-light is-small is-rounded" @click="logout">
				      <span class="icon">
				        <i class="fa fa-power-off " aria-hidden="true"></i>
				      </span>
				    </a>
				  </div>
				</div>
			</div>
	    </div>
	 </nav> 
</template>
<script>
	export default{
		data(){
			return{
		        showTopMenu:false,
		        user:'',
		        showUserManagementMenu:false,
		        showFacultyManagementMenu:false,
		        showSettingsMenu:false,
		    }
		},
		methods:{
			toggleSettingsMenu(){
                this.showSettingsMenu = !this.showSettingsMenu;
			},
			toggleFacultManagementMenu(){
                this.showFacultyManagementMenu = !this.showFacultyManagementMenu;
			},
			toggleUserManagementMenu(){
                this.showUserManagementMenu = !this.showUserManagementMenu;
			},
			toggleTopMenu(){
		        this.showTopMenu=!this.showTopMenu;
		    },
		    logout(){
		    	this.$store.dispatch('resetTokenAdmin');
		    	this.$router.push('/admin/login');
		    }
		}
	}
</script>