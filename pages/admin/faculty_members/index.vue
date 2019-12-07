<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small" aria-label="breadcrumbs">
				  <ul  class="has-text-weight-semibold">
				    <li><nuxt-link to="/admin/dashboard">Dashboard</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/admin/faculty_members">Members</nuxt-link></li>
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
								    <li :class="breadcrumb=='members'?'is-active':''">
								      <a @click="setBreadcrumb('members')">
								        <span class="icon is-small"><i class="fa fa-users" aria-hidden="true"></i></span>
								        <span class="has-text-weight-semibold">Faculty Members</span>
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
						<div class="section" v-if="breadcrumb=='members'" style="margin-top: -50px;">
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
									<div class="table-container" v-if="filterMembers.length>0">
										<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
										  <thead>
										    <tr>
										      <th>Name</th>
										      <th>Email</th>
										      <th>Phone</th>
										      <th>Password</th>
										      <th>Status</th>
										      <th>Action</th>
										    </tr>
										  </thead>
										  <tbody>
										    <tr v-for="member in filterMembers">
										      <td><a href="#">{{member.name}}</a></td>
										      <td>{{member.email}}</td>
										      <td>{{member.phone}}</td>
										      <td><span class="has-text-weight-semibold">{{member.pw}}</span></td>
										      <td><button class="button is-outlined is-small" :class="member.status==true?'is-success':'is-info'" @click="toggleMember(member.id)">
										      	<span  v-if="member.status==true">
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
										      	<button class="button is-outlined is-danger is-small" @click="removeFacultyMember(member.id)">Delete</button>
										      </td>
										    </tr>
										  </tbody>
										</table>
									</div>
									<h5 v-else class="title is-5 has-text-centered">No Faculty Member added</h5>
								</div>
							</div>
						</div>
						<div class="columns" v-if="breadcrumb=='create_new'" style="justify-content: center;">
							<div class="column is-6-tablet is-5-desktop is-4-widescreen" >
								<div class="field">
								   <label class="label-text" >Name</label>
								   <div class="control">
								    <input class="input is-small " type="text" placeholder="Name" v-model="create_member.name">
								   </div>
								   <small class="has-text-danger" v-if="create_member.errors.name">{{create_member.errors.name}}</small>
								</div>
								<div class="field">
								   <label class="label-text">Email</label>
								   <div class="control">
								    <input class="input is-small" type="text" placeholder="Email" v-model="create_member.email">
								   </div>
								   <small class="has-text-danger" v-if="create_member.errors.email">{{create_member.errors.email}}</small>
								</div>
								<div class="field">
					              <label for="" class="label-text">Password</label>
					              <div class="control has-icons-left">
					                <input type="password" placeholder="*******" class="input is-small" required v-model="create_member.password">
					                <span class="icon is-small is-left">
					                  <i class="fa fa-lock"></i>
					                </span>
					              </div>
					              <small class="has-text-danger" v-if="create_member.errors.password">{{create_member.errors.password}}</small>
					            </div>
					            <div class="field">
					              <label for="" class="label-text">Confirm Password</label>
					              <div class="control has-icons-left">
					                <input type="password" v-model="create_member.password_confirmation" placeholder="*******" class="input is-small" required>
					                <span class="icon is-small is-left">
					                  <i class="fa fa-lock"></i>
					                </span>
					              </div>
					            </div>
							</div>
							<div class="column is-6-tablet is-5-desktop is-4-widescreen" >
								
								<div class="field">
								   <label class="label-text">Phone</label>
								   <div class="control">
								    <input class="input is-small" type="text" placeholder="Phone" v-model="create_member.phone">
								   </div>
								   <small class="has-text-danger" v-if="create_member.errors.phone">{{create_member.errors.phone}}</small>
								</div>
								<div class="field">
					              <label for="" class="label-text" >Select Department</label>
								  <div class="control">
								    <div class="select is-small" style="width: 100%;">
								      <select v-model="create_member.department" style="width: 100%;">
								        <option v-for="department in $store.state.departments" :value="department.id">{{department.title}}</option>
								      </select>
								    </div>
								  </div>
								  <small class="has-text-danger" v-if="create_member.errors.department">{{create_member.errors.department}}</small>
								</div>
								<div class="field">
								   <label class="label-text">Designation</label>
								   <div class="control">
								    <input class="input is-small" type="text" placeholder="Designation" v-model="create_member.designation">
								   </div>
								   <small class="has-text-danger" v-if="create_member.errors.designation">{{create_member.errors.designation}}</small>
								</div>
					            
								<div class="field">
								   <label class="label-text">Subject</label>
								   <div class="control">
								    <input class="input is-small" type="text" placeholder="Subject" v-model="create_member.subject">
								   </div>
								   <small class="has-text-danger" v-if="create_member.errors.subject">{{create_member.errors.subject}}</small>
								</div>
								<div class="field is-grouped">
								   <div class="control">
								     <button class="button is-link is-small" :class="{'is-loading':create_member.creating}" @click="createNewFacultyMember">CREATE</button>
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
layout: 'AdminLayout',
middleware : 'adminAuthenticate',
data(){
	return{
		breadcrumb:'members',
		members:[],
		filtered_members:[],
		department:'All Departments',
		search:'',
		create_member:{
			name:'',
			email:'',
			password:'',
			password_confirmation:'',
			department:'',
			designation:'',
			subject:'',
			creating:false,
			errors:[],
		}
	}
},
mounted(){
	this.getFacultyMembers();
},
computed:{
	filterMembers(){
		return this.filtered_members.filter(member => {
           return member.name.toLowerCase().includes(this.search.toLowerCase()) || member.email.toLowerCase().includes(this.search.toLowerCase());
		});
	}
},
methods:{
	filterDepartment(){
		if(this.department == 'All Departments'){
			this.filtered_members = this.members;
		}else{
			this.filtered_members = this.members.filter(member => member.department_id == this.department);
		} 
	},
	clearForm(){
      let member = this.create_member;
      member.name='';
      member.email='';
      member.password='';
      member.password_confirmation='';
      member.department='';
      member.designation='';
      member.subject='';
      member.phone='';
      member.errors=[];
	},
	setBreadcrumb(breadcrumb){
        this.breadcrumb=breadcrumb;
	},
	async createNewFacultyMember(){
      this.create_member.creating=true;
      let formData = new FormData();
      formData.append('name',this.create_member.name);
      formData.append('email',this.create_member.email);
      formData.append('password',this.create_member.password);
      formData.append('password_confirmation',this.create_member.password_confirmation);
      formData.append('department',this.create_member.department);
      formData.append('designation',this.create_member.designation);
      formData.append('subject',this.create_member.subject);
      formData.append('phone',this.create_member.phone);
        await this.$axios.$post(this.$store.state.api_url + '/faculty_members/create',formData)
	    .then((response)=>{
	        this.getFacultyMembers();
	        this.breadcrumb = 'members';
	        this.clearForm();
	        this.create_member.creating = false;
	        this.$swal("Created a new Faculty Member","","success");
	    })
	    .catch((error)=>{
	    	this.create_member.creating = false;
	    	this.create_member.errors = error.response.data;
	    	this.$swal("Failed to create","","error");
	    });
	},
	removeFacultyMember(id){
        this.$snotify.confirm('Are You Sure ?', {
		    timeout: 2000,
		    showProgressBar: true,
		    closeOnClick: false,
		    pauseOnHover: true,
		    buttons: [
		     {text: 'Yes', action: (toast) =>{this.confirmRemoveFacultyMember(id); this.$snotify.remove(toast.id);}, bold: false},
		     {text: 'No', action: (toast) => {console.log('Clicked: No'); this.$snotify.remove(toast.id); }, bold: true},
		    ]
	    });
	},
	confirmRemoveFacultyMember(id){
        axios.post('/admin/faculty_member/remove',{id:id})
	    .then((response)=>{
	        this.members=response.data.members;
	        this.$snotify.success('Deleted the Faculty Member', {
		       timeout: 500,
		       showProgressBar: true,
		       closeOnClick: true,
		       pauseOnHover: true
		    });
	    })
	    .catch((error)=>{
	    	this.$snotify.error('Server error!', {
		      timeout: 2000,
		      showProgressBar: true,
		      closeOnClick: true,
		      pauseOnHover: true
		    });
	    })
	    .finally(()=>{

	    });
	},
	async toggleMember(id){
        await this.$axios.post(this.$store.state.api_url + '/faculty_members/toggleStatus',{id:id})
	    .then((response)=>{
	        this.members=response.data.members;
	        this.$swal("Updated Status","","success");
	    })
	    .catch((error)=>{
	    	this.$swal("Failed to change Status","","error");
	    });
	},
	async getFacultyMembers(){
        await this.$axios.$get(this.$store.state.api_url + '/faculty_members')
	    .then((response)=>{
	       this.members = response.members;
	       this.filtered_members = response.members;
	    })
	    .catch((error)=>{
	    })
	},
},

}
</script>
<style scoped>
.text-small{
	font-size: 14px!important;
}
.label-text{
	color: #92A8CA;
    font-size: 14px;
}
</style>