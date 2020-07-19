class Vue extends EventTarget{
	constructor(options) {
    super();
  	this.options = options;
    this._data = this.options.data;
    this.el = document.getElementById(this.options.el);
    this.render(this.el);
    this.observe(this._data);
  }
  
  observe(data) {
    const _this = this
  	this._data = new Proxy(data, {
    	set: (target, name, value) => {
      	// 定义自定义事件，传递数据更新后的值
      	const event = new CustomEvent(name, {
    			detail: value,
    		});
    		// 发布事件
    		_this.dispatchEvent(event);
    		return Reflect.set(...arguments);
    	}
    })
  }
  
  render(el) {
  	let childs = el.childNodes;
    [...childs].forEach(node => {
      // 文本节点
    	if (node.nodeType === 3) {
      	const text = node.textContent;
        const reg = /\{\{\s*([^\s\{\}]+)\s*\}\}/g;
        // 匹配 {{ name }}
        if (reg.test(text)) {
        	const $1 = RegExp.$1;
          if (this._data[$1]) {
            node.textContent = text.replace(reg, this._data[$1])
            // 监听自定义事件
            this.addEventListener($1, e => {
              node.textContent = text.replace(reg, e.detail)
            })
          } 
        }	
      } else if(node.nodeType === 1) {
        // dom 节点
        const attrs = node.attributes;
        if (attrs.hasOwnProperty('v-model')) {
        	const key =	attrs['v-model'].nodeValue;
          node.value = this._data[key];
          // 监听输入框输入，更新数据
          node.addEventListener('input', e => {
          	this._data[key] = node.value
          })
        }
      	this.render(node);
      }
    })
  }
}