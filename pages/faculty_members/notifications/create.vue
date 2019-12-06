<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column ">
				<nav class="breadcrumb is-right has-arrow-separator" aria-label="breadcrumbs">
				  <ul class="text-14">
				    <li><nuxt-link to="/faculty_members/dashboard">Dashboard</nuxt-link></li>
				    <li><nuxt-link to="/faculty_members/notifications">Department Notifications</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/faculty_members/notifications/create">Create</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<hr>
		<div class="columns" style="justify-content: center;">
			<div class="column">
				<label class="label">Notification</label> <span><small class="has-text-danger" v-if="create_notification.errors.notification">{{create_notification.errors.notification}}</small></span>
				<div class="quill-editor" 
			         :content="create_notification.notification"
			         @change="onEditorChange($event)"
			         v-quill:myQuillEditor="">
			    </div>

			</div>
			<div class="column is-6-tablet is-5-desktop is-4-widescreen">
				<div class="field">
				    <label class="label">Title</label>
				    <div class="control">
				        <input class="input is-small" type="text" placeholder="notification Title" v-model="create_notification.title">
				    </div>
				    <small class="has-text-danger" v-if="create_notification.errors.title">{{create_notification.errors.title}}</small>
				</div>
				<div class="field">
	                <label for="" class="label text-small" >Select Department</label>
				    <div class="control">
					    <div class="select is-small" style="width: 100%;">
					        <select v-model="create_notification.department" style="width: 100%;">
					          <option v-for="department in $store.state.departments" :value="department" v-if="department.status">{{department.title}}</option>
					        </select>
					    </div>
					</div>
					<small class="has-text-danger" v-if="create_notification.errors.department">{{create_notification.errors.department}}</small>
				</div>
				<div class="field" v-if="create_notification.department">
	                <label for="" class="label text-small" >Select Semester</label>
				    <div class="control">
					    <div class="select is-small" style="width: 100%;">
					        <select v-model="create_notification.semester" style="width: 100%;">
					           <option v-for="semester in create_notification.department.semesters" :value="semester.id" v-if="semester.status">{{semester.title}}
					           </option>
					        </select>
					    </div>
					</div>
					<small class="has-text-danger" v-if="create_notification.errors.semester">{{create_notification.errors.semester}}</small>
				</div>
	            <div class="field is-grouped">
				  <div class="control">
				    <button class="button is-link is-small" :class="{'is-loading':create_notification.creating}" @click="createNewNotification">CREATE</button>
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
import axios from 'axios'
export default{
layout : 'FacultyLayout',
middleware : 'facultyAuthenticate',
data(){
	return{
		create_notification:{
			title:'',
			notification:'',
			department:'',
			semester:'',
			creating:false,
			errors:[],
		}
	}
},

methods:{
	onEditorChange({ editor, html, text }) {
        this.create_notification.notification = html;
	},
	clearForm(){
        let notification = this.create_notification;
        notification.title='';
		notification.notification='';
		notification.department='';
		notification.semester='';
		notification.creating=false;
		notification.errors=[];
	},
	async createNewNotification(){
		this.create_notification.creating = true;
		this.create_notification.errors = [];
		let formData = new FormData();
		formData.append('title',this.create_notification.title);
		if(this.create_notification.department){
		    formData.append('department',this.create_notification.department.id);
		}
		formData.append('semester',this.create_notification.semester);
		formData.append('notification',this.create_notification.notification);
		formData.append('facultyuser_id',this.$store.state.faculty_user.id);
		await this.$axios.$post(this.$store.state.api_url + '/faculty_members/notifications/create_new',formData)
		.then((response)=>{
			this.clearForm();
			this.create_notification.creating = false;
		    this.$swal("Created a new Notification !","","success");
		    this.$router.push('/faculty_members/notifications');
		})
		.catch((error)=>{
			this.create_notification.creating = false;
			this.create_notification.errors = error.response.data;
			this.$swal("Failed to create","","error");
		});
	},	
},
}
</script>