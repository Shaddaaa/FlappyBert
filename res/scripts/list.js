class List {
	constructor(arr = [])  {
		this.arr = arr;
	}
	push(element) {
		this.arr.push(element);
	}
	remove(i) {
		let buffer = this.arr[i];
		let arrNew = [];
		for (let j = 0; j < this.arr.length; j++) {
			if (!j==i) {
				arrNew.push(this.arr[j]);
			}
		}
		this.arr = arrNew;
		return buffer;
	}
	get(i) {
		return this.arr[i];
	}
	get length() {
		return this.arr.length;
	}
}