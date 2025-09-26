export function addFollowEnemy(k, player){
    const posX = rand(0, width());
    const posY = rand(0, height());
    // We can probably change this so that the main game can choose where these enemies will spawn and then we can have like some kind of indicator or control where the 
    // enemies will spawn based on the player position

    const enemy = add([
        rect(50,50),
        pos(posX, posY),
        "enemy",
        area(),
        health(60),
        body(),
        {
            add(){
                this.onDeath(()=>{
                    destroy(this);
                });
                this.onUpdate(() =>{
                    this.moveTo(player.pos, 100);

                    if(this.isColliding(player)){
                        player.hurt(10, this.pos)
                    }
                })


            }
        }
    ])

    return enemy;
}