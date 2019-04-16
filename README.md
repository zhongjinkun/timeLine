# timeLine
竖向时间轴 兼容IE8 

代码如下

<link rel="stylesheet" href="timeLine.css">
<div class="myTime"></div>

<script src="jquery-1.11.1.min.js"></script>
<script src="timeLine.js"></script>
<script>
var data=[{content:['我是第一条','50140是打发第三方'],time:'2018-10-10'},{content:['1505150','50140是打发第三方'],time:'2018-10-10'},];
$('.myTime').timeLine(data)
</script>
