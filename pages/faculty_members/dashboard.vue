<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<h4 class="is-size-4 has-text-weight-bold title-custom">Dashboard</h4>
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
				  		<p class="title is-6" style="color: #d6e5fa;">ASSIGNMENTS</p>
				  	</div>
				  	<div class="dashboard-card-content">
				  		<div class="columns">
				  			<div class="column">
				  				<i class="fas fa-user-tie" style="font-size: 36px;color: white;"></i>
				  			</div>
				  			<div class="column">
				  				<p class="title is-6 has-text-white">{{assignments.length}}</p>
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
				  		<p class="title is-6" style="color: #d6e5fa;">MATERIALS UPLOADED</p>
				  	</div>
				  	<div class="dashboard-card-content">
				  		<div class="columns">
				  			<div class="column">
				  				<i class="far fa-building" style="font-size: 36px;color: white;"></i>
				  			</div>
				  			<div class="column">
				  				<p class="title is-6 has-text-white">{{materials.length}}</p>
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
				  		<p class="title is-6" style="color: #d6e5fa;">NOTIFICATIONS CREATED	</p>
				  	</div>
				  	<div class="dashboard-card-content">
				  		<div class="columns">
				  			<div class="column">
				  				<i class="fas fa-user-plus" style="font-size: 36px;color: white;"></i>
				  			</div>
				  			<div class="column">
				  				<p class="title is-6 has-text-white">{{notifications.length}}</p>
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
	layout : 'FacultyLayout',
	middleware : 'facultyAuthenticate',
	data(){
		return{
			students:[],
			assignments:[],
			materials:[],
			notifications:[],
		}
	},
	mounted(){
      this.getMyStudents();  
      this.getMyAssignments();
      this.getMaterials();
      this.getMyNnotifications();
	},
	methods:{
		async getMyStudents(){
			await this.$axios.$post(this.$store.state.api_url + '/faculty_members/students',{department_id : this.$store.state.faculty_user.department_id})
			.then((response) => {
				this.students = response.students;
			});
		},
		async getMyAssignments(){
			const assignments = await this.$axios.$post(this.$store.state.api_url + '/faculty_members/assignments',{facultyuser_id : this.$store.state.faculty_user.id});
            this.assignments = assignments.assignments;
		},
		async getMaterials(){
			const materials = await this.$axios.$post(this.$store.state.api_url + '/faculty_members/materials',{facultyuser_id : this.$store.state.faculty_user.id});
            this.materials = materials.materials;
		},
		async getMyNnotifications(){
			const notifications = await this.$axios.$post(this.$store.state.api_url + '/faculty_members/notifications',{facultyuser_id : this.$store.state.faculty_user.id});
            this.notifications = notifications.notifications;
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
.title-custom{
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  color: #35495e;
  letter-spacing: 1px;
}
</style>