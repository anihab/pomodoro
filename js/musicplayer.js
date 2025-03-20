isListView = false;
function view_list() {
    if (isListView == false) {
        document.getElementById("music-player").style.height = '390px';
        document.getElementById("music-thumb").classList.add('active');
        document.querySelector(".music-ui").classList.add('active');
        document.querySelector(".music-list").classList.add('active');
    } else {
        document.getElementById("mplayer").style.height = '145px';
        document.getElementById("music-thumb").classList.remove('active');
        document.querySelector(".music-ui").classList.remove('active');
        document.querySelector(".music-list").classList.remove('active');
    }
    isListView = !isListView;
}

volume_show = false;
function bgm_vol() {
    if (volume_show == false) {
        document.getElementById("volume-window").style.display = "flex";
    }
    else {
        document.getElementById("volume-window").style.display = "none";
    }
    volume_show = !volume_show;
}

function playerCurrentTimeChange(currentTime) {
    'use strict';
    var called_frame = parent.document.getElementById("bgm_frame").contentWindow;

    called_frame.player.personalPlayer.currentTimeSliding = false;
    called_frame.player.seekTo(currentTime * called_frame.player.getDuration() / 100, true);
}

function playerCurrentTimeSlide() {
    'use strict';
    var called_frame = parent.document.getElementById("bgm_frame").contentWindow;

    called_frame.player.personalPlayer.currentTimeSliding = true;
}

function playerDisplayInfos() {
    'use strict';
    var called_frame = parent.document.getElementById("bgm_frame").contentWindow;

    if ((this.nbCalls === undefined) || (this.nbCalls >= 3)) {
        this.nbCalls = 0;
    } else {
        ++this.nbCalls;
    }

    var current = called_frame.player.getCurrentTime();
    var duration = called_frame.player.getDuration();
    var currentPercent = (current && duration
        ? current * 100 / duration
        : 0);
    var seconds = Math.floor((duration) % 60),
        minutes = Math.floor((duration / 60) % 60),
        hours = Math.floor((duration / (60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    var seconds2 = Math.floor((current) % 60),
        minutes2 = Math.floor((current / 60) % 60),
        hours2 = Math.floor((current / (60 * 60)) % 24);

    hours2 = (hours2 < 10) ? "0" + hours2 : hours2;
    minutes2 = (minutes2 < 10) ? "0" + minutes2 : minutes2;
    seconds2 = (seconds2 < 10) ? "0" + seconds2 : seconds2;

    if (!current) {
        current = 0;
    }
    if (!duration) {
        duration = 0;
    }

    var volume = Math.round(called_frame.player.getVolume());
    var volumeItem = parent.document.getElementById('YouTube-player-volume');

    if (volumeItem && (Math.round(volumeItem.value) != volume)) {
        volumeItem.value = volume;
    }

    if (!called_frame.player.personalPlayer.currentTimeSliding) {
        document.getElementById('player-progress').value = currentPercent;
    }

    document.getElementById('player-info1').innerHTML = (
        hours2 + ':' + minutes2 + ':' + seconds2
    );
    document.getElementById('player-info2').innerHTML = (
        hours + ':' + minutes + ':' + seconds
    );
}

function youTubePlayerVolumeChange(volume) {
    'use strict';
    var called_frame = parent.document.getElementById("bgm_frame").contentWindow;
    called_frame.player.setVolume(volume);
}

(function () {
    'use strict';

    function init() {
        // Load YouTube library
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        var first_script_tag = document.getElementsByTagName('script')[0];
        first_script_tag.parentNode.insertBefore(tag, first_script_tag);

        // Set timer to display infos
        setInterval(playerDisplayInfos, 1000);
    }

    if (window.addEventListener) {
        window.addEventListener('load', init);
    } else if (window.attachEvent) {
        window.attachEvent('onload', init);
    }
}());

function fn_control_bgm(state) {
    if ($('html').hasClass('single')) {
        return false;
    } else {
        return true;
    }
}

var isplaying = true;
function imgToggle() {
    var playicon = document.getElementById("playicon");
    var pauseicon = document.getElementById("pauseicon");
    var pltext = document.getElementById("play-text");
    if (isplaying == true) { // if already playing, stop
        pauseicon.style.display = 'none';
        playicon.style.display = 'inline-block';
        pltext.innerText = 'PAUSE';
    } else { // if stopped, play
        pauseicon.style.display = 'inline-block';
        playicon.style.display = 'none';
        pltext.innerText = 'now playing…';
    }
    isplaying = !isplaying;
}

isshuffle = false;
function shuffleimgToggle() {
    var shonicon = document.getElementById("shonicon");
    if (isshuffle == true) {
        shonicon.style.opacity = '0.5';
    } else {
        shonicon.style.opacity = '1';
    }
    isshuffle = !isshuffle;
}

function bgm_func(val) {
    var called_frame = parent.document.getElementById("bgm_frame").contentWindow;
    if (val == 1) {				// prev song 
        called_frame.player.previousVideo();
        if (isplaying != true) { imgToggle(); }
        fn_control_bgm('play');
    }
    else if (val == 2) {		// play 
        called_frame.player.playVideo();
        fn_control_bgm('play');
        imgToggle();
    }
    else if (val == 3) {		// stop 
        called_frame.player.pauseVideo();
        fn_control_bgm('stop');
        imgToggle();
    }
    else if (val == 4) {		// next song 
        called_frame.player.nextVideo();
        if (isplaying != true) { imgToggle(); }
        fn_control_bgm('play');
    }
    else if (val == 5) {		// shuffle
        if (isshuffle == true) {
            called_frame.player.setShuffle(false);
            shuffleimgToggle();
        } else {
            called_frame.player.setShuffle(true);
            shuffleimgToggle();
        }
    }
}

function changeMusic(id) {
    var called_frame = parent.document.getElementById("bgm_frame").contentWindow;
    var list = called_frame.player.getPlaylist();
    where = list.indexOf(id);
    called_frame.player.playVideoAt(where);
    console.log(list, where, id);
}

// draggable features
const draggable = ($target) => {
    let isPress = false,
        prevPosX = 0,
        prevPosY = 0;

    $target.onmousedown = start;
    $target.onmouseup = end;

    window.onmousemove = move;

    function start(e) {
        prevPosX = e.clientX;
        prevPosY = e.clientY;
        isPress = true;
    }

    function move(e) {
        if (!isPress) return;

        const posX = prevPosX - e.clientX;
        const posY = prevPosY - e.clientY;

        prevPosX = e.clientX;
        prevPosY = e.clientY;

        $target.style.left = ($target.offsetLeft - posX) + "px";
        $target.style.top = ($target.offsetTop - posY) + "px";
    }

    function end() {
        isPress = false;
    }
}

window.onload = () => {
    const $target = document.querySelector('.music-player')
    draggable($target);
}