<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small has-text-weight-semibold" aria-label="breadcrumbs">
				  <ul>
				    <li><nuxt-link to="/faculty_members/dashboard">Dashboard</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/faculty_members/materials">Class Materials</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<div class="card">
					<div class="card-content">
						<div class="columns text-14">
							<div class="column">
								<div class="table-container" v-if="materials.length>0">
									<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
									  <thead>
									    <tr>
									      <th>Professor</th>
									      <th>Material Title</th>
									      <th>Material</th>
									      <th>Department/Semester</th>
									      <th>Date</th>
									      <th>Action</th>
									    </tr>
									  </thead>
									  <tbody>
									    <tr v-for="material in materials">
									      <td>{{$store.state.faculty_user.name}}</td>
									      <td>{{material.title}}</td>
									      <td><button class="small-custom-info" @click="viewMaterialNow(material.file)">View</button></td>
									      <td>{{getDepartment(material.department_id)}} <br> {{getSemester(material.department_id,material.semester_id)}}</td>
									      <td><span class="has-text-weight-semibold">{{$moment(material.created_at).format("MMM Do YY, h:mm:ss a")}}</span></td>
									      <td><button class="small-custom-danger" @click="removeMaterial(material.id)">Delete</button></td> 
									    </tr>
									  </tbody>
									</table>
								</div>
								<h5 v-else class="title is-5 has-text-centered">No Materials yet</h5>
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
		materials:[],
	}
},
mounted(){
	this.getMaterials();
},
methods:{
	getDepartment(department_id){
       return this.$store.state.departments.find(department => department.id == department_id).title;
	},
	getSemester(department_id,semester_id){
      let department = this.$store.state.departments.find(department => department.id == department_id);
      return department.semesters.find(semester => semester.id == semester_id).title;
	},
    viewMaterialNow(material){
      window.open(material);
    },
	removeMaterial(id){
		swal({
		  title: "Are you sure?",
		  text: "Once deleted , You will not be able to recover again",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		    this.confirmRemoveMaterial(id);
		  } 
		});
	},
	async confirmRemoveMaterial(id){
        await this.$axios.$post(this.$store.state.api_url + '/faculty_members/materials/remove',{id:id,facultyuser_id:this.$store.state.faculty_user.id})
	    .then((response)=>{
	        this.$store.dispatch('GET_MATERIALS');
	        swal("Deletd the assignment","","success");
	    })
	    .catch((error)=>{
	    	swal("Failed to delete!","","error");
	    });
	},
	async getMaterials(){
		const materials = await this.$axios.$post(this.$store.state.api_url + '/faculty_members/materials',{facultyuser_id : this.$store.state.faculty_user.id});
	    this.materials = materials.materials;
	}

},
}
</script>