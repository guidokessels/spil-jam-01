(function( window ) {

    var CELL_WIDTH  = 20,
        CELL_HEIGHT = 20;

    function generateMazeUsingBinaryTree( width, height ) {
        var maze = [],
            cell;

        // Create maze using Binary Tree
        for(var i = 0; i < height; i++) {

            maze[i] = [];

            for(var j = 0; j < width; j++) {
                if(
                    i === 0 // reached north wall, so go west
                ) {
                    cell = 'w';
                }
                else if (
                    j === 0 // reached left wall, so go north
                ) {
                    cell = 'n';
                }
                else {
                    cell = Math.random() < 0.5 ? 'w' : 'n'; // randomly go either west or north
                }

                maze[i][j] = cell;
            }
        }

        return maze;
    };

    var generator = function() {};

    generator.prototype.render = function( element_id ) {

        var container = document.querySelector(element_id),
            maze      = this.maze,
            height    = this.height,
            width     = this.width,
            render    = '',
            cell_height = CELL_HEIGHT,
            cell_width  = CELL_WIDTH;

        if (!container) {
            throw "DOM Element with id '" + element_id + "' not found!";
        }

        for(var i = 0; i < height; i++) {
            for(var j = 0; j < width; j++) {
                render += '<div class="cell open-' 
		    + maze[i][j] + '" style="top: ' 
		    + (i*cell_height) + 'px; left: ' 
		    + (j*cell_width) + 'px; height: ' 
		    + cell_height + 'px; width: ' 
		    + cell_width + 'px"></div>';
            }
        }

        container.innerHTML = render;

    };

    generator.prototype.generate = function( width, height ) {

        this.width = width;
        this.height = height;

        this.maze = generateMazeUsingBinaryTree( width, height );

        this.render('#container');

        // Return array with maze data
        return this.maze;

    };

    // Export generator to global scope
    window.MazeGenerator = new generator();

})( window );