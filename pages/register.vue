<template>
	<section class="hero is-fullheight is-light">
		<div class="hero-body">
			<div class="container">
			  <div class="columns is-centered">
			    <div class="column is-9">
			    <h5 class="title is-5 has-text-centered has-text-dark">REGISTRATION FORM</h5>
			        <div class="card">
	        	        <div class="card-content">
	        	        	<div class="columns">
	        	        		<div class="column">
	        	        			<div class="">
	        	        				<img src="~assets/registration.png" style="height: 218px;">
	        	        			</div>
	        	        			<div class="field">
							          <label for="" class="label">Name</label>
							          <div class="control has-icons-left">
							            <input type="text" placeholder="Name" v-model="name" class="input is-small" required>
							            <span class="icon is-small is-left">
							              <i class="fa fa-user"></i>
							            </span>
							          </div>
							            <small class="has-text-danger" v-if="errors.name">{{errors.name}}</small>
							        </div>
							        <div class="field">
							          <label for="" class="label">Email</label>
							          <div class="control has-icons-left">
							            <input type="email" placeholder="e.g. username@gmail.com" v-model="email" class="input is-small" required>
							            <span class="icon is-small is-left">
							              <i class="fa fa-envelope"></i>
							            </span>
							          </div>
							            <small class="has-text-danger" v-if="errors.email">{{errors.email}}</small>
							        </div>
							       
	        	        		</div>
	        	        		<div class="column" >
							        <div class="field">
							          <label for="" class="label text-small" >Select Batch</label>
							          <div class="control">
							            <div class="select is-small" style="width: 100%;">
							              <select  style="width: 100%;" v-model="batch">
							                <option :value="batch.id" v-for="batch in batches" v-if="batch.status">{{batch.title}}</option>
							              </select>
							            </div>
							          </div>
							          <small class="has-text-danger" v-if="errors.batch">{{errors.batch}}</small>
							        </div>
							        <div class="field">
							          <label for="" class="label text-small" >Select Department</label>
							          <div class="control">
							            <div class="select is-small" style="width: 100%;">
							              <select  style="width: 100%;" v-model="department">
							                <option :value="department" v-for="department in departments" v-if="department.status">{{department.title}}</option>
							              </select>
							            </div>
							          </div>
							          <small class="has-text-danger" v-if="errors.department">{{errors.department}}</small>
							        </div>
							        <div class="field">
							          <label for="" class="label text-small" >Select Semester</label>
							          <div class="control">
							            <div class="select is-small" style="width: 100%;">
							              <select  style="width: 100%;" v-model="semester">
							                <option :value="semester.id" v-for="semester in department.semesters" v-if="semester.status">{{semester.title}}</option>
							              </select>
							            </div>
							          </div>
							          <small class="has-text-danger" v-if="errors.department">{{errors.department}}</small>
							        </div>
							        <div class="field">
							          <label for="" class="label">Password</label>
							          <div class="control has-icons-left">
							            <input type="password" v-model="password" placeholder="*******" class="input is-small" required>
							            <span class="icon is-small is-left">
							              <i class="fa fa-lock"></i>
							            </span>
							          </div>
							            <small class="has-text-danger" v-if="errors.password">{{errors.password}}</small>
							        </div>
							        <div class="field">
							          <label for="" class="label">Confirm Password</label>
							          <div class="control has-icons-left">
							            <input type="password" v-model="password_confirmation" placeholder="*******" class="input is-small" required>
							            <span class="icon is-small is-left">
							              <i class="fa fa-lock"></i>
							            </span>
							          </div>
							        </div>
							        <div class="control">
									  <label class="radio">
									    <input type="radio" value="Male" v-model="gender">
									    Male
									  </label>
									  <label class="radio">
									    <input type="radio" value="Female" v-model="gender">
									    Female
									  </label>
									</div>
	        	        		</div>
	        	        	</div>
	        	        	<div class="columns">
	        	        		<div class="column">
	        	        			
	        	        		</div>
	        	        		<div class="column">
	        	        			<div class="field">
							          <div class="buttons">
							            <button class="button is-success is-small" :class="{'is-loading' : creating}" @click="registerUser">
							              Regsiter
							            </button>
							            <span><router-link to="/login">Have an Account ?</router-link></span>
							          </div>
							        </div>
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
		layout : 'Auth',
		data(){
			return{
				departments:[],
				batches:[],
				name:'',
				email:'',
				gender:'',
				department:'',
				batch:'',
				semester:'',
				password:'',
				password_confirmation:'',
				errors:'',
				creating:false,
			}
		},
		mounted(){
			this.getDepartments();
			this.getBatches();
		},
		methods:{
			async getDepartments(){
               let departments = await this.$axios.$get( this.$store.state.api_url + '/departments');
               this.departments = departments.departments;
			},
			async getBatches(){
              let batches = await this.$axios.$get(this.$store.state.api_url + '/batches');
              this.batches = batches.batches;
			},
			async registerUser(){
				this.creating = true;
				let formData = new FormData();
				formData.append('name', this.name);
				formData.append('email', this.email);
				formData.append('gender', this.gender);
				if(this.department){
				   formData.append('department', this.department.id);
				}
				formData.append('batch', this.batch);
				formData.append('semester', this.semester);
				formData.append('password', this.password);
				formData.append('password_confirmation', this.password_confirmation);
				await this.$axios.$post( this.$store.state.api_url + '/users/create',formData)
				.then((response) => {
                  this.$router.push('/login');
				})
				.catch((error) => {
					this.creating = false;
					this.errors = error.response.data;
				})

			}
		},
	}
</script>