console.log('detailview loaded');
var pageBefore;
$(document).delegate('#detailView', 'pagebeforeshow', function(event, data) {
    pageBefore = data.prevPage.attr('id');
});

$(document).delegate("#detailView", "pageshow", function() {
	// for vimeo player
	var iframe = $('#vimeo-player')[0];
	var player = $f(iframe);
	var url = 'http://player.vimeo.com/video/' + fetchedData[currData].url + '?title=0&portrait=0&byline=0&api=1&autoplay=0';
	$('#backToBefore').click(function() {
		console.log('back');
		player.api('pause');
		// clear detailview
		$('#vimeo-player').attr('src', '');
		$('#detailNodeTitle').html('');
		$('#detailNodeAddress').html('');
		$('#detailNodeDesc').html('');
		$('#detailSeqNum').html('');
		$.mobile.changePage('#' + pageBefore, {
			transition: 'slide',
			reverse: true
		});
	});
	console.log('detailview refreshed');
	var WIDTH = sW - 32;
	$('#detailNodeTitle').html(fetchedData[currData].name);
	$('#detailNodeAddress').html(fetchedData[currData].address);
	$('#detailNodeVideo').css({
		'width': WIDTH,
		'height': WIDTH*9/16
	});
	$('#vimeo-player')
	.hide()
	.attr({
		'width': WIDTH,
		'height': WIDTH*9/16,
		'src': url
	});
	setTimeout(function() {
		$('#vimeo-player').fadeIn();
	}, 2000);
	// Auto play
	// setTimeout(function() {
	// 	player.api('play');
	// },1000);
	$('#detailSeqNum').html('[' + fetchedData[currData].ID + '/' + fetchedData.length + ']');
	$('#detailNodeDesc').html(fetchedData[currData].desc);
});