
const response = (status = 200,message='',data=[]) => {
    // if data not empty, then return data
    
    return {
        status: status,
        message: message,
        data: data
    };
    }
module.exports = response;
