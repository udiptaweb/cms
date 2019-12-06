<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<h4 class="is-size-4 has-text-weight-bold">Dashboard</h4>
				<h6 class="is-size-6">Welcome to CMS Dashboard</h6>
			</div>
		</div>
		<div class="columns is-centered">
			<div class="column is-3">
				<div class="card bg-info " style="border-radius: 5px;">
				  <div class="card-content">
				  	<div class="dashboard-card-title">
				  		<p class="title is-6" style="color: #d6e5fa;">STUDENTS</p>
				  	</div>
				  	<div class="dashboard-card-content">
				  		<div class="columns">
				  			<div class="column">
				  				<i class="fas fa-user-graduate" style="font-size: 36px;color: white;"></i>
				  			</div>
				  			<div class="column">
				  				<p class="title is-6 has-text-white">{{students.length}}</p>
				  			</div>
				  		</div>
				  	</div>
				  </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card bg-info " style="border-radius: 5px;">
				  <div class="card-content">
				  	<div class="dashboard-card-title">
				  		<p class="title is-6" style="color: #d6e5fa;">FACULTY MEMBERS</p>
				  	</div>
				  	<div class="dashboard-card-content">
				  		<div class="columns">
				  			<div class="column">
				  				<i class="fas fa-user-tie" style="font-size: 36px;color: white;"></i>
				  			</div>
				  			<div class="column">
				  				<p class="title is-6 has-text-white">{{members.length}}</p>
				  			</div>
				  		</div>
				  	</div>
				  </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card bg-info " style="border-radius: 5px;">
				  <div class="card-content">
				  	<div class="dashboard-card-title">
				  		<p class="title is-6" style="color: #d6e5fa;">DEPARTMENTS</p>
				  	</div>
				  	<div class="dashboard-card-content">
				  		<div class="columns">
				  			<div class="column">
				  				<i class="far fa-building" style="font-size: 36px;color: white;"></i>
				  			</div>
				  			<div class="column">
				  				<p class="title is-6 has-text-white">{{$store.state.departments.length}}</p>
				  			</div>
				  		</div>
				  	</div>
				  </div>
				</div>
			</div>
			<div class="column is-3">
				<div class="card bg-info " style="border-radius: 5px;">
				  <div class="card-content">
				  	<div class="dashboard-card-title">
				  		<p class="title is-6" style="color: #d6e5fa;">SUB EMPLOYEES	</p>
				  	</div>
				  	<div class="dashboard-card-content">
				  		<div class="columns">
				  			<div class="column">
				  				<i class="fas fa-user-plus" style="font-size: 36px;color: white;"></i>
				  			</div>
				  			<div class="column">
				  				<p class="title is-6 has-text-white">{{employees.length}}</p>
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
	async fetch({store}){
       await store.dispatch('GET_DEPARTMENTS');
       await store.dispatch('GET_BATCHES');
	},
	layout : 'AdminLayout',
	middleware : 'adminAuthenticate',
	data(){
		return{
			users:[],
			students:[],
			members:[],
			employees:[],
		}
	},
	mounted(){
       this.getStudents();
       this.getFacultyMembers();
       this.getEmployees();
	},
	methods:{
	    async getStudents(){
	   	    this.students = await this.$axios.$get(this.$store.state.api_url + '/admins/get_all_students');
	    },
	    async getFacultyMembers(){
	        await this.$axios.$get(this.$store.state.api_url + '/faculty_members')
		    .then((response)=>{
		       this.members = response.members;
		    })
		    .catch((error)=>{
		    })
		},
		async getEmployees(){
	        await this.$axios.$get(this.$store.state.api_url + '/employees')
	        .then((response) => {
	        	this.employees = response;
	        });
		},
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
</style>