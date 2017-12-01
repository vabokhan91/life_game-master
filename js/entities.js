
class Predator {
    constructor(image, x, y, ctx) {
        this.lifetime = ctx.lifetime;
        this.image = image;
        this.x = x;
        this.y = y;
        this.reproduction = ctx.reproduction;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, ctx.cellSize - 5, ctx.cellSize - 5);
    }

    move(entities, ctx) {
        var entitiesLength = entities.length;
        var newCoordinates = chooseNextStep(this.x, this.y, ctx);
        var isCellClosed = true;
        while (isCellClosed) {
            for (var i = 0; i < entitiesLength;) {
                if (entities[i].x === newCoordinates.x && entities[i].y === newCoordinates.y && this.constructor.name === entities[i].constructor.name) {
                    newCoordinates = chooseNextStep(this.x, this.y, ctx);
                    i = 0;
                } else {
                    i++;
                }
            }
            this.x = newCoordinates.x;
            this.y = newCoordinates.y;
            isCellClosed = false;
        }
    }

    doLogic(entities) {
        var arrayLength = entities.length;
        for (var i = 0; i < arrayLength; i++) {
            if (this.x === entities[i].x && this.y === entities[i].y && this.constructor.name !== entities[i].constructor.name) {
                entities.splice(i, 1);
                arrayLength -= 1;
                this.lifetime += 5;
            } else {
                j++;
            }
        }
    }

    reproduce(entities, ctx) {
        if (this.lifetime <= 0) {
            var index = entities.indexOf(this);
            entities.splice(index, 1);
        } else {
            this.lifetime -= 1;
            this.reproduction -= 1;
            if(this.reproduction === 0 ){
                addEntity(entities, 1, ctx);
            }
        }

    }

}

class Victim {
    constructor(image, x, y, ctx) {
        this.reproduction = ctx.reproduction;
        this.image = image;
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, ctx.cellSize - 5, ctx.cellSize - 5);
    }

    move(entities, ctx) {
        var entitiesLength = entities.length;
        var newCoordinates = chooseNextStep(this.x, this.y, ctx);
        var isCellClosed = true;
        while (isCellClosed) {
            for (var i = 0; i < entitiesLength;) {
                if (entities[i].x === newCoordinates.x && entities[i].y === newCoordinates.y) {
                    newCoordinates = chooseNextStep(this.x, this.y, ctx);
                    i = 0;
                } else {
                    i++;
                }
            }
            isCellClosed = false;
        }
        this.x = newCoordinates.x;
        this.y = newCoordinates.y;

    }

    doLogic(entities) {
    }

    reproduce(entities) {
        if (this.lifetime <= 0) {
            var index = entities.indexOf(this);
            entities.splice(index, 1);
        } else {
            this.lifetime -= 1;
            this.reproduction -= 1;
            if(this.reproduction === 0 ){
                addEntity(entities, 0, ctx);
            }
        }

    }


}
