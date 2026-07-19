const { Server } = require('socket.io');

let io = null;

// Maps userId (from users table) -> socket.id
const userSockets = new Map();

const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`[Socket] Client connected: ${socket.id}`);

        // Client must emit 'join' with their userId after connecting
        socket.on('join', (userId) => {
            if (userId) {
                userSockets.set(String(userId), socket.id);
                console.log(`[Socket] User ${userId} joined with socket ${socket.id}`);
            }
        });

        socket.on('disconnect', () => {
            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    userSockets.delete(userId);
                    console.log(`[Socket] User ${userId} disconnected`);
                    break;
                }
            }
        });
    });

    return io;
};

const getIO = () => {
    if (!io) throw new Error('Socket.io not initialized. Call initSocket(server) first.');
    return io;
};

const emitToUser = (userId, event, data) => {
    if (!io) return;
    const socketId = userSockets.get(String(userId));
    if (socketId) {
        io.to(socketId).emit(event, data);
    }
};

module.exports = {
    initSocket,
    getIO,
    emitToUser,
    userSockets
};
