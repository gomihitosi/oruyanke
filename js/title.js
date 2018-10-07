let IS_ANIME = true;
let IS_VOICE = true;
let IS_KEYBOARD = true;

phina.define('TitleScene', {
  superClass: 'DisplayScene',
  init: function (option) {
    this.superInit(option);

    var titleLabel = new Label({
      text: 'おるやんけタイピング',
      fontSize: 48,
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center(-2));

    var startLabel = new Label({
      text: 'SPACE でスタート',
      fontSize: 28,
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center(2));

    var versionLable = new Label({
      text: 'ver 0.01',
      fontSize: 24,
      align: 'left',
    }).addChildTo(this)
      .setPosition(this.gridX.span(0) + 4, this.gridY.span(0) + 16);

    this.animeBox = new RectangleShape({
      fill: '#222', width: 180, height: 60, strokeWidth: 0, cornerRadius: 8,
    }).addChildTo(this)
      .setPosition(this.gridX.span(2), this.gridY.span(15))
    this.animeLabel = new Label({
      fill: '#FFF', width: 180, height: 60, text: 'アニメ:有',
    }).addChildTo(this)
      .setPosition(this.gridX.span(2), this.gridY.span(15))
      .setInteractive(true)
    this.animeLabel.on('click', () => {
      IS_ANIME = !IS_ANIME
      this.animeLabel.text = 'アニメ:' + (IS_ANIME ? '有' : '無')
    })

    this.keyboardBox = new RectangleShape({
      fill: '#222', width: 260, height: 60, strokeWidth: 0, cornerRadius: 8,
    }).addChildTo(this)
      .setPosition(this.gridX.span(11), this.gridY.span(15))
    this.keyboardLabel = new Label({
      fill: '#FFF', width: 260, height: 60, text: 'キーボード音:有',
    }).addChildTo(this)
      .setPosition(this.gridX.span(11), this.gridY.span(15))
      .setInteractive(true)
    this.keyboardLabel.on('click', () => {
      IS_KEYBOARD = !IS_KEYBOARD
      this.keyboardLabel.text = 'キーボード音:' + (IS_KEYBOARD ? '有' : '無')
    })

    this.voiceBox = new RectangleShape({
      fill: '#222', width: 120, height: 60, strokeWidth: 0, cornerRadius: 8,
    }).addChildTo(this)
      .setPosition(this.gridX.span(14) + 28, this.gridY.span(15))
    this.voiceLabel = new Label({
      fill: '#FFF', width: 120, height: 60, text: '声:有',
    }).addChildTo(this)
      .setPosition(this.gridX.span(14) + 28, this.gridY.span(15))
      .setInteractive(true)
    this.voiceLabel.on('click', () => {
      IS_VOICE = !IS_VOICE
      this.voiceLabel.text = '声:' + (IS_VOICE ? '有' : '無')
    })

  },
  update: function (app) {
    if (app.keyboard.getKey('space')) {
      // TODO: 自動再生解除の為に無音を再生
      // AssetManager.get('sound', 'mute').play()
      this.exit()
    }
  }
});
