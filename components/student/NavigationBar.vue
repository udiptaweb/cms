<template>
	<nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
	    <div class="navbar-brand">
	      <span class="navbar-item">
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
			<div class="navbar-start">
				<a class="navbar-item">
					<nuxt-link to="/student/dashboard">
				       <span class="has-text-weight-semibold">Home</span>
				    </nuxt-link>   
				</a>
				<a class="navbar-item">
					<nuxt-link to="/student/profile">
				       <span class="has-text-weight-semibold">Profile</span>
				    </nuxt-link>   
				</a>
				<a class="navbar-item">
					<nuxt-link to="/student/assignments">
				       <span class="has-text-weight-semibold">Assignments</span>
				    </nuxt-link>   
				</a>
				<a class="navbar-item">
					<nuxt-link to="/student/attendences">
				       <span class="has-text-weight-semibold">Attendences</span>
				    </nuxt-link>   
				</a>
				<a class="navbar-item">
					<nuxt-link to="/student/materials">
				       <span class="has-text-weight-semibold">Mateials</span>
				    </nuxt-link>   
				</a>
				<a class="navbar-item">
					<nuxt-link to="/student/settings">
				       <span class="has-text-weight-semibold">Settings</span>
				    </nuxt-link>   
				</a>
				
			</div>

			<div class="navbar-end">
				<div class="navbar-item" v-if="$store.state.auth_user">
				  <div class="buttons">
				    <a class="button is-success is-light is-small is-rounded">
				        <span class="icon">
				          <i class="fa fa-user-circle" aria-hidden="true"></i>
				        </span>
				        <span>{{$store.state.auth_user.name}}</span>
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
		    }
		},
		methods:{
			toggleTopMenu(){
		        this.showTopMenu=!this.showTopMenu;
		    },
		    logout(){
		    	this.$store.state.auth_user = '';
		    	this.$store.state.auth_token = '';
		    	this.$router.push('/');
		    }
		}
	}
</script>
<style scoped>

</style>