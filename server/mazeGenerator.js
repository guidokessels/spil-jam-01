Maze = 
{ 
    generate : function( width, height ) {
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
    }
}
    