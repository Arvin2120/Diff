import { render, setInfo, Element } from './Element' 

let index = 0
let allPatchs = {}
function patch (node,patchs) {
  allPatchs = patchs
  walk(node)
}

function walk(node) {
  let currentPatch = allPatchs[index++]
  let childNodes = node.childNodes
  childNodes.forEach(child => walk(child))
  if (currentPatch) {
    doPatch(node, currentPatch)
  }
}

function doPatch(node, patchs) {
  patchs.forEach(patch => {
    patch2dom(node, patch)
  })
}

function patch2dom (node, patch) {
  switch (patch.type) {
    case 'ATTR':
      for (let key in patch.attr) {
        setInfo(node, key, patch.attr[key])
      }
      break
    case 'REMOVE':
      node.parentNode.removeChild(node)
      break
    case 'REPLACE':
      let newNode = patch.newNode instanceof Element ?
        render(patch.newNode) :
        document.createTextNode(patch.newNode)
      node.parentNode.replaceChild(newNode, node)
      break
    case 'TEXT':
      node.textContent = patch.text
      break
    default:
  }
}
export {
  patch
}