module.exports = async function (context, req) {
    const lines = req.body;

    // save lines to Cosmos DB
    context.bindings.cosmosDocument = lines;

    // send lines to clients using SignalR
    return {
        target: "newLines",
        arguments: [ lines ]
    };
};