<template>
	<section class="hero is-fullheight is-light">
		<section class="section" style="margin-top: 30px;">
			<div class="columns is-centered">
				<div class="column is-5 ">
					<div class="card">
						<p style="padding-top: 14px;"><h5 class="has-text-centered title-text"> ASSIGNMENTS</h5></p>
						<hr>
						<div class="card" v-if="loading_assignments">
							<div class="card-content">
								<progress class="progress is-small is-link" max="100" >10%</progress>
							</div>
						</div>
						<section v-else>
							<div class="assignment-div" v-for="assignment in assignments.slice(0,slice_value)">
							  <div class="card-content">
							    <div class="media">
							      <div class="media-left">
							        <figure class="image is-24x24">
							          <img src="~assets/professor.png" alt="Placeholder image">
							        </figure>
							      </div>
							      <div class="media-content">
							        <p class="text-14">{{getFacultyName(assignment.facultyuser_id).name}}<span style="float: right;" class="text-12 has-text-grey-light"><time datetime="2016-1-1">{{$moment(assignment.created_at).format('h:mm:ss a')}} - {{$moment(assignment.created_at).format('DD MMM YYYY')}}</time></span></p>
							      </div>
							    </div>

							    <div class="content">
							      <a><nuxt-link :to="{name: 'student-assignments-id', params: { id:assignment} }"><span class="text-14">{{assignment.title}}</span></nuxt-link></a> <span style="float: right;"><span class="text-12" >DEADLINE - </span><span :class="$moment(assignment.deadline).format() < $moment(new Date()).format() ? 'has-text-danger' : 'has-text-success'">{{$moment(assignment.deadline).format('DD MMM YYYY')}}</span></span>
							    </div>
							  </div>
							</div>
							<p class="text-14 has-text-centered" style="margin-top: 16px;padding-bottom: 16px;" v-if="assignments.length>slice_value"><a @click="viewMore">VIEW MORE</a></p>
							<p class="text-14 has-text-centered" style="margin-top: 16px;padding-bottom: 16px;" v-else>NO MORE</p>
						</section>
					</div>
				</div>
			</div>
		</section>	
	</section>		
</template>
<script>
export default{
	layout : 'StudentLayout',
	middleware: 'userAuthenticated',
	data(){
		return{
           assignments:[],
           slice_value:10,
           loading_assignments:true,
		}
	},
	computed:{

	},
	mounted(){
      this.getMyAssignments();
	},
	methods:{
	  viewMore(){
        this.slice_value = Number(this.slice_value) + Number(10);
	  },
	  getFacultyName(id){
         return this.$store.state.faculty_users.find(user => user.id == id);
	  },
      async getMyAssignments(){
        await this.$axios.$post(this.$store.state.api_url + '/students/dashboard/get_my_assignments',{id: this.$store.state.auth_user.id})
        .then((response) =>{
        	this.assignments = response;
        	this.loading_assignments = false;
        });
      },
	}
}
</script>
<style scoped>
.modal-footer{
	margin-top: 18px;
}
.assignment-div{
	border-bottom: 1px solid #d6e5fa;
}
.title-text{
	color: #50649C;
}
</style>