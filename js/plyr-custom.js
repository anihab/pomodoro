function initPlayer(item){
	// custom plyr behavior, adapted from source https://github.com/sampotts/plyr
	return new Plyr(item, {
		controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
		invertTime: false,
		keyboard: {
			focused: false,
			global: false
		},
		autoplay: false,
		volume: 0.5,
		muted: false,
		resetOnEnd: true,
		clickToPlay: true,
		fullscreen: {
			enabled: false
		},
		loop: {
			active: true
		},
		listeners: {
			seek: function customSeekBehavior(e) {
				//e.preventDefault();
				//return false;
			}
		}
	});

}