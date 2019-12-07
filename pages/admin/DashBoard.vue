<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<h3 class="is-size-4 has-text-weight-semibold dashboard-title">Dashboard</h3>
				<h6 class="is-size-6 dashboard-subtitle">Welcome to CMS Dashboard</h6>
			</div>
		</div>
		<div class="columns">
			<div class="column is-3">
				<div class="card " style="border-radius: 5px;">
				    <div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-primary is-light">Students</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-primary" max="100" v-if="loading_students">10%</progress>
					  		<p class="count" v-else>{{students.length}}</p>
					  		<p class="card-subtitle">Total Registered Students</p>
					  	</div>
				    </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card" style="border-radius: 5px;">
					<div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-link is-light">FACULTY MEMBERS</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-link" max="100" v-if="loading_faculty_members">10%</progress>
					  		<p class="count" v-else>{{members.length}}</p>
					  		<p class="card-subtitle">Faculty Members Added</p>
					  	</div>
				    </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card" style="border-radius: 5px;">
					<div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-success is-light">DEPARTMENTS</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-success" max="100" v-if="loading_departments">10%</progress>
					  		<p class="count" v-else>{{$store.state.departments.length}}</p>
					  		<p class="card-subtitle">Departments Added</p>
					  	</div>
				    </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card" style="border-radius: 5px;">
					<div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-info is-light">SUB EMPLOYEES</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-info" max="100" v-if="loading_sub_employees">10%</progress>
					  		<p class="count" v-else>{{employees.length}}</p>
					  		<p class="card-subtitle">Sub Employees Added</p>
					  	</div>
				    </div>
				</div>
			</div>
		</div>
		<div class="columns">
			<div class="column is-3">
				<div class="card " style="border-radius: 5px;">
				    <div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-primary is-light">Assignments</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-primary" max="100" v-if="loading_assignments">10%</progress>
					  		<p class="count" v-else>{{assignments_count}}</p>
					  		<p class="card-subtitle">Assignments Created</p>
					  	</div>
				    </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card" style="border-radius: 5px;">
					<div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-link is-light">Materials Uploaded</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-link" max="100" v-if="loading_materials">10%</progress>
					  		<p class="count" v-else>{{materials_count}}</p>
					  		<p class="card-subtitle">Total Materials Uploaded</p>
					  	</div>
				    </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card" style="border-radius: 5px;">
					<div class="card-content">
					  	<div class="dashboard-card-title">
					  		<span class="tag is-success is-light">NOTIFICATIONS</span>
					  	</div>
					  	<div class="dashboard-card-content">
					  		<progress class="progress is-small is-success" max="100" v-if="loading_notifications">10%</progress>
					  		<p class="count" v-else>{{notifications_count}}</p>
					  		<p class="card-subtitle">Notifications created</p>
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
			users:[],
			students:[],
			members:[],
			employees:[],
			assignments_count:0,
            materials_count:0,
            notifications_count:0,
            loading_students:true,
            loading_faculty_members:true,
            loading_departments:true,
            loading_sub_employees:true,
            loading_assignments:true,
            loading_materials:true,
            loading_notifications:true,
		}
	},
	mounted(){
       this.getStudents();
       this.getFacultyMembers();
       this.getEmployees();
       this.getDepartments();
       this.getBatches();
       this.getAllAssignmentsCount();
       this.getAllMaterialsCount();
       this.getNotificationsCount();
	},
	methods:{
	    async getStudents(){
	   	    this.students = await this.$axios.$get(this.$store.state.api_url + '/admins/get_all_students');
	   	    this.loading_students = false;
	    },
	    async getFacultyMembers(){
	        await this.$axios.$get(this.$store.state.api_url + '/faculty_members')
		    .then((response)=>{
		       this.members = response.members;
		       this.loading_faculty_members = false;
		    })
		    .catch((error)=>{
		    })
		},
		async getEmployees(){
	        await this.$axios.$get(this.$store.state.api_url + '/employees')
	        .then((response) => {
	        	this.employees = response;
	        	this.loading_sub_employees = false;
	        });
		},
		async getDepartments(){
		    const departments = await this.$axios.$get(this.$store.state.api_url + '/departments');
		    this.loading_departments = false;
            this.$store.commit('setDepartments', departments.departments);
		},
		async getBatches(){
		    const batches = await this.$axios.$get(this.$store.state.api_url + '/batches');
            this.$store.commit('setBatches', batches.batches);
		},
		async getAllAssignmentsCount(){
           this.assignments_count = await this.$axios.$get(this.$store.state.api_url + '/admins/get_all_assignments_count');
           this.loading_assignments = false;
		},
		async getAllMaterialsCount(){
           this.materials_count = await this.$axios.$get(this.$store.state.api_url + '/admins/get_all_materials_count');
           this.loading_materials = false;
		},
		async getNotificationsCount(){
			this.notifications_count = await this.$axios.$get(this.$store.state.api_url + '/admins/get_all_notifications_count');
			this.loading_notifications = false;
		}
	}
}
</script>
<style scoped>
.dashboard-card-content{
	margin-top: 14px;
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