export function addWall(k, width, height, posX, posY, anchorLoc){
    const wall = add([
        rect(width, height),
        anchor(anchorLoc),
        pos(posX,posY),
        area(),
        body(),
        "environment",
        {
            add(){
                this.isStatic = true;
            }
        }
    ])

    return wall;
}