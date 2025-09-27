

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

        // Can change if you want to add sprites
        color(0,255,0),
        {
            add(){
                this.setMaxHP(100);

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

                // Health Management
                this.onHurt((damage)=>{
                    console.log(damage);
                    this.enterState("invincible");
                });

                // States
                this.onStateEnter("damage", ()=>{
                    // console.log("Entered damage");
                    console.log("damage")
                    this.enterState("invincible");
                });

                this.onStateEnter("invincible", ()=>{
                    // console.log("invincible");
                    // Can change if you want to add sprites
                    this.color = RED
                    wait(2.5, ()=>this.enterState("normal"));
                });
                this.onStateEnter("normal", ()=>{
                    this.color = GREEN
                    console.log("normal")
                })


            }
        }

    ]);
    
    return player;
}