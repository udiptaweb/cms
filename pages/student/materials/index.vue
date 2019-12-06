<template>
	<section class="hero is-fullheight is-light">
		<section class="section" style="margin-top: 30px;">
			<div class="columns is-centered">
				<div class="column is-5 ">
					<div class="card">
						<p style="padding-top: 14px;"><h5 class="has-text-centered has-text-weight-semibold"> CLASS MATERIALS</h5></p>
						<hr>
						<div class="assignment-div" v-for="material in materials.slice(0,slice_value)">
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
						<p class="text-14 has-text-centered" style="margin-top: 16px;padding-bottom: 16px;" v-if="materials.length>slice_value"><a @click="viewMore">VIEW MORE</a></p>
						<p class="text-14 has-text-centered" style="margin-top: 16px;padding-bottom: 16px;" v-else>NO MORE</p>
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
           materials:[],
           slice_value:10,
		}
	},
	computed:{

	},
	mounted(){
      this.getMyMaterials();
	},
	methods:{
	  viewMore(){
        this.slice_value = Number(this.slice_value) + Number(10);
	  },
	  getFacultyName(id){
         return this.$store.state.faculty_users.find(user => user.id == id);
	  },
      async getMyMaterials(){
      	this.materials  = await this.$axios.$post(this.$store.state.api_url + '/students/dashboard/get_my_materials',{id: this.$store.state.auth_user.id});
      },
      viewMaterial(file){
      	window.open(file,"_blank");
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
</style>