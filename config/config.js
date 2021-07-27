// mongo database
exports.mongo = process.env.MONGO_DATABASE;

// sendgrid key
exports.Sendgrid = process.env.SENDGRID_KEY;

// jwt authentication
exports.accessToken = process.env.ACCESS_TOKEN_SECRET;
exports.refereshToken = process.env.REFRESH_TOKEN_SECRET;

// our access token and refersh token time span(expiring time )
exports.accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
exports.refereshTokenLife = process.env.REFRESH_TOKEN_LIFE;
