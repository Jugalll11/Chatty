const bcrypt = require('bcryptjs')

function hashpassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt);
}

function ComparePasswords(inputpassword, hashespassword) {
    return bcrypt.compareSync(inputpassword,hashespassword)
}

module.exports = {
    hashpassword,
    ComparePasswords
}