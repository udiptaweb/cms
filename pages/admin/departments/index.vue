<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small" aria-label="breadcrumbs">
				  <ul  class="has-text-weight-semibold">
				    <li><nuxt-link to="/admin/dashboard">Dashboard</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/admin/departments">Departments</nuxt-link></li>
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
								    <li :class="breadcrumb=='departments'?'is-active':''">
								      <a @click="setBreadcrumb('departments')">
								        <span class="icon is-small"><i class="fa fa-building" aria-hidden="true"></i></span>
								        <span  class="has-text-weight-semibold">Departments</span>
								      </a>
								    </li>
								    <li :class="breadcrumb=='create_new'?'is-active':''">
								      <a @click="setBreadcrumb('create_new')">
								        <span class="icon is-small"><i class="fa fa-edit" aria-hidden="true"></i></span>
								        <span  class="has-text-weight-semibold">Create New Department</span>
								      </a>
								    </li>
								  </ul>
								</div>
							</div>
						</div>
						<div class="columns" v-if="breadcrumb=='departments'">
							<div class="column text-14">
								<div class="table-container" v-if="$store.state.departments.length>0">
									<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
									  <thead>
									    <tr>
									      <th>Department</th>
									      <th>Status</th>
									      <th>Action</th>
									    </tr>
									  </thead>
									  <tbody>
									    <tr v-for="department in $store.state.departments">
									      <td>
									      	<a href="#">{{department.title}}</a>
									      	<a>
									      	<span style="float: right;font-size: 12px;" @click="setInputId(department)"><i class="fa fa-edit" aria-hidden="true" ></i></span>
									        </a>
									      	<div class="field is-grouped" v-if="department.id==show_input_id">
											  <p class="control is-expanded">
											    <input class="input is-small" type="text" v-model="edit_department.title">
											  </p>
											  <p class="control">
											    <a class="button is-info is-small" @click="updateDepartment(department.id)">
											      Update
											    </a>
											  </p>
											</div>
									      </td>
									      <td><button class="button is-outlined is-small" :class="department.status==true?'is-success':department.status==false?'is-primary':''" @click="toggleDepartmentStatus(department.id)"><span v-if="department.status==true">Active</span><span v-if="department.status==false">Disabled</span></button></td>
									      <td>
									      	<button class="button is-outlined is-danger is-small" @click="removeDepartment(department.id)">Delete</button>
									      </td>
									    </tr>
									  </tbody>
									</table>
								</div>
								<h5 v-else class="title is-5 has-text-centered">No Department added</h5>
							</div>
						</div>
						<div class="columns" style="justify-content: center;" v-if="breadcrumb=='create_new'">
							<div class="column is-6-tablet is-5-desktop is-4-widescreen">
								<div class="field is-grouped">
								  <p class="control is-expanded">
								    <input class="input is-small" type="text" placeholder="Enter the title" v-model="department">
								  </p>
								  <p class="control">
								    <a class="button is-info is-small" :class="{'is-loading' : creating}" @click="createNewDepartment">
								      Create
								    </a>
								  </p>
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
	layout: 'AdminLayout',
	middleware : 'adminAuthenticate',
	data(){
		return{
			breadcrumb:'departments',
			department:'',
			show_input_id:'',
			edit_department:'',
			creating:false,
		}
	},

	methods:{
		setInputId(department){
			if(this.show_input_id!=department.id){
				this.show_input_id=department.id;
                this.edit_department=department;
			}else{
				this.show_input_id='';
                this.edit_department='';
			}
		},
		setBreadcrumb(breadcrumb){
	        this.breadcrumb=breadcrumb;
		},
		async updateDepartment(id){
            await this.$axios.$post(this.$store.state.api_url + '/departments/update',{id:id,title:this.edit_department.title})
		    .then((response)=>{
		        this.$store.dispatch('GET_DEPARTMENTS');
		        this.show_input_id='';
		        this.edit_department='';
		        this.$swal("Updated Department Title","","success");
		    })
		    .catch((error)=>{
		    	this.$swal("Failed to update !","","error");
		    });
		},
		async createNewDepartment(){
			this.creating = true;
            await this.$axios.$post(this.$store.state.api_url + '/departments/create',{title:this.department})
		    .then((response) => {
		        this.$swal("Created New Department!!","","success");
		        this.$store.dispatch('GET_DEPARTMENTS');
		        this.breadcrumb = 'departments';
		        this.department = '';
		    })
		    .catch((error)=>{
		    	this.creating = false;
		    	this.$swal("Failed to Create !!","","error");
		    })
		    .finally(()=>{
                this.creating = false;
		    });
		},
		removeDepartment(id){
	        swal({
			  title: "Are you sure?",
			  text: "Deleting Department will delete the subsequent Semesters and you will not be able to recover again",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
			    this.confirmRemoveDepartment(id);
			  } 
			});
		},
		async confirmRemoveDepartment(id){
            await this.$axios.$post(this.$store.state.api_url + '/departments/remove',{id:id})
		    .then((response)=>{
		        this.$store.dispatch('GET_DEPARTMENTS');
		    })
		    .catch((error)=>{
		    	this.$swal("Failed to delete","","error")
		    });
		},
		async toggleDepartmentStatus(id){
           await this.$axios.$post(this.$store.state.api_url + '/departments/toggleStatus',{id:id})
		    .then((response)=>{
		        this.$store.dispatch('GET_DEPARTMENTS');
		        this.$swal("Updated Status","","success");
		    })
		    .catch((error)=>{
		    })
		    .finally(()=>{

		    });
		},
	}
}
</script>