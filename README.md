# 更多插件
[SpiceUI网站](http://www.spiceui.com/)

## spiceui-linkage
联动插件，可实现省市区联动，年月日联动
省市区联动不限制级数，数据支持，插件就支持

#### 如何使用联动插件效果  
结构定义

    <div class="e-spice-select">
        <select>
            <option value="">请选择</option>
        </select>
        <select>
            <option value="">请选择</option>
        </select>
        <select>
            <option value="">请选择</option>
        </select>
    </div>

将插件引入页面，执行以下代码：

    $.spice.Linkage('.e-spice-select');

之后页面就可以看到效果了，默认是年月日切换。

#### 联动插件效果参数 
定义联动效果时，可以通过传递参数来实现多种不同的效果，如

    $.spice.Linkage('.e-spice-select', {
        //write your options here
    });

Option的参数说明如下： 

* type：联动类型，支持`linkage`、`date`，`linkage`是数据联动，需要传可联动的数据，`date`是年月日联动
* defaultText：默认文字，默认值`['请选择', '请选择', '请选择']`
* linkageData：联动数据
* linkageDataStart：联动开始节点的`key`
* btnClass：点击按钮选择器，默认`'.spice-btn'`
* dataYear：年份开始结束时间，默认`[1900, 2016]`

linkageData参数说明，数据结构如下：

{
    "1": {
        "11": "北京",
        "12": "上海"
    },
    "11": {
        "111": "北京市"
    },
    "12": {
        "121": "上海市"
    },
    "111": {
        "1111": "平谷区",
        "1112": "怀柔区",
        "1113": "顺义区",
        "1114": "通州区",
        "1115": "大兴区",
        "1116": "昌平区",
        "1117": "西城区",
        "1118": "崇文区",
        "1119": "东城区",
        "11111": "房山区",
        "11112": "延庆县",
        "11113": "海淀区",
        "11114": "密云县",
        "11115": "门头沟区",
        "11116": "丰台区",
        "11117": "石景山区",
        "11118": "宣武区",
        "11119": "朝阳区"
    },
    "121": {
        "1211": "奉贤区",
        "1212": "川沙区",
        "1213": "南汇区",
        "1214": "青浦区",
        "1215": "松江区",
        "1216": "金山区",
        "1217": "浦东新区",
        "1218": "嘉定区",
        "1219": "宝山区",
        "12110": "闵行区",
        "12111": "闸北区",
        "12112": "虹口区",
        "12113": "其它区",
        "12114": "杨浦区",
        "12115": "崇明县",
        "12116": "徐汇区",
        "12117": "长宁区",
        "12118": "静安区",
        "12119": "普陀区",
        "12120": "黄浦区",
        "12121": "卢湾区"
    }
}  

#### 联动效果方法
有特殊需求时，可根据常用方法自定义联动效果

    var linkage = $.spice.Linkage('.e-spice-select');
    linkage.fn();

常用方法如下：

* getSelectVal()：获取当前元素选中的值
* setSelectVal()：设置默认值，如：`.setSelectVal(['湖南省', '益阳市', '南县'])`，值可以是id也可以是文字

#### 联动效果事件

    var linkage = $.spice.Linkage('.e-spice-select');
    linkage.selector.on('eventsName', function(){

    });

常用事件如下：

* spice.linkage.change：选择完成时触发
