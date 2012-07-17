/**
 * This is the Maze command class translates easy2read commands to 
 * real server/client commands.
 * 
 */
var COMMAND = {
    
    CLIENT : {
        
        LOBBY: {
            LIST: "lobby.list" 
        },
        
        GAME: {
            JOIN: "game.join",
            EXIT: "game.exit",
            HOST: "game.host",
            SEND_STATUS: "game.update_client_status"
        }
    },

    SERVER : {
        
        LOBBY: {
            LIST_TO_CLIENT: "@lobby.list" 
        },
        
        GAME: {
            JOIN_CLIENT: "@game.join",
            EXIT_CLIENT: "@game.exit",
            HOST:        "@game.host",
            SEND_STATUS: "@game.update_client_status",
            END:         "@game.end"
        }
    }
}