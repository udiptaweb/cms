<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small has-text-weight-semibold" aria-label="breadcrumbs">
				  <ul>
				    <li><nuxt-link to="/faculty_members/dashboard">Dashboard</nuxt-link></li>
				    <li><nuxt-link to="/faculty_members/notifications">Notifications</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<hr>
		<div class="columns " v-if="viewNotification.view" style="justify-content: center;" @click="goBack">
			<div class="column is-10-tablet is-10-desktop is-10-widescreen">
				<button class="button is-small is-link ">GO BACK</button>
			</div>
		</div>
		<div class="columns text-14" v-if="viewNotification.view == false">
			<div class="column">
				<div class="table-container" v-if="$store.state.notifications.length>0">
					<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
					  <thead>
					    <tr>
					      <th>Professor</th>
					      <th>Assignment Title</th>
					      <th>Assignment</th>
					      <th>Department/Semester</th>
					      <th>Date</th>
					      <th>Action</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr v-for="notification in $store.state.notifications">
					      <td>{{$store.state.faculty_user.name}}</td>
					      <td>{{notification.title}}</td>
					      <td><button class="small-custom-info" @click="viewNotificationNow(notification.notification)">View</button></td>
					      <td>{{getDepartment(notification.department_id)}} <br> {{getSemester(notification.department_id,notification.semester_id)}}</td>
					      <td><span class="has-text-weight-semibold">{{$moment(notification.created_at).format("MMM Do YY, h:mm:ss a")}}</span></td>
					      <td><button class="small-custom-danger" @click="removeNotification(notification.id)">Delete</button></td> 
					    </tr>
					  </tbody>
					</table>
				</div>
				<h5 v-else class="title is-5 has-text-centered">No notifications added</h5>
			</div>
		</div>

		<div class="columns" v-if="viewNotification.view" style="justify-content: center;">
			<div class="column is-10-tablet is-10-desktop is-10-widescreen" >
				<div class="container" v-html="viewNotification.notification">
					
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import axios from 'axios'	
export default{
layout : 'FacultyLayout',
middleware : 'facultyAuthenticate',
async fetch({store , params}){
   await store.dispatch('GET_DEPARTMENTS');
   await store.dispatch('GET_NOTIFICATIONS');
},
data(){
	return{
		notifications:[],
		viewNotification:{
          view:false,
          notification:'',
		},
	}
},

methods:{
	goBack(){
      this.viewNotification.notification = '';
      this.viewNotification.view = false;
	},
	viewNotificationNow(notification){
       this.viewNotification.notification = notification;
       this.viewNotification.view = true;
	},
	getDepartment(department_id){
       return this.$store.state.departments.find(department => department.id == department_id).title;
	},
	getSemester(department_id,semester_id){
      let department = this.$store.state.departments.find(department => department.id == department_id);
      return department.semesters.find(semester => semester.id == semester_id).title;
	},

	removeNotification(id){
		swal({
		  title: "Are you sure?",
		  text: "Once deleted , You will not be able to recover again",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		    this.confirmRemoveNotification(id);
		  } 
		});
	},
	async confirmRemoveNotification(id){
        await this.$axios.$post(this.$store.state.api_url + '/faculty_members/notifications/remove',{id:id,facultyuser_id:this.$store.state.faculty_user.id})
	    .then((response)=>{
	        this.$store.dispatch('GET_NOTIFICATIONS');
	        swal("Deletd the assignment","","success");
	    })
	    .catch((error)=>{
	    	swal("Failed to delete!","","error");
	    });
	},
},

}
</script>