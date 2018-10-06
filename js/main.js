const SE = {};
const DATA = [
  { se: 'oruyanke1', next: '1', hiragana: 'お,る,や,ん,け'.split(','), ruby: 'oruyanke'.split('') },
  { se: 'oruyanke2', next: '2', hiragana: 'お,る,や,ん,け'.split(','), ruby: 'oruyanke'.split('') },
  { se: 'donatakaoruyanke', next: '0', hiragana: 'ど,な,た,か,お,る,や,ん,け'.split(','), ruby: 'donatakaoruyanke'.split('') },
]
const FONT_CONFIG = {
  main: { size: 90, margin: 80 },
  sub: { size: 45, margin: 30 },
  count: { size: 120, margin: 0 },
}
const TWEENER_MARGIN = 12
const MAX_TIMER = 30 * 1000

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function (option) {
    this.superInit(option);

    this.timer = 0;
    this.gauge = Gauge({
      x: SCREEN_SIZE_X / 2,
      y: SCREEN_SIZE_Y / 2,
      width: SCREEN_SIZE_X,
      height: SCREEN_SIZE_Y,
      fill: '#FFF',
      gaugeColor: '#000',
    }).addChildTo(this)
    this.gauge.alpha = 0.6

    this.mito = Sprite("mito").addChildTo(this)
      .setPosition(this.gridX.span(16), this.gridY.span(16))
    this.mito.alpha = 0.4
    this.mito.origin.set(1, 1)

    SE['oruyanke1'] = AssetManager.get('sound', 'oruyanke1');
    SE['oruyanke2'] = AssetManager.get('sound', 'oruyanke2');
    SE['donatakaoruyanke'] = AssetManager.get('sound', 'donatakaoruyanke');

    this.isStart = false
    this.oruyanke = 0

    this.start()
  },
  update: function (app) {
    if (!this.isStart) return

    this.timer += app.deltaTime;
    var per = this.timer / MAX_TIMER * 100
    this.gauge.value = 100 - (per >= 0 ? per : 0)
    if (app.keyboard.getKey(this.target.ruby[this.cursor])) {
      this.rubyLabelList[this.cursor].fill = '#D22'
      this.cursor++
      this.oruyanke++
      if (this.cursor >= this.target.ruby.length) {
        this.next()
      }
    }
    if (this.timer >= MAX_TIMER) {
      this.exit({
        oruyanke: this.oruyanke
      })
    }
  },
  start: function () {
    this.count = Label({
      text: '3',
      fontFamily: "rm2p",
      fill: '#FFF',
      stroke: '#000',
      strokeWidth: 4,
      fontSize: FONT_CONFIG.count.size,
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center())
    this.count.tweener
      .wait(800).call(() => this.count.text = '2')
      .wait(800).call(() => this.count.text = '1')
      .wait(800).call(() => {
        this.count.remove()
        this.showData(0)
        this.isStart = true
      })
  },
  next: function () {
    SE[this.target.se].play()

    this.cursor = 0

    this.hiraganaLabelList.each((v) => v.remove())
    this.rubyLabelList.each((v) => v.remove())
    this.showData(this.target.next)
  },
  showData: function (num) {
    this.target = DATA[num]
    this.cursor = 0;

    this.hiraganaLabelList = this.target.hiragana.map((v, i, arr) => {
      // 画面半分 - ((文字数-1) * マージン / 2)
      var position = SCREEN_SIZE_X / 2 - ((arr.length - 1) * FONT_CONFIG.main.margin / 2)
      var label = Label({
        text: v,
        fontFamily: "rm2p",
        fill: '#222',
        stroke: '#FFF',
        strokeWidth: 4,
        fontSize: FONT_CONFIG.main.size,
      }).addChildTo(this)
        .setPosition(position + (i * FONT_CONFIG.main.margin), this.gridY.center(1) + TWEENER_MARGIN)
      label.alpha = 0
      label.tweener.wait(i * 10).by({ alpha: 1, y: -TWEENER_MARGIN }, 100)
      return label
    })
    this.rubyLabelList = this.target.ruby.map((v, i, arr) => {
      var position = SCREEN_SIZE_X / 2 - ((arr.length - 1) * FONT_CONFIG.sub.margin / 2)
      var label = Label({
        text: v,
        fontFamily: "rm2p",
        fill: '#222',
        stroke: '#FFF',
        strokeWidth: 4,
        fontSize: FONT_CONFIG.sub.size,
      }).addChildTo(this)
        .setPosition(position + (i * FONT_CONFIG.sub.margin), this.gridY.center(-1) + TWEENER_MARGIN)
      label.alpha = 0
      label.tweener.wait(i * 10).by({ alpha: 1, y: -TWEENER_MARGIN }, 100)
      return label
    })
  }
});