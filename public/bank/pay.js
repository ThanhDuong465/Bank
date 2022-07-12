const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/pay';
exports.index = async(req, res, next) => {
	var { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');

	var senderID = req.query.senderID
	var userID = req.query.userID
	var money = req.query.money
	var password = req.query.password
	var STK = req.query.STK
	var type = req.query.type


	if((!type || !senderID || !money || !password) || (!STK && !userID)) return res.json({ status: false, message: 'Thiếu dữ liệu!'});
	var typ = ['STK', 'ID']
	if(typ.includes(type) == false) return res.json({ status: false, message: '[ ERROR ] » Phương thức chuyển tiền không hợp lệ.'})

	var findTk_1 = dataBank.find(i => i.senderID == senderID)
	var findTk_2 = checkType(type)
	if(!findTk_1) {
		return res.json({
			status: false,
			message: 'Không tìm thấy tài khoản của bạn.'
		})
	}
	if(!findTk_2) {
		return res.json({
			status: false,
			message: 'Không tìm thấy tài khoản của người nhận.'
		})
	}
	if(password !== findTk_1.data.password) {
		return res.json({
			status: false,
			message: '𝗦𝗮𝗶 𝗺𝗮̣̂𝘁 𝗸𝗵𝗮̂̉𝘂.'
		})
	}
	else {
		var moneyG = findTk_1.data.money
		if(moneyG < money) {
			return res.json({
				status: false,
				message: '𝗦𝗼̂́ 𝗱𝘂̛ 𝗸𝗵𝗼̂𝗻𝗴 đ𝘂̉ đ𝗲̂̉ 𝘁𝗵𝘂̛̣𝗰 𝗵𝗶𝗲̣̂𝗻 𝗴𝗶𝗮𝗼 𝗱𝗶̣𝗰𝗵.'
			})
		}
		findTk_1.data.money = findTk_1.data.money - parseInt(money)
		findTk_2.data.money = findTk_2.data.money + parseInt(money)
		writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
		return res.json({
			status: true,
			message: {
				noti: '𝗖𝗵𝘂𝘆𝗲̂̉𝗻 𝘁𝗶𝗲̂̀𝗻 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴!',
				data: {
					senderID: senderID,
					userID: userID,
					message: `===== [ 𝗧𝗛𝗢̂𝗡𝗚 𝗧𝗜𝗡 ] =====\n=== [ 𝗡𝗚𝗨̛𝗢̛̀𝗜 𝗖𝗛𝗨𝗬𝗘̂̉𝗡 ] ===\n💳 𝗧𝗮̀𝗶 𝗞𝗵𝗼𝗮̉𝗻 𝗻𝗴𝘂𝗼̂̀𝗻: ${findTk_1.data.STK}\n===== [ 𝗧𝗛𝗢̂𝗡𝗚 𝗧𝗜𝗡 ] =====\n==== [ 𝗡𝗚𝗨̛𝗢̛̀𝗜 𝗡𝗛𝗔̣̂𝗡 ] ====\n💳 𝗧𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻 𝘁𝗵𝘂̣ 𝗵𝘂̛𝗼̛̉𝗻𝗴: ${findTk_2.data.STK} \n💰 𝗦𝗼̂́ 𝘁𝗶𝗲̂̀𝗻: ${money}$`
				}
			}
		})
	}
	function checkType(type) {
		if(type == 'STK') {
			var check = dataBank.find(i => i.data.STK == STK)
		}
		if(type == 'ID') {
			var check = dataBank.find(i => i.senderID == userID)
		}
		return check;
	}
}