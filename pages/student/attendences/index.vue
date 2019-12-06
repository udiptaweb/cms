<template>
	<section class="hero is-fullheight is-light">
		<section class="section-custom">
			<div class="columns is-centered">
				<div class="column is-9">
					<div class="card">
						<div class="card-content">
							<div class="columns">
								<div class="column">
									<h5 class="has-text-centered has-text-weight-semibold">ATTENDENCES</h5>
									<hr>
							        <no-ssr>
								       <v-calendar is-expanded :attributes="allAttendences"></v-calendar>
								    </no-ssr>
								</div>
							</div>
						</div>
	
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
	    		attributes: [
			      {
			        key: 'today',
			        highlight: 'indigo',
			        popover: {label:'Present'},
			        dates: new Date()
			      }
			    ],
			    attendences:[],
	    	}
	    },
	    computed:{
            allAttendences(){
				let attendences = this.attendences.filter(attendence => attendence.attendence==true);
				let i = 0;
				let attrs = [];
				for(i=0;i<attendences.length;i++){
				attrs.push({highlight:true,popover:{label:'Present'},dates:[new Date(this.$moment(attendences[i].date).format())]});
				}
				attendences = this.attendences.filter(attendence => attendence.attendence==false);
				i = 0;
				for(i=0;i<attendences.length;i++){
				attrs.push({highlight:'red',popover:{label:'Absent'},dates:[new Date(this.$moment(attendences[i].date).format())]});
				}
				attrs.push({
				highlight:'orange',
				popover:{label:'Sunday'},
				dates: {
				weekdays: [1]
				}
				});
				return attrs;
            },
	    },
	    mounted(){
	    	this.getAttendences();
	    },
	    methods:{
	    	async getAttendences(){
	    		const attendences = await this.$axios.$get(this.$store.state.api_url + `/students/my_attendences/${this.$store.state.auth_user.id}`);
		        this.attendences = attendences;
	    	}
	    }
	}
</script>