module.exports = async function (context, req) {
    const lines = req.body;

    // send message to clients using SignalR
    return {
        target: "newLines",
        arguments: [ lines ]
    };
};