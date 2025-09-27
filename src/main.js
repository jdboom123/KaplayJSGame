import kaplay from "kaplay";
import {addFollowEnemy, enemyDamage} from "./enemy.js"
import {addPlayer} from "./player.js"
import {addBasicGun} from "./gun.js"

// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();
k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

scene("game", () => {
    const player = addPlayer(k, width()/2, k.height()/2, "bean");
    const gun = addBasicGun(k, player);
    const playerHealth = add([
        text(player.hp())
    ])

    const topWall = add([
        rect(width(), 5),
        anchor("left"),
        pos(0,0),
        area(),
        body(),
        "environment",
        {
            add(){
                this.isStatic = true;
            }
        }
    ])
    const bottomWall = add([
        rect(width(), 5),
        anchor("left"),
        pos(0,height()),
        area(),
        body(),
        "environment",
        {
            add(){
                this.isStatic = true;
            }
        }
    ])
    const leftWall = add([
        rect(5, height()),
        anchor("top"),
        pos(0,0),
        area(),
        body(),
        "environment",
        {
            add(){
                this.isStatic = true;
            }
        }
    ])
    const rightWall = add([
        rect(5, height()),
        anchor("top"),
        pos(width(),0),
        area(),
        body(),
        "environment",
        {
            add(){
                this.isStatic = true;
            }
        }
    ])
    var collidingEnemy;
    var invincibilityLock = false;
    console.log(player)

    //Enemy spawning

    const interval = setInterval(()=>{
        if (k.get("enemy").length < 16){
            const enemy = addFollowEnemy(k, player)
        }
    }, rand(1000,3000))

    // const enemy1 = addFollowEnemy(k, player)
    // const enemy2 = addFollowEnemy(k, player)

    // Check if the player is colliding with anything continuously (using isColliding)
    // Check if the player has invincibility
    // Do damage if the player does not have invincibility
    
    player.onCollide((e) =>{
        if (e.tags.includes("environment") == false){
            collidingEnemy = e;
        }
    })

    player.onDeath(()=>{
        go("end");
        console.log("Game Over")
    })

    // Continual player logic
    onUpdate(() =>{
        playerHealth.text = player.hp()
        // console.log(invincibilityLock);
        if (invincibilityLock == false && collidingEnemy != undefined && player.isColliding(collidingEnemy) && player.state == "normal" ){
            console.log("Ow")
            invincibilityLock = true;
            let damage = enemyDamage(collidingEnemy.tags);
            player.hurt(damage);
            invincibilityLock = false;
        }
    })
});

scene("end", ()=>{
    add(
        [text("Game over"),]
    );
});

go("game");
