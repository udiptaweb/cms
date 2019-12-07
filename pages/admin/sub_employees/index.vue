<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small" aria-label="breadcrumbs">
				  <ul class="has-text-weight-semibold">
				    <li><nuxt-link to="/admin/dashboard">Dashboard</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/admin/sub_employees">Sub Employees</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<div class="card">
					<div class="card-content">
						<div class="columns">
							<div class="column">
								<div class="tabs is-centered is-boxed is-small">
								  <ul>
								    <li :class="breadcrumb=='sub_emp'?'is-active':''">
								      <a @click="setBreadcrumb('sub_emp')">
								        <span class="icon is-small"><i class="fa fa-users" aria-hidden="true"></i></span>
								        <span class="has-text-weight-semibold">Sub Employees</span>
								      </a>
								    </li>
								    <li :class="breadcrumb=='create_new'?'is-active':''">
								      <a @click="setBreadcrumb('create_new')">
								        <span class="icon is-small"><i class="fa fa-user-circle" aria-hidden="true"></i></span>
								        <span class="has-text-weight-semibold">Create New</span>
								      </a>
								    </li>
								  </ul>
								</div>
							</div>
						</div>
						<div class="section" v-if="breadcrumb=='sub_emp'" style="margin-top: -50px;">
							<div class="columns">
								<div class="column">
									
								</div>
								<div class="column">
									
								</div>
								<div class="column">
									<div class="field">
									  <div class="control has-icons-left">
									    <input class="input is-small is-rounded" type="text" placeholder="Search here" v-model="search">
									    <span class="icon is-small is-left">
										   <i class="fa fa-search"></i>
										</span>
									  </div>
									</div>
								</div>
							</div>
							<div class="columns">
								<div class="column text-14">
									<div class="table-container" v-if="filteredEmployees.length>0">

										<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
										  <thead>
										    <tr>
										      <th>Name</th>
										      <th>Email</th>
										      <th>Password</th>
										      <th>Status</th>
										      <th>Action</th>
										    </tr>
										  </thead>
										  <tbody>
										    <tr v-for="employee in filteredEmployees">
										      <td><a href="#">{{employee.name}}</a></td>
										      <td>{{employee.email}}</td>
										      <td><span class="has-text-weight-semibold">{{employee.pw}}</span></td>
										      <td><button class="button is-outlined is-small" :class="employee.status==true?'is-success':'is-info'" @click="toggleEmployee(employee.id)">
										      	<span  v-if="employee.status==true">
										      		<span>Active</span>
													<span class="icon has-text-success">
													  <i class="fas fa-check-square"></i>
													</span>
												</span>
												<span v-else>
													<span>Disabled</span>
													<span class="icon has-text-danger">
													  <i class="fas fa-ban"></i>
													</span>
												</span>
										      </button></td>
										      <td>
										      	<button class="button is-outlined is-danger is-small" @click="removeEmployee(employee.id)">Delete</button>
										      </td>
										    </tr>
										  </tbody>
										</table>
									</div>
									<h6 v-else class="title is-6 has-text-centered">No Employees added</h6>
								</div>
							</div>
						</div>
						<div class="columns" v-if="breadcrumb=='create_new'" style="justify-content: center;">
							<div class="column is-centered is-6-tablet is-5-desktop is-4-widescreen">
								<div class="field">
								   <label class="label-text">Name</label>
								   <div class="control">
								    <input class="input is-small" type="text" placeholder="Name" v-model="create_employee.name">
								   </div>
								   <small class="has-text-danger" v-if="create_employee.errors.name">{{create_employee.errors.name}}</small>
								</div>
								<div class="field">
								   <label class="label-text">Email</label>
								   <div class="control">
								    <input class="input is-small" type="text" placeholder="Email" v-model="create_employee.email">
								   </div>
								   <small class="has-text-danger" v-if="create_employee.errors.email">{{create_employee.errors.email}}</small>
								</div>
								<div class="field">
					              <label for="" class="label-text">Password</label>
					              <div class="control has-icons-left">
					                <input type="password" placeholder="*******" class="input is-small" required v-model="create_employee.password">
					                <span class="icon is-small is-left">
					                  <i class="fa fa-lock"></i>
					                </span>
					              </div>
					              <small class="has-text-danger" v-if="create_employee.errors.password">{{create_employee.errors.password}}</small>
					            </div>
					            <div class="field is-grouped">
								  <div class="control">
								    <button class="button is-link is-small" :class="{'is-loading':create_employee.creating}" @click="createNewEmployee">CREATE</button>
								  </div>
								  <div class="control">
								    <button class="button is-link is-light is-small" @click="clearForm">CLEAR</button>
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
layout : 'AdminLayout',
middleware : 'adminAuthenticate',
data(){
	return{
		breadcrumb:'sub_emp',
		employees:[],
		search:'',
		create_employee:{
			name:'',
			email:'',
			password:'',
			creating:false,
			errors:[],
		}
	}
},
mounted(){
	this.getEmployees();
},
computed:{
	filteredEmployees(){
		return this.employees.filter(employee => {
           return employee.name.toLowerCase().includes(this.search.toLowerCase());
		});
	}
},
methods:{
	clearForm(){
		let employee = this.create_employee;
		employee.name='';
		employee.email='';
		employee.password='';
	},
	setBreadcrumb(breadcrumb){
        this.breadcrumb=breadcrumb;
	},
	async createNewEmployee(){
		let formData = new FormData();
		formData.append('name', this.create_employee.name);
		formData.append('email', this.create_employee.email);
		formData.append('password', this.create_employee.password);
		await this.$axios.$post(this.$store.state.api_url + '/employees/create',formData)
		.then((response) => {
			this.clearForm();
			this.$swal("Created !!","","success");
			this.getEmployees();
		})
		.catch((error) => {
			this.create_employee.errors = error.response.data;
		})
	},
	async getEmployees(){
        await this.$axios.$get(this.$store.state.api_url + '/employees')
        .then((response) => {
        	this.employees = response;
            this.breadcrumb = 'sub_emp';
        });
	},
	async toggleEmployee(id){
		await this.$axios.$post(this.$store.state.api_url + '/employees/toggleStatus',{id:id})
		.then((response) => {
			this.$swal("Updated Employee Status","","success");
			this.getEmployees();
		})
		.catch((response) => {
			this.$swal("Failed to Update Status", "" , "error");
		})
	},
	async removeEmployee(id){
		swal({
		  title: "Are you sure?",
		  text: "Once deleted, you will not be able to recover this Employee",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		    this.confirmRemoveEmployee(id);
		  } 
		});
	},
	async confirmRemoveEmployee(id){
        await this.$axios.$post(this.$store.state.api_url + '/employees/remove',{id:id})
        .then((response) => {
           this.getEmployees();
        })
        .catch((error) => {
        	this.$swal("Failed to delete!","","error");
        })
	}
},

}
</script>
<style scoped>
	.label-text{
		color: #92A8CA;
	    font-size: 14px;
	}
</style>
