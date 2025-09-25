import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();
let PLAYER_SPEED = 150
const LEFT = new Vec2(-1*PLAYER_SPEED,0)
const RIGHT = new Vec2(PLAYER_SPEED,0)
const UP = new Vec2(0,-1*PLAYER_SPEED)
const DOWN = new Vec2(0,PLAYER_SPEED)

const GUN_X = 70
const GUN_Y = 10
const GUN_X_OFFSET = 30
const GUN_Y_OFFSET = 30
const GUN_VEC = new Vec2(GUN_X_OFFSET, GUN_Y_OFFSET)
let BULLET_SPEED = 1200
// const GUN_ROTATION = 5

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

scene("game", () => {
    const player = k.add([k.pos(300, 300), k.sprite("bean")], anchor("center"));

    const gun = player.add([
    anchor("left"),
    rect(GUN_X,GUN_Y), //replace with actual gun sprite
    pos(GUN_X_OFFSET,GUN_Y_OFFSET),
    rotate(),
    ])

    // Player functionality
    onKeyDown("a", () =>{
        player.move(LEFT);
        console.log("moved left")
    });

    onKeyDown("d", () =>{
        player.move(RIGHT);
    });

    onKeyDown("w", () =>{
        player.move(UP);
        console.log("moved up")
    });

    onKeyDown("s", () =>{
        player.move(DOWN);
        console.log("moved down")
    });

    // Gun functionality
    onKeyPress("space", () =>{
        addKaboom(player.pos)
    });

    onMouseMove(() =>{
        let mousePosition = mousePos()
        let playerPos = player.pos
        let gunHandlePos = playerPos.add(GUN_VEC)
        gun.angle = mousePosition.sub(gunHandlePos).angle()

        // console.log(vecA.len())


    });

    onMousePress(() =>{
        let playerPos = player.pos
        let gunHandlePos = playerPos.add(GUN_VEC)
        let currGunRotation = deg2rad(gun.angle)
        let gunRotationPos = new Vec2(GUN_X*Math.cos(currGunRotation),GUN_X*Math.sin(currGunRotation))
        let gunTipPos = gunHandlePos.add(gunRotationPos)

        var bullet = k.add([
            circle(10),
            pos(gunTipPos),
            move(gunTipPos.sub(gunHandlePos), BULLET_SPEED),
        ])
    });

    // let interval = setInterval(summonEnemy, rand(2000,5000))

    // function summonEnemy(){
        // Summon enemy
    var playerPos = player.pos
    console.log(playerPos)
    const enemy1 = k.add([
            rect(50,50),
            pos(120, 80),
            // agent({
            //     speed:100,
            //     allowDiagonals: true,
            // }),
            "enemy"
    ])

    const enemy2 = k.add([
            rect(50,50),
            pos(160, 300),
            // agent({
            //     speed:100,
            //     allowDiagonals: true,
            // }),
            "enemy"
    ])

    // console.log(enemy.pos)

    // }

    onUpdate(() =>{
        let enemyList = k.get("enemy")
        for (let i = 0; i < enemyList.length; i++){
            // let distanceVec = playerPos.sub(enemyList[i].pos)
            // console.log(distanceVec.len())
            // if (distanceVec.len() <= 50){
            //     console.log("Hit position")
            //     enemyList[i].move(playerPos,0)
            //     playerPos = player.pos
            //     enemyList[i].move(playerPos,100)
            // }
            enemyList[i].moveTo(player.pos, 100);
        }

        // if (enemyList.length == 0){
        //     console.log("No enemies")
        // }
    })
    


});

go("game");
