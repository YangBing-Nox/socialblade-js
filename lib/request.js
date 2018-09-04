const http = typeof fetch == 'function' ? fetch : require('node-fetch');
const base = "https://api.socialblade.com/v2";

toQueryString = params => Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');

module.exports = function (uri, options = {}) {
	let auth = {
		...this.client,
		CUSTOM_REFER: "Tim's JS Lib"
	}
	auth = Object.assign({}, ...Object.keys(auth).map(k => { if (auth[k]) return { [k]: auth[k] } }))

	if (typeof options.headers != "object") options.headers = {};
	options.headers["User-Agent"] = "Tim's JavaScript Library :: TimothyCole/socialblade-js";
	if (auth.user && auth.email && auth.token)
		options.headers["Authorization"] = `${auth.email}::${auth.token}`;

	const qs = typeof options.qs == "object" ? `?${toQueryString({ ...options.qs, ...auth })}` : "";
	return http(`${base}${uri}${qs}`, options);
};