<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small" aria-label="breadcrumbs">
				  <ul class=" has-text-weight-semibold">
				    <li><nuxt-link to="/faculty_members/dashboard">Dashboard</nuxt-link></li>
				    <li  class="is-active"><nuxt-link to="/faculty_members/attendences">Attendences</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<div class="card">
					<div class="card-content">
						<div class="columns text-14" style="justify-content: center;">
							<div class="column">
								<label class="text-12 has-text-weight-semibold"><span >DATE : {{$moment(date).format('YYYY-MM-DD')}}</span> <span class="has-text-weight-bold">|</span> <span class="">TOTAL : {{filterAttendences.length}}</span> <span class="has-text-weight-bold">|</span> <span class="has-text-success">PRESENT : {{totalPresent.length}}</span> <span class="has-text-weight-bold">|</span> <span class="has-text-danger">ABSENT : {{totalAbsent.length}}</span></label>
				                <div class="table-container" v-if="filterAttendences.length>0">
									<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
									  <thead>
									    <tr>
									      <th>Name</th>
									      <th>Email</th>
									      <th>Mark Date</th>
				                          <th>Attendence</th>
									    </tr>
									  </thead>
									  <tbody>
									    <tr v-for="attendence in filterAttendences" >
									      <td>{{getStudent(attendence.user_id).name}}</td>
									      <td>{{getStudent(attendence.user_id).email}}</td>
									      <td><span class="text-12 has-text-weight-bold">{{$moment(attendence.created_at).format('DD-MM-YY, h:mm:ss a')}}</span> <span class="tag is-warning is-light text-12" v-if="attendence.created_at != attendence.updated_at">UPDATED</span></td>
									      <td>
									      	<button class="" :class="attendence.attendence == true? 'small-custom-success' : attendence.attendence == false? 'small-custom-danger' : ''" @click="updateAttendence(attendence.id)"><span v-if="attendence.attendence">PRESENT</span> <span v-else>ABSENT</span></button>
									      </td> 
									    </tr>
									  </tbody>
									</table>
								</div>
								<h6 v-else class="title is-size-6 has-text-centered">No Records found</h6>
							</div>
							<div class="column is-6-tablet is-5-desktop is-4-widescreen">
								<div class="field">
								    <label class="label-text">DEPARTMENT</label>
								    <p><h2 class="has-text-info">{{myDepartment.title}}</h2></p>
								</div>
								<div class="field">
					                <label for="" class="label-text" >Select Semester</label>
								    <div class="control">
									    <div class="select is-small" style="width: 100%;">
									        <select v-model="semester" style="width: 100%;" >
									           <option v-for="semester in myDepartment.semesters" :value="semester.id" v-if="semester.status">{{semester.title}}
									           </option>
									        </select>
									    </div>
									</div>
								</div>
								<div class="field">
					                <label for="" class="label-text" >Select Batch</label>
								    <div class="control">
									    <div class="select is-small" style="width: 100%;">
									        <select v-model="batch" style="width: 100%;">
									           <option v-for="batch in $store.state.batches" :value="batch.id" v-if="batch.status" >{{batch.title}}
									           </option>
									        </select>
									    </div>
									</div>
								</div>
								<hr>
								<div class="field">
					                <label class="label-text">Change Date</label>
								    <div class="control">
								        <input class="input is-small" type="date"  v-model="date">
								    </div>
								</div>
					            <div class="field is-grouped">
								  <div class="control">
								    <button class="button is-link is-small" :class="{'is-loading': checking}" @click="getMyStudents">CHECK NOW</button>
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
		semester:'',
		batch:'',
		students:[],
		attendences:[],
		date:new Date(),
		checking:false,
	}
},
computed:{
	totalAbsent(){
        return this.attendences.filter(attendence => attendence.attendence == false);
	},
	totalPresent(){
        return this.attendences.filter(attendence => attendence.attendence == true);
	},
    myDepartment(){
    	return this.$store.state.departments.find(department => department.id == this.$store.state.faculty_user.department_id);
    },
    filterAttendences(){
        return this.attendences.filter(attendence => {
        	return attendence.semester_id.toLowerCase().includes(this.semester) && attendence.batch_id.toLowerCase().includes(this.batch);
        });
	},
},
mounted(){
	this.getMyStudents();
},
methods:{
	async updateAttendence(id){
        await this.$axios.$post(this.$store.state.api_url + '/faculty_members/attendences/update_single_attendence',{id:id})
        .then((response) => {
        	this.getTodayAttendence();
        })
        .catch((error) => {
        	swal("Failed to update","","error");
        });
	}, 
    getStudent(id){
        return this.students.find(student => student.id == id);
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
	async getMyStudents(){
		await this.$axios.$post(this.$store.state.api_url + '/faculty_members/students',{department_id : this.$store.state.faculty_user.department_id})
		.then((response) => {
			this.students = response.students;
			this.getTodayAttendence();
		});
	},
	async getTodayAttendence(){
		const attendences = await this.$axios.$post(this.$store.state.api_url + '/faculty_members/attendences/today_attendences',{department_id : this.$store.state.faculty_user.department_id,facultyuser_id : this.$store.state.faculty_user.id, date : this.$moment(this.date).format('YYYY-MM-DD')});
		this.attendences = attendences.attendences;
	}

},
}
</script>
<style scoped>
	.label-text{
		color: #92A8CA;
	    font-size: 14px;
	}
</style>