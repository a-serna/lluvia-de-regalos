(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var keysText = [];
keysText.push("Compartir");
keysText.push("Regalar");

function FinalState() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
FinalState.prototype = Object.create(Phaser.State.prototype);
FinalState.prototype.constructor = FinalState;

FinalState.prototype.init = function (point) {
    this.point = parseInt(point);
    this.discount = 0;
    if (parseInt(this.point) <= 50) {
        this.discount = 15;
        this.wordKey = keysText[0].toString();
    } else if(parseInt(this.point) >= 51) {
        this.discount = 25;
        this.wordKey = keysText[1].toString();
    }
}

FinalState.prototype.preload = function () {
    var loadStyle = {
        font: '7em Raleway Regular',
        fill: '#2b3f68',
        align: 'center'
    };


    this.stage.backgroundColor = '#ffffff';
    var loadTextY = Phaser.Device.desktop ? 300 : this.world.centerY;
    var loadText = this.add.text(this.world.centerX,loadTextY,'', loadStyle);
    loadText.anchor.setTo(0.5);

    if (Phaser.Device.desktop) {
        var progressBar = this.add.graphics(330, -150);
        var lodingBar = this.add.graphics(330, -150);
        lodingBar.lineStyle(3, '0x2b3f68');
        lodingBar.drawRoundedRect(100,500,300,30,10);
        lodingBar.endFill();
    }

    if (Phaser.Device.desktop) {
        this.load.image('background','assets/Backgrounds/Background-wins.jpg');
        this.load.image('legal','assets/Legales.png');
    } else {
        this.load.image('background','assets/Backgrounds/background-mobile-wins.png');
        this.load.image('legal','assets/Legales-mobile.png');
    }
};

FinalState.prototype.create = function () {
    var background = this.add.sprite(0,0,'background');
    Phaser.Device.desktop ? background.scale.setTo(0.6) : background.scale.setTo(0.83);

    var scoreStyle = {
        font: '4em Raleway Regular',
        fill: '#fff',
        align: 'center'
    };

    var bonoStyle = {
        font: '2em Raleway Regular',
        fill: '#000000',
        align: 'center'
    };

    var discountStyle = {
        font: '5em Raleway Regular',
        fill: '#000000',
        align: 'center'
    };

    var legalStyle = {
        font: '2.4em Raleway Regular',
        fill: '#000000',
        align: 'center'
    };

    var textBono = this.add.text(this.world.width / 2, this.world.height / 3.5, '',bonoStyle);
    textBono.text = "Recibe un bono de descuento por tus " + this.point + " puntos para redimir en \n "+ "cualquier producto de nuestras tiendas.";
    textBono.anchor.setTo(0.5,0);

    var discountText = this.add.text((this.world.width / 2), this.world.height / 2.8, '',discountStyle);
    discountText.text = this.discount+"%"+" de descuento";
    discountText.anchor.setTo(0.5,0);

    var yourPhaserText =   this.add.text((this.world.width / 2), this.world.height / 2.3, '',bonoStyle);
    yourPhaserText.text = "Tu palabra clave es:";
    yourPhaserText.anchor.setTo(0.5,0);

    var word = this.add.text((this.world.width / 2), this.world.height / 2.2, '',discountStyle);
    word.text = String(this.wordKey);
    word.anchor.setTo(0.5,0);

    var legalY = Phaser.Device.desktop ? this.world.height / 1.4 : this.world.height / 1.43;
    var legal = this.add.sprite(this.world.width / 2, legalY, 'legal');
    legal.anchor.setTo(0.5);
    Phaser.Device.desktop ? legal.scale.setTo(0.6, 0.7) : legal.scale.setTo(1.4);
};

module.exports = FinalState;

},{}],2:[function(require,module,exports){

var game = null

function PlayState() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
PlayState.prototype = Object.create(Phaser.State.prototype);
PlayState.prototype.constructor = PlayState;

PlayState.prototype.init = function () {
   this.lifes = 5;
   this.score = 0;
   this.isPause = true;
   this.timeGift = 60000;
   this.giftShowAll = true;
   this.level = 1;
   this.timePowerups = 30000;
   this.snowPauseTime = 1000;
   this.powerupsActivate = false;
   this.powerupSelected = null;
   this.audioImage = true;
};

PlayState.prototype.preload = function () {
    var loadStyle = {
        font: '7em Times Roman',
        fill: '#2b3f68',
        align: 'center'
    };

    this.stage.backgroundColor = '#ffffff';
    var loadTextY = Phaser.Device.desktop ? 300 : this.world.centerY;
    var loadText = this.add.text(this.world.centerX,loadTextY,'', loadStyle);
    loadText.anchor.setTo(0.5);

    if (Phaser.Device.desktop) {
        var progressBar = this.add.graphics(330, -150);
        var lodingBar = this.add.graphics(330, -150);
        lodingBar.lineStyle(3, '0x2b3f68');
        lodingBar.drawRoundedRect(100,500,300,30,10);
        lodingBar.endFill();
    }

    this.load.onFileComplete.add(function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadText.setText(progress+'%');
        if (Phaser.Device.desktop) {
            var load = progress + 194;
            progressBar.clear();
            progressBar.lineStyle(3, '0x2b3f68');
            progressBar.beginFill('0x2b3f68',1);
            progressBar.drawRoundedRect(103,501,load,27,1);
            progressBar.endFill();
        }
    }, this);

    if(!Phaser.Device.desktop){
        this.load.image('background','assets/Backgrounds/background-mobile.jpg');
        this.load.image('logo','assets/Logo.png');
        this.load.image('bar','assets/barra ui.png');
        this.load.image('pause-msg','assets/Popups/Pausa-mobile.png');
        this.load.image('fail-msg','assets/Popups/gameover-mobile.png');
        this.load.image('pause','assets/bar/pause.png');
        this.load.image('audio','assets/bar/sound.png');
        this.load.image('play', 'assets/Buttons/play.png');
        this.load.image('mute', 'assets/Buttons/audio-off.png')

        this.load.spritesheet('gift', 'assets/Gifts/gift.png', 216, 216, 37);
        this.load.spritesheet('gift2', 'assets/Gifts/gift2.png', 216, 216, 37);
        this.load.spritesheet('gift3', 'assets/Gifts/gift3.png', 216, 216, 37);
        this.load.spritesheet('gift4', 'assets/Gifts/gift4.png', 216, 216, 37);
        this.load.spritesheet('gift5', 'assets/Gifts/gift5.png', 216, 216, 37);
        this.load.spritesheet('life', 'assets/Gifts/life.png', 216, 216, 28);
        this.load.spritesheet('snow', 'assets/Gifts/powerupsnow.png', 167, 167, 72);
        this.load.spritesheet('star', 'assets/Gifts/powerupstar.png', 167, 167, 72);

        this.load.spritesheet('snowLeft', 'assets/Snowman/munecoizquierdo.png', 160, 200, 96);
        this.load.spritesheet('snowRight', 'assets/Snowman/munecoderecho.png', 160, 200, 96);

        this.load.audio('caida', 'assets/Music/SFX-Caida.mp3');
        this.load.audio('winter-game', 'assets/Music/Winter-Game.mp3');
        this.load.audio('boton', 'assets/Music/SFX-boton.mp3');
    } else {
        this.load.image('background','assets/Backgrounds/background-main.jpg');
        this.load.image('logo','assets/Logo.png');
        this.load.image('bar','assets/bar.png');
        this.load.image('pause-msg','assets/Popups/pauseMsg.png');
        this.load.image('fail-msg','assets/Popups/failMsg.png');
        this.load.image('pause','assets/bar/pause.png');
        this.load.image('audio','assets/bar/sound.png');
        this.load.image('play', 'assets/Buttons/play.png');
        this.load.image('mute', 'assets/Buttons/audio-off.png')

        this.load.spritesheet('gift', 'assets/Gifts/gift.png', 216, 216, 37);
        this.load.spritesheet('gift2', 'assets/Gifts/gift2.png', 216, 216, 37);
        this.load.spritesheet('gift3', 'assets/Gifts/gift3.png', 216, 216, 37);
        this.load.spritesheet('gift4', 'assets/Gifts/gift4.png', 216, 216, 37);
        this.load.spritesheet('gift5', 'assets/Gifts/gift5.png', 216, 216, 37);
        this.load.spritesheet('life', 'assets/Gifts/life.png', 216, 216, 28);
        this.load.spritesheet('snow', 'assets/Gifts/powerupsnow.png', 167, 167, 72);
        this.load.spritesheet('star', 'assets/Gifts/powerupstar.png', 167, 167, 72);

        this.load.spritesheet('snowLeft', 'assets/Snowman/munecoizquierdo.png', 160, 200, 96);
        this.load.spritesheet('snowRight', 'assets/Snowman/munecoderecho.png', 160, 200, 96);

        this.load.audio('caida', 'assets/Music/SFX-Caida.mp3');
        this.load.audio('winter-game', 'assets/Music/Winter-Game.mp3');
        this.load.audio('boton', 'assets/Music/SFX-boton.mp3');
    }
};

PlayState.prototype.create = function () {
   var font = Phaser.Device.desktop ? '7em Raleway Regular' : '5em Raleway Regular';
   var style = {
        font: font,
        fill: '#2b3f68',
        align: 'center'
    };

    this.habilidad = this.add.audio('boton');
    this.habilidad.usingWebAudio = true;

    this.caida = this.add.audio('caida');

    this.winterGame = this.add.audio('winter-game');
    this.winterGame.loop = true;
    this.winterGame.volume = 0.5;
    this.winterGame.play();

    var backgroundScale = this.street = this.add.sprite(0,0,'background');
    Phaser.Device.desktop ? backgroundScale.scale.setTo(1, 0.85) : backgroundScale.scale.setTo(1, 0.85);

    var snowmanLeftX = Phaser.Device.desktop ? this.game.world.width / 10 : this.game.world.width / 5;
    var snowmanLeft =  this.add.sprite(snowmanLeftX, this.game.world.height - ( Phaser.Device.desktop ? this.game.world.height / 6.5 : this.game.world.width / 5),'snowLeft');
    snowmanLeft.anchor.setTo(0.5)
    Phaser.Device.desktop ? snowmanLeft.scale.setTo(-1, 1) : snowmanLeft.scale.setTo(-1.5, 1.5);

    animationSnowman(snowmanLeft);

    var snowmanRightX = Phaser.Device.desktop ? this.game.world.width / 1.1 : this.game.world.width / 1.2;
    var snowmanRight =  this.add.sprite(snowmanRightX, this.game.world.height - ( Phaser.Device.desktop ? this.game.world.height / 7 : this.game.world.width / 5),'snowRight');
    snowmanRight.anchor.setTo(0.5)
    Phaser.Device.desktop ? snowmanRight.scale.setTo(1): snowmanRight.scale.setTo(1.5);

    animationSnowman(snowmanRight);

    this.regalos = this.add.group();
    this.powerups = this.add.group();

    this.bar = this.add.sprite(0,0, 'bar');
    this.bar.anchor.setTo(0);
    Phaser.Device.desktop ? this.bar.scale.setTo(0.8) : this.bar.scale.setTo(2);

    var logo = this.add.sprite(this.world.centerX, 0, 'logo');
    logo.anchor.setTo(0.5, 0);
    logo.scale.setTo(0.8);

    this.pause = this.add.sprite(this.world.width - 20, 20,'pause');
    this.pause.scale.setTo(0.7);
    this.pause.anchor.setTo(1,0);

    var audio = this.add.sprite(this.pause.x - 60, 20,'audio');
    audio.scale.setTo(0.7);
    audio.anchor.setTo(1,0);
    audio.inputEnabled = true;
    audio.input.pixelPerfectOver = true;
    audio.input.useHandCursor = true;
    audio.events.onInputDown.add(function(){
        this.audioManager(audio);
    },this);

    this.pause.inputEnabled = true;
    this.pause.input.pixelPerfectOver = true;
    this.pause.input.useHandCursor = true;
    this.pause.events.onInputDown.add(function(){
        this.pauseManager(pauseMsg, audio, true);
    },this);

    var textScoreY = Phaser.Device.desktop ? 5 : 15;
    this.textScore = this.add.text(this.world.width - 150, textScoreY, '0000', style);
    this.textScore.anchor.setTo(1,0);

    this.lifeGroup = this.add.group();
    var lifeX = Phaser.Device.desktop ? 5 : 0;
    var lifeY = 10;
    for (var i = 0; i<this.lifes; i++) {
        lifeX = Phaser.Device.desktop ? lifeX + 50 : lifeX + 40;
        var life = this.lifeGroup.create(lifeX, lifeY, 'life');
        life.scale.setTo(0.3);
        life.id = i;
    }

    this.createGiftSQuantity(3);

    var pauseMsg = this.add.sprite(this.world.centerX, this.world.centerY, 'pause-msg');
    pauseMsg.anchor.setTo(0.5);
    Phaser.Device.desktop ? pauseMsg.scale.setTo(0.5) : pauseMsg.scale.setTo(0.85);
    pauseMsg.inputEnabled = true;
    pauseMsg.input.useHandCursor = true;
    pauseMsg.visible = false;

    pauseMsg.events.onInputDown.add(function(){
        this.pauseManager(pauseMsg);
    },this);

    this.failMsg = this.add.sprite(this.world.centerX, this.world.centerY, 'fail-msg');
    this.failMsg.anchor.setTo(0.5);
    Phaser.Device.desktop ? this.failMsg.scale.setTo(0.5) : this.failMsg.scale.setTo(0.85);
    this.failMsg.inputEnabled = true;
    this.failMsg.input.useHandCursor = true;
    this.failMsg.visible = false;

    this.failMsg.events.onInputDown.add(function(){
        this.winterGame.destroy(true);
        this.lifes = 5;
        for (var i = 0; i<5; i++) {
            this.lifeGroup.children[i].loadTexture('life' ,0)
        }
        this.game.paused = false;
        this.failMsg.visible = false;
        this.game.state.restart();
    },this);
};

PlayState.prototype.audioManager = function (audio) {
    if (this.audioImage) {
        audio.loadTexture('mute',0);
        this.winterGame.pause();
        this.habilidad.mute = true;
        this.caida.mute = true;
        this.audioImage = false;
    } else {
        audio.loadTexture('audio',0);
        this.winterGame.resume();
        this.habilidad.mute = false;
        this.caida.mute = false;
        this.audioImage = true;
    }
};

PlayState.prototype.createGiftSQuantity = function (num) {
    for (var index = 0; index<num; index++) {
        this.createGiftSprites(this.regalos, index);
    }
}

PlayState.prototype.pauseManager = function (pauseMsg, audio, windowShow) {
    if (this.isPause === true) {
        this.pause.loadTexture('play', 0);
        this.game.paused = this.isPause;
        this.isPause = false;
        pauseMsg.visible = true;
        this.winterGame.pause();
        this.audioManager(audio);
    } else {
        pauseMsg.visible = false;
        this.pause.loadTexture('pause', 0);
        this.game.paused = this.isPause;
        this.isPause = true;
        this.winterGame.resume();
        this.audioManager(audio);
    }
};

PlayState.prototype.stopResumeTween = function (pause) {
    for(var i = 0; i<this.regalos.children.length; i++) {
        if (pause === true) {
            this.regalos.children[i].myTween.pause();
        } else {
            this.regalos.children[i].myTween.resume();
        }
    }
};
PlayState.prototype.createPowerups = function () {

    for (var i = 0; i<2; i++) {
        var arrayTextures = [];
        arrayTextures.push('snow');
        arrayTextures.push('star');

        var paddingGift = this.game.world.width / 6;
        var radomPositionY = this.rnd.integerInRange(0, 1);
        var randomVelocityY = this.rnd.integerInRange(0, 3);
        var positionRamdomX =  Phaser.Device.desktop ? this.rnd.integerInRange(1, 6) : this.rnd.integerInRange(1, 3);

        var sprite =  this.powerups.create((positionRamdomX * paddingGift), (radomPositionY * 10), arrayTextures[i]);
        Phaser.Device.desktop ? sprite.scale.setTo(1) : sprite.scale.setTo(2);
        sprite.type = arrayTextures[i];

        this.add.tween(sprite).to({y: (this.game.world.height + sprite.height)}, 5000 + (randomVelocityY * 1000 ),Phaser.Easing.Quadratic.In,true,0,0,false);
        animationSprite(sprite);


        sprite.checkWorldBounds = true;
        sprite.events.onOutOfBounds.add(function(mySprite){
            mySprite.destroy();
        }, this);

        var game = this;
        sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
        sprite.events.onInputDown.add(function(mySprite){
            this.caida.play();
            if (mySprite.type === 'snow') {
                this.stopResumeTween(true);
                this.powerupsActivate = true;
            } else if (mySprite.type === 'star') {
                score(game, 5);
            }
            this.habilidad.play();
            mySprite.destroy();
        },this);
    }
}

PlayState.prototype.update = function () {
    if (this.lifes === 0) {
        if (this.score < 35) {
            this.failMsg.visible = true;
            this.game.paused = true;
        } else {
            this.state.start('Final', true, true, this.score)
        }
    }

    if (this.timePowerups < 0) {
        this.createPowerups();
        this.timePowerups = 30000;
    } else {
        this.timePowerups -= 20;
    }

    if (this.powerupsActivate) {
        if (this.snowPauseTime < 0) {
            this.stopResumeTween(false);
            this.snowPauseTime = 1000;
            this.powerupsActivate = false;
        } else {
            this.snowPauseTime -= 8;
        }
    }

    if ((this.timeGift < 0) && (this.giftShowAll === true)) {
        Phaser.Device.desktop ? this.createGiftSQuantity(6) : this.createGiftSQuantity(4);
        this.giftShowAll = false;
    } else {
        this.timeGift -= 100;
    }
};

PlayState.prototype.createGiftSprites = function (group, index) {
    var arrayTextures = [];
    arrayTextures.push('gift');
    arrayTextures.push('gift2');
    arrayTextures.push('gift3');
    arrayTextures.push('gift4');
    arrayTextures.push('gift5');

    var positionRegalos = 50;
    var paddingGift = Phaser.Device.desktop ? this.game.world.width / 6 :  this.game.world.width / 4;
    var numGift = this.game.rnd.integerInRange(1, 6);
    var radomPositionY = this.rnd.integerInRange(0, 1);
    var randomVelocityY = this.rnd.integerInRange(0, 3);

    var randomTexture = this.game.rnd.integerInRange(0, 4);

    var sprite = {};
    if (index > 6) {
        sprite = group.create( paddingGift + ((index - 6) * paddingGift), (radomPositionY * 10), arrayTextures[randomTexture]);
    } else {
        sprite = group.create(positionRegalos + (index * paddingGift), (radomPositionY * 10), arrayTextures[randomTexture]);
    }

    sprite.inLevel = true;

    if (index <= 4) {
        sprite.visible = false;
        sprite.inLevel = false;
    }

    sprite.alpha = 1;
    Phaser.Device.desktop ? sprite.scale.setTo(0.5) : sprite.scale.setTo(0.8);

    var game = this;

    var tweenSprite = this.add.tween(sprite).to(
        { y: (this.game.world.height + sprite.height) },
         5000 + (randomVelocityY * 1000 ),
         Phaser.Easing.Quadratic.In,
         true,
         0,
         -1,
         false
    );
    this.add.tween(sprite).to({ angle: (numGift * 10) }, 5000, Phaser.Easing.Quadratic.In,true,0,0,false);

    sprite.myTween = tweenSprite;
    sprite.visible = true;
    sprite.checkWorldBounds = true;
    sprite.events.onOutOfBounds.add(function(mySprite){
        let randomTexture = this.game.rnd.integerInRange(0, 4);
        mySprite.loadTexture(arrayTextures[randomTexture], 0);
        Phaser.Device.desktop ? mySprite.scale.setTo(0.5) : mySprite.scale.setTo(0.8);

        if ((sprite.alpha === 1) && game.lifeGroup.children[game.lifes - 1] && (mySprite.y >= 0) && (mySprite.y > this.game.world.height)) {
            animateLife(game.lifeGroup.children[game.lifes - 1]);
            game.lifes -= 1;
        } else {
            sprite.alpha = 1;
            sprite.inputEnabled = true;
        }
    }, this);

    sprite.inputEnabled = true;
    sprite.input.useHandCursor = true;
    sprite.events.onInputDown.add(function(mySprite){
        mySprite.alpha = 0;
        sprite.inputEnabled = true;
        this.habilidad.play();
        score(game);
    },this);
}

function score (game, num = 1) {
    game.score = game.score + num;
    var puntation = '0000';
    if (game.score < 10) {
        puntation = '000';
    } else if(game.score < 100) {
        puntation = '00';
    } else if (game.score < 1000){
        puntation = '0';
    }

    game.textScore.setText(puntation + game.score);
}

function animationSprite (sprite) {
    var array = [];
    for (var i = 1; i <= 72; i++) {
        array.push(i);
    }
    sprite.animations.add('anima', array, 24, true);
    sprite.animations.play('anima');
}

function animationSnowman (sprite) {
    var array = [];
    for (var i = 1; i <= 96; i++) {
        array.push(i);
    }
    sprite.animations.add('snowMan', array, 24, true);
    sprite.animations.play('snowMan');
}

function animationClick (sprite) {
    var array = [];
    for (var i = 2; i <= 37; i++) {
        array.push(i);
    }
    sprite.animations.add('click', array, 24, true);
    sprite.animations.play('click');
}

function animateLife (sprite) {
    var array = [];
    for (var i = 1; i <= 28; i++) {
        array.push(i);
    }
    sprite.animations.add('life', array, 24, false);
    sprite.animations.play('life');
}


function animationLife (sprite) {
    var array = [];
    for (var i = 1; i <= 28; i++) {
        array.push(i);
    }
    sprite.animations.add('life', array, 24, true);
    sprite.animations.play('life');
}

function animationDead (sprite) {
    var array = [];
    for (var i = 1; i >= 108; i--) {
        array.push(i);
    }
    sprite.animations.add('dead', array, 24, true);
    sprite.animations.play('dead');
}

module.exports = PlayState;

},{}],3:[function(require,module,exports){
function TutorialState() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
TutorialState.prototype =  Object.create(Phaser.State.prototype);
TutorialState.prototype.constructor = TutorialState;

TutorialState.prototype.init = function () {
	this.tutorialPart = 1;
    this.popup = null;
};

TutorialState.prototype.preload = function () {
    var loadStyle = {
        font: '7em Times Roman',
        fill: '#2b3f68',
        align: 'center'
    };

    this.stage.backgroundColor = '#ffffff';
    var loadTextY = Phaser.Device.desktop ? 300 : this.world.centerY;
    var loadText = this.add.text(this.world.centerX,loadTextY,'', loadStyle);
    loadText.anchor.setTo(0.5);

    if (Phaser.Device.desktop) {
        var progressBar = this.add.graphics(330, -150);
        var lodingBar = this.add.graphics(330, -150);
        lodingBar.lineStyle(3, '0x2b3f68');
        lodingBar.drawRoundedRect(100,500,300,30,10);
        lodingBar.endFill();
    }

    this.load.onFileComplete.add(function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadText.setText(progress+'%');
        if (Phaser.Device.desktop) {
            var load = progress + 194;
            progressBar.clear();
            progressBar.lineStyle(3, '0x2b3f68');
            progressBar.beginFill('0x2b3f68',1);
            progressBar.drawRoundedRect(103,501,load,27,1);
            progressBar.endFill();
        }
    }, this);

    if(!Phaser.Device.desktop){
        this.load.image('next', 'assets/Buttons/next.png');
        this.load.image('close','assets/Buttons/close.png');
        this.load.image('button-play','assets/Buttons/button-play.png');

        this.load.image('window1', 'assets/Popups/Tutorials/window1-mobile.png');
        this.load.image('window2', 'assets/Popups/Tutorials/window2-mobile.png');
        this.load.image('window3', 'assets/Popups/Tutorials/window3-mobile.png');
        this.load.image('window4', 'assets/Popups/Tutorials/window4-mobile.png');
        this.load.image('window5', 'assets/Popups/Tutorials/window5-mobile.png');

        this.load.audio('boton', 'assets/Music/hability.mp3');
    } else {
        this.load.image('street','assets/Backgrounds/background-blur.jpg');

        this.load.image('next', 'assets/Buttons/next.png');
        this.load.image('close','assets/Buttons/close.png');
        this.load.image('button-play','assets/Buttons/button-play.png');

        this.load.image('window1', 'assets/Popups/Tutorials/window1.png');
        this.load.image('window2', 'assets/Popups/Tutorials/window2.png');
        this.load.image('window3', 'assets/Popups/Tutorials/window3.png');
        this.load.image('window4', 'assets/Popups/Tutorials/window4.png');
        this.load.image('window5', 'assets/Popups/Tutorials/window5.png');

        this.load.audio('boton', 'assets/Music/hability.mp3');
    }
};

TutorialState.prototype.create = function () {
    var boton = this.add.audio('boton');
    this.street = Phaser.Device.desktop ? this.add.sprite(0, 0,'street') : this.add.sprite(0, 0,'');
    this.street.scale.setTo(0.7);

    var popup = this.add.sprite(this.world.centerX, this.world.centerY, 'window1');
    Phaser.Device.desktop ? popup.anchor.setTo(0.5) : popup.anchor.setTo(0.5);
    Phaser.Device.desktop ? popup.scale.setTo(0.7) : popup.scale.setTo(0.85);
    popup.inputEnabled = true;

    var ok = this.add.sprite(0, 0, 'next');
    ok.anchor.setTo(0.5);
    ok.inputEnabled = true;
    ok.input.useHandCursor = true;
    popup.addChild(ok);
    ok.y = Phaser.Device.desktop ? (popup.height / 2) + ok.height : (popup.height / 2.5) + ok.height;
    Phaser.Device.desktop ? ok.scale.setTo(1) : ok.scale.setTo(1.85);
    ok.events.onInputDown.add(function(){
       boton.play();
    },this);

    var close = this.add.sprite(0, 0, 'close');
    close.anchor.setTo(0,1);
    close.inputEnabled = true;
    close.input.useHandCursor = true;
    popup.addChild(close);
    close.x = Phaser.Device.desktop ? (popup.width / 2) + close.width : (popup.width / 2.8) + close.width;
    close.y = Phaser.Device.desktop ? -((popup.height / 2) + close.width) : -((popup.height / 2.2) + close.width);
    Phaser.Device.desktop ? close.scale.setTo(1) : close.scale.setTo(1.85);

    close.events.onInputDown.add(function(){
        boton.play();
        game.state.start('Play');
    },this);

    var game = this;
    ok.events.onInputDown.add(function(){
        switch (this.tutorialPart) {
            case 1 :
                popup.loadTexture('window2',0);
                this.tutorialPart = 2;
                break;
            case 2 :
                popup.loadTexture('window3',0);
                this.tutorialPart = 3;
                break;
            case 3 :
                popup.loadTexture('window4',0);
                this.tutorialPart = 4;
                break;
            case 4 :
                popup.loadTexture('window5',0);
                ok.loadTexture('button-play', 0);
                this.tutorialPart = 5;
                break;
            case 5 :
                popup.visible = false;
                this.tutorialPart = 1;
                this.state.start('Play');
        }

    }, this);
};

module.exports = TutorialState;

},{}],4:[function(require,module,exports){
// PHASER IS IMPORTED AS AN EXTERNAL BUNDLE IN INDEX.HTML
Phaser.Device.whenReady(function () {
  var TutorialState  = require('./TutorialState')
  var PlayState = require('./PlayState')
  var FinalState = require('./FinalState')

  if (!Phaser.Device.desktop) {
    var game = new Phaser.Game(640, 1152, Phaser.AUTO, 'game');
    game.stage.backgroundColor = 0x000000;

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    document.getElementById("landscape").style.display="none";

    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
  } else {
    var game = new Phaser.Game(1152, 640, Phaser.AUTO, 'game');
    game.stage.backgroundColor = 0x000000;

    game.scale.setMinMax(1152, 640);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;


    game.scale.forceOrientation(false, true);

    game.scale.enterIncorrectOrientation.add(handleIncorrect);
    game.scale.leaveIncorrectOrientation.add(handleCorrect);

  }


  game.state.add('Tutorial',   TutorialState)
  game.state.add('Play',   PlayState)
  game.state.add('Final', FinalState)

  game.state.start('Tutorial');
})

function handleIncorrect () {
  document.getElementById("landscape").style.display="none";
}

function handleCorrect () {
  document.getElementById("landscape").style.display="block";
}
},{"./FinalState":1,"./PlayState":2,"./TutorialState":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0hPTUUvQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvcGhhc2VyLW5vZGUta2l0L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9GaW5hbFN0YXRlLmpzIiwiYnVpbGQvanMvUGxheVN0YXRlLmpzIiwiYnVpbGQvanMvVHV0b3JpYWxTdGF0ZS5qcyIsImJ1aWxkL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIga2V5c1RleHQgPSBbXTtcclxua2V5c1RleHQucHVzaChcIkNvbXBhcnRpclwiKTtcclxua2V5c1RleHQucHVzaChcIlJlZ2FsYXJcIik7XHJcblxyXG5mdW5jdGlvbiBGaW5hbFN0YXRlKCkge1xyXG5cdFBoYXNlci5TdGF0ZS5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG4vKiogQHR5cGUgUGhhc2VyLlN0YXRlICovXHJcbkZpbmFsU3RhdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQaGFzZXIuU3RhdGUucHJvdG90eXBlKTtcclxuRmluYWxTdGF0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGaW5hbFN0YXRlO1xyXG5cclxuRmluYWxTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgdGhpcy5wb2ludCA9IHBhcnNlSW50KHBvaW50KTtcclxuICAgIHRoaXMuZGlzY291bnQgPSAwO1xyXG4gICAgaWYgKHBhcnNlSW50KHRoaXMucG9pbnQpIDw9IDUwKSB7XHJcbiAgICAgICAgdGhpcy5kaXNjb3VudCA9IDE1O1xyXG4gICAgICAgIHRoaXMud29yZEtleSA9IGtleXNUZXh0WzBdLnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2UgaWYocGFyc2VJbnQodGhpcy5wb2ludCkgPj0gNTEpIHtcclxuICAgICAgICB0aGlzLmRpc2NvdW50ID0gMjU7XHJcbiAgICAgICAgdGhpcy53b3JkS2V5ID0ga2V5c1RleHRbMF0udG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5cclxuRmluYWxTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsb2FkU3R5bGUgPSB7XHJcbiAgICAgICAgZm9udDogJzdlbSBSYWxld2F5IFJlZ3VsYXInLFxyXG4gICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgIH07XHJcblxyXG4gICBcclxuICAgIHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNmZmZmZmYnO1xyXG4gICAgdmFyIGxvYWRUZXh0WSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IDMwMCA6IHRoaXMud29ybGQuY2VudGVyWTtcclxuICAgIHZhciBsb2FkVGV4dCA9IHRoaXMuYWRkLnRleHQodGhpcy53b3JsZC5jZW50ZXJYLGxvYWRUZXh0WSwnJywgbG9hZFN0eWxlKTtcclxuICAgIGxvYWRUZXh0LmFuY2hvci5zZXRUbygwLjUpO1xyXG5cclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB2YXIgcHJvZ3Jlc3NCYXIgPSB0aGlzLmFkZC5ncmFwaGljcygzMzAsIC0xNTApO1xyXG4gICAgICAgIHZhciBsb2RpbmdCYXIgPSB0aGlzLmFkZC5ncmFwaGljcygzMzAsIC0xNTApO1xyXG4gICAgICAgIGxvZGluZ0Jhci5saW5lU3R5bGUoMywgJzB4MmIzZjY4Jyk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmRyYXdSb3VuZGVkUmVjdCgxMDAsNTAwLDMwMCwzMCwxMCk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmVuZEZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywnYXNzZXRzL0JhY2tncm91bmRzL0JhY2tncm91bmQtd2lucy5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2xlZ2FsJywnYXNzZXRzL0xlZ2FsZXMucG5nJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFja2dyb3VuZCcsJ2Fzc2V0cy9CYWNrZ3JvdW5kcy9iYWNrZ3JvdW5kLW1vYmlsZS13aW5zLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbGVnYWwnLCdhc3NldHMvTGVnYWxlcy1tb2JpbGUucG5nJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5GaW5hbFN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYmFja2dyb3VuZCA9IHRoaXMuYWRkLnNwcml0ZSgwLDAsJ2JhY2tncm91bmQnKTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IGJhY2tncm91bmQuc2NhbGUuc2V0VG8oMC42KSA6IGJhY2tncm91bmQuc2NhbGUuc2V0VG8oMC44Myk7XHJcblxyXG4gICAgdmFyIHNjb3JlU3R5bGUgPSB7XHJcbiAgICAgICAgZm9udDogJzRlbSBSYWxld2F5IFJlZ3VsYXInLFxyXG4gICAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGJvbm9TdHlsZSA9IHtcclxuICAgICAgICBmb250OiAnMmVtIFJhbGV3YXkgUmVndWxhcicsXHJcbiAgICAgICAgZmlsbDogJyMwMDAwMDAnLFxyXG4gICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZGlzY291bnRTdHlsZSA9IHtcclxuICAgICAgICBmb250OiAnNWVtIFJhbGV3YXkgUmVndWxhcicsXHJcbiAgICAgICAgZmlsbDogJyMwMDAwMDAnLFxyXG4gICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbGVnYWxTdHlsZSA9IHtcclxuICAgICAgICBmb250OiAnMi40ZW0gUmFsZXdheSBSZWd1bGFyJyxcclxuICAgICAgICBmaWxsOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB0ZXh0Qm9ubyA9IHRoaXMuYWRkLnRleHQodGhpcy53b3JsZC53aWR0aCAvIDIsIHRoaXMud29ybGQuaGVpZ2h0IC8gMy41LCAnJyxib25vU3R5bGUpO1xyXG4gICAgdGV4dEJvbm8udGV4dCA9IFwiUmVjaWJlIHVuIGJvbm8gZGUgZGVzY3VlbnRvIHBvciB0dXMgXCIgKyB0aGlzLnBvaW50ICsgXCIgcHVudG9zIHBhcmEgcmVkaW1pciBlbiBcXG4gXCIrIFwiY3VhbHF1aWVyIHByb2R1Y3RvIGRlIG51ZXN0cmFzIHRpZW5kYXMuXCI7XHJcbiAgICB0ZXh0Qm9uby5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG5cclxuICAgIHZhciBkaXNjb3VudFRleHQgPSB0aGlzLmFkZC50ZXh0KCh0aGlzLndvcmxkLndpZHRoIC8gMiksIHRoaXMud29ybGQuaGVpZ2h0IC8gMi44LCAnJyxkaXNjb3VudFN0eWxlKTtcclxuICAgIGRpc2NvdW50VGV4dC50ZXh0ID0gdGhpcy5kaXNjb3VudCtcIiVcIitcIiBkZSBkZXNjdWVudG9cIjtcclxuICAgIGRpc2NvdW50VGV4dC5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG5cclxuICAgIHZhciB5b3VyUGhhc2VyVGV4dCA9ICAgdGhpcy5hZGQudGV4dCgodGhpcy53b3JsZC53aWR0aCAvIDIpLCB0aGlzLndvcmxkLmhlaWdodCAvIDIuMywgJycsYm9ub1N0eWxlKTtcclxuICAgIHlvdXJQaGFzZXJUZXh0LnRleHQgPSBcIlR1IHBhbGFicmEgY2xhdmUgZXM6XCI7XHJcbiAgICB5b3VyUGhhc2VyVGV4dC5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG5cclxuICAgIHZhciB3b3JkID0gdGhpcy5hZGQudGV4dCgodGhpcy53b3JsZC53aWR0aCAvIDIpLCB0aGlzLndvcmxkLmhlaWdodCAvIDIuMiwgJycsZGlzY291bnRTdHlsZSk7XHJcbiAgICB3b3JkLnRleHQgPSBTdHJpbmcodGhpcy53b3JkS2V5KTtcclxuICAgIHdvcmQuYW5jaG9yLnNldFRvKDAuNSwwKTtcclxuXHJcbiAgICB2YXIgbGVnYWxZID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5oZWlnaHQgLyAxLjQgOiB0aGlzLndvcmxkLmhlaWdodCAvIDEuNDM7XHJcbiAgICB2YXIgbGVnYWwgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy53b3JsZC53aWR0aCAvIDIsIGxlZ2FsWSwgJ2xlZ2FsJyk7XHJcbiAgICBsZWdhbC5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IGxlZ2FsLnNjYWxlLnNldFRvKDAuNiwgMC43KSA6IGxlZ2FsLnNjYWxlLnNldFRvKDEuNCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpbmFsU3RhdGU7XHJcbiIsIlxyXG52YXIgZ2FtZSA9IG51bGxcclxuXHJcbmZ1bmN0aW9uIFBsYXlTdGF0ZSgpIHtcclxuXHRQaGFzZXIuU3RhdGUuY2FsbCh0aGlzKTtcclxufVxyXG5cclxuLyoqIEB0eXBlIFBoYXNlci5TdGF0ZSAqL1xyXG5QbGF5U3RhdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQaGFzZXIuU3RhdGUucHJvdG90eXBlKTtcclxuUGxheVN0YXRlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBsYXlTdGF0ZTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgdGhpcy5saWZlcyA9IDU7XHJcbiAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICB0aGlzLmlzUGF1c2UgPSB0cnVlO1xyXG4gICB0aGlzLnRpbWVHaWZ0ID0gNjAwMDA7XHJcbiAgIHRoaXMuZ2lmdFNob3dBbGwgPSB0cnVlO1xyXG4gICB0aGlzLmxldmVsID0gMTtcclxuICAgdGhpcy50aW1lUG93ZXJ1cHMgPSAzMDAwMDtcclxuICAgdGhpcy5zbm93UGF1c2VUaW1lID0gMTAwMDtcclxuICAgdGhpcy5wb3dlcnVwc0FjdGl2YXRlID0gZmFsc2U7XHJcbiAgIHRoaXMucG93ZXJ1cFNlbGVjdGVkID0gbnVsbDtcclxuICAgdGhpcy5hdWRpb0ltYWdlID0gdHJ1ZTtcclxufTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsb2FkU3R5bGUgPSB7XHJcbiAgICAgICAgZm9udDogJzdlbSBUaW1lcyBSb21hbicsXHJcbiAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcclxuICAgIHZhciBsb2FkVGV4dFkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAzMDAgOiB0aGlzLndvcmxkLmNlbnRlclk7XHJcbiAgICB2YXIgbG9hZFRleHQgPSB0aGlzLmFkZC50ZXh0KHRoaXMud29ybGQuY2VudGVyWCxsb2FkVGV4dFksJycsIGxvYWRTdHlsZSk7XHJcbiAgICBsb2FkVGV4dC5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdmFyIHByb2dyZXNzQmFyID0gdGhpcy5hZGQuZ3JhcGhpY3MoMzMwLCAtMTUwKTtcclxuICAgICAgICB2YXIgbG9kaW5nQmFyID0gdGhpcy5hZGQuZ3JhcGhpY3MoMzMwLCAtMTUwKTtcclxuICAgICAgICBsb2RpbmdCYXIubGluZVN0eWxlKDMsICcweDJiM2Y2OCcpO1xyXG4gICAgICAgIGxvZGluZ0Jhci5kcmF3Um91bmRlZFJlY3QoMTAwLDUwMCwzMDAsMzAsMTApO1xyXG4gICAgICAgIGxvZGluZ0Jhci5lbmRGaWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZChmdW5jdGlvbihwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKXtcclxuICAgICAgICBsb2FkVGV4dC5zZXRUZXh0KHByb2dyZXNzKyclJyk7XHJcbiAgICAgICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgICAgICB2YXIgbG9hZCA9IHByb2dyZXNzICsgMTk0O1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5jbGVhcigpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5saW5lU3R5bGUoMywgJzB4MmIzZjY4Jyk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmJlZ2luRmlsbCgnMHgyYjNmNjgnLDEpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5kcmF3Um91bmRlZFJlY3QoMTAzLDUwMSxsb2FkLDI3LDEpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5lbmRGaWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgaWYoIVBoYXNlci5EZXZpY2UuZGVza3RvcCl7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywnYXNzZXRzL0JhY2tncm91bmRzL2JhY2tncm91bmQtbW9iaWxlLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbG9nbycsJ2Fzc2V0cy9Mb2dvLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFyJywnYXNzZXRzL2JhcnJhIHVpLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncGF1c2UtbXNnJywnYXNzZXRzL1BvcHVwcy9QYXVzYS1tb2JpbGUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdmYWlsLW1zZycsJ2Fzc2V0cy9Qb3B1cHMvZ2FtZW92ZXItbW9iaWxlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncGF1c2UnLCdhc3NldHMvYmFyL3BhdXNlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYXVkaW8nLCdhc3NldHMvYmFyL3NvdW5kLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncGxheScsICdhc3NldHMvQnV0dG9ucy9wbGF5LnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbXV0ZScsICdhc3NldHMvQnV0dG9ucy9hdWRpby1vZmYucG5nJylcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdnaWZ0JywgJ2Fzc2V0cy9HaWZ0cy9naWZ0LnBuZycsIDIxNiwgMjE2LCAzNyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdnaWZ0MicsICdhc3NldHMvR2lmdHMvZ2lmdDIucG5nJywgMjE2LCAyMTYsIDM3KTtcclxuICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ2dpZnQzJywgJ2Fzc2V0cy9HaWZ0cy9naWZ0My5wbmcnLCAyMTYsIDIxNiwgMzcpO1xyXG4gICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnZ2lmdDQnLCAnYXNzZXRzL0dpZnRzL2dpZnQ0LnBuZycsIDIxNiwgMjE2LCAzNyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdnaWZ0NScsICdhc3NldHMvR2lmdHMvZ2lmdDUucG5nJywgMjE2LCAyMTYsIDM3KTtcclxuICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ2xpZmUnLCAnYXNzZXRzL0dpZnRzL2xpZmUucG5nJywgMjE2LCAyMTYsIDI4KTtcclxuICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ3Nub3cnLCAnYXNzZXRzL0dpZnRzL3Bvd2VydXBzbm93LnBuZycsIDE2NywgMTY3LCA3Mik7XHJcbiAgICAgICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdzdGFyJywgJ2Fzc2V0cy9HaWZ0cy9wb3dlcnVwc3Rhci5wbmcnLCAxNjcsIDE2NywgNzIpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ3Nub3dMZWZ0JywgJ2Fzc2V0cy9Tbm93TWFuL211bmVjb2l6cXVpZXJkby5wbmcnLCAxNjAsIDIwMCwgOTYpO1xyXG4gICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnc25vd1JpZ2h0JywgJ2Fzc2V0cy9Tbm93TWFuL211bmVjb2RlcmVjaG8ucG5nJywgMTYwLCAyMDAsIDk2KTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmF1ZGlvKCdjYWlkYScsICdhc3NldHMvTXVzaWMvU0ZYLUNhaWRhLm1wMycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5hdWRpbygnd2ludGVyLWdhbWUnLCAnYXNzZXRzL011c2ljL1dpbnRlci1HYW1lLm1wMycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5hdWRpbygnYm90b24nLCAnYXNzZXRzL011c2ljL1NGWC1ib3Rvbi5tcDMnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywnYXNzZXRzL0JhY2tncm91bmRzL2JhY2tncm91bmQtbWFpbi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2xvZ28nLCdhc3NldHMvTG9nby5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhcicsJ2Fzc2V0cy9iYXIucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdwYXVzZS1tc2cnLCdhc3NldHMvUG9wdXBzL3BhdXNlTXNnLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZmFpbC1tc2cnLCdhc3NldHMvUG9wdXBzL2ZhaWxNc2cucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdwYXVzZScsJ2Fzc2V0cy9iYXIvcGF1c2UucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdhdWRpbycsJ2Fzc2V0cy9iYXIvc291bmQucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdwbGF5JywgJ2Fzc2V0cy9CdXR0b25zL3BsYXkucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdtdXRlJywgJ2Fzc2V0cy9CdXR0b25zL2F1ZGlvLW9mZi5wbmcnKVxyXG5cclxuICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ2dpZnQnLCAnYXNzZXRzL0dpZnRzL2dpZnQucG5nJywgMjE2LCAyMTYsIDM3KTtcclxuICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ2dpZnQyJywgJ2Fzc2V0cy9HaWZ0cy9naWZ0Mi5wbmcnLCAyMTYsIDIxNiwgMzcpO1xyXG4gICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnZ2lmdDMnLCAnYXNzZXRzL0dpZnRzL2dpZnQzLnBuZycsIDIxNiwgMjE2LCAzNyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdnaWZ0NCcsICdhc3NldHMvR2lmdHMvZ2lmdDQucG5nJywgMjE2LCAyMTYsIDM3KTtcclxuICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ2dpZnQ1JywgJ2Fzc2V0cy9HaWZ0cy9naWZ0NS5wbmcnLCAyMTYsIDIxNiwgMzcpO1xyXG4gICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnbGlmZScsICdhc3NldHMvR2lmdHMvbGlmZS5wbmcnLCAyMTYsIDIxNiwgMjgpO1xyXG4gICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnc25vdycsICdhc3NldHMvR2lmdHMvcG93ZXJ1cHNub3cucG5nJywgMTY3LCAxNjcsIDcyKTtcclxuICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ3N0YXInLCAnYXNzZXRzL0dpZnRzL3Bvd2VydXBzdGFyLnBuZycsIDE2NywgMTY3LCA3Mik7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnc25vd0xlZnQnLCAnYXNzZXRzL1Nub3dNYW4vbXVuZWNvaXpxdWllcmRvLnBuZycsIDE2MCwgMjAwLCA5Nik7XHJcbiAgICAgICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdzbm93UmlnaHQnLCAnYXNzZXRzL1Nub3dNYW4vbXVuZWNvZGVyZWNoby5wbmcnLCAxNjAsIDIwMCwgOTYpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuYXVkaW8oJ2NhaWRhJywgJ2Fzc2V0cy9NdXNpYy9TRlgtQ2FpZGEubXAzJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmF1ZGlvKCd3aW50ZXItZ2FtZScsICdhc3NldHMvTXVzaWMvV2ludGVyLUdhbWUubXAzJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmF1ZGlvKCdib3RvbicsICdhc3NldHMvTXVzaWMvU0ZYLWJvdG9uLm1wMycpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgIHZhciBmb250ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gJzdlbSBSYWxld2F5IFJlZ3VsYXInIDogJzVlbSBSYWxld2F5IFJlZ3VsYXInO1xyXG4gICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgICAgZm9udDogZm9udCxcclxuICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaGFiaWxpZGFkID0gdGhpcy5hZGQuYXVkaW8oJ2JvdG9uJyk7XHJcbiAgICB0aGlzLmhhYmlsaWRhZC51c2luZ1dlYkF1ZGlvID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmNhaWRhID0gdGhpcy5hZGQuYXVkaW8oJ2NhaWRhJyk7XHJcblxyXG4gICAgdGhpcy53aW50ZXJHYW1lID0gdGhpcy5hZGQuYXVkaW8oJ3dpbnRlci1nYW1lJyk7XHJcbiAgICB0aGlzLndpbnRlckdhbWUubG9vcCA9IHRydWU7XHJcbiAgICB0aGlzLndpbnRlckdhbWUudm9sdW1lID0gMC41O1xyXG4gICAgdGhpcy53aW50ZXJHYW1lLnBsYXkoKTtcclxuXHJcbiAgICB2YXIgYmFja2dyb3VuZFNjYWxlID0gdGhpcy5zdHJlZXQgPSB0aGlzLmFkZC5zcHJpdGUoMCwwLCdiYWNrZ3JvdW5kJyk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBiYWNrZ3JvdW5kU2NhbGUuc2NhbGUuc2V0VG8oMSwgMC44NSkgOiBiYWNrZ3JvdW5kU2NhbGUuc2NhbGUuc2V0VG8oMSwgMC44NSk7XHJcblxyXG4gICAgdmFyIHNub3dtYW5MZWZ0WCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDEwIDogdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gNTtcclxuICAgIHZhciBzbm93bWFuTGVmdCA9ICB0aGlzLmFkZC5zcHJpdGUoc25vd21hbkxlZnRYLCB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gKCBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gNi41IDogdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gNSksJ3Nub3dMZWZ0Jyk7XHJcbiAgICBzbm93bWFuTGVmdC5hbmNob3Iuc2V0VG8oMC41KVxyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gc25vd21hbkxlZnQuc2NhbGUuc2V0VG8oLTEsIDEpIDogc25vd21hbkxlZnQuc2NhbGUuc2V0VG8oLTEuNSwgMS41KTtcclxuXHJcbiAgICBhbmltYXRpb25Tbm93bWFuKHNub3dtYW5MZWZ0KTtcclxuXHJcbiAgICB2YXIgc25vd21hblJpZ2h0WCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDEuMSA6IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDEuMjtcclxuICAgIHZhciBzbm93bWFuUmlnaHQgPSAgdGhpcy5hZGQuc3ByaXRlKHNub3dtYW5SaWdodFgsIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSAoIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyA3IDogdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gNSksJ3Nub3dSaWdodCcpO1xyXG4gICAgc25vd21hblJpZ2h0LmFuY2hvci5zZXRUbygwLjUpXHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBzbm93bWFuUmlnaHQuc2NhbGUuc2V0VG8oMSk6IHNub3dtYW5SaWdodC5zY2FsZS5zZXRUbygxLjUpO1xyXG5cclxuICAgIGFuaW1hdGlvblNub3dtYW4oc25vd21hblJpZ2h0KTtcclxuXHJcbiAgICB0aGlzLnJlZ2Fsb3MgPSB0aGlzLmFkZC5ncm91cCgpO1xyXG4gICAgdGhpcy5wb3dlcnVwcyA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcblxyXG4gICAgdGhpcy5iYXIgPSB0aGlzLmFkZC5zcHJpdGUoMCwwLCAnYmFyJyk7XHJcbiAgICB0aGlzLmJhci5hbmNob3Iuc2V0VG8oMCk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJhci5zY2FsZS5zZXRUbygwLjgpIDogdGhpcy5iYXIuc2NhbGUuc2V0VG8oMik7XHJcblxyXG4gICAgdmFyIGxvZ28gPSB0aGlzLmFkZC5zcHJpdGUodGhpcy53b3JsZC5jZW50ZXJYLCAwLCAnbG9nbycpO1xyXG4gICAgbG9nby5hbmNob3Iuc2V0VG8oMC41LCAwKTtcclxuICAgIGxvZ28uc2NhbGUuc2V0VG8oMC44KTtcclxuXHJcbiAgICB0aGlzLnBhdXNlID0gdGhpcy5hZGQuc3ByaXRlKHRoaXMud29ybGQud2lkdGggLSAyMCwgMjAsJ3BhdXNlJyk7XHJcbiAgICB0aGlzLnBhdXNlLnNjYWxlLnNldFRvKDAuNyk7XHJcbiAgICB0aGlzLnBhdXNlLmFuY2hvci5zZXRUbygxLDApO1xyXG5cclxuICAgIHZhciBhdWRpbyA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLnBhdXNlLnggLSA2MCwgMjAsJ2F1ZGlvJyk7XHJcbiAgICBhdWRpby5zY2FsZS5zZXRUbygwLjcpO1xyXG4gICAgYXVkaW8uYW5jaG9yLnNldFRvKDEsMCk7XHJcbiAgICBhdWRpby5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgYXVkaW8uaW5wdXQucGl4ZWxQZXJmZWN0T3ZlciA9IHRydWU7XHJcbiAgICBhdWRpby5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgIGF1ZGlvLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlcihhdWRpbyk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHRoaXMucGF1c2UuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMucGF1c2UuaW5wdXQucGl4ZWxQZXJmZWN0T3ZlciA9IHRydWU7XHJcbiAgICB0aGlzLnBhdXNlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgdGhpcy5wYXVzZS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5wYXVzZU1hbmFnZXIocGF1c2VNc2csIGF1ZGlvLCB0cnVlKTtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICAgdmFyIHRleHRTY29yZVkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyA1IDogMTU7XHJcbiAgICB0aGlzLnRleHRTY29yZSA9IHRoaXMuYWRkLnRleHQodGhpcy53b3JsZC53aWR0aCAtIDE1MCwgdGV4dFNjb3JlWSwgJzAwMDAnLCBzdHlsZSk7XHJcbiAgICB0aGlzLnRleHRTY29yZS5hbmNob3Iuc2V0VG8oMSwwKTtcclxuXHJcbiAgICB0aGlzLmxpZmVHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcbiAgICB2YXIgbGlmZVggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyA1IDogMDtcclxuICAgIHZhciBsaWZlWSA9IDEwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGk8dGhpcy5saWZlczsgaSsrKSB7XHJcbiAgICAgICAgbGlmZVggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBsaWZlWCArIDUwIDogbGlmZVggKyA0MDtcclxuICAgICAgICB2YXIgbGlmZSA9IHRoaXMubGlmZUdyb3VwLmNyZWF0ZShsaWZlWCwgbGlmZVksICdsaWZlJyk7XHJcbiAgICAgICAgbGlmZS5zY2FsZS5zZXRUbygwLjMpO1xyXG4gICAgICAgIGxpZmUuaWQgPSBpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3JlYXRlR2lmdFNRdWFudGl0eSgzKTtcclxuXHJcbiAgICB2YXIgcGF1c2VNc2cgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy53b3JsZC5jZW50ZXJYLCB0aGlzLndvcmxkLmNlbnRlclksICdwYXVzZS1tc2cnKTtcclxuICAgIHBhdXNlTXNnLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gcGF1c2VNc2cuc2NhbGUuc2V0VG8oMC41KSA6IHBhdXNlTXNnLnNjYWxlLnNldFRvKDAuODUpO1xyXG4gICAgcGF1c2VNc2cuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHBhdXNlTXNnLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgcGF1c2VNc2cudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHBhdXNlTXNnLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnBhdXNlTWFuYWdlcihwYXVzZU1zZyk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZmFpbE1zZyA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLndvcmxkLmNlbnRlclgsIHRoaXMud29ybGQuY2VudGVyWSwgJ2ZhaWwtbXNnJyk7XHJcbiAgICB0aGlzLmZhaWxNc2cuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmZhaWxNc2cuc2NhbGUuc2V0VG8oMC41KSA6IHRoaXMuZmFpbE1zZy5zY2FsZS5zZXRUbygwLjg1KTtcclxuICAgIHRoaXMuZmFpbE1zZy5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5mYWlsTXNnLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgdGhpcy5mYWlsTXNnLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmZhaWxNc2cuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMud2ludGVyR2FtZS5kZXN0cm95KHRydWUpO1xyXG4gICAgICAgIHRoaXMubGlmZXMgPSA1O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPDU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxpZmVHcm91cC5jaGlsZHJlbltpXS5sb2FkVGV4dHVyZSgnbGlmZScgLDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZhaWxNc2cudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5yZXN0YXJ0KCk7XHJcbiAgICB9LHRoaXMpO1xyXG59O1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5hdWRpb01hbmFnZXIgPSBmdW5jdGlvbiAoYXVkaW8pIHtcclxuICAgIGlmICh0aGlzLmF1ZGlvSW1hZ2UpIHtcclxuICAgICAgICBhdWRpby5sb2FkVGV4dHVyZSgnbXV0ZScsMCk7XHJcbiAgICAgICAgdGhpcy53aW50ZXJHYW1lLnBhdXNlKCk7XHJcbiAgICAgICAgdGhpcy5oYWJpbGlkYWQubXV0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYWlkYS5tdXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1ZGlvSW1hZ2UgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXVkaW8ubG9hZFRleHR1cmUoJ2F1ZGlvJywwKTtcclxuICAgICAgICB0aGlzLndpbnRlckdhbWUucmVzdW1lKCk7XHJcbiAgICAgICAgdGhpcy5oYWJpbGlkYWQubXV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FpZGEubXV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXVkaW9JbWFnZSA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLmNyZWF0ZUdpZnRTUXVhbnRpdHkgPSBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4PG51bTsgaW5kZXgrKykge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlR2lmdFNwcml0ZXModGhpcy5yZWdhbG9zLCBpbmRleCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUucGF1c2VNYW5hZ2VyID0gZnVuY3Rpb24gKHBhdXNlTXNnLCBhdWRpbywgd2luZG93U2hvdykge1xyXG4gICAgaWYgKHRoaXMuaXNQYXVzZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMucGF1c2UubG9hZFRleHR1cmUoJ3BsYXknLCAwKTtcclxuICAgICAgICB0aGlzLmdhbWUucGF1c2VkID0gdGhpcy5pc1BhdXNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHBhdXNlTXNnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2ludGVyR2FtZS5wYXVzZSgpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyKGF1ZGlvKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGF1c2VNc2cudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGF1c2UubG9hZFRleHR1cmUoJ3BhdXNlJywgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBhdXNlZCA9IHRoaXMuaXNQYXVzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2ludGVyR2FtZS5yZXN1bWUoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlcihhdWRpbyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLnN0b3BSZXN1bWVUd2VlbiA9IGZ1bmN0aW9uIChwYXVzZSkge1xyXG4gICAgZm9yKHZhciBpID0gMDsgaTx0aGlzLnJlZ2Fsb3MuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocGF1c2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdhbG9zLmNoaWxkcmVuW2ldLm15VHdlZW4ucGF1c2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2Fsb3MuY2hpbGRyZW5baV0ubXlUd2Vlbi5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuY3JlYXRlUG93ZXJ1cHMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGk8MjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGFycmF5VGV4dHVyZXMgPSBbXTtcclxuICAgICAgICBhcnJheVRleHR1cmVzLnB1c2goJ3Nub3cnKTtcclxuICAgICAgICBhcnJheVRleHR1cmVzLnB1c2goJ3N0YXInKTtcclxuXHJcbiAgICAgICAgdmFyIHBhZGRpbmdHaWZ0ID0gdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gNjtcclxuICAgICAgICB2YXIgcmFkb21Qb3NpdGlvblkgPSB0aGlzLnJuZC5pbnRlZ2VySW5SYW5nZSgwLCAxKTtcclxuICAgICAgICB2YXIgcmFuZG9tVmVsb2NpdHlZID0gdGhpcy5ybmQuaW50ZWdlckluUmFuZ2UoMCwgMyk7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uUmFtZG9tWCA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLnJuZC5pbnRlZ2VySW5SYW5nZSgxLCA2KSA6IHRoaXMucm5kLmludGVnZXJJblJhbmdlKDEsIDMpO1xyXG5cclxuICAgICAgICB2YXIgc3ByaXRlID0gIHRoaXMucG93ZXJ1cHMuY3JlYXRlKChwb3NpdGlvblJhbWRvbVggKiBwYWRkaW5nR2lmdCksIChyYWRvbVBvc2l0aW9uWSAqIDEwKSwgYXJyYXlUZXh0dXJlc1tpXSk7XHJcbiAgICAgICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gc3ByaXRlLnNjYWxlLnNldFRvKDEpIDogc3ByaXRlLnNjYWxlLnNldFRvKDIpO1xyXG4gICAgICAgIHNwcml0ZS50eXBlID0gYXJyYXlUZXh0dXJlc1tpXTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudHdlZW4oc3ByaXRlKS50byh7eTogKHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgKyBzcHJpdGUuaGVpZ2h0KX0sIDUwMDAgKyAocmFuZG9tVmVsb2NpdHlZICogMTAwMCApLFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluLHRydWUsMCwwLGZhbHNlKTtcclxuICAgICAgICBhbmltYXRpb25TcHJpdGUoc3ByaXRlKTtcclxuXHJcblxyXG4gICAgICAgIHNwcml0ZS5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICBzcHJpdGUuZXZlbnRzLm9uT3V0T2ZCb3VuZHMuYWRkKGZ1bmN0aW9uKG15U3ByaXRlKXtcclxuICAgICAgICAgICAgbXlTcHJpdGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgc3ByaXRlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc3ByaXRlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgIHNwcml0ZS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKG15U3ByaXRlKXtcclxuICAgICAgICAgICAgdGhpcy5jYWlkYS5wbGF5KCk7XHJcbiAgICAgICAgICAgIGlmIChteVNwcml0ZS50eXBlID09PSAnc25vdycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFJlc3VtZVR3ZWVuKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3dlcnVwc0FjdGl2YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChteVNwcml0ZS50eXBlID09PSAnc3RhcicpIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlKGdhbWUsIDUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaGFiaWxpZGFkLnBsYXkoKTtcclxuICAgICAgICAgICAgbXlTcHJpdGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMubGlmZXMgPT09IDApIHtcclxuICAgICAgICBpZiAodGhpcy5zY29yZSA8IDM1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbE1zZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnBhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnRmluYWwnLCB0cnVlLCB0cnVlLCB0aGlzLnNjb3JlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50aW1lUG93ZXJ1cHMgPCAwKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVQb3dlcnVwcygpO1xyXG4gICAgICAgIHRoaXMudGltZVBvd2VydXBzID0gMzAwMDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudGltZVBvd2VydXBzIC09IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBvd2VydXBzQWN0aXZhdGUpIHtcclxuICAgICAgICBpZiAodGhpcy5zbm93UGF1c2VUaW1lIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BSZXN1bWVUd2VlbihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc25vd1BhdXNlVGltZSA9IDEwMDA7XHJcbiAgICAgICAgICAgIHRoaXMucG93ZXJ1cHNBY3RpdmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc25vd1BhdXNlVGltZSAtPSA4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHRoaXMudGltZUdpZnQgPCAwKSAmJiAodGhpcy5naWZ0U2hvd0FsbCA9PT0gdHJ1ZSkpIHtcclxuICAgICAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmNyZWF0ZUdpZnRTUXVhbnRpdHkoNikgOiB0aGlzLmNyZWF0ZUdpZnRTUXVhbnRpdHkoNCk7XHJcbiAgICAgICAgdGhpcy5naWZ0U2hvd0FsbCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnRpbWVHaWZ0IC09IDEwMDtcclxuICAgIH1cclxufTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuY3JlYXRlR2lmdFNwcml0ZXMgPSBmdW5jdGlvbiAoZ3JvdXAsIGluZGV4KSB7XHJcbiAgICB2YXIgYXJyYXlUZXh0dXJlcyA9IFtdO1xyXG4gICAgYXJyYXlUZXh0dXJlcy5wdXNoKCdnaWZ0Jyk7XHJcbiAgICBhcnJheVRleHR1cmVzLnB1c2goJ2dpZnQyJyk7XHJcbiAgICBhcnJheVRleHR1cmVzLnB1c2goJ2dpZnQzJyk7XHJcbiAgICBhcnJheVRleHR1cmVzLnB1c2goJ2dpZnQ0Jyk7XHJcbiAgICBhcnJheVRleHR1cmVzLnB1c2goJ2dpZnQ1Jyk7XHJcblxyXG4gICAgdmFyIHBvc2l0aW9uUmVnYWxvcyA9IDUwO1xyXG4gICAgdmFyIHBhZGRpbmdHaWZ0ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gNiA6ICB0aGlzLmdhbWUud29ybGQud2lkdGggLyA0O1xyXG4gICAgdmFyIG51bUdpZnQgPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDEsIDYpO1xyXG4gICAgdmFyIHJhZG9tUG9zaXRpb25ZID0gdGhpcy5ybmQuaW50ZWdlckluUmFuZ2UoMCwgMSk7XHJcbiAgICB2YXIgcmFuZG9tVmVsb2NpdHlZID0gdGhpcy5ybmQuaW50ZWdlckluUmFuZ2UoMCwgMyk7XHJcblxyXG4gICAgdmFyIHJhbmRvbVRleHR1cmUgPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDAsIDQpO1xyXG5cclxuICAgIHZhciBzcHJpdGUgPSB7fTtcclxuICAgIGlmIChpbmRleCA+IDYpIHtcclxuICAgICAgICBzcHJpdGUgPSBncm91cC5jcmVhdGUoIHBhZGRpbmdHaWZ0ICsgKChpbmRleCAtIDYpICogcGFkZGluZ0dpZnQpLCAocmFkb21Qb3NpdGlvblkgKiAxMCksIGFycmF5VGV4dHVyZXNbcmFuZG9tVGV4dHVyZV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzcHJpdGUgPSBncm91cC5jcmVhdGUocG9zaXRpb25SZWdhbG9zICsgKGluZGV4ICogcGFkZGluZ0dpZnQpLCAocmFkb21Qb3NpdGlvblkgKiAxMCksIGFycmF5VGV4dHVyZXNbcmFuZG9tVGV4dHVyZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNwcml0ZS5pbkxldmVsID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoaW5kZXggPD0gNCkge1xyXG4gICAgICAgIHNwcml0ZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgc3ByaXRlLmluTGV2ZWwgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzcHJpdGUuYWxwaGEgPSAxO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gc3ByaXRlLnNjYWxlLnNldFRvKDAuNSkgOiBzcHJpdGUuc2NhbGUuc2V0VG8oMC44KTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcblxyXG4gICAgdmFyIHR3ZWVuU3ByaXRlID0gdGhpcy5hZGQudHdlZW4oc3ByaXRlKS50byhcclxuICAgICAgICB7IHk6ICh0aGlzLmdhbWUud29ybGQuaGVpZ2h0ICsgc3ByaXRlLmhlaWdodCkgfSxcclxuICAgICAgICAgNTAwMCArIChyYW5kb21WZWxvY2l0eVkgKiAxMDAwICksXHJcbiAgICAgICAgIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluLFxyXG4gICAgICAgICB0cnVlLFxyXG4gICAgICAgICAwLFxyXG4gICAgICAgICAtMSxcclxuICAgICAgICAgZmFsc2VcclxuICAgICk7XHJcbiAgICB0aGlzLmFkZC50d2VlbihzcHJpdGUpLnRvKHsgYW5nbGU6IChudW1HaWZ0ICogMTApIH0sIDUwMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluLHRydWUsMCwwLGZhbHNlKTtcclxuXHJcbiAgICBzcHJpdGUubXlUd2VlbiA9IHR3ZWVuU3ByaXRlO1xyXG4gICAgc3ByaXRlLnZpc2libGUgPSB0cnVlO1xyXG4gICAgc3ByaXRlLmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgc3ByaXRlLmV2ZW50cy5vbk91dE9mQm91bmRzLmFkZChmdW5jdGlvbihteVNwcml0ZSl7XHJcbiAgICAgICAgbGV0IHJhbmRvbVRleHR1cmUgPSB0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDAsIDQpO1xyXG4gICAgICAgIG15U3ByaXRlLmxvYWRUZXh0dXJlKGFycmF5VGV4dHVyZXNbcmFuZG9tVGV4dHVyZV0sIDApO1xyXG4gICAgICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IG15U3ByaXRlLnNjYWxlLnNldFRvKDAuNSkgOiBteVNwcml0ZS5zY2FsZS5zZXRUbygwLjgpO1xyXG5cclxuICAgICAgICBpZiAoKHNwcml0ZS5hbHBoYSA9PT0gMSkgJiYgZ2FtZS5saWZlR3JvdXAuY2hpbGRyZW5bZ2FtZS5saWZlcyAtIDFdICYmIChteVNwcml0ZS55ID49IDApICYmIChteVNwcml0ZS55ID4gdGhpcy5nYW1lLndvcmxkLmhlaWdodCkpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZUxpZmUoZ2FtZS5saWZlR3JvdXAuY2hpbGRyZW5bZ2FtZS5saWZlcyAtIDFdKTtcclxuICAgICAgICAgICAgZ2FtZS5saWZlcyAtPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNwcml0ZS5hbHBoYSA9IDE7XHJcbiAgICAgICAgICAgIHNwcml0ZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHNwcml0ZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgc3ByaXRlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgc3ByaXRlLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24obXlTcHJpdGUpe1xyXG4gICAgICAgIG15U3ByaXRlLmFscGhhID0gMDtcclxuICAgICAgICBzcHJpdGUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhhYmlsaWRhZC5wbGF5KCk7XHJcbiAgICAgICAgc2NvcmUoZ2FtZSk7XHJcbiAgICB9LHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzY29yZSAoZ2FtZSwgbnVtID0gMSkge1xyXG4gICAgZ2FtZS5zY29yZSA9IGdhbWUuc2NvcmUgKyBudW07XHJcbiAgICB2YXIgcHVudGF0aW9uID0gJzAwMDAnO1xyXG4gICAgaWYgKGdhbWUuc2NvcmUgPCAxMCkge1xyXG4gICAgICAgIHB1bnRhdGlvbiA9ICcwMDAnO1xyXG4gICAgfSBlbHNlIGlmKGdhbWUuc2NvcmUgPCAxMDApIHtcclxuICAgICAgICBwdW50YXRpb24gPSAnMDAnO1xyXG4gICAgfSBlbHNlIGlmIChnYW1lLnNjb3JlIDwgMTAwMCl7XHJcbiAgICAgICAgcHVudGF0aW9uID0gJzAnO1xyXG4gICAgfVxyXG5cclxuICAgIGdhbWUudGV4dFNjb3JlLnNldFRleHQocHVudGF0aW9uICsgZ2FtZS5zY29yZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGlvblNwcml0ZSAoc3ByaXRlKSB7XHJcbiAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDcyOyBpKyspIHtcclxuICAgICAgICBhcnJheS5wdXNoKGkpO1xyXG4gICAgfVxyXG4gICAgc3ByaXRlLmFuaW1hdGlvbnMuYWRkKCdhbmltYScsIGFycmF5LCAyNCwgdHJ1ZSk7XHJcbiAgICBzcHJpdGUuYW5pbWF0aW9ucy5wbGF5KCdhbmltYScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRpb25Tbm93bWFuIChzcHJpdGUpIHtcclxuICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gOTY7IGkrKykge1xyXG4gICAgICAgIGFycmF5LnB1c2goaSk7XHJcbiAgICB9XHJcbiAgICBzcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ3Nub3dNYW4nLCBhcnJheSwgMjQsIHRydWUpO1xyXG4gICAgc3ByaXRlLmFuaW1hdGlvbnMucGxheSgnc25vd01hbicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRpb25DbGljayAoc3ByaXRlKSB7XHJcbiAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAyOyBpIDw9IDM3OyBpKyspIHtcclxuICAgICAgICBhcnJheS5wdXNoKGkpO1xyXG4gICAgfVxyXG4gICAgc3ByaXRlLmFuaW1hdGlvbnMuYWRkKCdjbGljaycsIGFycmF5LCAyNCwgdHJ1ZSk7XHJcbiAgICBzcHJpdGUuYW5pbWF0aW9ucy5wbGF5KCdjbGljaycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRlTGlmZSAoc3ByaXRlKSB7XHJcbiAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDI4OyBpKyspIHtcclxuICAgICAgICBhcnJheS5wdXNoKGkpO1xyXG4gICAgfVxyXG4gICAgc3ByaXRlLmFuaW1hdGlvbnMuYWRkKCdsaWZlJywgYXJyYXksIDI0LCBmYWxzZSk7XHJcbiAgICBzcHJpdGUuYW5pbWF0aW9ucy5wbGF5KCdsaWZlJyk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBhbmltYXRpb25MaWZlIChzcHJpdGUpIHtcclxuICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gMjg7IGkrKykge1xyXG4gICAgICAgIGFycmF5LnB1c2goaSk7XHJcbiAgICB9XHJcbiAgICBzcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ2xpZmUnLCBhcnJheSwgMjQsIHRydWUpO1xyXG4gICAgc3ByaXRlLmFuaW1hdGlvbnMucGxheSgnbGlmZScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRpb25EZWFkIChzcHJpdGUpIHtcclxuICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPj0gMTA4OyBpLS0pIHtcclxuICAgICAgICBhcnJheS5wdXNoKGkpO1xyXG4gICAgfVxyXG4gICAgc3ByaXRlLmFuaW1hdGlvbnMuYWRkKCdkZWFkJywgYXJyYXksIDI0LCB0cnVlKTtcclxuICAgIHNwcml0ZS5hbmltYXRpb25zLnBsYXkoJ2RlYWQnKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5U3RhdGU7XHJcbiIsImZ1bmN0aW9uIFR1dG9yaWFsU3RhdGUoKSB7XHJcblx0UGhhc2VyLlN0YXRlLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbi8qKiBAdHlwZSBQaGFzZXIuU3RhdGUgKi9cclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUgPSAgT2JqZWN0LmNyZWF0ZShQaGFzZXIuU3RhdGUucHJvdG90eXBlKTtcclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUdXRvcmlhbFN0YXRlO1xyXG5cclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLnR1dG9yaWFsUGFydCA9IDE7XHJcbiAgICB0aGlzLnBvcHVwID0gbnVsbDtcclxufTtcclxuXHJcblR1dG9yaWFsU3RhdGUucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbG9hZFN0eWxlID0ge1xyXG4gICAgICAgIGZvbnQ6ICc3ZW0gVGltZXMgUm9tYW4nLFxyXG4gICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XHJcbiAgICB2YXIgbG9hZFRleHRZID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gMzAwIDogdGhpcy53b3JsZC5jZW50ZXJZO1xyXG4gICAgdmFyIGxvYWRUZXh0ID0gdGhpcy5hZGQudGV4dCh0aGlzLndvcmxkLmNlbnRlclgsbG9hZFRleHRZLCcnLCBsb2FkU3R5bGUpO1xyXG4gICAgbG9hZFRleHQuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHZhciBwcm9ncmVzc0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKDMzMCwgLTE1MCk7XHJcbiAgICAgICAgdmFyIGxvZGluZ0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKDMzMCwgLTE1MCk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmxpbmVTdHlsZSgzLCAnMHgyYjNmNjgnKTtcclxuICAgICAgICBsb2RpbmdCYXIuZHJhd1JvdW5kZWRSZWN0KDEwMCw1MDAsMzAwLDMwLDEwKTtcclxuICAgICAgICBsb2RpbmdCYXIuZW5kRmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQoZnVuY3Rpb24ocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcyl7XHJcbiAgICAgICAgbG9hZFRleHQuc2V0VGV4dChwcm9ncmVzcysnJScpO1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgdmFyIGxvYWQgPSBwcm9ncmVzcyArIDE5NDtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuY2xlYXIoKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIubGluZVN0eWxlKDMsICcweDJiM2Y2OCcpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5iZWdpbkZpbGwoJzB4MmIzZjY4JywxKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZHJhd1JvdW5kZWRSZWN0KDEwMyw1MDEsbG9hZCwyNywxKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZW5kRmlsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGlmKCFQaGFzZXIuRGV2aWNlLmRlc2t0b3Ape1xyXG4gICAgICAgIC8vIHRoaXMubG9hZC5pbWFnZSgnc3RyZWV0JywnYXNzZXRzL0JhY2tncm91bmRzL2JhY2tncm91bmQtYmx1ci5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ25leHQnLCAnYXNzZXRzL0J1dHRvbnMvbmV4dC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2Nsb3NlJywnYXNzZXRzL0J1dHRvbnMvY2xvc2UucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdidXR0b24tcGxheScsJ2Fzc2V0cy9CdXR0b25zL2J1dHRvbi1wbGF5LnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzEnLCAnYXNzZXRzL1BvcHVwcy9UdXRvcmlhbHMvd2luZG93MS1tb2JpbGUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3cyJywgJ2Fzc2V0cy9Qb3B1cHMvVHV0b3JpYWxzL3dpbmRvdzItbW9iaWxlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MycsICdhc3NldHMvUG9wdXBzL1R1dG9yaWFscy93aW5kb3czLW1vYmlsZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzQnLCAnYXNzZXRzL1BvcHVwcy9UdXRvcmlhbHMvd2luZG93NC1tb2JpbGUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3c1JywgJ2Fzc2V0cy9Qb3B1cHMvVHV0b3JpYWxzL3dpbmRvdzUtbW9iaWxlLnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuYXVkaW8oJ2JvdG9uJywgJ2Fzc2V0cy9NdXNpYy9oYWJpbGl0eS5tcDMnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzdHJlZXQnLCdhc3NldHMvQmFja2dyb3VuZHMvYmFja2dyb3VuZC1ibHVyLmpwZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ25leHQnLCAnYXNzZXRzL0J1dHRvbnMvbmV4dC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2Nsb3NlJywnYXNzZXRzL0J1dHRvbnMvY2xvc2UucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdidXR0b24tcGxheScsJ2Fzc2V0cy9CdXR0b25zL2J1dHRvbi1wbGF5LnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzEnLCAnYXNzZXRzL1BvcHVwcy9UdXRvcmlhbHMvd2luZG93MS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzInLCAnYXNzZXRzL1BvcHVwcy9UdXRvcmlhbHMvd2luZG93Mi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzMnLCAnYXNzZXRzL1BvcHVwcy9UdXRvcmlhbHMvd2luZG93My5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzQnLCAnYXNzZXRzL1BvcHVwcy9UdXRvcmlhbHMvd2luZG93NC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzUnLCAnYXNzZXRzL1BvcHVwcy9UdXRvcmlhbHMvd2luZG93NS5wbmcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmF1ZGlvKCdib3RvbicsICdhc3NldHMvTXVzaWMvaGFiaWxpdHkubXAzJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5UdXRvcmlhbFN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYm90b24gPSB0aGlzLmFkZC5hdWRpbygnYm90b24nKTtcclxuICAgIHRoaXMuc3RyZWV0ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5hZGQuc3ByaXRlKDAsIDAsJ3N0cmVldCcpIDogdGhpcy5hZGQuc3ByaXRlKDAsIDAsJycpO1xyXG4gICAgdGhpcy5zdHJlZXQuc2NhbGUuc2V0VG8oMC43KTtcclxuXHJcbiAgICB2YXIgcG9wdXAgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy53b3JsZC5jZW50ZXJYLCB0aGlzLndvcmxkLmNlbnRlclksICd3aW5kb3cxJyk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBwb3B1cC5hbmNob3Iuc2V0VG8oMC41KSA6IHBvcHVwLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gcG9wdXAuc2NhbGUuc2V0VG8oMC43KSA6IHBvcHVwLnNjYWxlLnNldFRvKDAuODUpO1xyXG4gICAgcG9wdXAuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgb2sgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ25leHQnKTtcclxuICAgIG9rLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgb2suaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIG9rLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgcG9wdXAuYWRkQ2hpbGQob2spO1xyXG4gICAgb2sueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IChwb3B1cC5oZWlnaHQgLyAyKSArIG9rLmhlaWdodCA6IChwb3B1cC5oZWlnaHQgLyAyLjUpICsgb2suaGVpZ2h0O1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gb2suc2NhbGUuc2V0VG8oMSkgOiBvay5zY2FsZS5zZXRUbygxLjg1KTtcclxuICAgIG9rLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgIGJvdG9uLnBsYXkoKTtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICAgdmFyIGNsb3NlID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdjbG9zZScpO1xyXG4gICAgY2xvc2UuYW5jaG9yLnNldFRvKDAsMSk7XHJcbiAgICBjbG9zZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgY2xvc2UuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICBwb3B1cC5hZGRDaGlsZChjbG9zZSk7XHJcbiAgICBjbG9zZS54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gKHBvcHVwLndpZHRoIC8gMikgKyBjbG9zZS53aWR0aCA6IChwb3B1cC53aWR0aCAvIDIuOCkgKyBjbG9zZS53aWR0aDtcclxuICAgIGNsb3NlLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAtKChwb3B1cC5oZWlnaHQgLyAyKSArIGNsb3NlLndpZHRoKSA6IC0oKHBvcHVwLmhlaWdodCAvIDIuMikgKyBjbG9zZS53aWR0aCk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBjbG9zZS5zY2FsZS5zZXRUbygxKSA6IGNsb3NlLnNjYWxlLnNldFRvKDEuODUpO1xyXG5cclxuICAgIGNsb3NlLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBib3Rvbi5wbGF5KCk7XHJcbiAgICAgICAgZ2FtZS5zdGF0ZS5zdGFydCgnUGxheScpO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcbiAgICBvay5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnR1dG9yaWFsUGFydCkge1xyXG4gICAgICAgICAgICBjYXNlIDEgOlxyXG4gICAgICAgICAgICAgICAgcG9wdXAubG9hZFRleHR1cmUoJ3dpbmRvdzInLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXRvcmlhbFBhcnQgPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMiA6XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5sb2FkVGV4dHVyZSgnd2luZG93MycsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzIDpcclxuICAgICAgICAgICAgICAgIHBvcHVwLmxvYWRUZXh0dXJlKCd3aW5kb3c0JywwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gNDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQgOlxyXG4gICAgICAgICAgICAgICAgcG9wdXAubG9hZFRleHR1cmUoJ3dpbmRvdzUnLDApO1xyXG4gICAgICAgICAgICAgICAgb2subG9hZFRleHR1cmUoJ2J1dHRvbi1wbGF5JywgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1IDpcclxuICAgICAgICAgICAgICAgIHBvcHVwLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1BsYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSwgdGhpcyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFR1dG9yaWFsU3RhdGU7XHJcbiIsIi8vIFBIQVNFUiBJUyBJTVBPUlRFRCBBUyBBTiBFWFRFUk5BTCBCVU5ETEUgSU4gSU5ERVguSFRNTFxyXG5QaGFzZXIuRGV2aWNlLndoZW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIFR1dG9yaWFsU3RhdGUgID0gcmVxdWlyZSgnLi9UdXRvcmlhbFN0YXRlJylcclxuICB2YXIgUGxheVN0YXRlID0gcmVxdWlyZSgnLi9QbGF5U3RhdGUnKVxyXG4gIHZhciBGaW5hbFN0YXRlID0gcmVxdWlyZSgnLi9GaW5hbFN0YXRlJylcclxuXHJcbiAgaWYgKCFQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgIHZhciBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDY0MCwgMTE1MiwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XHJcbiAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IDB4MDAwMDAwO1xyXG5cclxuICAgIGdhbWUuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuICAgIGdhbWUuc2NhbGUuZnVsbFNjcmVlblNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5kc2NhcGVcIikuc3R5bGUuZGlzcGxheT1cIm5vbmVcIjtcclxuXHJcbiAgICBnYW1lLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG4gICAgZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMTUyLCA2NDAsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAweDAwMDAwMDtcclxuXHJcbiAgICBnYW1lLnNjYWxlLnNldE1pbk1heCgxMTUyLCA2NDApO1xyXG4gICAgZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuICBcclxuXHJcbiAgICBnYW1lLnNjYWxlLmZvcmNlT3JpZW50YXRpb24oZmFsc2UsIHRydWUpO1xyXG5cclxuICAgIGdhbWUuc2NhbGUuZW50ZXJJbmNvcnJlY3RPcmllbnRhdGlvbi5hZGQoaGFuZGxlSW5jb3JyZWN0KTtcclxuICAgIGdhbWUuc2NhbGUubGVhdmVJbmNvcnJlY3RPcmllbnRhdGlvbi5hZGQoaGFuZGxlQ29ycmVjdCk7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIGdhbWUuc3RhdGUuYWRkKCdUdXRvcmlhbCcsICAgVHV0b3JpYWxTdGF0ZSlcclxuICBnYW1lLnN0YXRlLmFkZCgnUGxheScsICAgUGxheVN0YXRlKVxyXG4gIGdhbWUuc3RhdGUuYWRkKCdGaW5hbCcsIEZpbmFsU3RhdGUpXHJcblxyXG4gIGdhbWUuc3RhdGUuc3RhcnQoJ1R1dG9yaWFsJyk7XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBoYW5kbGVJbmNvcnJlY3QgKCkge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZHNjYXBlXCIpLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUNvcnJlY3QgKCkge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZHNjYXBlXCIpLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiO1xyXG59Il19
