const damageMap = new Map();
damageMap.set("basicEnemy", 10);

export function addFollowEnemy(k, player){
    const posX = rand(0, 100);
    const posY = rand(0, height());
    // We can probably change this so that the main game can choose where these enemies will spawn and then we can have like some kind of indicator or control where the 
    // enemies will spawn based on the player position

    const enemy = add([
        rect(50,50),
        pos(posX, posY),
        "enemy",
        "basicEnemy",
        area(),
        health(60),
        body(),

        // Can change if you want to add sprites
        opacity(1),
        color(255,0,0),
        {
            add(){
                let enemySpeed = 100
                this.setMaxHP(60);

                this.onDeath(()=>{
                    destroy(this);
                });
                this.onUpdate(() =>{
                    this.moveTo(player.pos, enemySpeed);
                })
                this.onHurt(()=>{
                    // Can change if you want to add sprites
                    this.opacity = this.opacity * (this.hp()/this.maxHP());
                })

            }
        }
    ])

    return enemy;
}

export function enemyDamage(enemyTagList){
    for (const enemyTag of enemyTagList){
        if (damageMap.has(enemyTag)){
            // console.log(damageMap.get(enemyTag))
            return damageMap.get(enemyTag);
        }
    }
    return 0;
}