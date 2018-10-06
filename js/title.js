
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
  },
  update: function (app) {
    if (app.keyboard.getKey('space')) {
      // TODO: 自動再生解除の為に無音を再生
      // AssetManager.get('sound', 'mute').play()
      this.exit()
    }
  }
});
