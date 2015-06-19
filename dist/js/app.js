/*!
 * Mowe Webtal Project v0.9.9 (http://gomowe.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var _emailService = 'eduardo@noibe.com';
var _emailServiceURL = 'http://letsmowe.com/wtal/i/mail/';
var emailServiceCount = 4;
var emailServiceClickCount = 8;

/* CONTACT FUNCTIONS START HERE */

/**
 * Load and send the response
 */
var sendResponse;
sendResponse = function() {
	var a = $(this).parent();
	var aa = $(a).find('[name=name]').val();
	var ab = $(a).find('[name=phone]').val();
	var ac = document.getElementById('city').value;

	// Test number of clicks to request (MAX = 4)
	if (emailServiceClickCount > 0) {

		// Test if fields are null
		if ((aa.length > 0) && (ab.length > 0)) {

			emailServiceClickCount--;
			var b = $(a).parent().parent();
			var	c = {
				city: ac,
				name: aa,
				phone: ab,
				product: $(a).find('.title').html(),
				reference: $(b).attr('data-product-reference'),
				mail: _emailService
			};
			// Test number of requests (MAX = 4)
			if (emailServiceCount > 0) {
				$.ajax({
					cache: false,
					data: c,
					error: function(data) {
						$(a).removeClass('active-form');
						$(a).addClass('fail');
					},
					success: function(data) {
						$(a).removeClass('active-form');
						$(a).addClass('success');
						emailServiceCount--;
					},
					url: _emailServiceURL
				});
			} else {
				$(a).removeClass('active-form');
				$(a).addClass('fail');
			}
		} else {
			alert('Campos vazios');
		}
	} else {
		$(a).removeClass('active-form');
		$(a).addClass('fail');
	}
};

/**
 * Handler of send button to calls the sendResponse function
 */
var toggleForm;
toggleForm = function() {
	// Remove Success and Fail class and fix de title
	$('.pricelist .content > .success').removeClass('success').
			find('[data-toggle=contact-form]').
			html('Assine Já');
	$('.pricelist .content > .fail').removeClass('fail').
			find('[data-toggle=contact-form]').
			html('Assine Já');

	// Get the Parent and some possible element with form enabled
	var a = $(this).parent(), b, c;

	// If the current element has active, disable it
	if ($(a).hasClass('active-form')) {
		$(a).removeClass('active-form');
		// Fix the title of button
		$(a).find('[data-toggle=contact-form]').html('Assine Já');
		b = true;
	}

	// Disable the form of any element with form enabled
	c = $('.pricelist .content > .active-form');
	if (c.length) {
		$(c).removeClass('active-form');
		// Fix the title of button of enabled itens
		$(c).find('[data-toggle=contact-form]').html('Assine Já');
	}

	// IF var b is ok, enable the form of current element
	if (!b) {
		// Enable the form of current element
		$(a).addClass('active-form');

		// Add the fallback to title of button
		$(this).html('Voltar');

		$(a).find('[name=name]').focus();
	}

};

/**
 * Append the form and add the lister events
 */
var appendForm;
appendForm = function() {
	var contactForm = '<a class="action user-unselect cursor-pointer toggle-contact-form">Assine Já</a>' +
			'<input type="text" class="contact-form" name="name" placeholder="Nome" autocomplete="off"/>' +
			'<input type="tel" class="contact-form" name="phone" placeholder="Telefone (apenas números)" autocomplete="off" maxlength="11"/>' +
			'<input type="submit" class="contact-form action response-send user-unselect cursor-pointer" value="Solicitar Contato!"/>' +
			'<span class="action sent">Obrigado! :D<br/>Entraremos em contato em breve!</span>' +
			'<span class="action not-sent">Ops! :(<br/>Houve algum problema! Tente novamente mais tarde!</span>';

	// Do the append
	$('.pricelist .content > li').insertHTML(contactForm);

	var toggleFormBtn = document.getElementsByClassName('toggle-contact-form');
	var sendBtn = document.getElementsByClassName('response-send');

	var i;

	for (i = toggleFormBtn.length; i--; )
		toggleFormBtn[i].addEventListener('click', toggleForm);

	for (i = sendBtn.length; i--; )
		sendBtn[i].addEventListener('click', sendResponse);
};

/* CONTACT FUNCTIONS ENDS HERE */

/**
 * Set the margin of ruler element
 * @param a target element (ruler)
 * @param n number of nodes
 */
var citySetMargin;
citySetMargin = function(a, n) {
	a.style.marginLeft = n * 100 + '%';
};

/**
 * Set the class based on value
 * @param a event target
 * @param b target element (ruler)
 * @param v value
 */
var citySetClass;
citySetClass = function(a, b, v) {
	for (var i = a.length; i--; )
		b.classList.remove(a[i].value);
	b.classList.add(v);
};

/**
 * Get the node index
 * @param a event target
 * @param v value
 * return int
 */
var cityGetIndex;
cityGetIndex = function(a, v) {
	for (var i = a.length; i--; )
		if (a[i].value == v)
			return -i;
	return 0;
};

/**
 * Do the distinct
 * @param a event target
 * @param b target element (ruler)
 */
var doCityDistinct;
doCityDistinct = function(a, b) {
	var n, v;

	v = a.value;
	n = cityGetIndex(a.children, v);

	citySetClass(a.children, b, v);
	citySetMargin(b, n);
};

/**
 * Handler the functions to init the distinct
 */
var cityHandler;
cityHandler = function() {
	doCityDistinct(this, this.b);
};

/**
 * Add event listener to element
 * @param a element
 * @param b target element (ruler)
 */
function distinctCity (a, b) {
	a.addEventListener('change', cityHandler, false);
	a.b = b;
	doCityDistinct(a, b);
}

/**
 * Wipe Lib Venus
 */
function doWipe(a) {
	for (var i = a.length; i--; )
		a[i].style.width = a[i].getElementsByClassName('frame').length * 100 + '%';
}

window.addEventListener('load', appendForm);
