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
									<div class="field">
									  <div class="control">
									    <span><small class="text-12 has-text-weight-semibold has-text-grey-light">Name  </small></span><input class="input is-success is-small" type="text" placeholder="Name" v-model="name">
									    <small class="has-text-danger text-12" v-if="name_error">Name can not be null</small>
									  </div>
									</div>
									<div class="field">
									  <div class="control">
									    <span><small class="text-12 has-text-weight-semibold has-text-grey-light">Email  </small></span><input class="input is-success is-small" type="text" placeholder="Email" v-model="email">
									    <small class="has-text-danger text-12" v-if="email_error">Email can not be null</small>
									  </div>
									</div>
									<div class="field">
										<div class="control">
										  <span><small class="text-12 has-text-weight-semibold has-text-grey-light">Gender  </small></span><br>
										  <label class="radio text-12">
										    <input type="radio" name="foobar" value="Male" v-model="gender">
										    Male
										  </label>
										  <label class="radio text-12">
										    <input type="radio" name="foobar" value="Female" v-model="gender">
										    Female
										  </label>
										</div>
									</div>
								</div>
								<div class="column text-14">
									<div class="field">
									  <div class="control">
									  	<span><small class="text-12 has-text-weight-semibold has-text-grey-light">Batch </small></span>
									    <div class="select is-success is-small" style="width: 100%;">
									      <select style="width: 100%;" v-model="batch">
									        <option v-for="batch in $store.state.batches" :value="batch">{{batch.title}}</option>
									      </select>
									    </div>
									  </div>
									</div>
	                                <div class="field">
									  <div class="control">
									  	<span><small class="text-12 has-text-weight-semibold has-text-grey-light">Department  </small></span>
									    <div class="select is-success is-small" style="width: 100%;">
									      <select style="width: 100%;" v-model="department">
									        <option v-for="department in $store.state.departments" :value="department" >{{department.title}}</option>
									      </select>
									    </div>
									  </div>
									</div>
									<div class="field">
									  <div class="control">
									  	<span><small class="text-12 has-text-weight-semibold has-text-grey-light">Semester  </small></span>
									    <div class="select is-success is-small" style="width: 100%;">
									      <select style="width: 100%;" v-model="semester">
									        <option v-for="semester in department.semesters" :value="semester">{{semester.title}}</option>
									      </select>
									    </div>
									  </div>
									</div>
									<div class="field">
									  <div class="control">
									    <button class="button is-link is-small is-fullwidth is-outlined" @click="saveProfileDetails">SAVE</button>
									  </div>
									</div>
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
				name:'',
				email:'',
				gender:'',
				department:'',
				semester:'',
				batch:'',
				name_error:false,
				email_error:false,
			}
		},
		mounted(){
			this.getUserData();
		},
		computed:{
			myDepartment(){
				return this.$store.state.departments.find(department => department.id== this.$store.state.auth_user.department_id);
			},
			mySemester(){
				return this.myDepartment.semesters.find(semester => semester.id == this.$store.state.auth_user.semester_id);
			},
			myBatch(){
				return this.$store.state.batches.find(batch => batch.id == this.$store.state.auth_user.batch_id);
			}
		},
		methods:{
			validate(){
               if(!this.name){
					this.name_error = true;
				}else{
					this.name_error = false;
				}
				if(!this.email){
					this.email_error = true;
				}else{
					this.email_error = false;
				}
			},
			async saveProfileDetails(){
				this.validate();
				if(!this.name_error && !this.email_error){
					let formData = new FormData();
	                if(this.name != this.$store.state.auth_user.name){
	                	 formData.append('name', this.name);
	                }
	                if(this.email != this.$store.state.auth_user.email){
	                	formData.append('email', this.email);
	                }
	                if(this.gender != this.$store.state.auth_user.gender){
	                	formData.append('gender', this.gender);
	                }
	                if(this.department.id != this.$store.state.auth_user.department_id){
	                	formData.append('department', this.department.id);
	                }
	                if(this.semester.id != this.$store.state.auth_user.semester_id){
	                	formData.append('semester', this.semester.id);
	                }
	                if(this.batch.id != this.$store.state.auth_user.batch_id){
	                	formData.append('batch', this.batch.id);
	                }
	                formData.append('id', this.$store.state.auth_user.id);
	                await this.$axios.$post(this.$store.state.api_url + '/students/profile/update',formData)
	                .then((response) => {
	                	this.$store.dispatch('resetAuthUser' , response.user);
	                	this.$swal("Updated Profile","","success");
	                })
	                .catch((error) => {
	                	this.$swal("Failed to update", " ", "error");
	                })
	            }
                  
			}, 
			getUserData(){
				this.name = this.$store.state.auth_user.name;
				this.email = this.$store.state.auth_user.email;
				this.gender = this.$store.state.auth_user.gender;
				this.department = this.myDepartment;
				this.semester = this.mySemester;
				this.batch = this.myBatch;
			}
		}
	}
</script>
<style scoped>
.input{
	border-top: 0px;
	border-left: 0px;
	border-right: 0px;
	box-shadow: none;
}
.input:focus{
	box-shadow: none;
}
.intro{
	margin-top: 16px;
}	
.bg-profile{
	background-color: #4d80e4;
}
.danger{
	color: #fe6845;
}
</style>