<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<h5 class="is-size-5 dashboard-title">Dashboard</h5>
				<p class="dashboard-subtitle">Welcome to CMS Dashboard</p>
			</div>
		</div>
		<div class="columns is-centered">
			<div class="column is-3">
				<div class="card " style="border-radius: 5px;">
				    <div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-primary is-light">Students</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-primary" max="100" v-if="loading_students">10%</progress>
					  		<p class="count" v-else>{{students.length}}</p>
					  		<p class="card-subtitle">My Department Students</p>
					  	</div>
				    </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card " style="border-radius: 5px;">
				    <div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-link is-light">Assignments</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-primary" max="100" v-if="loading_assignments">10%</progress>
					  		<p class="count" v-else>{{assignments.length}}</p>
					  		<p class="card-subtitle">Assignments Created</p>
					  	</div>
				    </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card " style="border-radius: 5px;">
				    <div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-success is-light">Materials Uploaded</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-primary" max="100" v-if="loading_materials">10%</progress>
					  		<p class="count" v-else>{{materials.length}}</p>
					  		<p class="card-subtitle">Total Materials Uploaded</p>
					  	</div>
				    </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card " style="border-radius: 5px;">
				    <div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-info is-light">Notifications Created</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-primary" max="100" v-if="loading_notifications">10%</progress>
					  		<p class="count" v-else>{{notifications.length}}</p>
					  		<p class="card-subtitle">Total Notifications Created</p>
					  	</div>
				    </div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default{
	layout : 'FacultyLayout',
	middleware : 'facultyAuthenticate',
	data(){
		return{
			students:[],
			assignments:[],
			materials:[],
			notifications:[],
			loading_students:true,
			loading_assignments:true,
			loading_materials:true,
			loading_notifications:true,
		}
	},
	mounted(){
	  this.getDepartments();
      this.getBatches();
      this.getMyStudents();  
      this.getMyAssignments();
      this.getMaterials();
      this.getMyNnotifications();
	},
	methods:{
		async getDepartments(){
		    const departments = await this.$axios.$get(this.$store.state.api_url + '/departments');
            this.$store.commit('setDepartments', departments.departments);
		},
		async getBatches(){
		    const batches = await this.$axios.$get(this.$store.state.api_url + '/batches');
            this.$store.commit('setBatches', batches.batches);
		},
		async getMyStudents(){
			await this.$axios.$post(this.$store.state.api_url + '/faculty_members/students',{department_id : this.$store.state.faculty_user.department_id})
			.then((response) => {
				this.students = response.students;
				this.loading_students = false;
			});
		},
		async getMyAssignments(){
			await this.$axios.$post(this.$store.state.api_url + '/faculty_members/assignments',{facultyuser_id : this.$store.state.faculty_user.id})
			.then((response) =>{
				this.assignments = response.assignments;
				this.loading_assignments = false;
			});
            
		},
		async getMaterials(){
			await this.$axios.$post(this.$store.state.api_url + '/faculty_members/materials',{facultyuser_id : this.$store.state.faculty_user.id})
			.then((response) =>{
				this.materials = response.materials;
				this.loading_materials = false;
			});   
		},
		async getMyNnotifications(){
			await this.$axios.$post(this.$store.state.api_url + '/faculty_members/notifications',{facultyuser_id : this.$store.state.faculty_user.id})
			.then((response) =>{
				 this.notifications = response.notifications;
				 this.loading_notifications = false;
			});
		}
	}
}
</script>
<style scoped>
.bg-info{
	background-color: #4d80e4;
}
.dashboard-card-content{
	margin-top: 14px;
}
.dashboard-title{
	color: #50649C;
}
.dashboard-subtitle{
	color: #50649C;
}
.count{
	color: #7793B9;
	font-weight: 500;
}
.card-subtitle{
	color: #92A8CA;
	font-size: 14px;
}
.dashboard-title{
	color: #50649C;
}
.dashboard-subtitle{
	color: #50649C;
}
</style>