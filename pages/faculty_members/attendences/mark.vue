<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small" aria-label="breadcrumbs">
				  <ul class=" has-text-weight-semibold">
				    <li><nuxt-link to="/faculty_members/dashboard">Dashboard</nuxt-link></li>
				    <li><nuxt-link to="/faculty_members/attendences">Attendences</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/faculty_members/attendences/mark">Mark</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<hr>
		<div class="columns" style="justify-content: center;">
			<div class="column">
				<label class="label">STUDENTS <span style="margin-left: 16px;" class="has-text-info">TOTAL : {{filterStudents.length}}</span> <span class="has-text-success" style="margin-left: 16px;">PRESENT : {{attendence.students.length}}</span> <span class="has-text-danger" style="margin-left: 16px;">ABSENT : {{Number(filterStudents.length)-Number(attendence.students.length)}}</span> <span style="margin-left: 14px;" class="is-size-7">{{$moment(attendence.date).format('MMMM Do YYYY')}}</span></label> 
                <div class="table-container" v-if="filterStudents.length>0">
					<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
					  <thead>
					    <tr>
					      <th>Name</th>
					      <th>Email</th>
					      <th>
					        <label class="checkbox">
							  <input type="checkbox" @change="setCheckAll" v-model="check_all">
							  All Present
							</label>
					      </th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr v-for="student in filterStudents" >
					      <td>{{student.name}}</td>
					      <td>{{student.email}}</td>
					      <td>
					      	<label class="checkbox">
							  <input type="checkbox" :value="student.id" v-model="attendence.students">
							</label>
					      </td> 
					    </tr>
					  </tbody>
					</table>
				</div>
				<h5 v-else class="title is-5 has-text-centered">No Students found</h5>
			</div>
			<div class="column is-6-tablet is-5-desktop is-4-widescreen">
				<div class="field">
				    <label class="label">DEPARTMENT</label>
				    <p><h2 class="has-text-info">{{myDepartment.title}}</h2></p>
				</div>
				<div class="field">
	                <label for="" class="label text-small" >Select Semester</label>
				    <div class="control">
					    <div class="select is-small" style="width: 100%;">
					        <select v-model="semester" style="width: 100%;" >
					           <option v-for="semester in myDepartment.semesters" :value="semester.id" v-if="semester.status">{{semester.title}}
					           </option>
					        </select>
					    </div>
					</div>
					<span class="has-text-danger" v-if="attendence.errors.semester"><small>{{attendence.errors.semester}}</small></span>
				</div>
				<div class="field">
	                <label for="" class="label text-small" >Select Batch</label>
				    <div class="control">
					    <div class="select is-small" style="width: 100%;">
					        <select v-model="batch" style="width: 100%;">
					           <option v-for="batch in $store.state.batches" :value="batch.id" v-if="batch.status" >{{batch.title}}
					           </option>
					        </select>
					    </div>
					</div>
					<span class="has-text-danger" v-if="attendence.errors.batch"><small>{{attendence.errors.batch}}</small></span>
				</div>
				<div class="field">
	                <label class="label">Select Date</label>
				    <div class="control">
				        <input class="input is-small" type="date"  v-model="attendence.date">
				    </div>
				    <span class="has-text-danger" v-if="attendence.errors.date"><small>{{attendence.errors.date}}</small></span>
				</div>
	            <div class="field is-grouped">
				  <div class="control">
				    <button class="button is-link is-small" :class="{'is-loading': attendence.marking}" @click="markAttendence">MARK NOW</button>
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
		semester:'',
		batch:'',
		students:[],
		check_all:false,
		attendence:{
			date:new Date(),
			students:[],
			marking:false,
			errors:[],
		}
	}
},
computed:{
    myDepartment(){
    	return this.$store.state.departments.find(department => department.id == this.$store.state.faculty_user.department_id);
    },
    filterStudents(){
        return this.students.filter(student => {
        	return student.semester_id.toLowerCase().includes(this.semester) && student.batch_id.toLowerCase().includes(this.batch);
        });
	},
},
mounted(){
   this.getStudents();
},
methods:{
    setCheckAll(){
    	this.attendence.students = [];
		if(this.check_all){
			this.students.forEach((student)=>{
                this.attendence.students.push(student.id);
            });
		}else{
			this.attendence.students=[];
		}
	},
	async markAttendence(){
		this.attendence.marking = true;
		this.attendence.errors = [];
		let formData = new FormData();
		let present_students = JSON.stringify(this.attendence.students);
		formData.append('students', present_students);
        formData.append('date', this.$moment(this.attendence.date).format());
        let all_students = JSON.stringify(this.filterStudents);
        formData.append('all_students', all_students);
        formData.append('facultyuser_id', this.$store.state.faculty_user.id);
        formData.append('department_id', this.$store.state.faculty_user.department_id);
        formData.append('semester', this.semester);
        formData.append('batch', this.batch);
		await this.$axios.$post(this.$store.state.api_url + '/faculty_members/attendence/mark',formData)
		.then((response)=>{
			this.attendence.marking = false;
		    this.$swal("Marked successfully !","","success");
		})
		.catch((error)=>{
			this.attendence.marking = false;
			this.attendence.errors = error.response.data;
			this.$swal("Failed to mark","","error");
		});
	},
	async getStudents(){
		const students = await this.$axios.$post(this.$store.state.api_url + '/faculty_members/students',{department_id : this.$store.state.faculty_user.department_id});
		this.students = students.students;
	}

},
}
</script>