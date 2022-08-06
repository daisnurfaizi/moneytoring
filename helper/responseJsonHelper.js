
const response = (status = 200,message='',data=[]) => {
    // if data not empty, then return data
    if(data.length > 0){
    return {
        status: status,
        message: message,
        data: data
    };
    }
    // if data empty, then return message
    else{
        return {
            status: status,
            message: message,
            data: data
        };
    }
}
module.exports = response;
