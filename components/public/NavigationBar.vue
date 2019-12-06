<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
	    <div class="navbar-brand">
	      <span class="navbar-item">
	        <nuxt-link to="/">
		        <img src="~assets/logo.png" width="90" height="22">
		    </nuxt-link>
	      </span>

	      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleTopMenu">
	        <span aria-hidden="true"></span>
	        <span aria-hidden="true"></span>
	        <span aria-hidden="true"></span>
	      </a>
	    </div>
	    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active':showTopMenu}">
			<div class="navbar-start">
				<li class="navbar-item">
					<nuxt-link to="/">
				       Home
				    </nuxt-link>   
				</li>
				<li class="navbar-item">
					<nuxt-link to="/student/dashboard">
				      Student Panel
				    </nuxt-link>
				</li>
				<li class="navbar-item">
					<nuxt-link to="/faculty_members/dashboard">
				       Faculty Panel
				    </nuxt-link>
				</li>
				<li class="navbar-item">
					<nuxt-link to="/faculty_members/dashboard">
					   Gallery
					</nuxt-link>
				</li>
				<div class="navbar-item has-dropdown is-hoverable">
				    <a class="navbar-link" @click="showFacultiesMenu">
				     <span class="has-text-dark has-text-weight-medium">Faculties</span>
				    </a>

					<div class="navbar-dropdown" v-if="show_faculties_menu">
					    <div class="columns">
					      <div class="column">
					        <h5 class="navbar-item is-size-6 has-text-weight-medium">Bachelor of Science</h5>
					        <a class="navbar-item">
					          Mathematics
					        </a>
					        <a class="navbar-item">
					          Physics
					        </a>
					        <a class="navbar-item">
					          Chemistry
					        </a>
					        <a class="navbar-item">
					          Biology
					        </a>
					      </div>
					      <div class="column">
					        <h5 class="navbar-item is-size-6 has-text-weight-medium">Engineering</h5>
					        <a class="navbar-item">
					          Mechanical 
					        </a>
					        <a class="navbar-item">
					          Civil
					        </a>
					        <a class="navbar-item">
					          Electrical
					        </a>
					        <a class="navbar-item">
					          Computer Science
					        </a>
					      </div>
					      <div class="column">
					        <h5 class="navbar-item is-size-6 has-text-weight-medium">Bachelor of Arts</h5>
					        <a class="navbar-item">
					          Assamese
					        </a>
					        <a class="navbar-item">
					          History
					        </a>
					        <a class="navbar-item">
					          Geography
					        </a>
					        <a class="navbar-item">
					          Philosophy
					        </a>
					      </div>
					    </div>
					</div>
				</div>
				<div class="navbar-item has-dropdown is-hoverable">
				    <a class="navbar-link" @click="showSocitiesMenu">
				      <span class="has-text-dark has-text-weight-medium">Societies</span>
				    </a>

					<div class="navbar-dropdown" v-if="show_socities_menu">
					    <a class="navbar-item">
					      Cutural Society
					    </a>
					    <a class="navbar-item">
					      Hobby Club
					    </a>
					</div>
				</div>
			</div>

			<div class="navbar-end">
				<div class="navbar-item" >
				  <div class="buttons">
				  	<a class="button is-secondary is-light is-small is-rounded" v-if="$nuxt.isOffline">
				  		<span class="icon">
				          <i class="fas fa-wifi" aria-hidden="true" style="color: red;"></i>
				        </span>
				        <span>Offline</span>
				    </a>
				    <a class="button is-secondary is-light is-small is-rounded" v-else>
				  		<span class="icon">
				          <i class="fas fa-wifi" aria-hidden="true" style="color:green;"></i>
				        </span>
				        <span>Online</span>
				    </a>
				    <a class="button is-info is-light is-small is-rounded" v-if="$store.state.auth_user">
				        <span class="icon">
				          <i class="fa fa-user-circle" aria-hidden="true"></i>
				        </span>
				        <span>{{$store.state.auth_user.name}}</span>
				    </a>
				    <a class="button is-warning is-light is-small is-rounded" @click="logout" v-if="$store.state.auth_user">
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
		        show_faculties_menu:false,
		        show_socities_menu:false,
		    }
		},
		methods:{
			showFacultiesMenu(){
               this.show_faculties_menu = !this.show_faculties_menu;
			},
			showSocitiesMenu(){
               this.show_socities_menu = !this.show_socities_menu;
			},
			toggleTopMenu(){
		        this.showTopMenu=!this.showTopMenu;
		    },
		    logout(){
		    	this.$store.state.auth_user = '';
		    	this.$store.state.auth_token = '';
		    }
		}
	}
</script>
<style scoped>

</style>