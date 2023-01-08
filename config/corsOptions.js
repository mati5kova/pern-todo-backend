const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'https://pern-stack-todo-app.netlify.app/'];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

module.exports = corsOptions;
