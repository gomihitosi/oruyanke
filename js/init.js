phina.globalize()

var SCREEN_SIZE_X = 960
var SCREEN_SIZE_Y = 540

var FPS = 60
var SUPPORT_EXT = getSupportExt()
var START_LABEL = 'title'

var ASSETS = {
  image: {
    'mito': 'assets/image/mito.png',
    'twitter': 'assets/image/twitter.png',
  },
  sound: {
    'oruyanke1': 'assets/sound/oruyanke1.' + SUPPORT_EXT,
    'oruyanke2': 'assets/sound/oruyanke2.' + SUPPORT_EXT,
    'donatakaoruyanke': 'assets/sound/donatakaoruyanke.' + SUPPORT_EXT,
  },
  font: {
    'rm2p': 'assets/font/rm2p_oruyanke.woff2',
  },
}
const KEYCOUNT = 8
for (var i = 1; i <= KEYCOUNT; i++) {
  ASSETS.sound[`0${i}`] = `assets/sound/key/0${i}.${SUPPORT_EXT}`
}

var SCENES = [
  {
    label: 'title',
    className: 'TitleScene',
    nextLabel: 'main'
  },
  {
    label: "main",
    className: "MainScene",
    nextLabel: "result"
  },
  {
    label: "result",
    className: "ResultScene",
    nextLabel: "main"
  },
];

phina.define('LoadingScene', {
  superClass: 'DisplayScene',

  init: function (options) {
    this.superInit(options)
    var self = this

    var loader = phina.asset.AssetLoader()
    loader.onprogress = function (e) {
      label.text = `${(e.progress * 100).toFixed(0)}%`
    }

    var label = Label({
      text: "0%",
      fill: '#222',
      fontSize: 12,
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center(0.5))

    var progressBar = Gauge({
      value: 0,
      height: 4,
      gaugeColor: "#d63030",
      stroke: false,
      fill: '#222',
    }).setPosition(this.gridX.center(), this.gridY.center())
      .addChildTo(this);

    loader.onprogress = function (e) {
      progressBar.value = e.progress;
    };

    loader.onload = function () {
      self.flare('loaded');
    };

    loader.load(options.assets);
  },
});

phina.main(function () {
  var app = GameApp({
    query: 'canvas',
    startLabel: START_LABEL,
    fit: false,
    assets: ASSETS,
    width: SCREEN_SIZE_X,
    height: SCREEN_SIZE_Y,
    scenes: SCENES,
    fps: FPS,
  });
  app.run();
});


function getSupportExt() {
  var ext = "";
  var audio = new Audio();

  if (audio.canPlayType("audio/mp3") === "maybe") {
    ext = "mp3"
  } else if (audio.canPlayType("audio/ogg") === "maybe") {
    ext = "ogg"
  } else if (audio.canPlayType("audio/wav") === "maybe") {
    ext = "wav"
  }
  return ext;
}