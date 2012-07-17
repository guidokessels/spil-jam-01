var N = 0x1,
    S = 0x2,
    W = 0x4,
    E = 0x8;

function dx(direction) {
    switch (direction) {
        case E: return 1;
        case W: return -1;
        case N: return 0;
        case S: return 0;
    }
}

function dy(direction) {
    switch (direction) {
        case E: return 0;
        case W: return 0;
        case N: return -1;
        case S: return 1;
    }
}

function opposite(direction) {
    switch (direction) {
        case E: return W;
        case W: return E;
        case N: return S;
        case S: return N;
    }
}

function rIndex(index) {
    return Math.floor(Math.random() * index);
}

function generateGrid(w, h) {
    var grid = Array(h);
    for (var i = 0; i < h; i++) {
        grid[i] = new Array(w);
    }

    var index, nx, ny,
        direction,
        directions = [],
        cells = [],
        coords = {
            x: Math.floor(Math.random() * w),
            y: Math.floor(Math.random() * h)
        };

    cells.push(coords);

    while (cells.length) {
        index = rIndex(cells.length);
        if (index && index == cells.length) {
            index--;
        }
        coords = cells[index];

        directions = [N, S, E, W];
        while (directions.length) {
            direction = directions.splice(Math.floor(Math.random() * directions.length), 1)[0];

            nx = coords.x + dx(direction);
            ny = coords.y + dy(direction);

            if (nx >= 0 && ny >= 0 && nx < w && ny < h && !grid[ny][nx]) {
                grid[coords.y][coords.x] = grid[coords.y][coords.x] | direction;
                grid[ny][nx] = grid[ny][nx] | opposite(direction);
                cells.push({x: nx, y: ny});
                index = null;
                break;
            }
        }

        if (index !== null) {
            cells.splice(index, 1);
        }
    }

    return grid;
}
