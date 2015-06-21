var url = 'http://noibe.com/old/';
url = 'https://google.com/';

var timeout = 15000;


/**
 * Creates and loads an image element by url.
 * @param  {String} url
 * @return {Promise} promise that resolves to an image element or
 *                   fails to an Error.
 */
var request_image = function (url) {
	return new Promise(function (resolve, reject) {
		var img = new Image();
		img.onload = function () {
			resolve(img);
		};
		img.onerror = function () {
			reject(url);
		};
		img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
	});
};

/**
 * Pings a url.
 * @param  {String} url
 * @param  {Number} multiplier - optional, factor to adjust the ping by.  0.3 works well for HTTP servers.
 * @return {Promise} promise that resolves to a ping (ms, float).
 */
var ping = function (url, multiplier) {
	return new Promise(function (resolve, reject) {
		var start = (new Date()).getTime();
		var response = function () {
			var delta = ((new Date()).getTime() - start);
			delta *= (multiplier || 1);
			resolve(delta);
		};
		request_image(url).then(response).catch(response);

		// Set a timeout for max-pings, 5s.
		setTimeout(function () {
			reject(Error('Timeout'));
		}, timeout);
	});
};

var doOffline = function (el) {
	el.classList.remove('online');
	if (!el.classList.contains('offline'))
		el.classList.add('offline')
};

var doOnline = function (el) {
	el.classList.remove('offline');
	if (!el.classList.contains('online'))
		el.classList.add('online')
};

var do_ping = function (el) {
	var u;
	u = alerts.address;
	u += ':';
	u += el.getElementsByClassName('port')[0].innerHTML;
	ping(u).then(function (delta) {
		doOnline(el);
		console.log(u + ' (conectado em ' + delta + 'ms)');
	}).catch(function (error) {
		doOffline(el);
		console.log(u + ' (não conectado, enviando e-mail)');
	});
};

var buildAlert = function (name, port) {
	var a, ad, n, status;

	a = document.createElement('div');
	a.classList.add('alert');

	ad = document.createElement('span');
	ad.classList.add('name');
	var ada = document.createTextNode(name);
	ad.appendChild(ada);

	n = document.createElement('span');
	n.classList.add('port');
	var na = document.createTextNode(port);
	n.appendChild(na);

	status = document.createElement('span');
	status.classList.add('status');

	a.appendChild(status);
	a.appendChild(ad);
	a.appendChild(n);

	return a;
};

var buildAlerts = function () {
	var a, b;

	a = document.body;

	for (var i = 0; i < alerts.ports.length; i++) {
		var el = alerts.ports[i];
		b = buildAlert(el.name, el.port);
		a.insertBefore(b, a.lastChild);
	}
};

var alertList = document.getElementsByClassName('alert');

var runAlertList = function () {
	for (var i = alertList.length; i--;)
		do_ping(alertList[i]);
};

var intervalRun;

var run = function() {
	buildAlerts();
	runAlertList();
	intervalRun = window.setInterval(runAlertList, timeout);
};

window.addEventListener('load', run);