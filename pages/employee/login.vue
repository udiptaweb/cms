<template>
	<section class="hero is-link is-fullheight">
	  <div class="hero-body">
	    <div class="container">
	      <div class="columns is-centered">
	        <div class="column is-6-tablet is-5-desktop is-4-widescreen">
	        <h5 class="title is-5 has-text-centered">EMPLOYEE LOGIN</h5>
	        <div class="card">
	        	<div class="card-content">
		            <div class="field">
		                <article class="message is-danger" v-if="error">
		                  <div class="message-body">
                             {{error}}
		                  </div>
		                </article>
		              <label for="" class="label">Email</label>
		              <div class="control has-icons-left">
		                <input type="email" placeholder="e.g. username@gmail.com" v-model="email" class="input is-small" required>
		                <span class="icon is-small is-left">
		                  <i class="fa fa-envelope"></i>
		                </span>
		              </div>
		            </div>
		            <div class="field">
		              <label for="" class="label">Password</label>
		              <div class="control has-icons-left">
		                <input type="password" v-model="password" placeholder="*******" class="input is-small" required>
		                <span class="icon is-small is-left">
		                  <i class="fa fa-lock"></i>
		                </span>
		              </div>
		            </div>
		            <div class="field">
		              <div class="buttons">
		                <button class="button is-success is-small" :class="{'is-loading' : creating}" @click="logInStudent()">
		                  Login
		                </button>
		                <span><nuxt-link to="/register">Create New Account</nuxt-link></span>
		              </div>
		            </div>
		        </div>
	        </div>
	        </div>
	      </div>
	    </div>
	  </div>
	</section>
</template>
<script>
	export default{
		layout: 'Auth',
		data(){
			return{
               email:'',
               password:'',
               error:'',
               success:'',
               creating:false,
			}
		},
		methods:{
			async logInStudent(){
			this.creating = true;
			await this.$axios.$post( this.$store.state.api_url + '/employees/login', {
					email: this.email,
					password: this.password
				})
			    .then((response) => {
			    	let token = response.token;
			    	let user =response.user;
			    	this.$store.dispatch('setTokenEmployee',{token,user});
			    	this.$axios.defaults.headers.common['Authorization'] = response;
			    	this.$router.push('/');
				})
			    .catch((error) => {
			    	this.creating = false;
				    this.error = error.response.data.message;
				});
			},
		},
	}
</script>
