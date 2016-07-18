import React from 'react';
import ReactDOM from 'react-dom';
import TimeLineLightBox from './ui/slider';


//TimeLineBox
//
//
var lightBoxData=[
			{
				"thumb":"http://hearthstone.nos.netease.com/1/sls/浙江赛区/杭州/small/822A2236.jpg",
				"title":"现场一",
				"large":"http://hearthstone.nos.netease.com/1/sls/浙江赛区/杭州/small/822A2236.jpg"
			},
			{
				"thumb":"http://hearthstone.nos.netease.com/1/sls/shandong/juesai/small/观众互动.JPG",
				"title":"现场二",
				"large":"http://hearthstone.nos.netease.com/1/sls/shandong/juesai/small/观众互动.JPG"
			}
		];

		ReactDOM.render(<TimeLineLightBox list={lightBoxData} />,document.getElementById('slider'));