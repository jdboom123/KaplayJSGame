import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();
let SPEED = 150
const LEFT = new Vec2(-1*SPEED,0)
const RIGHT = new Vec2(SPEED,0)
const UP = new Vec2(0,-1*SPEED)
const DOWN = new Vec2(0,SPEED)

const GUN_X = 70
const GUN_Y = 10
const GUN_X_OFFSET = 50
const GUN_Y_OFFSET = 30
const GUN_VEC = new Vec2(GUN_X_OFFSET, GUN_Y_OFFSET)
const GUN_ROTATION = 5

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

const player = k.add([k.pos(120, 80), k.sprite("bean")]);
const gun = player.add([
    anchor("left"),
    rect(GUN_X,GUN_Y), //replace with actual gun sprite
    pos(GUN_X_OFFSET,GUN_Y_OFFSET),
    rotate()
]);

// Player movement
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

onKeyPress("space", () =>{
    addKaboom(player.pos)
});

//Gun movement
// onKeyDown("a", () =>{
//     gun.rotateBy(-1*GUN_ROTATION)
//     console.log("rotate counterclockwise")
// });

    // let playerPos = player.pos
    // let gunHandlePos = playerPos.add(GUN_VEC)
    // var currGunRotation = gun.angle

// onKeyDown("p", () =>{
    // gun.rotateBy(GUN_ROTATION)
    
    // let mousePosition = mousePos()
    // let playerPos = player.pos
    // let gunHandlePos = playerPos.add(GUN_VEC)
    // let currGunRotation = deg2rad(gun.angle)
    // let gunRotationPos = new Vec2(GUN_X*Math.cos(currGunRotation),GUN_X*Math.sin(currGunRotation))
    // let gunTipPos = gunHandlePos.add(gunRotationPos)

    // let vecA = mousePosition.sub(gunTipPos)
    // let vecB = new Vec2(70,0)
    // let theta = deg2rad(vecA.angleBetween(vecB))

    // console.log(theta)

    // let gunTiptoMouse 


    // console.log("rotate clockwise")
    // console.log("Gun Angle = " + currGunRotation)
    // console.log(gun.angle)
    // console.log("Gun Handle Pos = " + gunHandlePos)
    // console.log("Gun Rotation Vec = " + gunRotationPos)
    // console.log("Gun Tip Pos = " + gunTipPos)
// });

onMouseMove(() =>{
    let mousePosition = mousePos()
    let playerPos = player.pos
    let gunHandlePos = playerPos.add(GUN_VEC)
    let currGunRotation = deg2rad(gun.angle)
    let gunRotationPos = new Vec2(GUN_X*Math.cos(currGunRotation),GUN_X*Math.sin(currGunRotation))
    let gunTipPos = gunHandlePos.add(gunRotationPos)

    let vecA = mousePosition.sub(gunTipPos)
    let vecB = new Vec2(70,0)
    let theta = vecA.angleBetween(vecB)
    gun.angle = -1*theta

    console.log(vecA)
})
