import kaplay from "kaplay";
import {addFollowEnemy, enemyDamage} from "./enemy.js"
import {addPlayer} from "./player.js"
import {addBasicGun} from "./gun.js"
import {addWall} from "./environment.js"

// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();
k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

scene("game", () => {
    // Player 
    const player = addPlayer(k, width()/2, k.height()/2, "bean");
    const gun = addBasicGun(k, player);
    const playerHealth = add([
        text(player.hp())
    ])

    //Borders
    const topWall = addWall(k, width(), 5, 0,0, "left");
    const bottomWall = addWall(k, width(), 5, 0, height(), "left");
    const leftWall = addWall(k, 5, height(), 0, 0, "top");
    const rightWall = addWall(k, 5, height(), width(), 0, "top");

    let enemyLimit = 3;
    var invincibilityLock = false;

    //Enemy spawning
    const interval = setInterval(()=>{
        if (k.get("enemy").length < enemyLimit){
            const enemy = addFollowEnemy(k, player)
        }
    }, rand(1000,3000))

    player.onDeath(()=>{
        go("end");
        console.log("Game Over")
    })

    // Continual player logic
    onUpdate(() =>{
        playerHealth.text = player.hp();
        let collisionList = player.getCollisions();

        for (const collidingElement of collisionList){
            let tgt = collidingElement.target
            
            if (invincibilityLock == false && (tgt.tags.includes("enemy")) && player.state == "normal"){
                console.log("Ow")
                invincibilityLock = true;
                let damage = enemyDamage(tgt.tags);
                player.hurt(damage);
                invincibilityLock = false;
            }
        }
    })
});

scene("end", ()=>{
    add(
        [text("Game over"),]
    );
});

go("game");
