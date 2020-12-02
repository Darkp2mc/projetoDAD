<template>
	<div class="center">
        <p id="text">Food Home</p>
        <a id="text" class="login" href="#/login">Login</a>
        <p id="text" class="welcome">Welcome!</p>
        <a id="text" class="products" href="#/products">Products</a>
    </div>
</template>

<script>
	var text = document.getElementById('text');
	var newDom = '';
	var animationDelay = 6;

	for (let i = 0; i < text.innerText.length; i++) {
		newDom += '<span class="char">' + (text.innerText[i] == ' ' ? '&nbsp;' : text.innerText[i]) + '</span>';
	}

	text.innerHTML = newDom;
	var length = text.children.length;

	for (let i = 0; i < length; i++) {
		text.children[i].style['animation-delay'] = animationDelay * i + 'ms';
	}

	var welcomeSection = $('.center'),
		productsButton = welcomeSection.find('.products'),
		loginButton = welcomeSection.find('.login');

	setTimeout(function () {
		welcomeSection.removeClass('content-hidden');
	}, 500);

	productsButton.on('click', function () {
		welcomeSection.addClass('content-hidden').fadeOut();
	});
	loginButton.on('click', function () {
		welcomeSection.addClass('content-hidden').fadeOut();
	});
</script>


<script>
	export default {
		data: function () {
			return {

			}

		}
	}
</script>