export function addBasicGun(k, player){
    const GUN_X = 70
    const GUN_Y = 10
    const GUN_X_OFFSET = 0
    const GUN_Y_OFFSET = 0
    const GUN_VEC = new Vec2(GUN_X_OFFSET, GUN_Y_OFFSET)
    let BULLET_SPEED = 1200

    const gun = player.add([
        anchor("left"),
        rect(GUN_X,GUN_Y), //replace with actual gun sprite
        pos(GUN_X_OFFSET,GUN_Y_OFFSET),
        rotate(),
        {
            add(){
                this.onMouseMove(() =>{
                    let mousePosition = mousePos()
                    let playerPos = player.pos
                    let gunHandlePos = playerPos.add(GUN_VEC)
                    gun.angle = mousePosition.sub(gunHandlePos).angle()
                });
                this.onMousePress(() =>{
                    let playerPos = player.pos
                    let gunHandlePos = playerPos.add(GUN_VEC)
                    let currGunRotation = deg2rad(gun.angle)
                    let gunRotationPos = new Vec2(GUN_X*Math.cos(currGunRotation),GUN_X*Math.sin(currGunRotation))
                    let gunTipPos = gunHandlePos.add(gunRotationPos)

                    var bullet = k.add([
                        circle(10),
                        pos(gunTipPos),
                        move(gunTipPos.sub(gunHandlePos), BULLET_SPEED),
                        area(),
                        "bullet",
                        offscreen({ destroy: true }),
                        {
                            add(){
                                this.onCollide("enemy", (enemy)=>{
                                    enemy.hurt(20);
                                    destroy(this);
                                })
                            }
                        }
                    ])
                });
            }
        }
    ])

    return gun;
}