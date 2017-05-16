IX.ns("IXW.Service");
IXW.Service.entries = [
["loginService", function (name, params, cbFn, failFn){
	switch(name){
	case "login":
		if (params.name== 'zhangsan' && params.pwd =="123456")
			cbFn({
				code: 1,
				data: {
					"id": 1,
					"name": params.name
				}
			});
		else
			failFn({
				code: 0,
				err: "用户名和密码不匹配"
			});
		break;
	case "session":
		cbFn({
			code: 1,
			data: {
				"id": 1,
				"name": "admin"
			}
		});
		break;
	}
}]
];
