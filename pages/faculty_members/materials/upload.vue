<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small has-text-weight-semibold" aria-label="breadcrumbs">
				  <ul>
				    <li><nuxt-link to="/faculty_members/dashboard">Dashboard</nuxt-link></li>
				    <li><nuxt-link to="/faculty_members/materials">Class Materials</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/faculty_members/materials/upload">Upload</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<hr>
		<div class="columns" style="justify-content: center;">
			<div class="column is-6-tablet is-5-desktop is-4-widescreen">
				<label class="label">Material file</label> <span><small class="has-text-danger" v-if="create_material.errors.material_file">{{create_material.errors.material_file}}</small></span>
				<div class="file has-name is-boxed">
				    <label class="file-label">
				    <input class="file-input" type="file" name="material_file" ref="material_file" v-on:change="changedFile()">
				    <span class="file-cta">
				    <span class="file-icon">
				        <i class="fas fa-upload"></i>
				    </span>
					<span class="file-label">
					Choose the file…
					</span>
					</span>
					<span class="file-name">
					    {{create_material.file_title}}
					</span>
				    </label>
				</div>

			</div>
			<div class="column is-6-tablet is-5-desktop is-4-widescreen">
				<div class="field">
				    <label class="label">Title</label>
				    <div class="control">
				        <input class="input is-small" type="text" placeholder="Assignment Title" v-model="create_material.title">
				    </div>
				    <small class="has-text-danger" v-if="create_material.errors.title">{{create_material.errors.title}}</small>
				</div>
				<div class="field">
	                <label for="" class="label text-small" >Select Department</label>
				    <div class="control">
					    <div class="select is-small" style="width: 100%;">
					        <select v-model="create_material.department" style="width: 100%;">
					          <option v-for="department in $store.state.departments" :value="department" v-if="department.status">{{department.title}}</option>
					        </select>
					    </div>
					</div>
					<small class="has-text-danger" v-if="create_material.errors.department">{{create_material.errors.department}}</small>
				</div>
				<div class="field" v-if="create_material.department">
	                <label for="" class="label text-small" >Select Semester</label>
				    <div class="control">
					    <div class="select is-small" style="width: 100%;">
					        <select v-model="create_material.semester" style="width: 100%;">
					           <option v-for="semester in create_material.department.semesters" :value="semester.id" v-if="semester.status">{{semester.title}}
					           </option>
					        </select>
					    </div>
					</div>
					<small class="has-text-danger" v-if="create_material.errors.semester">{{create_material.errors.semester}}</small>
				</div>
	            <div class="field is-grouped">
				  <div class="control">
				    <button class="button is-link is-small" :class="{'is-loading':create_material.creating}" @click="createNewMaterial">CREATE</button>
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

layout : 'FacultyLayout',
middleware : 'facultyAuthenticate',
data(){
	return{
		create_material:{
			title:'',
			material_file:'',
			file_title:'',
			department:'',
			semester:'',
			creating:false,
			errors:[],
		}
	}
},
mounted(){
  this.create_material.department = this.$store.state.departments.find(department =>department.id == this.$store.state.faculty_user.department_id);
},
methods:{
	changedFile(){
		this.create_material.material_file = this.$refs.material_file.files[0];
		this.create_material.file_title = this.create_material.material_file.name;
	},
	clearForm(){
        let material = this.create_material;
        material.title='';
		material.material_file='';
		material.department='';
		material.semester='';
		material.creating=false;
		material.errors=[];
	},
	async createNewMaterial(){
		this.create_material.creating = true;
		this.create_material.errors = [];
		let formData = new FormData();
		formData.append('title',this.create_material.title);
		if(this.create_material.department){
		    formData.append('department',this.create_material.department.id);
		}
		formData.append('semester',this.create_material.semester);
		formData.append('material_file',this.create_material.material_file);
		formData.append('facultyuser_id',this.$store.state.faculty_user.id);
		await this.$axios.$post(this.$store.state.api_url + '/faculty_members/materials/create_new',formData)
		.then((response)=>{
			
		    this.$swal("Created a new Class Material!","","success");
		    this.$router.push('/faculty_members/materials');
		})
		.catch((error)=>{
			this.create_material.creating = false;
			this.create_material.errors = error.response.data;
			this.$swal("Failed to create","","error");
		});
	},
},
filters:{
	
}

}
</script>