export default function errorHandler(err, req, res, next) {
    const status = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    const errors = err.errors || [];

    res.status(status).json({ message, errors });
}