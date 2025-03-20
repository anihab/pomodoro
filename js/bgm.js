var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function loadPlaylist_playlist_id(list_id) {
    player.loadPlaylist({
        'list': list_id,
        'listType': 'playlist',
        'index': 0,
        'startSeconds': 0,
        'suggestedQuality': 'small'
    });
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: ' ',
        events: {
            'onReady': function (event) {
                event.target.cuePlaylist({ list: "PLJjQ-3vvyCNwtSddOS5opW_jUoReiZxuR" });
                event.target.playVideo();
                event.target.setLoop(true);
                setTimeout(function () {
                    var called_frame = parent.document.getElementById("bgm_frame").contentWindow;
                    called_frame.player.playVideoAt(0);
                }, 500);
            }
        }
    });

    player.personalPlayer = { 'currentTimeSliding': false, 'errors': [] };
}

function onPlayerReady(event) {
    var player = event.target;
    loadPlaylist_playlist_id('PLJjQ-3vvyCNwtSddOS5opW_jUoReiZxuR');
}

function songinfo(id) {
    // song list
    if (id == 'ZQJv5vt4-Mw') {
        songtitle = 'LOVING TRIP♡';
        songimg = 'https://i.pinimg.com/originals/35/39/18/353918a381fe0f11558c290ce9763f9d.gif';
        pointcolor = '#FDFAE3';
        textcolor = '#E1CCD9';
        backcolor = '#FEF4F6';
        backgroundPos = '0% 20%';
    }
    if (id == 'QHa0_A5_dFA') {
        songtitle = ' フキゲンワルツ';
        songimg = 'https://mblogthumb-phinf.pstatic.net/MjAxNzExMDdfMTUz/MDAxNTEwMDI1OTUwNzAz.QuoOseqFrJik92ccO2m3D2kVNGC4fi_X_YKWWnVMLWQg.J3z-tR5YIOO8WwNUUEZrqzpoebEZ9-GrIt4d3ZZtMSsg.GIF.baeeunhye13/karuta_roromiya_gif_1_deviant_id_1_by_askkaruta_roromiya-d4rvhku.gif?type=w800';
        pointcolor = '#FDFAE3';
        textcolor = '#E1CCD9';
        backcolor = '#FEF4F6';
        backgroundPos = '0% 20%';
    }
    if (id == '2-mCpRYCM7A') {
        songtitle = 'the new sweet groove♡';
        songimg = 'https://mblogthumb-phinf.pstatic.net/MjAxNzExMDdfMjYz/MDAxNTEwMDI1OTU2Nzgy.o9DzkjnxOvKHzpC8hgom8v9uji0-Rp0C3OMZcpRa9HYg.ZgWKiQWXTdlkGwn_PVuBo60WXNh_8WGV2Yw4tnjKmScg.GIF.baeeunhye13/tumblr_lzjlmt0AQV1r3c09go1_500.gif?type=w800';
        pointcolor = '#FDFAE3';
        textcolor = '#E1CCD9';
        backcolor = '#FEF4F6';
        backgroundPos = '0% 20%';
    }
    if (id == 'v5ebL2NFJU0') {
        songtitle = 'くっきんどりーみんらんど♡';
        songimg = 'https://i.imgur.com/9E8l4Q8.png';
        pointcolor = '#FDFAE3';
        textcolor = '#E1CCD9';
        backcolor = '#FEF4F6';
        backgroundPos = '0% 20%';
    }
    if (id == 'caeQsPkros8') {
        songtitle = 'S.C.R.E.A.M♡';
        songimg = 'https://i.imgur.com/ytCFMW7.png';
        pointcolor = '#FDFAE3';
        textcolor = '#E1CCD9';
        backcolor = '#FEF4F6';
        backgroundPos = '0% 20%';
    }

    //  if (id == '') {
    //    songtitle = ''; thumbnail image address, otherwise automatically insert default youtube vid thumbnail
    //    songimg = '';'
    //    pointcolor = '';
    //    textcolor = ''; song name, playback position
    //    backcolor = ''; player bg color, otherwise will be the opposite of the text color
    //    backgroundPos = ''; if none, automatically fixed to (50% 50%)
    //  }

    // if songimg is not set, use the youtube thumbnail and adjust the background size accordingly.
    if (songimg == '') {
        songimg = 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg';
        backsize = 'cover';
    } else {
        backsize = '';
    }
    if (backcolor == '') {
        backcolor = invertColor(textcolor);
    }
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

// return the song url and modify text colors
function songt() {
    var songindex = player.getVideoUrl();
    let searchParams = new URLSearchParams(songindex);
    var songid = searchParams.get('v');
    var music_thumb = parent.document.getElementById('music-thumb');
    songinfo(songid);

    parent.document.getElementById('songtitle').innerHTML = songtitle;
    music_thumb.style.backgroundImage = "url('" + songimg + "')";
    music_thumb.style.backgroundPosition = backgroundPos;
    if (pointcolor != '' && pointcolor != 'null') {
        parent.document.documentElement.style.setProperty(`--music-point`, pointcolor);
    }
    if (textcolor != '' && textcolor != 'null') {
        parent.document.documentElement.style.setProperty(`--music-text`, textcolor);
    }
    if (backcolor != '' && backcolor != 'null') {
        parent.document.documentElement.style.setProperty(`--music-base`, backcolor);
    }
    if (backsize == 'cover') {
        music_thumb.style.backgroundSize = backsize;
    } else if (backsize == '') {
        music_thumb.style.backgroundSize = '';
    }

    previous = parent.document.querySelector('.listmusic.active');
    if (previous) {
        previous.classList.remove('active');
    }
    nowplay = parent.document.getElementById(songid);
    nowplay.classList.add('active');
}

// check if song has changed
var check_previous = -1
function less() {
    songnow = player.getPlaylistIndex();
    if (check_previous == -1) {
        check_previous = songnow;
        setTimeout(songt, 1000);
    } else if (check_previous == songnow) {
    } else if (check_previous != songnow) {
        songt();
        check_previous = songnow;
    }
}

setInterval(less, 1000);

function load_list() {
    pl_list = player.getPlaylist();

    mslist = parent.document.getElementById('mslist');
    listDiv = [];

    pl_list.forEach((id, i) => {
        listDiv[i] = document.createElement("div");
        songinfo(id);
        listDiv[i].innerHTML = songtitle;
        listDiv[i].setAttribute("class", "listmusic");
        listDiv[i].setAttribute("id", id);
        listDiv[i].setAttribute("onclick", 'changeMusic("' + id + '")');
        mslist.appendChild(listDiv[i]);
    });
}

setTimeout(load_list, 2000);

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}