const creds = require('./creds.json')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('') //Заказчика

module.exports = async function(sheet, ctx) {
    await doc.useServiceAccountAuth({
        client_email: creds.client_email, 
        private_key: creds.private_key
    })
    await doc.loadInfo();
    var sheet = doc.sheetsByTitle[sheet]
    await sheet.loadCells()
    sheet.addRow([ctx.chat.id, ctx.from.username])
    sheet.saveUpdatedCells()
}