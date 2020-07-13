module.exports = async function (context, req, sessionData) {
    context.res.json(sessionData);
};