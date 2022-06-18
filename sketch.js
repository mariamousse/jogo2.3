var backImg;
var nave, naveImg;
var laser, laserG;
var tiros = 3;
var enemy, enemyG, enemyPL;
var pdc, pdcG;
var munição, muniçãoG, muniçãoIMG;
var gamestate = "play";
var coin1, coin2, coin3, coin4, coin1G, coin2G, coin3G, coin4G;
var money = 0;
var score = 0;
var var1 = 0;
var var2 = 0;


function preload(){
//fundoImg = loadImage("");
enemyPL = loadAnimation("enemy-piscando.gif");
muniçãoIMG = loadImage("munição-icone.png");


}

function setup() {
 createCanvas(windowWidth,windowHeight);
 //fundo = createSprite();
 nave = createSprite(120,200, 102, 102);
 laserG = new Group(); 
 enemyG = new Group();
 pdcG = new Group();
 muniçãoG = new Group();
 coin1G = new Group();
 coin2G = new Group();
 coin3G = new Group();
 coin4G = new Group();


}

function draw() {
 background("black")
 drawSprites()
 var1 += 1;
 var2 += 1;
 console.log(var1);

 //movimento da nave;

 if(keyDown("up") && gamestate == "play" && var2 > 15){
     nave.y = nave.y - 100;
     var2 = 0;
 }
 if(keyDown("down") && gamestate == "play"){
     nave.y = nave.y + 1;
 }
 nave.velocityY = 2.5;
 nave.velocityX = 0;
 if(keyDown("right") && gamestate == "play"){
     nave.x = nave.x + 7.5;
 }
 if(keyDown("left") && gamestate == "play"){
     nave.x = nave.x - 7.5;
 }
 if(nave.x < 0){
     nave.x = 0;
 }
 if(nave.x > windowWidth){
     nave.x = windowWidth;
 }
 if(nave.y < -102){
     gamestate = "end";
 }
 if(nave.y > windowHeight + 102){
     gamestate = "end";
 }

 //gerar laser
 if(keyDown("space") && tiros > 0 && var1 > 50){
     GerarL();
     tiros = tiros - 1;
     var1 = 0;
    }
 //gerar pedaço
 if(frameCount % 500 == 0 && gamestate == "play"){
     GerarP();
    }
 //gerar inimigos
 if(frameCount % 150 == 0 && gamestate == "play"){
     GerarE();  
    }
 //gerar munição
 if(frameCount % 400 == 0 && gamestate == "play"){
     GerarM();
    }
 //gerar coins
 if(frameCount % 1000 == 0){
     GerarC();
 }

 //collide/istouching
 if(laserG.isTouching(enemyG) && gamestate == "play"){
     laserG.destroyEach();
     enemyG.destroyEach();
     score = score + 1;
    }
 if(enemyG.isTouching(nave)){
     gamestate = "end";
    }
 if(nave.isTouching(muniçãoG) && tiros < 7){
     tiros += 3;
     muniçãoG.destroyEach();
    }
 else if(nave.isTouching(muniçãoG) && tiros > 6){
     muniçãoG.destroyEach();
     tiros = 9;
    }
 if(nave.isTouching(coin1G)){
     coin1G.destroyEach();
     money += 1;
    }
 if(nave.isTouching(coin2G)){
     coin2G.destroyEach();
     money += 1;
    }
 if(nave.isTouching(coin3G)){
     coin3G.destroyEach();
     money += 1;
    }
 if(nave.isTouching(coin4G)){
     coin4G.destroyEach();
     money += 1;
 }

 nave.collide(pdcG);

 //fundo.scale = 
 //text(x =  mouseX, 120,20);
 //text(y =  mouseY, 120,50);
 fill("orange");
 textSize(20);
 text(score, 500,50);
 text("tiros: " + tiros, 120, 30);
 text("dinheiro: " + money, 120,50)

 if(gamestate == "end"){
     text("Fim de Jogo", windowWidth/2, windowHeight/2);
    }
 //nave.x = mouseX;
 //nave.y = mouseY;

 
}
function GerarL(){
 //gerar os lasers
 laser = createSprite(nave.x + 30, nave.y, 100,20);
 laser.velocityX = 30;
 //laser.addImage();
 laser.lifetime = 90;
 laserG.add(laser);
}
function GerarE(){
 //gerar os inimigos
 enemy = createSprite(1500, random(50, windowHeight - 50), 50,50);
 enemy.addAnimation( "piscando",enemyPL);
 //enemy.scale = 2.5;
 enemy.velocityX = -10;
 enemy.lifetime = 200;
 enemyG.add(enemy);
}
function GerarP(){
 pdc = createSprite(1500, random(100, windowHeight - 50), 200,100);
 pdc.velocityX = -7;
 pdc.lifetime = 400;
 pdcG.add(pdc);
}
function GerarM(){
 munição = createSprite(1500,random(25, windowHeight - 50), 25, 25);
 munição.addImage("icone", muniçãoIMG);
 munição.velocityX = -8;
 munição.scale = 1
 munição.lifetime = 300;
 muniçãoG.add(munição);
}
function GerarC(){
 coin1 = createSprite(1500, random(40,windowHeight - 300), 35,35);
 coin2 = createSprite(coin1.x - 40, coin1.y + random(0,100),35,35);
 coin3 = createSprite(coin2.x - 40, coin2.y + random(0,100),35,35);
 coin4 = createSprite(coin3.x - 40, coin3.y + random(0,100),35,35);
 coin1.velocityX = -15;
 coin2.velocityX = -15;
 coin3.velocityX = -15;
 coin4.velocityX = -15;
 coin1.lifetime = 100;
 coin2.lifetime = 100;
 coin3.lifetime = 100;
 coin4.lifetime = 100;
 coin1G.add(coin1);
 coin2G.add(coin2);
 coin3G.add(coin3);
 coin4G.add(coin4);
}