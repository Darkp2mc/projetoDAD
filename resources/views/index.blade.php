<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Food @ Home</title>

	    <!-- Fonts -->
	    <link rel="dns-prefetch" href="//fonts.gstatic.com">
	    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

	    <!-- Styles -->
	    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
    	<div class="container" id="app" v-bind:guest="true">
    		

	    	@guest
	    		<Layout v-bind:guest="true" > </Layout>
	    	@else
	    		<Layout v-bind:guest="false" > </Layout>
	    	@endguest
        </div>
        <script src="js/app.js"></script>
    </body>
</html>
