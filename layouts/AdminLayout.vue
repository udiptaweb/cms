<template>
	<div>
		<section>
	        <NavigationBar></NavigationBar>
	    </section>
	    <section >
	        <div class="columns is-desktop is-fullheight" style="">
	          <div class="column is-2 is-sidebar-menu is-hidden-mobile is-sticky" style="">
	          	<div class="container" style="margin-top: 30px;margin-left: 14px;">
	          		<SideBar></SideBar>
	          	</div>
	          </div>
	          <div class="column content-main">
	            <nuxt/>
	          </div>
	        </div>
	    </section>
	    
	</div>
</template>
<script>
import NavigationBar from '~/components/admin/NavigationBar.vue'
import SideBar from '~/components/admin/SideBar.vue'
export default{
	components:{
		NavigationBar,
		SideBar,
	},
}
</script>
<style scoped>
.is-sidebar-menu{
    overflow-y:scroll;
    min-height: 80vh;
    max-height: 90vh; 
    height: 90vh;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
}
.is-sticky{
position: -webkit-sticky;
position: sticky;
top: 0;
}
</style>