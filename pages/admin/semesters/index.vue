<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small" aria-label="breadcrumbs">
				  <ul  class="has-text-weight-semibold">
				    <li><nuxt-link to="/admin/dashboard">Dashboard</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/admin/semesters">Semesters</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<div class="tabs is-centered is-boxed is-small">
				  <ul>
				    <li :class="breadcrumb=='semesters'?'is-active':''">
				      <a @click="setBreadcrumb('semesters')">
				        <span class="icon is-small"><i class="fa fa-building" aria-hidden="true"></i></span>
				        <span class="has-text-weight-semibold">Semesters</span>
				      </a>
				    </li>
				    <li :class="breadcrumb=='create_new'?'is-active':''">
				      <a @click="setBreadcrumb('create_new')">
				        <span class="icon is-small"><i class="fa fa-edit" aria-hidden="true"></i></span>
				        <span  class="has-text-weight-semibold">Create New Semester</span>
				      </a>
				    </li>
				  </ul>
				</div>
			</div>
		</div>
		<div class="columns" v-if="breadcrumb=='semesters'">
			<div class="column">
				<div  v-if="$store.state.departments.length>0">
					<div class="columns">
						<div class="column text-14">
							<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
						    <thead>
							    <tr>
							      <th>Department</th>
							      <th>Status</th>
							      <th>Action</th>
							    </tr>
						    </thead>
						    <tbody >
							    <tr v-for="department in $store.state.departments">
							      <td>
							      	{{department.title}}
							      	
							      </td>
							      <td><button class="button is-outlined is-small" :class="department.status==true?'is-success':department.status==false?'is-primary':''"><span v-if="department.status==true">Active</span><span v-if="department.status==false">Disabled</span></button></td>
							      <td>
							      	<button class="button is-outlined is-link is-small" @click="viewSemesters(department)" :disabled="department.status==false? true : false">View</button>
							      </td>
							    </tr>
						    </tbody>
						</table>
						</div>
						<div class="column text-14" v-if="view_semesters">
							<p class="has-text-info has-text-centered text-18" >{{department.title}}</p>
							<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="department.semesters.length>0">
							    <thead>
								    <tr>
								      <th>Semester</th>
								      <th>Status</th>
								      <th>Action</th>
								    </tr>
							    </thead>
							    <tbody >
								    <tr v-for="semester in department.semesters">
								      <td>
								      	{{semester.title}}
								      	<a>
								      	<span style="float: right;font-size: 12px;" @click="setInputId(semester)"><i class="fa fa-edit" aria-hidden="true" ></i></span>
								        </a>
								      	<div class="field is-grouped" v-if="semester.id==show_input_id">
										  <p class="control is-expanded">
										    <input class="input is-small" type="text" v-model="edit_semester.title">
										  </p>
										  <p class="control">
										    <a class="button is-info is-small" @click="updateSemester(semester.id)">
										      Update
										    </a>
										  </p>
										</div>
								      </td>
								      <td><button class="button is-outlined is-small" :class="semester.status==true?'is-success':semester.status==false?'is-primary':''" @click="toggleSemesterStatus(semester.id)"><span v-if="semester.status==true">Active</span><span v-if="semester.status==false">Disabled</span></button></td>
								      <td>
								      	<button class="button is-outlined is-danger is-small" @click="removeSemester(semester.id)">Delete</button>
								      </td>
								    </tr>
							    </tbody>
							</table>
							<h5 v-else class="has-text-centered">No Semesters Added</h5>
						</div>
					</div>
				</div>
				<h5 v-else class="title is-5 has-text-centered">No Departments</h5>
			</div>
		</div>
		<div class="columns" style="justify-content: center;" v-if="breadcrumb=='create_new'">
			<div class="column is-6-tablet is-5-desktop is-4-widescreen">
				<div class="field">
				   <label class="label text-small">Semester</label>
				   <div class="control">
				    <input class="input is-small" type="text" placeholder="Semester" v-model="create_semester.title">
				   </div>
				   <small class="has-text-danger" v-if="create_semester.errors.title">{{create_semester.errors.title}}</small>
				</div>
				<div class="field">
	              <label for="" class="label text-small" >Select Department</label>
				  <div class="control">
				    <div class="select is-small" style="width: 100%;">
				      <select v-model="create_semester.department" style="width: 100%;">
				        <option v-for="department in $store.state.departments" :value="department.id">{{department.title}}</option>
				      </select>
				    </div>
				  </div>
				</div>
				<div class="field is-grouped">
				   <div class="control">
				     <button class="button is-link is-small" :class="{'is-loading':create_semester.creating}" @click="createNewSemester">CREATE</button>
				   </div>
				   <div class="control">
				     <button class="button is-link is-light is-small" @click="clearForm">CLEAR</button>
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
			breadcrumb:'semesters',
			semester:'',
			show_input_id:'',
			edit_semester:'',
			department:'',
			view_semesters: false,
			create_semester:{
				title:'',
				department:'',
				creating:false,
				errors:[],
			},
		}
	},
	methods:{
		setInputId(semester){
			if(this.show_input_id!=semester.id){
				this.show_input_id=semester.id;
                this.edit_semester=semester;
			}else{
				this.show_input_id='';
                this.edit_semester='';
			}
	      
		},
		setBreadcrumb(breadcrumb){
	        this.breadcrumb=breadcrumb;
		},
		viewSemesters(department){
          this.department = department;
          this.view_semesters = true;
		},
		clearForm(){
          this.create_semester.title='';
          this.create_semester.department='';
		},
		async updateSemester(id){
            await this.$axios.$post(this.$store.state.api_url + '/semesters/updateTitle',{id:id,title:this.edit_semester.title})
		    .then((response)=>{
		        this.$store.dispatch('GET_DEPARTMENTS');
		        this.show_input_id = '';
		        this.edit_semester = '';
		        this.view_semesters = false;
		        this.$swal("Updated the Semester title","","success");
		    })
		    .catch((error)=>{
		    	this.$swal("Failed to Update !","","error");
		    });
		},
		async createNewSemester(){
			this.creating=true;
            await this.$axios.$post(this.$store.state.api_url + '/semesters/create',{title:this.create_semester.title,department:this.create_semester.department})
		    .then((response)=>{
		        this.$store.dispatch('GET_DEPARTMENTS');
		        this.view_semesters = false;
		        this.breadcrumb='semesters';
		        this.semester='';
		        this.$swal("Added a new Semester!","","success");
		    })
		    .catch((error)=>{
		    	this.creating=false;
		    	this.$swal("Failed to create !","","error");
		    })
		    .finally(()=>{
               this.creating=false;
		    });
		},
		removeSemester(id){
	        swal({
			  title: "Are you sure?",
			  text: "Once deleted , You will not be able to recover again",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
			    this.confirmRemoveSemester(id);
			  } 
			});
		},
		async confirmRemoveSemester(id){
            await this.$axios.$post(this.$store.state.api_url + '/semesters/remove',{id:id})
		    .then((response)=>{
		        this.$store.dispatch('GET_DEPARTMENTS');
		        this.view_semesters = false;
		        this.department = '';
		        this.$swal("Deleted the Semester !","","success");
		    })
		    .catch((error)=>{
		    	this.$swal("Failed to delete!","","error");
		    });
		},
		async toggleSemesterStatus(id){
           await this.$axios.$post(this.$store.state.api_url + '/semesters/toggleStatus',{id:id})
		    .then((response)=>{
		        this.$store.dispatch('GET_DEPARTMENTS');
		        this.view_semesters = false;
		        this.$swal("Updated Semester status","","success");
		    })
		    .catch((error)=>{
		    	this.$swal("Failed to update !","","error");
		    })
		},
	}
}
</script>