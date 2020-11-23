<template>
    <div>
    	<router-view></router-view>
    </div>
</template>

<script>
import LayoutComponent from './components/layout'
export default {
 components: {
 'layout': LayoutComponent
 }
}
</script>