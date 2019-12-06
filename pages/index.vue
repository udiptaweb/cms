<template>
  <div>
    <section class="hero is-large is-info" >
      <div class="hero-body">
        
      </div>
    </section>
    <section class="section">
      <div class="upload-row-title">
        <h5 class="title-custom is-size-3-desktop has-text-centered">RECENT UPLOADS</h5>
      </div>
      <div class="columns is-multiline" v-if="materials.length>0">
           <div class="column is-3" v-for="material in materials.slice(0,slice_value)">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="~assets/professor.png" alt="Uploader">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="card-title is-size-6-desktop">{{getUploaderName(material.facultyuser_id).name}}</p>
                      <p class="card-subtitle is-size-7-desktop">{{getDepartmentSemester(material.department_id , material.semester_id).department.title}} , {{getDepartmentSemester(material.department_id , material.semester_id).semester.title}}</p>
                    </div>
                  </div>

                  <div style="padding-right: 0px;">
                    <a @click="viewMaterial(material.file)"><p class="material-post-title ">{{material.title.substring(0,33)}}</p></a>
                    <br>
                    <time datetime="" class="is-size-7 has-text-weight-semibold has-text-grey-light">{{$moment(material.created_at).format('h:mm:ss a')}} - {{$moment(material.created_at).format('DD MMM YYYY')}}</time>
                  </div>
                </div>
              </div>
           </div>
           <div class="column is-3 is-centered">
              <a  @click="viewMoreMaterial" v-if="materials.length>slice_value"><img src="~assets/right.png" width="25%" style="margin-top: 20%;"></a>
           </div>
      </div>
      <div class="columns is-centered" v-else>
           <div class="column is-3">
             <progress class="progress is-small is-primary" max="100">15%</progress>
           </div>
      </div>
    </section>
     <section class="section">
      <div class="upload-row-title">
        <h5 class="title-custom is-size-3-desktop has-text-centered">ASSIGNMENTS</h5>
      </div>
      <div class="columns is-multiline" v-if="assignments.length>0">
         <div class="column is-3" v-for="assignment in assignments.slice(0,slice_value_ass)">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img src="~assets/professor.png" alt="Uploader">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="card-title is-size-6-desktop">{{getUploaderName(assignment.facultyuser_id).name}}</p>
                    <p class="card-subtitle is-size-7-desktop">{{getDepartmentSemester(assignment.department_id , assignment.semester_id).department.title}} , {{getDepartmentSemester(assignment.department_id , assignment.semester_id).semester.title}}</p>
                  </div>
                </div>

                <div style="padding-right: 0px;">
                  <a ><nuxt-link :to="{name: 'assignments-id', params: { id:assignment} }"><p class="material-post-title">{{assignment.title.substring(0,40)}}</p></nuxt-link></a>
                  <br>
                  <time datetime="" class="is-size-7 has-text-weight-semibold has-text-grey-light">{{$moment(assignment.created_at).format('h:mm:ss a')}} - {{$moment(assignment.created_at).format('DD MMM YYYY')}}</time>
                </div>
              </div>
            </div>
         </div>
         <div class="column is-3 is-centered">
            <a  @click="viewMoreAssignment" v-if="assignments.length>slice_value_ass"><img src="~assets/right.png" width="25%" style="margin-top: 20%;"></a>
         </div>
      </div>
      <div class="columns is-centered" v-else>
         <div class="column is-3">
           <progress class="progress is-small is-primary" max="100">15%</progress>
         </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  async fetch({store}){
     await store.dispatch('GET_FACULTY_USERS');
     await store.dispatch('GET_DEPARTMENTS');
  },
  data(){
    return{
      materials:[],
      faculty_members:[],
      departments:[],
      slice_value:7,
      slice_value_ass:7,
      assignments:[],
    }
  },
  mounted(){
    //this.getFacultyMembers();
    this.getRecentMaterials();
    this.getRecentAssignments();
  },
  methods:{
    viewMaterial(file){
      window.open(file,"_blank");
    },
    viewMoreMaterial(){
      this.slice_value = Number(this.slice_value) + Number(4);
    },
    viewMoreAssignment(){
      this.slice_value_ass = Number(this.slice_value_ass) + Number(4);
    },
    getDepartmentSemester(id_dept , id_sem){
       let dept = this.$store.state.departments.find(department => department.id == id_dept);
       let semester = dept.semesters.find(semester => semester.id == id_sem);
       return {department:dept , semester:semester};
    },
    getUploaderName(id){
      return this.$store.state.faculty_users.find(member => member.id == id);
    },
    // async getFacultyMembers(){
    //   await this.$axios.$get('http://algorizon.in/api/cmsapi/api' + '/students/faculty_users/show_all')
    //   .then((response) =>{
    //      this.faculty_members = response;
    //      this.getDepartments();
    //   });
    // },
    async getRecentMaterials(){
      this.materials = await this.$axios.$get('http://algorizon.in/api/cmsapi/api'+ '/public/recent_materials');
    },
    // async getDepartments(){
    //   await this.$axios.$get('http://algorizon.in/api/cmsapi/api' + '/departments')
    //   .then((response) =>{
    //     this.departments = response.departments;
    //     this.getRecentMaterials();
    //     this.getRecentAssignments();
    //   });
      
    // },
    async getRecentAssignments(){
       this.assignments = await this.$axios.$get('http://algorizon.in/api/cmsapi/api'+ '/public/recent_assignments');
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title-custom{
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  color: #35495e;
  letter-spacing: 1px;
}
.card-title{
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  color: #35495e;
  letter-spacing: 1px; 
}
.card-subtitle {
  font-weight: 400;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.hero-body{
  background-image: url('~assets/hero1.png');background-repeat:no-repeat;background-size:100% 100%;
}
.upload-row-title{
  margin-bottom: 30px;
}
.material-post-title{
  text-align: justify;
  text-justify: inter-word;
  font-size: 14px;
}
</style>
