const getVerticalText = (stringArr) => {
return [].map.call(stringArr, (item, i) => {
return '<span class="">' + item + '</span>';
});
}

class VerticalText {
constructor(selector) {
this.text = document.querySelector(selector);

this._render();
}

_render() {
const stringArr = this.text.textContent.split('');

this.text.innerHTML = getVerticalText(stringArr).join('');
}
}
