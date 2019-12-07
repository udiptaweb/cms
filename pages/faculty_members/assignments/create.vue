<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small" aria-label="breadcrumbs">
				  <ul class=" has-text-weight-semibold">
				    <li><nuxt-link to="/faculty_members/dashboard">Dashboard</nuxt-link></li>
				    <li><nuxt-link to="/faculty_members/assignments">Assignments</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/faculty_members/assignments/create">Create</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<div class="card">
					<div class="card-content">
						<div class="columns" style="justify-content: center;">
							<div class="column">
								<label class="label">Assignment</label> <span><small class="has-text-danger" v-if="create_assignment.errors.assignment">{{create_assignment.errors.assignment}}</small></span>
								<div class="quill-editor" 
							         :content="create_assignment.content"
							         @change="onEditorChange($event)"
							         v-quill:myQuillEditor="">
							    </div>

							</div>
							<div class="column is-6-tablet is-5-desktop is-4-widescreen">
								<div class="field">
								    <label class="label">Title</label>
								    <div class="control">
								        <input class="input is-small" type="text" placeholder="Assignment Title" v-model="create_assignment.title">
								    </div>
								    <small class="has-text-danger" v-if="create_assignment.errors.title">{{create_assignment.errors.title}}</small>
								</div>
								<div class="field">
					                <label for="" class="label text-small" >Select Department</label>
								    <div class="control">
									    <div class="select is-small" style="width: 100%;">
									        <select v-model="create_assignment.department" style="width: 100%;">
									          <option v-for="department in $store.state.departments" :value="department" v-if="department.status">{{department.title}}</option>
									        </select>
									    </div>
									</div>
									<small class="has-text-danger" v-if="create_assignment.errors.department">{{create_assignment.errors.department}}</small>
								</div>
								<div class="field" v-if="create_assignment.department">
					                <label for="" class="label text-small" >Select Semester</label>
								    <div class="control">
									    <div class="select is-small" style="width: 100%;">
									        <select v-model="create_assignment.semester" style="width: 100%;">
									           <option v-for="semester in create_assignment.department.semesters" :value="semester.id" v-if="semester.status">{{semester.title}}
									           </option>
									        </select>
									    </div>
									</div>
									<small class="has-text-danger" v-if="create_assignment.errors.semester">{{create_assignment.errors.semester}}</small>
								</div>
								<div class="field">
					                <label class="label">Enter Deadline</label>
								    <div class="control">
								        <input class="input is-small" type="date"  v-model="create_assignment.deadline">
								    </div>
								    <small class="has-text-danger" v-if="create_assignment.errors.deadline">{{create_assignment.errors.deadline}}</small>
								</div>
					            <div class="field is-grouped">
								  <div class="control">
								    <button class="button is-link is-small" :class="{'is-loading':create_assignment.creating}" @click="createNewAssignment">CREATE</button>
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
layout : 'FacultyLayout',
middleware : 'facultyAuthenticate',
data(){
	return{
		create_assignment:{
			title:'',
			deadline:'',
			content:'',
			department:'',
			semester:'',
			creating:false,
			errors:[],
		}
	}
},
mounted(){
  this.create_assignment.department = this.$store.state.departments.find(department =>department.id == this.$store.state.faculty_user.department_id);
},
methods:{
	onEditorChange({ editor, html, text }) {
        this.create_assignment.content = html;
	},
	clearForm(){
        let assignment = this.create_assignment;
        assignment.title='';
		assignment.deadline='';
		assignment.content='';
		assignment.department='';
		assignment.semester='';
		assignment.creating=false;
		assignment.errors=[];
	},
	async createNewAssignment(){
		this.create_assignment.creating = true;
		this.create_assignment.errors = [];
		let formData = new FormData();
		formData.append('title',this.create_assignment.title);
		if(this.create_assignment.department){
		    formData.append('department',this.create_assignment.department.id);
		}
		formData.append('semester',this.create_assignment.semester);
		formData.append('assignment',this.create_assignment.content);
		formData.append('deadline',this.create_assignment.deadline);
		formData.append('facultyuser_id',this.$store.state.faculty_user.id);
		await this.$axios.$post(this.$store.state.api_url + '/faculty_members/assignments/create_new',formData)
		.then((response)=>{
		    this.$swal("Created a new Assignment !","","success");
		    this.$router.push('/faculty_members/assignments');
		})
		.catch((error)=>{
			this.create_assignment.creating = false;
			this.create_assignment.errors = error.response.data;
			this.$swal("Failed to create","","error");
		});
	},

},
filters:{
	
}

}
</script>
<style scoped>
	.card{
		min-height: 80vh;
	}
</style>