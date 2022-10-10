# Diff算法的作用是用来计算出 Virtual DOM 中被改变的部分，然后针对该部分进行原生DOM操作，而不用重新渲染整个页面。
## Diff算法有三大策略：
```
Tree Diff
Component Diff
Element Diff
```
## 比较策略
```
1、只是比较同一层次
2、如果层次发生变化，我们不能比较
3、如果只是调换位置顺序，我们只是修改key值，不去销毁重建
比较方法：深度优先遍历（就是先按照一个分支的深度依次下去比较，直到结束后再比较第二分支节点）
<div>
    <p>TextNode:Virtual DOM</p>
    <ul>
        <li></li>
        <li></li>
    </ul>
    <div></div>
</div>
看上面的结构：顺序是：p标签是1 TextNode:Virtual DOM是2  ul是3  第一个li是4 依次往后 
```