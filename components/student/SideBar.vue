<template>
	<aside class="menu" style="position:sticky!important;">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><a href="/admin/dashboard">Dashboard</a></li>
      <li><a>Customers</a></li>
    </ul>
    <p class="menu-label">
      User Management
    </p>
    <ul class="menu-list">
      <li><a href="/admin/subemployees">Sub Employees</a></li>
      <li><a href="/admin/students">Students</a></li>
    </ul>
    <p class="menu-label">
      Faculty Management
    </p>
    <ul class="menu-list">
      <li><a href="/admin/departments">Departments</a></li>
      <li><a href="/admin/semesters">Semesters</a></li>
      <li><a href="/admin/faculty_members">Faculty Members</a></li>
    </ul>
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><a>Dashboard</a></li>
      <li><a>Customers</a></li>
    </ul>
    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">
      <li><a>Team Settings</a></li>
      <li>
        <a  :class="{'is-active':viewManageTeam}" @click="toggleManageManageTeam">Manage Your Team <i class="fa fa-caret-right" aria-hidden="true"></i></a>
        <ul v-if="viewManageTeam">
          <li><a>Members</a></li>
          <li><a>Plugins</a></li>
          <li><a>Add a member</a></li>
        </ul>
      </li>
      <li><a>Invitations</a></li>
      <li><a>Cloud Storage </a></li>
      <li><a>Authentication</a></li>
    </ul>
    <p class="menu-label">
      Transactions
    </p>
    <ul class="menu-list">
      <li><a>Payments</a></li>
      <li><a>Transfers</a></li>
      <li><a>Balance</a></li>
    </ul>
  </aside>
</template>
<script>
	export default{
		data(){
			return{
				viewManageTeam:false,
			}
		},
		methods:{
			toggleManageManageTeam(){
				this.viewManageTeam=!this.viewManageTeam;
			},
		}
	}
</script>
<style type="text/css">

</style>