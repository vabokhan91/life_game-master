function game() {
    document.getElementById('game_grid').style.visibility = "visible";
    var c = document.getElementById('game_grid');
    var ctx = c.getContext('2d');
    var gridSize = parseInt(document.getElementById('grid_size').value);
    var cellSize = parseInt(document.getElementById('field_size').value);
    var lifetime = parseInt(document.getElementById('lifetime').value);
    var reproduction = parseInt(document.getElementById('reproduction').value);
    var width = gridSize * cellSize;
    var height = gridSize * cellSize;
    var density = document.getElementById('density').value;
    var iterations = document.getElementById('times').value;
    c.width = width;
    c.height = height;
    ctx.width = width;
    ctx.height = height;
    ctx.cellSize = cellSize;
    ctx.lifetime = lifetime;
    ctx.reproduction = reproduction;
    var entities = [];
    drawGrid(ctx);
    initEntities(density, entities, ctx);
    let counter = 0,
        interval;

    interval = window.setInterval(function () {
        var entLength = entities.length;
        for (var p = 0; p < entities.length; p++) {
            ctx.clearRect(entities[p].x, entities[p].y, cellSize - 2, cellSize - 2);
            entities[p].move(entities, ctx);
            entities[p].doLogic(entities);
            entities[p].reproduce(entities);
            entities[p].draw(ctx);
        }
        counter++;
        if (counter === parseInt(iterations)) {
            clearInterval(interval);
            alert("GAME OVER");
        }
    }, 500)
}

function drawGrid(ctx) {
    ctx.lineWidth = 1;
    var cellSize = ctx.cellSize;
    var height = ctx.height;
    var width = ctx.width;
    for (i = 0; i <= height; i = i + cellSize) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
    for (j = 0; j <= width; j = j + cellSize) {
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
    }
}

function chooseNextStep(x, y, ctx) {
    var cellSize = ctx.cellSize;
    var maxWidth = ctx.width;
    var maxHeight = ctx.height;
    var nextX = getRandomArbitrary(x - cellSize, x + cellSize);
    if (nextX < 0 || nextX > maxWidth - cellSize) {
        nextX = x;
    } else if (nextX > x) {
        while (nextX > 0 && !(Math.floor(nextX % cellSize) === 0)) {
            nextX += 1;
        }
        nextX = Math.floor(nextX) + 1;
    } else if (nextX < x) {
        while (nextX > 0 && !(Math.floor(nextX % cellSize) === 0)) {
            nextX -= 1;
        }
        nextX = Math.floor(nextX) + 1;
    }
    var nextY = getRandomArbitrary(y - cellSize, y + cellSize);
    if (nextY < 0 || nextY > maxHeight - cellSize) {
        nextY = y;
    } else if (nextY < y) {
        while (nextY > 0 && !(Math.floor(nextY % cellSize) === 0)) {
            nextY -= 1;
        }
        nextY = Math.floor(nextY) + 1;
    } else if (nextY > y) {
        while (nextY > 0 && !(Math.floor(nextY % cellSize) === 0)) {
            nextY += 1;
        }
        nextY = Math.floor(nextY) + 1;
    }

    var coordinate = {
        x: nextX,
        y: nextY
    };
    return coordinate;
}


function initEntities(density, entities, ctx) {
    var numberOfEntities = 100 - density * 100;

    for (var i = 0; i < numberOfEntities; i++) {
        var type = Math.random();
        addEntity(entities, type, ctx);
    }

}

function addEntity(entities, type, ctx) {
    var isCellClosed = true;
    var coordinates = choosePosition(ctx);
    var entitiesLength = entities.length;
    if (entitiesLength > 0) {
        while (isCellClosed) {
            for (var i = 0; i < entitiesLength; i++) {
                if (entities[i].x === coordinates.x && entities[i].y === coordinates.y) {
                    coordinates = choosePosition(ctx);
                    i = 0;
                }
            }
            isCellClosed = false;
        }
    }
    if (type >= 0.5) {
        var pred = addPredator(coordinates.x, coordinates.y, ctx);
        entities[entitiesLength] = pred;
    } else {
        var victim = addVictim(coordinates.x, coordinates.y, ctx);
        entities[entitiesLength] = victim;
    }

}

function addVictim(x, y ,ctx) {
    var victim = new Victim(document.getElementById('victim'), x, y,ctx);
    return victim;
}

function addPredator(x, y, ctx) {
    var predator = new Predator(document.getElementById('predator'), x, y, ctx);
    return predator;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function choosePosition(ctx) {
    var x = getRandomArbitrary(0, ctx.width - ctx.cellSize);
    while (x > 0 && !(Math.floor(x % ctx.cellSize) === 0)) {
        x += 1;
    }
    x = Math.floor(x) + 1;
    var y = getRandomArbitrary(0, ctx.height - ctx.cellSize);
    while (y > 0 && !(Math.floor(y % ctx.cellSize) === 0)) {
        y += 1;
    }
    y = Math.floor(y) + 1;
    var coordinate = {
        x: x,
        y: y
    };
    return coordinate;
}

