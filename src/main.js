import kaplay from "kaplay";
import {addFollowEnemy} from "./enemy.js"
import {addPlayer} from "./player.js"
import {addBasicGun} from "./gun.js"

// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();
k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

scene("game", () => {
    const player = addPlayer(k, width()/2, k.height()/2, "bean");
    const gun = addBasicGun(k, player)
    console.log(player)

    // let interval = setInterval(addFollowEnemy(), rand(2000,5000))
    addFollowEnemy(k, player)
    // player.onDeath(()=>{
    //    console.log("Game Over")
    // })

    onUpdate(() =>{
        console.log(player.hp())
    })
});

scene("end", ()=>{
    add(
        text("Game over"),
        scale(10)
    );
});

go("game");
