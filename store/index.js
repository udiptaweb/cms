export const strict = false;
export const state = () => ({
  counter: 0,
  auth_token:'',
  auth_user:'',
  admin_token:'',
  admin_user:'',
  employee_token:'',
  employee_user:'',
  faculty_user:'',
  faculty_token:'',
  api_url:'http://algorizon.in/api/cmsapi/api',
  departments:[],
  notifications:[],
  assignments:[],
  materials:[],
  batches:[],
  faculty_users:[],

})

export const mutations = {
  setTokenUser(state,{token,user}) {
  	state.auth_token = token;
  	state.auth_user = user;
  },
  resetTokenUser(state) {
    state.auth_token = '';
    state.auth_user = '';
  },
  resetAuthUser(state , user){
    state.auth_user = user;
  },
  setTokenAdmin(state,{token,user}) {
    state.admin_token = token;
    state.admin_user = user;
  },
  resetTokenAdmin(state) {
    state.admin_token = '';
    state.admin_user = '';
  },
  setTokenEmployee(state,{token,user}) {
    state.employee_token = token;
    state.employee_user = user;
  },
  resetTokenEmployee(state) {
    state.employee_token = '';
    state.employee_user = '';
  },
  setTokenFaculty(state,{token,user}) {
    state.faculty_token = token;
    state.faculty_user = user;
  },
  resetTokenFaculty(state) {
    state.faculty_token = '';
    state.faculty_user = '';
  },
  setDepartments(state , departments){
    state.departments = departments;
  },
  setNotifications(state , notifications){
    state.notifications = notifications;
  },
  setAssignments(state, assignments){
    state.assignments = assignments;
  },
  setMaterials(state, materials){
    state.materials = materials;
  },
  setBatches(state, batches){
    state.batches = batches;
  },
  setFacultyUsers(state , users){
    state.faculty_users = users;
  },
 
}

export const actions = {
  setTokenUser(context,{token,user}) {
  	context.commit('setTokenUser',{token,user});
  },
  resetTokenUser(context) {
  	context.commit('resetTokenUser');
  },
  setTokenAdmin(context,{token,user}) {
    context.commit('setTokenAdmin',{token,user});
  },
  resetTokenAdmin(context) {
    context.commit('resetTokenAdmin');
  },
  setTokenEmployee(context,{token,user}) {
    context.commit('setTokenEmployee',{token,user});
  },
  resetTokenEmployee(context) {
    context.commit('resetTokenEmployee');
  },
  setTokenFaculty(context,{token,user}) {
    context.commit('setTokenFaculty',{token,user});
  },
  resetTokenFaculty(context) {
    context.commit('resetTokenFaculty');
  },
  async GET_NOTIFICATIONS({commit}){
    const notifications = await this.$axios.$post(this.state.api_url + '/faculty_members/notifications',{facultyuser_id : this.state.faculty_user.id});
    commit('setNotifications', notifications.notifications);
  },
  async GET_DEPARTMENTS({commit}){

    const departments = await this.$axios.$get(this.state.api_url + '/departments');
    commit('setDepartments', departments.departments);
  },
  async GET_ASSIGNMENTS({commit}){
    const assignments = await this.$axios.$post(this.state.api_url + '/faculty_members/assignments',{facultyuser_id : this.state.faculty_user.id});
    commit('setAssignments', assignments.assignments);
  },
  async GET_MATERIALS({commit}){
    const materials = await this.$axios.$post(this.state.api_url + '/faculty_members/materials',{facultyuser_id : this.state.faculty_user.id});
    commit('setMaterials', materials.materials);
  },
  async GET_BATCHES({commit}){
    const batches = await this.$axios.$get(this.state.api_url + '/batches');
    commit('setBatches', batches.batches);
  },
  resetAuthUser(context , user){
    context.commit('resetAuthUser', user);
  },
  async GET_FACULTY_USERS({commit}){
    const users = await this.$axios.$get(this.state.api_url + '/students/faculty_users/show_all');
    commit('setFacultyUsers', users);
  },


}