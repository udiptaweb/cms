<template>
	<div>
		<section>
	        <NavigationBar></NavigationBar>
	    </section>
	    <section>
            <nuxt/>
	    </section>
	</div>
</template>
<script>
import NavigationBar from '~/components/student/NavigationBar.vue'
import SideBar from '~/components/student/SideBar.vue'
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