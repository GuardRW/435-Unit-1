
class Automata {

    constructor(theLength, theWidth) {
        this.grid = this.buildGrid(theLength, theWidth);
        this.draw(this.grid, ctx)
        this.numEntities = 0;
        gameEngine.addEntity(this);

    };

    buildGrid(COLS, ROWS) {
        return new Array(COLS).fill(null)
            .map(() => new Array(ROWS).fill(null)
            .map(() => 0))
    }

    draw(grid, ctx) {
        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                const cell = grid[col][row];
                ctx.beginPath();
                ctx.rect(col * resolution, row * resolution, resolution, resolution);
                if (cell) { 
                    ctx.fillStyle ='black';
                } else { 
                    ctx.fillStyle = 'lightgray';
                }
                ctx.fill();
            }
        }
    }

    update(grid) {
        const neighboors = grid;
        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbours = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }
                const x_cell = col + i;
                const y_cell = row + j;
        
                if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                    const currentNeighbour = grid[col + i][row + j];
                    numNeighbours += currentNeighbour;
                }
                }
            }

            if (cell === 1 && numNeighbours < 2) {
                neighboors[col][row] = 0;
            } else if (cell === 1 && numNeighbours > 3) {
                neighboors[col][row] = 0;
            } else if (cell === 0 && numNeighbours === 3) {
                neighboors[col][row] = 1;
            }
            }
        }
        return neighboors;
        }
        
    addAutomata(num) {
        for (let i = 0; i < num; i++) {
            this.numEntities++;
            const randomX = Math.floor(Math.random() * this.grid.length)
            const randomY = Math.floor(Math.random() * this.grid[0].length)
            const size = Math.floor(Math.random() * ((ROWS * COLS) / (resolution * 100)) + 1);
            
            for (let i = 0 - Math.floor(size / 2); i < Math.floor(size / 2); i++) {
                for (let j = 0 - Math.floor(size / 2); j < Math.floor(size / 2); j++) {

                const x_cell = randomX + i;
                const y_cell = randomY + j;
        
                if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                    this.grid[x_cell][y_cell] = Math.floor(Math.random() * 2)
                }
                }
            }
        }
    }

}