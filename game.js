enchant();

window.onload = function() {
    var game = new Game(640, 640);
    game.preload('./background.jpg');
    game.preload('./enchant.js-builds-0.8.0/images/monster/bigmonster1.gif');
    game.preload('./enchant.js-builds-0.8.0/images/icon0.png');
    var DropFrequency = 15;
    var DropVelosity = 8;

    game.onload = function() {

        var background = new Sprite(game.rootScene.width, game.rootScene.height);
        background.image = game.assets['./background.jpg'];
        game.rootScene.addChild(background);

        // スコアを入れる変数を用意する
        game.score = 0;
        // スコアを表示するラベルを作成
        var scoreLabel = new Label("SCORE : 0");
        scoreLabel.font = "16px Tahoma";
        scoreLabel.color = "white";
        scoreLabel.x = 10;  // X座標
        scoreLabel.y = 5;   // Y座標
        game.rootScene.addChild(scoreLabel);

        var dragon = new Sprite(80, 80);
        dragon.image = game.assets['./enchant.js-builds-0.8.0/images/monster/bigmonster1.gif'];
        dragon.x = game.rootScene.width/2;
        dragon.y = game.rootScene.height - dragon.height - 10;

        console.log("" + dragon.x + dragon.y);
        dragon.frame = 3;
        game.rootScene.addChild(dragon);

        dragon.frameIndex = 0;
        var frameList = [2, 3, 4, 3];

        var gameFreezeTime = 0;

        dragon.onenterframe = function () {
            gameFreezeTime = Math.max(gameFreezeTime-1,0);
            if(gameFreezeTime > 0) {
                return;
            }
            //ドラゴンをアニメーションさせる
            if(game.frame %10 == 0){

                this.frameIndex ++;
                this.frameIndex %= frameList.length;
                this.frame = frameList[this.frameIndex];
            }
            if(game.input.right) {
                dragon.x += 10;
                dragon.scaleX = -1;
            }
            if(game.input.left) {
                dragon.x -= 10;
                dragon.scaleX = 1;
            }
        }

        game.onenterframe = function () {
            if (gameFreezeTime > 0) {
                return;
            }
            if (game.frame % DropFrequency == 0) {
                var dropItem = new Sprite(16,16);
                dropItem.scaleX = 2;
                dropItem.scaleY = 2;
                dropItem.x = Math.random() * game.width;
                dropItem.y = 0;
                dropItem.image = game.assets['./enchant.js-builds-0.8.0/images/icon0.png'];
                var rand = Math.floor(Math.random() * 10);
                console.log("rand: " + rand);
                dropItem.frame = rand;

                dropItem.onenterframe = function () {
                    if (gameFreezeTime > 0) {
                        return;
                    }
                    this.y += DropVelosity;

                    if(this.within(dragon, 40)) {
                        this.remove();

                        if(this.frame != 0) {
                            dragon.frame = 0;
                            gameFreezeTime = 30;

                        } else {
                            game.score += 1;
                            scoreLabel.text = "SCORE : "+game.score;
                        }
                    }

                    if(this.y > game.rootScene.height) {
                        this.remove();
                    }
                }
                game.rootScene.insertBefore(dropItem, dragon);


            }
        }
    }
    game.start();
}
