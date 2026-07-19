const { logError } = require('./logError');

const getErrorResponse = (error) => {
    if (error.code === 'ER_DUP_ENTRY') {
        const isEmail = error.sqlMessage && error.sqlMessage.toLowerCase().includes('email');
        
        return {
            statusCode: 409,
            message: isEmail ? 'Email already exists' : 'This record already exists'
        };
    }

    if (error.name === 'MulterError') {
        return {
            statusCode: 400,
            message: error.message
        };
    }

    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'Internal server error !!!';

    return {
        statusCode,
        message: statusCode >= 500 ? 'Internal server error !!!' : message
    };
};

const writeErrorLog = async (controller, error) => {
    let message = 'Unknown error';
    
    if (error?.stack) {

        message = error.stack
            .split('\n')
            .filter(line => !line.includes('node_modules') && !line.includes('node:internal'))
            .join('\n');
    } else {
        message = error?.message || (typeof error === 'object' ? JSON.stringify(error) : String(error));
    }
    console.error(`[${controller}] Error:`, error);
    
    await logError(controller, message);
};

const handleError = async (res, controller, error) => {
    const { statusCode, message } = getErrorResponse(error);

    await writeErrorLog(controller, error);

    return res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = {
    getErrorResponse,
    handleError,
    writeErrorLog
};
