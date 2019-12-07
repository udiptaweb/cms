<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small" aria-label="breadcrumbs">
				  <ul class="has-text-weight-semibold">
				    <li><nuxt-link to="/admin/dashboard">Dashboard</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/admin/students">Students</nuxt-link></li>
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
								<div class="field">
								  <div class="control">
								    <div class="select is-info  is-small">
								      <select v-model="department" @change="filterDepartment">
								      	<option >All Departments</option>
								        <option :value="department.id" v-for="department in $store.state.departments" v-if="department.status">{{department.title}}</option>
								      </select>
								    </div>
								  </div>
								</div>
							</div>
							<div class="column">
								<div class="field">
								  <div class="control">
								    <div class="select is-info  is-small">
								      <select v-model="batch" @change="filterBatch">
								      	<option>All Batches</option>
								        <option :value="batch.id" v-for="batch in $store.state.batches" v-if="batch.status">{{batch.title}}</option>
								      </select>
								    </div>
								  </div>
								</div>
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
								<div class="table-container" v-if="students.length>0">
									<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
									  <thead>
									    <tr>
									      <th>Name</th>
									      <th>Email</th>
									      <th>Department</th>
									      <th>Batch</th>
									      <th>Action</th>
									    </tr>
									  </thead>
									  <tbody>
									    <tr v-for="student in students">
									      <td><a href="#">{{student.name}}</a></td>
									      <td>{{student.email}}</td>
									      <td>{{getDepartment(student.department_id)}}</td>
									      <td>{{getBatch(student.batch_id)}}</td>
									      <td>
									      	<button class="button is-outlined is-danger is-small" @click="removeUser(student.id)">Delete</button>
									      </td>
									    </tr>
									  </tbody>
									</table>
								</div>
								<h5 v-else class="title is-5 has-text-centered">No Students</h5>
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
			all_students:[],
			filtered_students:[],
			search:'',
			department:'All Departments',
			batch:'All Batches',
		}
	},
	computed:{
		students(){
           return this.filtered_students.filter(student => {
           	 return student.name.toLowerCase().includes(this.search.toLowerCase()) || student.email.toLowerCase().includes(this.search.toLowerCase());
           });
		}
	},
	mounted(){
      this.getAllStudents();
	},
	methods:{
 		filterBatch(){
            if(this.batch == 'All Batches'){
            	this.filtered_students = this.all_students;
            }else{
            	this.filtered_students = this.all_students.filter(student => student.batch_id == this.batch);
            }
		},
		filterDepartment(){
			if(this.department == 'All Departments'){
				this.filtered_students = this.all_students;
			}else{
			    this.filtered_students = this.all_students.filter(student => student.department_id == this.department);	
			}
		},
		getBatch(id){
          return this.$store.state.batches.find(batch => batch.id == id).title;
		},
		getDepartment(id){
          return this.$store.state.departments.find(department => department.id == id).title;
		},
		async getAllStudents(){
            await this.$axios.$get(this.$store.state.api_url + '/students')
		    .then((response) => {
		       this.all_students = response.students;
		       this.filtered_students = response.students;
		    })
		    .catch((error) => {
		    })
		    .finally(() => {
             
		    });
		},
		removeUser(id){
	        swal({
			  title: "Are you sure?",
			  text: "Once deleted , You will not be able to recover again",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
			    this.confirmRemoveUser(id);
			  } 
			});
		},
		async confirmRemoveUser(id){
	        await this.$axios.$post(this.$store.state.api_url + '/students/remove',{id:id})
		    .then((response)=>{
		        this.all_students=response.students;
		        this.$swal("Deleted the student !","","success");
		    })
		    .catch((error)=>{
		    	this.$swal("Failed to delete !","","error");
		    });
		},
	}
}
</script>