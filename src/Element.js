//创建虚拟dom 类
class Element {
    constructor(tagName, props, children) {
        this.tagName = tagName
        this.props = props
        this.children = children
    }

}
// 设置虚拟dom
function createElement(tagName, props, children) {
    return new Element(tagName,props,children)
}
// 渲染成真实节点
function render(eleInfo) {
    // 1、渲染
    let el = document.createElement(eleInfo.tagName)
    // 2、渲染完成后设置属性
    // 属性设置  深度优先遍历
    for (let key in eleInfo.props) {
        setInfo(el, key, eleInfo.props[key])
    }
    //设置完父节点后需要设置子节点
    eleInfo.children.forEach(child => {
        // 如果是真实节点 进行递归（让子节点也设置属性），如果不是真实节点创建成真实节点
        let childE = (child instanceof Element)?render(child):document.createTextNode(child)
        // 返回给父节点
        el.appendChild(childE)
    });
    return el
}
// 属性设置实现方法
function setInfo(node, attr, value) {
    switch (attr) {
        case 'value':
            if (node.tagName.toUpperCase() == 'INPUT' || node.tagName.toUpperCase() == 'TEXTAREA') {
                node.value = value
            } else {
                node.setAttribute(attr, value)
            }
            break;
        case 'style':
            node.style.cssText = value
            break;
        default:
            node.setAttribute(attr, value)
            break;
    }
}
module.exports = {
    createElement,
    render,
    setInfo,
    Element
}