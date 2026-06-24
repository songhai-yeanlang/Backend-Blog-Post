const fs = require("fs/promises");
const path = require("path");

const logError = async (controller, message_err) => {
    try {
        const now = new Date();
        
     
        const tzOffset = now.getTimezoneOffset() * 60000;
        const localDate = new Date(now.getTime() - tzOffset);
   
        const timestamp = localDate.toISOString().replace('T', ' ').substring(0, 19);
        const dateString = timestamp.split(' ')[0]; 
        

        const logPath = path.join(__dirname, "..", "logs", `${controller}-${dateString}.txt`);
        const logMessage = `[${timestamp}]\n${message_err}\n------------------------------------------------------------\n`;
        await fs.mkdir(path.dirname(logPath), { recursive: true });
        await fs.appendFile(logPath, logMessage);

    } catch (error) {
        console.error('Error writing to log file: ', error);
    }
}


module.exports = {
    logError
};
