const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authSchema = new Schema({
    accessToken: {type: String, required: true},
    refreshToken: {type: String, required: true},
});

// Export module
module.exports = mongoose.model('Product', authSchema);

// {"access_token":"BQAk5KJSKclvJ3MEeR6xCxk2ry4ZQo-2d93u0HBR0xOfsljY_HNj1j-ZneAW06uZBg63RPYKoX-HT48lcLJns6VbesJCzBH-r5ViZiP2rMXi4N3HyR2fuWbGxWgab876Bf4AOtFkOM9wLM5xDou34jp9nThuCW0",
// "token_type":"Bearer",
// "expires_in":3600,
// "refresh_token":"AQDVZ-W4vNoO8oYCFlCQJOsO5GFheSEkrP3dTiKxL1NlfUK3mfO6Cqn0WYtUPlqIT0b2y9UNm3omhROI7z59G4gqVFIgnzOedtcHuvoYnyAYjchSE5RvmPL4yPi8RaYfOYDq-Q",
//"scope":"user-read-email user-read-private"}
