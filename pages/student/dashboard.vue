<template>
	<section class="hero is-fullheight">
		<section class="section" style="margin-top: 30px;">
			<div class="columns">
				<div class="column is-5 ">
					<h5 class="has-text-centered has-text-weight-semibold"><span style="float: left;">RECENT ASSIGNMENTS</span> <nuxt-link to="/student/assignments"><span style="float: right;">VIEW ALL</span></nuxt-link></h5>
					<hr>
					<div class="card" v-for="assignment in assignments.slice(0,4)">
					  <div class="card-content">
					    <div class="media">
					      <div class="media-left">
					        <figure class="image is-24x24">
					          <img src="~assets/professor.png" alt="Placeholder image">
					        </figure>
					      </div>
					      <div class="media-content">
					        <p class="text-14 has-text-weight-semibold">{{getFacultyName(assignment.facultyuser_id).name}}<span style="float: right;" class="text-12 has-text-grey-light"><time datetime="2016-1-1">{{$moment(assignment.created_at).format('h:mm:ss a')}} - {{$moment(assignment.created_at).format('DD MMM YYYY')}}</time></span></p>
					      </div>
					    </div>

					    <div class="content">
					      <a><nuxt-link :to="{name: 'student-assignments-id', params: { id:assignment} }"><span class="text-12 has-text-weight-semibold">{{assignment.title}}</span></nuxt-link></a> <span style="float: right;"><span class="text-12 has-text-weight-semibold" >DEADLINE - </span><span :class="$moment(assignment.deadline).format() < $moment(new Date()).format() ? 'has-text-danger' : 'has-text-success'">{{$moment(assignment.deadline).format('DD MMM YYYY')}}</span></span>
					    </div>
					  </div>
					</div>
				</div>
				<div class="column is-5">
					<h5 class="has-text-centered has-text-weight-semibold"><span style="float: left;">RECENT MATERIALS</span> <nuxt-link to="/student/materials"><span style="float: right;">VIEW ALL</span></nuxt-link></h5>
					<hr>
                    <div class="card" v-for="material in materials.slice(0,4)">
					  <div class="card-content">
					    <div class="media">
					      <div class="media-left">
					        <figure class="image is-24x24">
					          <img src="~assets/professor.png" alt="Placeholder image">
					        </figure>
					      </div>
					      <div class="media-content">
					        <p class="text-14 has-text-weight-semibold">{{getFacultyName(material.facultyuser_id).name}}<span style="float: right;" class="text-12 has-text-grey-light"><time datetime="2016-1-1">{{$moment(material.created_at).format('h:mm:ss a')}} - {{$moment(material.created_at).format('DD MMM YYYY')}}</time></span></p>
					      </div>
					    </div>

					    <div class="content">
					      <a @click="viewMaterial(material.file)"><span class="text-12 has-text-weight-semibold">{{material.title}}</span></a> 
					    </div>
					  </div>
					</div>
				</div>
				<div class="column is-2">
					<h5 class="has-text-centered has-text-weight-semibold">NOTIFICATIONS</h5>
					<hr>
					<div class="notification-custom text-12" style="background-color: #d6e5fa;padding: 4px 5px;margin-bottom: 2px;color: #4d80e4;" v-for="notification in notifications">
					  <span><a @click="viewNotification(notification)">{{notification.title}}</a><p style="font-size: 10px;color: #293a80;">{{$moment(notification.created_at).format('DD MMM YYYY,h:mm:ss a')}}</p></span>
					</div>
					<div class="modal" :class="{'is-active' : showModal}">
					  <div class="modal-background"></div>
					  <div class="modal-card">
					    <section class="modal-card-body">
					    	<p class="text-18 has-text-centered has-text-link has-text-weight-semibold">{{view_notification.title}}</p>
					    	<hr>
					        <p v-html="view_notification.notification"></p>
					        <section class="modal-footer">
					        	<button class="button is-info is-small" @click="closeModal">Close</button>
					        </section>
					    </section>
					  </div>
					</div>
				</div>
			</div>
		</section>	
	</section>		
</template>
<script>
export default{
	async fetch({store}){
       await store.dispatch('GET_DEPARTMENTS');
       await store.dispatch('GET_BATCHES');
       await store.dispatch('GET_FACULTY_USERS');
	},
	layout : 'StudentLayout',
	middleware: 'userAuthenticated',
	data(){
		return{
           assignments:[],
           materials:[],
           notifications:[],
           view_notification:'',
           showModal: false,
		}
	},
	computed:{

	},
	mounted(){
      this.getMyAssignments();
      this.getMyMaterials();
      this.getMyNotifications();
	},
	methods:{
	  closeModal(){
         this.showModal = false;
	  },
	  viewNotification(notification){
        this.view_notification = notification;
        this.showModal = true;
	  },
	  getFacultyName(id){
         return this.$store.state.faculty_users.find(user => user.id == id);
	  },
      async getMyAssignments(){
        this.assignments = await this.$axios.$post(this.$store.state.api_url + '/students/dashboard/get_my_assignments',{id: this.$store.state.auth_user.id});
      },
      async getMyMaterials(){
      	this.materials  = await this.$axios.$post(this.$store.state.api_url + '/students/dashboard/get_my_materials',{id: this.$store.state.auth_user.id});
      },
      viewMaterial(file){
      	window.open(file,"_blank");
      },
      async getMyNotifications(){
        this.notifications = await this.$axios.$post(this.$store.state.api_url + '/students/dashboard/get_my_notifications',{id: this.$store.state.auth_user.id});
      }
	}
}
</script>
<style scoped>
.modal-footer{
	margin-top: 18px;
}
</style>