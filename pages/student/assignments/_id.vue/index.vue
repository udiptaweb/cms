<template>
	<section class="hero is-fullheight is-light">
		<section class="section-custom">
			<div class="columns is-centered">
				<div class="column is-9">
					<div class="card">
						<div class="card-content">
							<div class="columns">
								<div class="column">
									<h5 class="has-text-centered has-ext-weight-semibold">ASSIGNMENT</h5>
									<hr>
									<div class="assignment" v-html="assignment.content">
										
									</div>
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
				assignment:'',
			}
		},
		mounted(){
			this.assignment = this.$route.params.id;
		}
	}
</script>	