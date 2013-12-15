
function setupEndingScene() {
    var endingScene = new Scene();
    var background = new Sprite(game.width, game.height);
    background.image = game.assets['./background.jpg'];
    endingScene.addChild(background);
    var gameOverSprite = new Sprite();
    gameOverSprite.image = game.assets['./enchant.js-builds-0.8.0/images/end.png'];
    endingScene.addChild(gameOverSprite);
    return endingScene;
}
