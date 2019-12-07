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
				<li class="navbar-item">
					<nuxt-link to="/faculty_members/dashboard">
				       Dashboard
				    </nuxt-link>
                </li>
				<div class="navbar-item has-dropdown is-hoverable">
				    <a class="navbar-link" @click="toggleAssignmentsMenu">
				      Assignments
				    </a>

					<div class="navbar-dropdown" v-if="showAssignmentsMenu">
					    <a class="navbar-item">
					      <nuxt-link to="/faculty_members/assignments">Assignments</nuxt-link>
					    </a>
					    <a class="navbar-item">
					     <nuxt-link to="/faculty_members/assignments/create">Create New</nuxt-link>
					    </a>
					</div>
				</div>
				<div class="navbar-item has-dropdown is-hoverable">
				    <a class="navbar-link" @click="toggleAttendencesMenu">
				      Attendence
				    </a>

					<div class="navbar-dropdown" v-if="showAttendencesMenu">
					    <a class="navbar-item">
					      <nuxt-link to="/faculty_members/attendences">Attendences</nuxt-link>
					    </a>
					    <a class="navbar-item">
					      <nuxt-link to="/faculty_members/attendences/mark">Mark Attendence</nuxt-link>
					    </a>
					</div>
				</div>
				<div class="navbar-item has-dropdown is-hoverable" @click="toggleMaterialsMenu">
				    <a class="navbar-link">
				      Class Materials
				    </a>

					<div class="navbar-dropdown" v-if="showMaterialsMenu">
					    <a class="navbar-item">
					      <nuxt-link to="/faculty_members/materials">Recent Uploads</nuxt-link>
					    </a>
					    <a class="navbar-item">
					      <nuxt-link to="/faculty_members/materials/upload">Upload</nuxt-link>
					    </a>
					</div>
				</div>
				<div class="navbar-item has-dropdown is-hoverable" @click="toggleNotificationsMenu">
				    <a class="navbar-link">
				      Notifications
				    </a>

					<div class="navbar-dropdown" v-if="showNotificationsMenu">
					    <a class="navbar-item">
					      <nuxt-link to="/faculty_members/notifications">Recent Notifications</nuxt-link>
					    </a>
					    <a class="navbar-item">
					      <nuxt-link to="/faculty_members/notifications/create">Create New</nuxt-link>
					    </a>
					</div>
				</div>
			</div>

			<div class="navbar-end">
				<div class="navbar-item" v-if="$store.state.faculty_user">
				  <div class="buttons">
				    <a class="button is-success is-light is-small is-rounded">
				        <span class="icon">
				          <i class="fa fa-user-circle" aria-hidden="true"></i>
				        </span>
				        <span>{{$store.state.faculty_user.name}}</span>
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
		        showAssignmentsMenu:false,
		        showAttendencesMenu:false,
		        showMaterialsMenu:false,
		        showNotificationsMenu:false,
		    }
		},
		methods:{
			toggleNotificationsMenu(){
               this.showNotificationsMenu = !this.showNotificationsMenu;
			},
			toggleMaterialsMenu(){
               this.showMaterialsMenu = !this.showMaterialsMenu;
			},
			toggleAttendencesMenu(){
               this.showAttendencesMenu = !this.showAttendencesMenu;
			},
			toggleAssignmentsMenu(){
               this.showAssignmentsMenu = !this.showAssignmentsMenu;
			},
			toggleTopMenu(){
		        this.showTopMenu=!this.showTopMenu;
		    },
		    logout(){
		    	this.$store.dispatch('resetTokenFaculty');
		    	this.$router.push('/faculty_members/login');
		    }
		}
	}
</script>
<style scoped>
.item-hover:hover{
  background-color: Tomato!important;
}
.navbar{
	
}
</style>