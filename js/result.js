
phina.define('ResultScene', {
  superClass: 'DisplayScene',
  init: function (option) {
    this.superInit(option);

    var param = option.oruyanke
    var result
    if (param > 350) {
      result = '変態'
    } else if (param > 250) {
      result = 'サブカルクソ女'
    } else if (param > 150) {
      result = 'バーチャルYouTuber'
    } else if (param > 100) {
      result = '清楚'
    } else if (param > 50) {
      result = 'ムカデ人間'
    } else {
      result = 'クソ雑魚'
    }

    this.infoLabel = new Label({
      text: '貴方のおるやんけ度は…',
      fontSize: 36,
      align: 'center',
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center(-2));
    this.resultLabel = new Label({
      text: result + '級',
      fontSize: 72,
      align: 'center',
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center());

    this.startLabel = new Label({
      text: 'SPACE でリスタート',
      fontSize: 28,
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center(2));

    this.twitterBox = new RectangleShape({
      fill: '#222',
      width: 80,
      height: 80,
      strokeWidth: 0,
      cornerRadius: 8,
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center(4))

    this.twitter = Sprite("twitter").addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center(4))
      .setInteractive(true)

    this.twitter.onclick = function () {
      var text = `貴方のおるやんけ度は「${result}級」でした。`
      var url = Twitter.createURL({
        text: text,
        hashtags: 'おるやんけタイピング',
        url: location.href,
      });
      window.open(url, 'share window', 'width=480, height=320');
    };

  },
  update: function (app) {
    if (app.keyboard.getKey('space')) {
      this.exit()
    }
  }
});
