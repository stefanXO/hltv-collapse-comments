var $ = jQuery;

$(function() {

	function postClick() {
		console.log($(this));
		var el = $(this).parent().parent().parent();
		toggleComment(el);
	}

	function toggleComment(el) {
		console.log(id);
		var id = $(el).attr('id');
		var results = $(el).nextUntil('.post');
		// var a = 0;
		for(i=0;i<results.length;i++) {
			if($(results[i]).hasClass('threading')) {
				// a++;
				$(results[i]).toggle();
			}else{
				// if($(results[i]).find('.threading').length > 0) a++;
				$(results[i]).find('.threading').toggle();
			}
		}
		//if(a == 0) return;
		if(!$(el).hasClass('show-comment') && !$(el).hasClass('hide-comment')) {
			$(el).addClass('hide-comment');
		}else{
			$(el).toggleClass('hide-comment');
			$(el).toggleClass('show-comment');
		}
		$(el).find('.thread-collapse.open').html('[+]&nbsp;');
		$(el).find('.thread-collapse.closed').html('[-]&nbsp;');
		$(el).find('.thread-collapse').toggleClass('closed').toggleClass('open');
		if($(el).hasClass('show-comment')) {
			localforage.removeItem(id);
		}
		if($(el).hasClass('hide-comment')) {
			localforage.setItem(id, (new Date().getTime()));
		}
	}

	$('<span class="thread-collapse open">[-]&nbsp;</span>').insertBefore('.replyNum');
	$('.thread-collapse').off('click');
	$('.thread-collapse').on('click', postClick);

	var postItems = $('.post');
	var postIds = [];
	for(var i=0;i<postItems.length;i++) {
		postIds.push($(postItems[i]).attr('id'));
	}
	// console.log(postIds);

	localforage.keys().then(function(keys) {
		// console.log(keys);
		for(var i=0;i<postIds.length;i++) {
			if(keys.includes(postIds[i])) {
				toggleComment($('#'+postIds[i]));
			}
		}
	}).catch(function(err) {
		// This code runs if there were any errors
		console.log(err);
	});


});

console.log("hltv collapse comments extension loaded")



