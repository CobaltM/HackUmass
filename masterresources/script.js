// Get the hash of the url
var socket = io.connect('localhost:3000');

// Query DOM
var message = document.getElementById('message'),
handle = document.getElementById('handle'),
btn = document.getElementById('send'),
output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function(){
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	});
	message.value = "";
});

// Listen for events
socket.on('chat', function(data){
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});








//----------------------------------------------------------------------












const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
	if (item) {
		var parts = item.split('=');
		initial[parts[0]] = decodeURIComponent(parts[1]);
	}
	return initial;
}, {});
window.location.hash = '';
// Set token
let _token = hash.access_token;
devid = '';

const authEndpoint = 'https://accounts.spotify.com/authorize';

var currentplaylist = '["spotify:track:51KKQAgYFoJHgVIuJWHdHb","spotify:track:3ctALmweZBapfBdFiIVpji"]';
socket.emit('playlist', {
						lists: currentplaylist
					});
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = 'c45b9f08b8f94e9fb5650ab6bf202238';
const redirectUri = 'http://localhost:3000/master/';
const scopes = [
'streaming',
'playlist-read-private',
'user-read-currently-playing',
'user-read-birthdate',
'user-read-private',
'user-modify-playback-state',
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
	window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

// Set up the Web Playback SDK

window.onSpotifyPlayerAPIReady = () => {
	const player = new Spotify.Player({
		name: 'SynchroSummon',
		getOAuthToken: cb => { cb(_token); }

	});

	// Error handling
	player.on('initialization_error', e => console.error(e));
	player.on('authentication_error', e => console.error(e));
	player.on('account_error', e => console.error(e));
	player.on('playback_error', e => console.error(e));

	// Playback status updates
	player.on('player_state_changed', state => {
		console.log(state)
		socket.emit('time', {
						stamp: state.position
					});
		$('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
		$('#current-track-name').text(state.track_window.current_track.name);
	});
	// Ready
	player.on('ready', data => {
		devid = data.device_id;
		console.log('Ready with Device ID', data.device_id);
		// Play a track using our new device ID
		play(data.device_id,currentplaylist);
	});
    // Connect to the player!
	player.connect(); 

	//toggle 
	pausebtn = document.getElementById("pause");
	pausebtn.addEventListener('click', function(){
		$.ajax({
			url: "https://api.spotify.com/v1/me/player/play?device_id=" + devid,
			type: "PUT",
			beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
			success: function(data) { 
				player.togglePlay();
				player.getCurrentState().then(state => {
					if (!state) {
						console.error('User is not playing music through the Web Playback SDK');
						return;
					}
					//scaffolding
					socket.emit('chat', {
						message: state.position,
						handle: 'server'
					});
					//end scaffolding
					console.log('Postition: ',state.position)
				});
			}
		});
	});
	// Play a specified track on the Web Playback SDK's device ID
	function play(device_id, currp) {
		$.ajax({
			url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
			type: "PUT",
			data: '{"uris":'+currp+' }',
			beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
			success: function(data) { 
				player.getCurrentState().then(state => {
					if (!state) {
						console.error('User is not playing music through the Web Playback SDK');
						return;
					}

					let {
						current_track,
						next_tracks: [next_track]
					} = state.track_window;

					console.log('Currently Playing', current_track);
					console.log('Playing Next', next_track);
					console.log('Postition: ',state.position)
				});
			}
		});
	}
}




