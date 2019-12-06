export default function ({ store , redirect }){
  if( !store.state.faculty_token){
  	return redirect('/faculty_members/login');
  }
}