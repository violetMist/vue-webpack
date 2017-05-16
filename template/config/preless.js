module.exports = {
	oem : [], // used to deploy works to OEM products, maybe many. If none, let it empty. 

	src : "./_assets",
	lessDest : "./src",
	imgDest : "./static",
	demoDest : "./_demo",
	picmap : [{
		// margin:8, // margin for each images in spirit file, default is 8
		classPrefix : "pic", // defualt is pic
		path : "pic" // default is "pic"
	}, {
		classPrefix : "cn", // defualt is pic
		path : "cn" // default is "pic"	
	}, {
		classPrefix : "en", // defualt is pic
		path : "en" // default is "pic"	
	}]
};
