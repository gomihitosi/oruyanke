
phina.define('ResultScene', {
  superClass: 'DisplayScene',
  init: function (option) {
    this.superInit(option);

    var param = option.oruyanke
    ACHIEVEMENT = [
      { name: '神', min: 500, max: 9999 },
      { name: '変態', min: 350, max: 499 },
      { name: 'サブカルクソ女', min: 250, max: 349 },
      { name: 'バーチャルYouTuber', min: 150, max: 249 },
      { name: '清楚', min: 100, max: 149 },
      { name: 'ムカデ人間', min: 50, max: 99 },
      { name: 'クソ雑魚', min: 0, max: 49 },
    ]
    var result = ACHIEVEMENT.filter((v) => param >= v.min && param <= v.max).map((v) => {
      // maxの値を三分割して[-/ /+]の評価を付与
      return v.name + ((v.max / param - 1) < 0.33 ? '+' : (v.max / param - 1) > 0.66 ? '-' : '')
    })

    this.infoLabel = new Label({
      text: '貴方のおるやんけ度は…',
      fontSize: 36,
      align: 'center',
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center(-2));
    this.resultLabel = new Label({
      text: result,
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
      var text = `貴方のおるやんけ度は「${result}」でした。`
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
