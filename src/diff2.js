// 第一个写的有问题，重新梳理了一下
import { isString } from './utils'
let patchs = {}
let globalIndex = 0
function diff (oldTree, newTree) {
  walk(oldTree, newTree, globalIndex)
  return patchs
}

function walk (oldTree, newTree, index) {
  let currentPatchs = []
  if (!newTree) {
    currentPatchs.push({
      type: "REMOVE",
      index
    })
  } else if (isString(oldTree)) {
    if (isString(newTree) && oldTree !== newTree) {
      currentPatchs.push({
        type: "TEXT",
        text: newTree
      })
    }
    if (!isString(newTree)) {
      currentPatchs.push({
        type: "REPLACE",
        newNode: newTree
      })
    }
  } else if (oldTree.name === newTree.name) {
    let patchAttrs = diffProps(oldTree.props, newTree.props)
    if (Object.keys(patchAttrs).length > 0) {
      currentPatchs.push({
        type: "ATTR",
        attr: patchAttrs
      })
    }
    diffChildren(oldTree.children, newTree.children)
    
  } else {
    currentPatchs.push({
      type: "REPLACE",
      newNode: newTree
    })
  }
  if (currentPatchs.length > 0) {
    patchs[index] = currentPatchs
  }
}
function diffProps (oldProps, newProps) {
  let patchProps = {}
  for (let key in oldProps) {
    if (oldProps[key] !== newProps[key]) {
      patchProps[key] = newProps[key]
    }
  }
  for (let key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      patchProps[key] = newProps[key]
    }
  }
  return patchProps
}
function diffChildren (oldChildrens, newChildrens) {
  oldChildrens.forEach((child, idx) => {
    walk(child, newChildrens[idx], ++globalIndex)
  })
}
export {
  diff
}