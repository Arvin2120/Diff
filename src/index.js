const {
    createElement,
    render
} = require('./Element')
// const {diff}= require('./diff')
const {diff}= require('./diff2')
const {patch}= require('./patch')
//创建对应的虚拟dom
let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c']),
    createElement('li', {class: 'item'}, ['d']),
    createElement('input', {value: '12222'}, ['d'])
  ])
  
  let virtualDom2 = createElement('ul', {class: 'lists'}, [
    createElement('li', {class: 'item'}, [
      createElement('div', {class: 'item'}, ['o']),
    ]),
    createElement('li', {class: 'blue'}, ['v']),
    createElement('li', {class: 'item'}, ['9']),
    createElement('p', {}, ['pppppp'])
  ])
//渲染对应的虚拟dom为真实dom
let el = render(virtualDom);
console.log(el)
let diffNode = document.getElementById("diff")
diffNode.appendChild(el)
// diff算法
let pathches = diff(virtualDom,virtualDom2)
console.log('补丁包：', pathches)
// 开始打补丁 更新视图
patch(el, pathches)