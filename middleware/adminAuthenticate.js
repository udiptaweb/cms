export default function ({ store , redirect }){
  if( !store.state.admin_token){
  	return redirect('/admin/login');
  }
}