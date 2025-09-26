

export function addPlayer(k, posX, posY, playerSprite){
    let PLAYER_SPEED = 150
    const LEFT = new Vec2(-1*PLAYER_SPEED,0)
    const RIGHT = new Vec2(PLAYER_SPEED,0)
    const UP = new Vec2(0,-1*PLAYER_SPEED)
    const DOWN = new Vec2(0,PLAYER_SPEED)

    const player = add([
        pos(posX, posY),
        sprite(playerSprite),
        anchor("center"),
        "player",
        health(100),
        area(),
        body(),
        state("normal", ["normal", "damage","invincible"]),
        {
            add(){
                this.onKeyDown("a", () =>{
                    this.move(LEFT);
                    // console.log("moved left")
                });
                this.onKeyDown("d", () =>{
                    this.move(RIGHT);
                });
                this.onKeyDown("w", () =>{
                    this.move(UP);
                    // console.log("moved up")
                });
                this.onKeyDown("s", () =>{
                    this.move(DOWN);
                    // console.log("moved down")
                });

                // Gun functionality
                this.onKeyPress("space", () =>{
                    addKaboom(this.pos)
                });
                this.onHurt((damage, enemyPos)=>{
                    console.log(this.state)
                    // if (this.state == "normal"){
                        // this.health -= damage;
                    this.enterState("damage", (enemyPos));
                    // }
                    // else{
                        // console.log("Im okay")
                    // }
                });

                // States
                this.onStateEnter("damage", (enemyPos)=>{
                    // console.log("Entered damage");
                    console.log(enemyPos)
                    this.enterState("invincible");
                });
                this.onStateEnter("invincible", ()=>{
                    // console.log("invincible");
                    wait(200, ()=>this.enterState("normal"));
                });

                // this.onDeath(()=>{
                //     k.go("end");
                // })

            }
        }

    ]);
    
    return player;
}