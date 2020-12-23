<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Food @ Home</title>
    <style type="text/css">
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            background-color: black;
            font-family: Calibri, sans-serif;
        }

        .center {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        p {
            width: 70%;
            font-size: 30px;
            display: block;
            text-align: center;
        }

        .char {
            font-size: 40px;
            height: 40px;
            animation: an 1s ease-out 1 both;
            display: inline-block;
        }

        @keyframes an {
            from {
                opacity: 0;
                transform: perspective(500px) translate3d(-35px, -40px, -150px) rotate3d(1, -1, 0, 35deg);
            }

            to {
                opacity: 1;
                transform: perspective(500px) translate3d(0, 0, 0);
            }
        }

        .products{
            opacity: .5;
            color: black;
            font-size: 20px;
            position: absolute;
            transform: translate3d(100px, 60px,0);
            animation: prod 1s ease-out 1 both 1s;
        }

        @keyframes prod {
            0% {
                opacity: 0;
                transform: translate3d(-35px, 0,0);
            }
            50%{
                opacity: .5;
                transform: translate3d(-35px, 40px,0);
            }

            100% {
                transform: translate3d(-50px, 40px,0);
            }
        }

        .products:hover{
            font-size: 170%;
            color: green;
        }


        .login{
            opacity: .5;
            font-size: 20px;
            position: absolute;
            transform: translate3d(100px, 60px,0);
            animation: log 1s ease-out 1 both 1s;
            color: black;
        }

        .login:hover{
            font-size: 170%;
            color: green;
        }

        @keyframes log {
            0% {
                opacity: 0;
                transform: translate3d(35px, 0,0);
            }

            50%{
                opacity: .5;
                transform: translate3d(35px, 40px,0);
            }

            100% {
                
                transform: translate3d(55px, 40px,0);
            }
        }
        
        .welcome{
            opacity: .5;
            font-size: 20px;
            position: absolute;
            animation: welcome 1s ease-out 1 both 1s;
        }

        @keyframes welcome {
            0% {
                opacity: 0;
                transform: translate3d(0, 0,0);
            }

            100% {
                transform: translate3d(0, -40px,0);
            }
        }

        form.searchBarProducts input[type=text] {
          padding: 10px;
          font-size: 17px;
          border: 1px solid grey;
          float: left;
          width: 80%;
          background: #f1f1f1;
        }

        form.searchBarProducts button {
          float: left;
          width: 20%;
          padding: 10px;
          background: #2196F3;
          color: white;
          font-size: 17px;
          border: 1px solid grey;
          border-left: none;
          cursor: pointer;
        }

        form.searchBarProducts button:hover {
          background: #0b7dda;
        }

        form.searchBarProducts::after {
          content: "";
          clear: both;
          display: table;
        }

    </style>


    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" >
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>

    <div class="container" id="app">
        <!-- v-bind:guest="true"

        @guest
        <Layout v-bind:guest="true"> </Layout>
        @else
        <Layout v-bind:guest="false"> </Layout>
        @endguest

        -->
    </div>

    <script src="js/app.js"></script>
</body>

</html>