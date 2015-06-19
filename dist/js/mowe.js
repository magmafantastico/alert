/*!
 * Villa Mowe v0.6.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

$('#prices-scroll').click(function () {
	$("html, body").animate({
		scrollTop: $('#prices').offset().top
	}, '1200'
	);
});

$('.wow').click(function () {
	if (!$(this).hasClass('show')) {
		$(this).addClass('show');
	} else {
		$(this).removeClass('show');
	}
});

$('.navbar header .toggle').click(function () {
	$(this).closest('.navbar').find('.menu').toggleClass('show');
});

window.onload = function () {

	$('.block').scrollList({
		beforePadding: 65,
		startName: "block"
	});

	$('#prices .slide .nav>li').distinct({
		content: $("#prices .slide .content .pricelist"),
		defaultClass: $("#prices").attr("class"),
		startName: "slide",
		target: $("#prices")
	});

};

/* Mowe Distinct v0.1.0 */

(function ($) {

	/* Constructor of distinct functions */
	$.fn.distinct = function (options) {

		var settings = $.extend({
			content: "",
			defaultClass: "",
			startName: "",
			target: "body"
		}, options);

		$(settings.target).addClass("slide-1");

		$(this).click(function(index) {
			var string = "";

			if(settings.startName){
				string = settings.startName + "-" + ($(this).index() + 1);
			} else {
				string = $(this).attr("id") + "-" + ($(this).index() + 1);
			}

			$(settings.target).attr("class", settings.defaultClass + " " + string);

			$(settings.content[$(this).index()]).index();

		});
	};

}(jQuery));

/* Mowe ScrollList v1.0.0 */

(function ($) {

	/* Constructor of scrollList functions */
	$.fn.scrollList = function (options) {

		var settings = $.extend({
			beforePadding: 0,
			startName: "",
			target: "body"
		}, options);

		var addressListSettings = {
			beforePadding: settings.beforePadding,
			parent: settings.target,
			startName: settings.startName
		};

		var addressList = $(this).getAddress(addressListSettings);
		var element = this;
		var pastActive;

		$(window).resize(function () {
			addressList = $(element).getAddress(addressListSettings);
		});

		$(window).scroll(function () {
			var active = $(this).getScrollActiveItem(addressList);

			if (active != pastActive) {
				if (!$(settings.target).hasClass(active)) {

					if ($(settings.target).hasClass(pastActive)) {
						$(settings.target).removeClass(pastActive);
					}

					$(settings.target).addClass(active);

					pastActive = active;
				}
			}
		});
	};

	/* Get What Scroll Item is Active */
	$.fn.getScrollActiveItem = function (addressList) {

		var currentLocal;

		for (i = 0; i < addressList.length; i++) {
			if (addressList[i].address < $(window).scrollTop()) {
				currentLocal = addressList[i].name;
			}
		}

		if (currentLocal) {
			return currentLocal;
		} else {
			return null;
		}

	};

	/* Get Address List Function */
	$.fn.getAddress = function (options) {

		//beforePadding attr works now
		//parent attr is nonfunctional (at this version)
		//startName attr is optional
		var settings = $.extend({
			addAddressAttr: true,
			beforePadding: 0,
			parent: "body",
			startName: ""
		}, options);

		//Initializing the address list array
		var addressList = [];

		if (!settings.name) {

			this.each(function (index) {

				var name = "";

				if (!settings.startName) {
					//default
					name = $(this).attr("id");
				} else {
					//when a startName attr was declared
					name = settings.startName + "-" + (index + 1);
				}

				//fill the address list
				addressList.push({
					name: name,
					address: this.offsetTop - settings.beforePadding
				});

				if (settings.addAddressAttr) {
					$(this).attr("data-scroll-target", name);
				}

			});

			return addressList;

		}
	};

}(jQuery));

(function ($) {

	/* Insert HTML content to element */
	$.fn.insertHTML = function (content) {
		for(var a = this.length; a--; ) {
			this[a].innerHTML += content;
		}
	};

}(jQuery));

/* external funcs */

function getPosition(element) {
	var xPosition = 0;
	var yPosition = 0;

	while (element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return {x: xPosition, y: yPosition};
}

//get scroll position from top
function getScrollTop() {
	if (typeof pageYOffset != 'undefined') {
		//most browsers except IE before #9
		return pageYOffset;
	}
	else {
		var B = document.body; //IE 'quirks'
		var D = document.documentElement; //IE with doctype
		D = (D.clientHeight) ? D : B;
		return D.scrollTop;
	}
}

//removes class with prefix
jQuery.fn.removeClassLike = function (prefix) {
	var classes = this.attr("class").split(" ").filter(function (c) {
		return c.lastIndexOf(prefix, 0) !== 0;
	});
	return this.attr("class", classes.join(" "));
};