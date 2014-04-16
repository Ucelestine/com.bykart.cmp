/*
 * Jquery plugin
 * serialize a form to javascript object
 * returning a js object
 * 
 */

(function($) {
	$.fn.serializeObject = function()
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
						o[this.name] = [0[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
	};
})(jQuery);

