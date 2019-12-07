<template>
	<section class="section" style="margin-top: 30px;">
		<div class="columns">
			<div class="column">
				<nav class="breadcrumb is-right has-arrow-separator is-small" aria-label="breadcrumbs">
				  <ul class="has-text-weight-semibold">
				    <li><nuxt-link to="/admin/dashboard">Dashboard</nuxt-link></li>
				    <li class="is-active"><nuxt-link to="/admin/batches">Batches</nuxt-link></li>
				  </ul>
				</nav>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<div class="card">
					<div class="card-content">
						<div class="columns">
							<div class="column">
								<div class="tabs is-centered is-boxed is-small">
								  <ul class="has-text-weight-semibold">
								    <li :class="breadcrumb=='batches'?'is-active':''">
								      <a @click="setBreadcrumb('batches')">
								        <span class="icon is-small"><i class="fa fa-building" aria-hidden="true"></i></span>
								        <span>Batches</span>
								      </a>
								    </li>
								    <li :class="breadcrumb=='create_new'?'is-active':''">
								      <a @click="setBreadcrumb('create_new')">
								        <span class="icon is-small"><i class="fa fa-edit" aria-hidden="true"></i></span>
								        <span>Create New Batch</span>
								      </a>
								    </li>
								  </ul>
								</div>
							</div>
						</div>
						<div class="columns" v-if="breadcrumb=='batches'">
							<div class="column text-14">
								<div class="table-container" v-if="$store.state.batches.length>0">
									<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
									  <thead>
									    <tr>
									      <th>Department</th>
									      <th>Status</th>
									      <th>Action</th>
									    </tr>
									  </thead>
									  <tbody>
									    <tr v-for="batch in $store.state.batches">
									      <td>
									      	<a href="#">{{batch.title}}</a>
									      	<a>
									      	<span style="float: right;font-size: 12px;" @click="setInputId(batch)"><i class="fa fa-edit" aria-hidden="true" ></i></span>
									        </a>
									      	<div class="field is-grouped" v-if="batch.id==show_input_id">
											  <p class="control is-expanded">
											    <input class="input is-small" type="text" v-model="edit_batch.title">
											  </p>
											  <p class="control">
											    <a class="button is-info is-small" @click="updateBatch(batch.id)">
											      Update
											    </a>
											  </p>
											</div>
									      </td>
									      <td><button class="button is-outlined is-small" :class="batch.status==true?'is-success':batch.status==false?'is-primary':''" @click="toggleBatchStatus(batch.id)"><span v-if="batch.status==true">Active</span><span v-if="batch.status==false">Disabled</span></button></td>
									      <td>
									      	<button class="button is-outlined is-danger is-small" @click="removeBatch(batch.id)">Delete</button>
									      </td>
									    </tr>
									  </tbody>
									</table>
								</div>
								<h5 v-else class="title is-5 has-text-centered">No Batches added</h5>
							</div>
						</div>
						<div class="columns" style="justify-content: center;" v-if="breadcrumb=='create_new'">
							<div class="column is-6-tablet is-5-desktop is-4-widescreen">
								<div class="field is-grouped">
								  <p class="control is-expanded">
								    <input class="input is-small" type="text" placeholder="Enter the title" v-model="batch">
								  </p>
								  <p class="control">
								    <a class="button is-info is-small" :class="{'is-loading' : creating}" @click="createNewBatch">
								      Create
								    </a>
								  </p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default{
	async fetch({store,params}){
        await store.dispatch('GET_BATCHES');
	},
	layout: 'AdminLayout',
	middleware : 'adminAuthenticate',
	data(){
		return{
			breadcrumb:'batches',
			batch:'',
			show_input_id:'',
			edit_batch:'',
			creating:false,
		}
	},
	methods:{
		setInputId(batch){
			if(this.show_input_id!=batch.id){
				this.show_input_id=batch.id;
                this.edit_batch=batch;
			}else{
				this.show_input_id='';
                this.edit_batch='';
			}
		},
		setBreadcrumb(breadcrumb){
	        this.breadcrumb=breadcrumb;
		},
		async updateBatch(id){
            await this.$axios.$post(this.$store.state.api_url + '/batches/updateTitle',{id:id,title:this.edit_batch.title})
		    .then((response)=>{
		        this.$store.dispatch('GET_BATCHES');
		        this.show_input_id='';
		        this.edit_department='';
		        this.$swal("Updated Batch Title","","success");
		    })
		    .catch((error)=>{
		    	this.$swal("Failed to update !","","error");
		    });
		},
		async createNewBatch(){
			this.creating = true;
            await this.$axios.$post(this.$store.state.api_url + '/batches/create_new',{title:this.batch})
		    .then((response) => {
		        this.$swal("Created New Batch!!","","success");
		        this.$store.dispatch('GET_BATCHES');
		        this.breadcrumb = 'batches';
		        this.department = '';
		    })
		    .catch((error)=>{
		    	this.creating = false;
		    	this.$swal("Failed to Create !!","","error");
		    })
		    .finally(()=>{
                this.creating = false;
		    });
		},
		removeBatch(id){
	        swal({
			  title: "Are you sure?",
			  text: "Once deleted , you will not be able to recover again",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
			    this.confirmRemoveBatch(id);
			  } 
			});
		},
		async confirmRemoveBatch(id){
            await this.$axios.$post(this.$store.state.api_url + '/batches/remove',{id:id})
		    .then((response)=>{
		        this.$store.dispatch('GET_BATCHES');
		    })
		    .catch((error)=>{
		    	this.$swal("Failed to delete","","error")
		    });
		},
		async toggleBatchStatus(id){
           await this.$axios.$post(this.$store.state.api_url + '/batches/toggleStatus',{id:id})
		    .then((response)=>{
		        this.$store.dispatch('GET_BATCHES');
		        this.$swal("Updated Status","","success");
		    })
		    .catch((error)=>{
		    })
		    .finally(()=>{

		    });
		},

	}
}
</script>