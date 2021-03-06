const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, "cache", "bank.json");
exports.name = '/bank/find';
exports.index = async(req, res, next) => {
	const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');

	const type = req.query.type;
	const ID = req.query.ID;
	const STK = req.query.STK;
	const name = req.query.name;
	if(!type || (!ID && !STK && !name))return res.json({ status: false, message: 'Thiแบฟu dแปฏ liแปu!'})
	switch(type) {
		case 'id':
    case 'ID': {
			const findSenderID = dataBank.find(i => i.senderID == ID)
			if(findSenderID == undefined) {
				return res.json({
					status: false,
					message: '๐๐ต๐ผฬ๐ป๐ด ๐๐ถฬ๐บ ๐๐ต๐ฎฬฬ๐ ๐๐ฎฬ๐ถ ๐ธ๐ต๐ผ๐ฎฬ๐ป ๐ฐ๐ผฬ ๐๐ ๐ป๐ฎฬ๐!'
				})
			}
			else {
				return res.json({
					status: true,
					message: {
						name: findSenderID.name,
						senderID: findSenderID.senderID,
						data: {
							money: findSenderID.data.money,
							STK: findSenderID.data.STK,
              mathe: findSenderID.data.mathe,
							debt: findSenderID.data.debt
						}
					}
				})
			}
			break;
		}
		case 'stk': 
    case 'STK': {
			const findSTK = dataBank.find(i => i.data.STK == STK)
			if(findSTK == undefined) {
				return res.json({
					status: false,
					message: '๐ฆ๐ง๐ ๐ธ๐ต๐ผฬ๐ป๐ด ๐๐ผฬฬ๐ป ๐๐ฎฬฃ๐ถ ๐๐ฟ๐ฒฬ๐ป ๐ต๐ฒฬฃฬ ๐๐ต๐ผฬฬ๐ป๐ด!'
				})
			}
			else {
				return res.json({
					status: true,
					message: {
						name: findSTK.name,
						senderID: findSTK.senderID,
						data: {
							money: findSTK.data.money,
							STK: findSTK.data.STK,
              mathe: findSTK.data.mathe,
							debt: findSTK.data.debt
						}
					}
				})
			}
			break;
		}
		case 'name': {
			const findName = dataBank.filter(i => i.name == name)
			if(findName.length == 0) {
				return res.json({
					status: false,
					message: '๐๐ต๐ผฬ๐ป๐ด ๐๐ถฬ๐บ ๐๐ต๐ฎฬฬ๐ ๐๐ฎฬ๐ถ ๐ธ๐ต๐ผ๐ฎฬ๐ป ๐ฐ๐ผฬ ๐๐ฒฬ๐ป ๐ป๐ฎฬ๐!'
				})
			}
			else {
				var data = [];
				for(let i of findName) {
					data.push({
						name: i.name,
						senderID: i.senderID,
						data: {
							money: i.data.money,
							STK: i.data.STK,
              mathe: i.data.mathe,
							debt: i.data.debt
						}
					})

				}
				return res.json({
					status: true,
					message: {
						data: data
					}
				})
			}
			break;
		}
		default: {
			return res.json({
				status: false,
				message: '๐ฃ๐ต๐ฬ๐ผฬ๐ป๐ด ๐๐ต๐ฬฬ๐ฐ ๐๐ถฬ๐บ ๐ธ๐ถ๐ฒฬฬ๐บ ๐ธ๐ต๐ผฬ๐ป๐ด ๐ต๐ผฬฬฃ๐ฝ ๐น๐ฒฬฃฬ!'
			})
		}
	}
}