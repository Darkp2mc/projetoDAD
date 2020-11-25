<template>
    <div>
    	<router-link to="/login">Login</router-link>
    	<a href="#" @click.prevent="logout">Logout</a>
    	<a v-if="logged" href="#" @click.prevent="myself">Myself</a>
    	<router-view></router-view>
    	<hr>
    </div>
</template>

<script>
import LayoutComponent from './components/layout'
export default {
		components: {
			'layout': LayoutComponent
		},
		data: {
			logged: null
		},
		methods: {
			logout () {
				axios.post('/api/logout').then(response => {
						console.log('User has logged out')
				})
				.catch(error => {
					console.log('Invalid Logout')
				})
			},
			myself () {
				axios.get('/api/users/me').then(response => {
					console.log('User currently logged:')
					console.dir(response.data)
				})
				.catch(error => {
					console.log('Invalid Request')
				})
			}
		},
		mounted: function(){
			axios.get('/api/users/me').then(response => {
				console.log('User currently logged:')
				console.dir(response.data)
				this.logged = false;
			})
			.catch(error => {
				console.log('Invalid Request')
				this.logged = true;
			})
		}

	}
</script>