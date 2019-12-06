<template>
	<section class="hero is-fullheight is-light">
		<section class="section-custom">
			<div class="columns is-centered">
				<div class="column is-9">
					<div class="card">
						<div class="card-content">
							<div class="columns">
								<div class="column is-4 ">
									<div class="media-left">
									    <figure class="image">
									      <img src="~assets/profile.png" alt="Placeholder image" v-if="$store.state.auth_user.gender == 'Male'" width="100%">
									      <img src="~assets/profile2.png" alt="Placeholder image" v-if="$store.state.auth_user.gender == 'Female'" width="100%">
									    </figure>
									</div>
								</div>
								<div class="column">
									<section class="section-buttons">
										<button class="button is-small is-fullwidth" @click="showForm">CHANGE PASSWORD</button>
									</section>
									<section class="section-buttons">
										<button class="button is-small is-fullwidth">DELETE ACCOUNT</button>
									</section>
								</div>
								<div class="column text-14">
									<section v-if="show_form">
										<div class="field">
										  <div class="control">
										    <span><small class="text-12 has-text-weight-semibold has-text-grey-light">OLD PASSWORD </small></span><input class="input is-success is-small" type="password" placeholder="Old Password" v-model="old_password">
										     <small class="has-text-danger text-12" v-if="old_password_error">{{old_password_error}}</small>
										  </div>
										</div>
										<div class="field">
										  <div class="control">
										    <span><small class="text-12 has-text-weight-semibold has-text-grey-light">NEW PASSWORD </small></span><input class="input is-success is-small" type="password" placeholder="New Password" v-model="new_password">
										     <small class="has-text-danger text-12" v-if="new_password_error">{{new_password_error}}</small>
										  </div>
										</div>
										<div class="field">
										  <div class="control">
										    <span><small class="text-12 has-text-weight-semibold has-text-grey-light">CONFIRM PASSWORD </small></span><input class="input is-small" :class="new_password == password_confirmation ? 'is-success' : new_password != password_confirmation ? 'is-danger' : ''" type="password" placeholder="Confirm Password" v-model="password_confirmation">
										     <small class="has-text-danger text-12" v-if="confirm_password_error">{{confirm_password_error}}</small>
										     <small class="has-text-danger text-12" v-if="errors.password">{{errors.password}}</small>
										  </div>
										</div>
										<div class="field">
									  <div class="control">
									    <button class="button is-link is-small is-fullwidth is-outlined" @click="changePassword">CHANGE</button>
									  </div>
									</div>
									</section>
								</div>
							</div>
						</div>
	
					</div>
				</div>
			</div>
		</section>	
	</section>		
</template>
<script>
	export default{
		layout : 'StudentLayout',
		middleware: 'userAuthenticated',
		data(){
			return{
			   old_password:'',
			   new_password:'',
			   password_confirmation:'',
			   old_password_error: '',
			   new_password_error: '',
			   confirm_password_error: '',	
			   ready:true,
			   errors:[],
			   show_form:false,
			}
		},
		mounted(){
			
		},
		computed:{
			
		},
		methods:{
			showForm(){
               this.show_form = !this.show_form;
			},
			validate(){
               if(!this.old_password){
               	this.old_password_error = 'Please enter your old Password';
               }else{
               	this.old_password_error = '';
               }
               if(!this.new_password){
               	this.new_password_error = 'Please enter the new Password';
               }else{
               	this.new_password_error = '';
               }
               if(!this.password_confirmation){
               	this.confirm_password_error = 'Please confirm your password';
               }else{
               	this.confirm_password_error = '';
               }
               if(!this.old_password || !this.new_password || !this.password_confirmation){
               	this.ready = false;
               }else{
               	this.ready = true;
               }
			},
			async changePassword(){
              this.validate(); 
              if(this.ready){
                let formData = new FormData;
                formData.append('old_password', this.old_password);
                formData.append('password', this.new_password);
                formData.append('id', this.$store.state.auth_user.id);
                await this.$axios.$post(this.$store.state.api_url + '/students/settings/change_password',formData)
                .then((response) => {
                	this.$swal("Updated password"," ","success");
                })
                .catch((error) =>{
                	this.errors = error.response.data;
                	if(error.response.data.message){
                      this.old_password_error = error.response.data.message;
                	}
                	this.$swal("Failed to change password","","error");
                })
              }
			}
		}
	}
</script>
<style scoped>

</style>