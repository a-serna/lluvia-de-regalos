!function o(n,r,h){function d(e,t){if(!r[e]){if(!n[e]){var s="function"==typeof require&&require;if(!t&&s)return s(e,!0);if(l)return l(e,!0);var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}var a=r[e]={exports:{}};n[e][0].call(a.exports,function(t){return d(n[e][1][t]||t)},a,a.exports,o,n,r,h)}return r[e].exports}for(var l="function"==typeof require&&require,t=0;t<h.length;t++)d(h[t]);return d}({1:[function(t,e,s){var i=[];function a(){Phaser.State.call(this)}i.push("Compartir"),i.push("Regalar"),((a.prototype=Object.create(Phaser.State.prototype)).constructor=a).prototype.init=function(t){console.log(t),this.point=parseInt(t),this.discount=0,parseInt(this.point)<=50?(this.discount=15,this.wordKey=i[0].toString()):51<=parseInt(this.point)&&(this.discount=25,this.wordKey=i[0].toString())},a.prototype.preload=function(){this.stage.backgroundColor="#ffffff";var n=this.add.text(this.world.centerX,300,"",{font:"7em Raleway Regular",fill:"#2b3f68",align:"center"});n.anchor.setTo(.5);var r=this.add.graphics(330,-150),t=this.add.graphics(330,-150);t.lineStyle(3,"0x2b3f68"),t.drawRoundedRect(100,500,300,30,10),t.endFill(),this.load.onFileComplete.add(function(t,e,s,i,a){n.setText(t+"%");var o=t+194;r.clear(),r.lineStyle(3,"0x2b3f68"),r.beginFill("0x2b3f68",1),r.drawRoundedRect(103,501,o,27,1),r.endFill()},this),this.load.image("background","assets/Backgrounds/Background-wins.jpg"),this.load.image("legal","assets/Legales.png")},a.prototype.create=function(){this.add.sprite(0,0,"background").scale.setTo(.6);var t={font:"2em Raleway Regular",fill:"#000000",align:"center"},e={font:"5em Raleway Regular",fill:"#000000",align:"center"},s=this.add.text(this.world.width/2,this.world.height/3.5,"",t);s.text="Recibe un bono de descuento por tus "+this.point+" puntos para redimir en \n cualquier producto de nuestras tiendas.",s.anchor.setTo(.5,0);var i=this.add.text(this.world.width/2,this.world.height/2.8,"",e);i.text=this.discount+"%"+" de descuento",i.anchor.setTo(.5,0);var a=this.add.text(this.world.width/2,this.world.height/2.3,"",t);a.text="Tu palabra clave es:",a.anchor.setTo(.5,0);var o=this.add.text(this.world.width/2,this.world.height/2.2,"",e);o.text=String(this.wordKey),o.anchor.setTo(.5,0);var n=this.add.sprite(this.world.width/2,this.world.height/1.4,"legal");n.anchor.setTo(.5),n.scale.setTo(.6,.7)},e.exports=a},{}],2:[function(t,e,s){function i(){Phaser.State.call(this)}function l(t,e){t.score=t.score+e;var s="0000";t.score<10?s="000":t.score<100?s="00":t.score<1e3&&(s="0"),t.textScore.setText(s+t.score)}function u(t){for(var e=[],s=1;s<=72;s++)e.push(s);t.animations.add("anima",e,24,!0),t.animations.play("anima")}function h(t){for(var e=[],s=1;s<=96;s++)e.push(s);t.animations.add("snowMan",e,24,!0),t.animations.play("snowMan")}((i.prototype=Object.create(Phaser.State.prototype)).constructor=i).prototype.init=function(){this.lifes=5,this.score=0,this.isPause=!0,this.timeGift=6e4,this.giftShowAll=!0,this.level=1,this.timePowerups=3e4,this.snowPauseTime=1e3,this.powerupsActivate=!1,this.powerupSelected=null},i.prototype.preload=function(){this.stage.backgroundColor="#ffffff";var n=this.add.text(this.world.centerX,300,"",{font:"7em Times Roman",fill:"#2b3f68",align:"center"});n.anchor.setTo(.5);var r=this.add.graphics(330,-150),t=this.add.graphics(330,-150);t.lineStyle(3,"0x2b3f68"),t.drawRoundedRect(100,500,300,30,10),t.endFill(),this.load.onFileComplete.add(function(t,e,s,i,a){n.setText(t+"%");var o=t+194;r.clear(),r.lineStyle(3,"0x2b3f68"),r.beginFill("0x2b3f68",1),r.drawRoundedRect(103,501,o,27,1),r.endFill()},this),this.load.onLoadComplete.add(function(){this.stage.backgroundColor=0,n.visible=!1,t.visible=!1,r.visible=!1},this),this.load.image("background","assets/Backgrounds/background-main.jpg"),this.load.image("logo","assets/Logo.png"),this.load.image("bar","assets/bar.png"),this.load.image("pause-msg","assets/Popups/pauseMsg.png"),this.load.image("fail-msg","assets/Popups/failMsg.png"),this.load.image("pause","assets/bar/pause.png"),this.load.image("audio","assets/bar/sound.png"),this.load.image("play","assets/Buttons/play.png"),this.load.spritesheet("gift","assets/Gifts/gift.png",216,216,37),this.load.spritesheet("gift2","assets/Gifts/gift2.png",216,216,37),this.load.spritesheet("gift3","assets/Gifts/gift3.png",216,216,37),this.load.spritesheet("gift4","assets/Gifts/gift4.png",216,216,37),this.load.spritesheet("gift5","assets/Gifts/gift5.png",216,216,37),this.load.spritesheet("life","assets/Gifts/life.png",216,216,28),this.load.spritesheet("snow","assets/Gifts/powerupsnow.png",167,167,72),this.load.spritesheet("star","assets/Gifts/powerupstar.png",167,167,72),this.load.spritesheet("snowLeft","assets/SnowMan/munecoizquierdo.png",160,200,96),this.load.spritesheet("snowRight","assets/SnowMan/munecoderecho.png",160,200,96),this.load.audio("caida","assets/Music/SFX-Caida.mp3"),this.load.audio("habilidad","assets/Music/SFX-habilidad.mp3"),this.load.audio("winter-game","assets/Music/Winter-Game.mp3")},i.prototype.create=function(){this.habilidad=this.add.audio("habilidad"),this.winterGame=this.add.audio("winter-game"),this.winterGame.loop=!0,this.winterGame.play(),this.street=this.add.sprite(0,-39,"background"),this.street.scale.setTo(1,.7);var t=this.add.sprite(this.game.world.height/4,this.game.world.height-this.game.world.height/4,"snowLeft");t.anchor.setTo(.5),t.scale.setTo(-1,1),h(t);var e=this.add.sprite(this.game.world.height/2+this.game.world.height/3,this.game.world.height-this.game.world.height/4,"snowRight");e.anchor.setTo(.5),h(e),this.regalos=this.add.group(),this.powerups=this.add.group(),this.bar=this.add.sprite(0,0,"bar"),this.bar.anchor.setTo(0),this.bar.scale.setTo(.8);var s=this.add.sprite(this.world.centerX,0,"logo");s.anchor.setTo(.5,0),s.scale.setTo(.8),this.pause=this.add.sprite(this.world.width-20,20,"pause"),this.pause.scale.setTo(.7),this.pause.anchor.setTo(1,0),this.pause.inputEnabled=!0,this.pause.input.pixelPerfectOver=!0,this.pause.input.useHandCursor=!0,this.pause.events.onInputDown.add(function(){this.pauseManager(r)},this);var i=this.add.sprite(this.pause.x-60,20,"audio");i.scale.setTo(.7),i.anchor.setTo(1,0),this.textScore=this.add.text(this.world.width-150,5,"0000",{font:"7em Raleway Regular",fill:"#2b3f68",align:"center"}),this.textScore.anchor.setTo(1,0),this.lifeGroup=this.add.group();for(var a=5,o=0;o<this.lifes;o++){a+=50;var n=this.lifeGroup.create(a,10,"life");n.scale.setTo(.3),n.id=o}this.createGiftSQuantity(4);var r=this.add.sprite(this.world.width/2,this.world.height/2,"pause-msg");r.anchor.setTo(.5),r.scale.setTo(.5),r.inputEnabled=!0,r.input.useHandCursor=!0,r.visible=!1,r.events.onInputDown.add(function(){this.pauseManager(r)},this),this.failMsg=this.add.sprite(this.world.width/2,this.world.height/2,"fail-msg"),this.failMsg.anchor.setTo(.5),this.failMsg.scale.setTo(.5),this.failMsg.inputEnabled=!0,this.failMsg.input.useHandCursor=!0,this.failMsg.visible=!1,this.failMsg.events.onInputDown.add(function(){this.lifes=5;for(var t=0;t<5;t++)this.lifeGroup.children[t].loadTexture("life",0);this.game.paused=!1,this.failMsg.visible=!1,this.game.state.restart()},this)},i.prototype.createGiftSQuantity=function(t){for(var e=0;e<t;e++)this.createGiftSprites(this.regalos,e)},i.prototype.pauseManager=function(t){!0===this.isPause?(this.pause.loadTexture("play",0),this.game.paused=this.isPause,this.isPause=!1,this.winterGame.pause(),t.visible=!0):(this.pause.loadTexture("pause",0),this.game.paused=this.isPause,this.isPause=!0,t.visible=!1,this.winterGame.resume())},i.prototype.stopResumeTween=function(t){for(var e=0;e<this.regalos.children.length;e++)!0===t?this.regalos.children[e].myTween.pause():this.regalos.children[e].myTween.resume()},i.prototype.createPowerups=function(){for(var t=0;t<2;t++){var e=[];e.push("snow"),e.push("star");var s=this.game.world.width/6,i=this.rnd.integerInRange(0,1),a=this.rnd.integerInRange(0,3),o=this.rnd.integerInRange(1,6),n=this.powerups.create(o*s,10*i,e[t]);n.type=e[t],this.add.tween(n).to({y:this.game.world.height+n.height},5e3+1e3*a,Phaser.Easing.Quadratic.In,!0,0,0,!1),u(n),n.checkWorldBounds=!0,n.events.onOutOfBounds.add(function(t){t.destroy()},this);var r=this;n.inputEnabled=!0,n.input.useHandCursor=!0,n.events.onInputDown.add(function(t){"snow"===t.type?(this.stopResumeTween(!0),this.powerupsActivate=!0):"star"===t.type&&l(r,5),this.habilidad.play(),t.destroy()},this)}},i.prototype.update=function(){0===this.lifes&&(this.score<35?(this.failMsg.visible=!0,this.game.paused=!0):this.state.start("Final",!0,!0,this.score)),this.timePowerups<0?(this.createPowerups(),this.timePowerups=3e4):this.timePowerups-=20,this.powerupsActivate&&(this.snowPauseTime<0?(this.stopResumeTween(!1),this.snowPauseTime=1e3,this.powerupsActivate=!1):this.snowPauseTime-=8),this.timeGift<0&&!0===this.giftShowAll?(this.createGiftSQuantity(6),this.giftShowAll=!1):this.timeGift-=100},i.prototype.createGiftSprites=function(t,e){var s=[];s.push("gift"),s.push("gift2"),s.push("gift3"),s.push("gift4"),s.push("gift5");var i=this.game.world.width/6,a=(this.game.rnd.integerInRange(1,6),this.rnd.integerInRange(0,1)),o=this.rnd.integerInRange(0,3),n=this.game.rnd.integerInRange(0,4),r={};(r=6<e?t.create(i+(e-6)*i,10*a,s[n]):t.create(50+e*i,10*a,s[n])).inLevel=!0,e<=4&&(r.visible=!1,r.inLevel=!1),r.alpha=1,r.scale.setTo(.5);var h=this,d=this.add.tween(r).to({y:this.game.world.height+r.height},5e3+1e3*o,Phaser.Easing.Quadratic.In,!0,0,-1,!1);r.myTween=d,r.visible=!0,r.checkWorldBounds=!0,r.events.onOutOfBounds.add(function(t){var e=this.game.rnd.integerInRange(0,4);t.loadTexture(s[e],0),e<=4?t.scale.setTo(.5):(t.scale.setTo(1),u(t)),1===r.alpha&&h.lifeGroup.children[h.lifes-1]&&0<=t.y&&t.y>this.game.world.height?(function(t){for(var e=[],s=1;s<=28;s++)e.push(s);t.animations.add("life",e,24,!1),t.animations.play("life")}(h.lifeGroup.children[h.lifes-1]),h.lifes-=1):(r.alpha=1,r.inputEnabled=!0)},this),r.inputEnabled=!0,r.input.useHandCursor=!0,r.events.onInputDown.add(function(t){t.alpha=0,r.inputEnabled=!0,l(h,1)},this)},e.exports=i},{}],3:[function(t,e,s){function i(){Phaser.State.call(this)}((i.prototype=Object.create(Phaser.State.prototype)).constructor=i).prototype.init=function(){this.tutorialPart=1,this.popup=null},i.prototype.preload=function(){this.stage.backgroundColor="#ffffff";var n=this.add.text(this.world.centerX,300,"",{font:"7em Times Roman",fill:"#2b3f68",align:"center"});n.anchor.setTo(.5);var r=this.add.graphics(330,-150),t=this.add.graphics(330,-150);t.lineStyle(3,"0x2b3f68"),t.drawRoundedRect(100,500,300,30,10),t.endFill(),this.load.onFileComplete.add(function(t,e,s,i,a){n.setText(t+"%");var o=t+194;r.clear(),r.lineStyle(3,"0x2b3f68"),r.beginFill("0x2b3f68",1),r.drawRoundedRect(103,501,o,27,1),r.endFill()},this),this.load.image("street","assets/Backgrounds/background-blur.jpg"),this.load.image("next","assets/Buttons/next.png"),this.load.image("close","assets/Buttons/close.png"),this.load.image("button-play","assets/Buttons/button-play.png"),this.load.image("window1","assets/Popups/Tutorials/window1.png"),this.load.image("window2","assets/Popups/Tutorials/window2.png"),this.load.image("window3","assets/Popups/Tutorials/window3.png"),this.load.image("window4","assets/Popups/Tutorials/window4.png"),this.load.image("window5","assets/Popups/Tutorials/window5.png"),this.load.audio("boton","assets/Music/SFX-boton.mp3")},i.prototype.create=function(){var t=this.add.audio("boton");this.street=this.add.sprite(0,0,"street"),this.street.scale.setTo(.7);var e=this.add.sprite(this.world.centerX,this.world.centerY,"window1");e.anchor.setTo(.5),e.scale.setTo(.7),e.inputEnabled=!0;var s=this.add.sprite(0,0,"next");s.anchor.setTo(.5),s.inputEnabled=!0,s.input.useHandCursor=!0,e.addChild(s),s.y=e.height/2+s.height,s.events.onInputDown.add(function(){t.play()},this);var i=this.add.sprite(0,0,"close");i.anchor.setTo(0,1),i.inputEnabled=!0,i.input.useHandCursor=!0,e.addChild(i),i.x=e.width/2+i.width,i.y=-(e.height/2+i.width),i.events.onInputDown.add(function(){a.state.start("Play")},this);var a=this;s.events.onInputDown.add(function(){switch(this.tutorialPart){case 1:e.loadTexture("window2",0),this.tutorialPart=2;break;case 2:e.loadTexture("window3",0),this.tutorialPart=3;break;case 3:e.loadTexture("window4",0),this.tutorialPart=4;break;case 4:e.loadTexture("window5",0),s.loadTexture("button-play",0),this.tutorialPart=5;break;case 5:e.visible=!1,this.tutorialPart=1,this.state.start("Play")}},this)},e.exports=i},{}],4:[function(a,t,e){function o(){document.getElementById("landscape").style.display="none"}function n(){document.getElementById("landscape").style.display="block"}Phaser.Device.whenReady(function(){var t=a("./TutorialState"),e=a("./PlayState"),s=a("./FinalState"),i=new Phaser.Game(1152,640,Phaser.AUTO,"game");i.stage.backgroundColor=0,i.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,i.scale.fullScreenScaleMode=Phaser.ScaleManager.SHOW_ALL,i.scale.setMinMax(1152,640),i.scale.pageAlignVertically=!0,i.scale.pageAlignHorizontally=!0,i.scale.forceOrientation(!1,!0),i.scale.enterIncorrectOrientation.add(o),i.scale.leaveIncorrectOrientation.add(n),i.state.add("Tutorial",t),i.state.add("Play",e),i.state.add("Final",s),i.state.start("Tutorial")})},{"./FinalState":1,"./PlayState":2,"./TutorialState":3}]},{},[4]);