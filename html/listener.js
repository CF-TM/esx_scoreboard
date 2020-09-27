var visable = false;
$(function () {
	window.addEventListener('message', function (event) {
		switch (event.data.action) {
		case 'toggle':
			if (visable) {
				$('#wrap').fadeOut();
			} else {
				$('#wrap').fadeIn();
			}
			if (visable) {
				$('#wrap2').fadeOut();
			} else {
				$('#wrap2').fadeIn();
			}
			visable = !visable;
			break;
		case 'close':
			$('#wrap').fadeOut();
			visable = false;
			break;
		case 'toggleID':
			if (event.data.state) {
				$('td:nth-child(2),th:nth-child(2)').show();
				$('td:nth-child(5),th:nth-child(5)').show();
			} else {
				$('td:nth-child(2),th:nth-child(2)').hide();
				$('td:nth-child(5),th:nth-child(5)').hide();
			}
			break;
		case 'scrollUP':
			$("#style-1").scrollTop($("#style-1").scrollTop() - 100);
			break;
		case 'scrollDOWN':
			$("#style-1").scrollTop($("#style-1").scrollTop() + 100);
			break;
		case 'updatePlayerJobs':
			var jobs = event.data.jobs;
			$('#player_count').html(jobs.player_count);
			$('#ems').html(jobs.ems);
			$('#police').html(jobs.police);
			$('#taxi').html(jobs.taxi);
			$('#mechanic').html(jobs.mechanic);
			$('#cardealer').html(jobs.cardealer);
			$('#estate').html(jobs.estate);
			break;
		case 'updatePlayerList':
			$('#playerlist tr:gt(0)').remove();
			$('#playerlist').append(event.data.players);
			applyPingColor();
			//sortPlayerList();
			break;
		case 'updatePoliceCount': // #e94444 | #4fca4f
		// Mr.Fox: not the best code :p
			var count = event.data.policeCount;
			if (count >= 8) {
				$("#SHOP").css("color", "#4fca4f");
				$("#JAVAHERI").css("color", "#4fca4f");
				$("#BANK1").css("color", "#4fca4f");
				$("#BANK2").css("color", "#4fca4f");
				$("#updatetext").text("Centeral Bank Robbery Allowed");
				// 4 green
			} else if (count >= 8) {
				$("#SHOP").css("color", "#4fca4f");
				$("#JAVAHERI").css("color", "#4fca4f");
				$("#BANK1").css("color", "#4fca4f");
				$("#BANK2").css("color", "#e94444");
				$("#updatetext").text("Normal Bank Robbery Allowed");
				// 3 green 1 red
			} else if (count >= 4) {
				$("#SHOP").css("color", "#4fca4f");
				$("#JAVAHERI").css("color", "#4fca4f");
				$("#BANK1").css("color", "#e94444");
				$("#BANK2").css("color", "#e94444");
				$("#updatetext").text("Javaheri Robbery Allowed");
				// 2 green 2 red
			} else if (count >= 2) {
				$("#SHOP").css("color", "#4fca4f");
				$("#JAVAHERI").css("color", "#e94444");
				$("#BANK1").css("color", "#e94444");
				$("#BANK2").css("color", "#e94444");
				$("#updatetext").text("Shop Robbery Allowed");
				// 1 green 3 red
			} else {
				$("#SHOP").css("color", "#c2c2c2");
				$("#JAVAHERI").css("color", "#c2c2c2");
				$("#BANK1").css("color", "#c2c2c2");
				$("#BANK2").css("color", "#c2c2c2");
				$("#updatetext").text("No Robbery Allowed");
				// 4 red
			}
			break;
		case 'updatePing':
			updatePing(event.data.players);
			applyPingColor();
			break;
		case 'updateServerInfo':
			if (event.data.maxPlayers) {
				$('#max_players').html(event.data.maxPlayers);
			}
			if (event.data.uptime) {
				$('#server_uptime').html(event.data.uptime);
			}
			if (event.data.playTime) {
				$('#play_time').html(event.data.playTime);
			}
			break;
		default:
			console.log('esx_scoreboard: unknown action!');
			break;
		}
	}, false);
});

function applyPingColor() {
	$('#playerlist tr').each(function () {
		$(this).find('td:nth-child(3),td:nth-child(6),td:nth-child(9)').each(function () {
			var ping = $(this).html();
			var color = 'green';
			if (ping > 150 && ping < 190) {
				color = 'orange';
			} else if (ping >= 200) {
				color = 'red';
			}
			$(this).css('color', color);
			$(this).html(ping + " <span style='color:white;'>ms</span>");
		});
	});
}
function updatePing(players) {
	jQuery.each(players, function (index, element) {
		if (element != null) {
			$('#playerlist tr:not(.heading)').each(function () {
				$(this).find('td:nth-child(2):contains(' + element.id + ')').each(function () {
					$(this).parent().find('td').eq(2).html(element.ping);
				});
				$(this).find('td:nth-child(5):contains(' + element.id + ')').each(function () {
					$(this).parent().find('td').eq(5).html(element.ping);
				});
				$(this).find('td:nth-child(8):contains(' + element.id + ')').each(function () {
					$(this).parent().find('td').eq(8).html(element.ping);
				});
			});
		}
	});
}

function sortPlayerList() {
	var table = $('#playerlist'),
		rows = $('tr:not(.heading)', table);
	rows.sort(function (a, b) {
		var keyA = $('td', a).eq(1).html();
		var keyB = $('td', b).eq(1).html();
		return (keyA - keyB);
	});
	rows.each(function (index, row) {
		table.append(row);
	});
}