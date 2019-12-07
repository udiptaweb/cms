<template>
	<div class="faculty-layout">
		<section>
	        <NavigationBar></NavigationBar>
	    </section>
        <div class="columns" style="">
            <div class="column is-2 is-sidebar-menu is-hidden-mobile is-sticky" style="">
            	<div class="container" style="margin-top: 60px;margin-left: 14px;">
            		<SideBar></SideBar>
            	</div>
            </div>
            <div class="column content-main">
                <nuxt/>
            </div>
        </div>
	</div>
</template>
<script>
import NavigationBar from '~/components/faculty/NavigationBar.vue'
import SideBar from '~/components/faculty/SideBar.vue'
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
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
}
.is-sticky{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: #181823;
}
.content-main{
    background-color: #EAF0F7;
    min-height: 100vh;
}
.faculty-layout{
    font-family:Poppins,sans-serif;
}
</style>