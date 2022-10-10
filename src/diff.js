import { isString } from './utils'
//1、比较两个虚拟节点的差异（这个差异就叫做pathches）补丁
//2、根据补丁来给对应的真实节点设置
let varIndex = 0
function diff(oldTree, newTree) {
    let index = 0;//节点的索引
    let pathches = {};//表示所有的补丁 （key:使用索引,value:使用对应的具体补丁）
    //设置补丁
    setPathches(oldTree, newTree, varIndex, pathches)
    return pathches

}
function setPathches(oldTree, newTree, index, pathches) {
    //设置一个数组记录当前节点pathches
    let currentPathches = [];
    // 同级节点比较时
    /**
     *       1、如果属性发生变化
     *       2、如果只是文字发生变化
     *       3、如果节点被删除
     *       4、如果节点被修改
     *  */
    //  1、如果属性发生变化
    if (oldTree.tagName == newTree.tagName) {
        // 设置
        let attrs = diffAttr(oldTree.props, newTree.props);
        if (Object.keys(attrs).length) {
            // 如果是属性设置属性
            currentPathches.push({ type: "ATTR", attrs })
        }

        //比较子节点
        diffChildren(oldTree.children, newTree.children, index, pathches);
        // 2、如果只是文字发生变化
    } else if (isString(oldTree) && isString(newTree)) {
        // 如果是值直接赋值
        currentPathches.push({ type: "TEXT", text:newTree })
        // 3、如果节点被删除
    }else if(!newTree){
        currentPathches.push({
            type: "REMOVE",
            index
          })
        // 4、如果节点被修改
    }else {
        currentPathches.push({
            type: "replace",
            newNode: newTree
          })
    }
    //  上面只是保存了补丁到节点，当前节点还需要保存下来
    if (currentPathches.length) {
        pathches[index] = currentPathches
    }

}
function diffAttr(oldAttr, newAttr) {
    let pathch = {};
    // 遍历判断
    for (const key in oldAttr) {
        // 如果属性不等的记录
        if (oldAttr[key] != newAttr[key]) {
            pathch[key] = newAttr[key]
        }
    }
    // 遍历判断 如果新的新增属性的情况
    for (const key in newAttr) {
        // 如果oldAttr没有对应的key 检测属性是否为对象的自有属性
        if (!oldAttr.hasOwnProperty(key)) {
            pathch[key] = newAttr[key]
        }
    }
    return pathch;
}

function diffChildren(oldChildrenAttr, newChildrenAttr, index, pathches) {
    if(oldChildrenAttr){
        oldChildrenAttr.forEach((child, index2) => {
            //设置所有不同的属性比较
            setPathches(child, newChildrenAttr[index2], ++varIndex, pathches)
        });
    }
    
}

export {
    diff
  }