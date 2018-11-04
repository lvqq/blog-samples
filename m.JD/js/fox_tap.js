/*
	参数1:绑定的dom元素
	参数2:回调函数
*/
function fox_tap(element,callBack) {
	// 绑定touch事件
	/*
		计算 start 跟 end的 时间差
			如果时间差 很长 也失效  if(time>200)
		如果move触发了 就失效

	*/

	// 1. 定义一些必须的变量
	// 开始的时间
	var startTime = 0;

	// 标示 是否触发了 move事件
	var isMove =false;

	// 定义 最大的 延迟时间
	var maxTime = 250;

	element.addEventListener('touchstart',function (e) {
		// 记录开始时间
		startTime = Date.now();

		// 修正 我们标示变量的值
		isMove = false;
	});
	element.addEventListener('touchmove',function (e) {
		// 修改标示变量
		isMove = true;
	});
	element.addEventListener('touchend',function (e) {
		if (isMove == true) {
			// console.log('失效');
			return;
		}
		// 判断 延迟延迟的时间
		if ((Date.now()-startTime)>maxTime) {
			// console.log('太长了,都属于长按了');
			return;
		}

		// 如果能够到这里
		// console.log('成功');
		callBack(e);
	});
}