function Model(value){
	console.log(2)
	this.value = typeof value === 'undefined' ? '' : value
	this._listeners = []
}

Model.prototype.set = function (value) {
	console.log(5)
	let self = this
	// self._value = value
	setTimeout(() => {
		self._listeners.forEach((listener) => {
			listener.call(self,value)
		})
	})
}
Model.prototype.watch = function (listener) {
	console.log(4)
	this._listeners.push(listener)
}
Model.prototype.bind = function (node) {
	console.log(3)
	this.watch((value) => {
		node.innerHTML = value
	})
}
function Controller(callback){
	console.log(1)
	let models = {}
	let views = Array.prototype.slice.call(document.querySelectorAll('[bind]'),0)
	views.forEach((view) => {
		let modelName = view.getAttribute('bind');
		(models[modelName] = models[modelName] || new Model()).bind(view)
	})
	callback.call(this, models)
}