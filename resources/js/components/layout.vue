<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        <li class="nav-item" v-if="guest">
                            <a class="nav-link" v-bind:href="/#/">Login</a>
                        </li>
                        <li class="nav-item" v-if="guest">
                            <a class="nav-link" v-bind:href="/#/">Register</a>
                        </li>
                        <li class="nav-item dropdown" v-if="!guest">
                             <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                {{ username }}
                            </a>
                             <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" v-bind:href="/#/" @click.prevent="logout">
                                   Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
        
    </div>
</template>
<script>
export default {
    props: ['guest'],
    data: function(){
        return {
            log: true,
            username: "teste"
        };
    },
    mounted () {
        this.log = this.guest;
        console.log(this.guest);
    },
    methods: {
        logout: function () {
            this.log = true;
        }   

    }
}
</script>