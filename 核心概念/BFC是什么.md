1、BFC是一个独立的布局环境，BFC内部的元素布局与外部互不影响；
2、可以通过一些条件触发BFC，从而实现布局上的需求或解决一些问题；
3、可以将BFC想象成一个工具，无需探究其定义，只要着重理解其功能（特性）即可。

二、BFC有什么用？
BFC的触发条件
1、根元素（<html>）
2、float值非none
3、overflow值非visible
4、display值为inline-block、table-cell、table-caption、flex、inline-flex
5、position值为absolute、fixed

BFC的特性
1、属于同一个BFC的两个相邻容器的上下margin会重叠（重点）
2、计算BFC高度时浮动元素也参于计算（重点）
3、BFC的区域不会与浮动容器发生重叠（重点）
4、BFC内的容器在垂直方向依次排列
5、元素的margin-left与其包含块的border-left相接触
6、BFC是独立容器，容器内部元素不会影响容器外部元素

注：其中1、2、3需重点理解，其特性和功能下面将用代码逐个演示；
  4、5、6为基本现象，按字面意思理解即可，不做重点说明。