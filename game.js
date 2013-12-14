enchant();

window.onload = function() {
    var game = new Game(500, 500);
    game.preload('./enchant.js-builds-0.8.0/images/monster/bigmonster1.gif');
    game.preload('./enchant.js-builds-0.8.0/images/icon0.png');
    var DropFrequency = 10;
    var DropVelosity = 10;

    game.onload = function() {
        var dragon = new Sprite(80, 80);
        dragon.image = game.assets['./enchant.js-builds-0.8.0/images/monster/bigmonster1.gif'];
        dragon.x = game.rootScene.width/2;
        dragon.y = game.rootScene.height - dragon.height;

        console.log("" + dragon.x + dragon.y);
        dragon.frame = 3;
        game.rootScene.addChild(dragon);

        dragon.frameIndex = 0;
        var frameList = [2, 3, 4, 3];

        dragon.onenterframe = function () {

            //クマをアニメーションさせる
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
                     this.y += DropVelosity;

                     if(this.within(dragon, 40)) {

                        if(this.frame == 0) {
                            dragon.frame = 0;
                        }
                    }
                 }
                game.rootScene.insertBefore(dropItem, game.rootScene.firstChild);

                
            }
        }
    }
    game.start();
}