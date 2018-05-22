(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Linkage = function () {
    function Linkage(selector, options) {
        _classCallCheck(this, Linkage);

        this.selector = selector;
        this.options = $.extend(true, {}, {
            // 类型，linkage：数据联动，date：年月日联动
            type: 'date',
            defaultText: ['请选择', '请选择', '请选择'],
            linkageData: {},
            linkageDataStart: '1',
            btnClass: '.spice-btn'
            // , contentClass: ''
            , dataYear: [1910, 2018]
        }, options);
    }

    _createClass(Linkage, [{
        key: 'init',
        value: function init() {
            var self = this,
                $selector = self.selector,
                options = self.options,
                linkageData = options.linkageData,
                linkageDataStart = options.linkageDataStart,
                type = options.type;

            // 如果是数据联动，先判断数据是否存在，不存在直接返回
            if (type == 'linkage' && (!options.linkageData || $.isEmptyObject(options.linkageData))) return self;

            var isDefault = self.isDefault = $('select', $selector).length > 0;

            if (isDefault) {
                self.select = $('select', $selector);
            } else {}

            // 如果页面中没有找到元素，直接退出以下操作
            if (!self.select || self.select.length == 0) return self;

            $.each(self.select, function (index, elem) {
                var $elem = $(elem),
                    curval = $elem.attr('data-spice-curval');

                // 设置默认参数，方便之后取值
                $elem.attr({ 'data-spice-index': index }).html(function () {
                    if (type == 'linkage') {
                        return self._getOptionHtml(index, index == 0 ? linkageData[linkageDataStart] : {}, curval);
                    } else {
                        return self._getOptionDatehtml(index, curval);
                    }
                });

                // 绑定事件
                self._activate($elem);
            });

            if (isDefault) {
                self.select.eq(0).trigger('change.spice.linkage', ['default']);
            } else {}
            return self;
        }
    }, {
        key: '_getOptionHtml',
        value: function _getOptionHtml(index, dataObj, curval) {
            var self = this,
                options = self.options,
                defaultText = options.defaultText,
                optionsTemp = '';

            if (self.isDefault) {
                optionsTemp = defaultText ? '<option value="">' + (defaultText[index] || '') + '</option>' : '';
                $.each(dataObj, function (i, o) {
                    optionsTemp += '<option value="' + i + '" ' + (i == curval || o == curval ? 'selected' : '') + ' >' + o + '</option>';
                });
            } else {}
            return optionsTemp;
        }
    }, {
        key: '_activate',
        value: function _activate($elem) {
            var self = this;
            self[self.isDefault ? '_defaultSelect' : '_simulationSelect']($elem);
        }
    }, {
        key: '_defaultSelect',
        value: function _defaultSelect($elem) {
            var self = this,
                $selector = self.selector,
                options = self.options;

            $elem.on('change.spice.linkage', function (ev, whe) {
                var $self = $(this),
                    $btn = $self.prev(options.btnClass),
                    index = +$self.attr('data-spice-index'),
                    val = $('option:selected', $self).attr('value'),
                    text = $('option:selected', $self).text();

                // 删除默认选中的值，防止影响之后的选择
                $self.removeAttr('data-spice-curval');

                // 如果选择框为半模拟的，则动态赋值
                if ($btn.length != 0) {
                    $btn.html(text);
                }

                var pcdObj = self.getLinkAgeObj(val);

                // 当前select change完成后，需要刷新相邻的select的数据
                var $nextSelect = $('[data-spice-index=' + ++index + ']', $selector),
                    curval = $nextSelect.attr('data-spice-curval');

                if ($nextSelect.length == 0) {
                    $selector.trigger('spice.linkage.change', { value: self.getSelectVal() });
                    return false;
                }
                if (options.type == 'linkage') {
                    $nextSelect.removeAttr('data-spice-curval').html(self._getOptionHtml(index, pcdObj, curval)).trigger('change.spice.linkage', [whe]);
                } else {
                    $nextSelect.removeAttr('data-spice-curval').html(self._getOptionDatehtml(index, curval)).trigger('change.spice.linkage', [whe]);
                }
            });
        }
    }, {
        key: '_simulationSelect',
        value: function _simulationSelect($elem) {}
    }, {
        key: '_getDateOptionStr',
        value: function _getDateOptionStr(text, curval, b) {
            var self = this,
                isDefault = self.isDefault;

            if (isDefault) {
                return b ? text ? '<option value="">' + text + '</option>' : '' : '<option value="' + text + '" ' + (curval == text ? 'selected' : '') + '>' + text + '</option>';
            } else {}
        }
    }, {
        key: '_getLeapYear',
        value: function _getLeapYear(year) {
            if (year % 100 == 0) {
                if (year % 400 == 0) {
                    return true;
                }
            } else {
                if (year % 4 == 0) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: '_getOptionDatehtml',
        value: function _getOptionDatehtml(index, curval) {
            var self = this,
                options = self.options,
                defaultText = options.defaultText,
                dataYear = options.dataYear,
                selectVal = self.isDefault ? self.getSelectVal() : [],
                year = +selectVal[0],
                month = +selectVal[1],
                optionsTemp = '';

            optionsTemp = self._getDateOptionStr(defaultText[index] || '', curval, true);

            if (index === 0 && $.isArray(dataYear) && dataYear.length == 2) {
                var yearStart = dataYear[0],
                    yearEnd = dataYear[1],
                    curYear = yearEnd + 1;

                if (yearStart <= yearEnd) {
                    while (curYear-- > yearStart) {
                        optionsTemp += self._getDateOptionStr(curYear, curval);
                    }
                }
            } else if (index === 1) {
                if (year) {
                    var monthStart = 0;
                    while (++monthStart <= 12) {
                        optionsTemp += self._getDateOptionStr(monthStart, curval);
                    }
                }
            } else if (index === 2) {
                var day = 0,
                    maxDay = 0;

                if (year && month) {
                    if (month == 2) {
                        if (self._getLeapYear(year)) {
                            maxDay = 29;
                        } else {
                            maxDay = 28;
                        }
                    } else if ($.inArray(month, [1, 3, 5, 7, 8, 10, 12]) != -1) {
                        maxDay = 31;
                    } else {
                        maxDay = 30;
                    }
                    while (++day <= maxDay) {
                        optionsTemp += self._getDateOptionStr(day, curval);
                    }
                }
            }

            return optionsTemp;
        }
    }, {
        key: 'getLinkAgeObj',
        value: function getLinkAgeObj(val) {
            var self = this,
                options = self.options,
                linkageData = options.linkageData;

            return val && !$.isEmptyObject(linkageData[val]) ? linkageData[val] : {};
        }
    }, {
        key: 'getSelectVal',
        value: function getSelectVal() {
            var self = this,
                options = self.options,
                $selector = self.selector;

            return $.map($('select', $selector), function (n) {
                var $self = $('option:selected', n);
                return $self.attr('value') + (options.type == 'linkage' ? '-' + $self.text() : '');
            });
        }
    }, {
        key: 'setSelectVal',
        value: function setSelectVal(val) {
            if (!$.isArray(val) || val.length == 0) return false;

            var self = this,
                $select = self.select;
            $select.attr('data-spice-curval', function () {
                return val[$(this).attr('data-spice-index')];
            });

            $('option', $select.eq(0)).removeAttr('selected');

            var $option = $('option:contains(' + val[0] + ')', $select.eq(0));
            if ($option.length === 0) {
                $option = $('option[value=' + val[0] + ']', $select.eq(0));
            }
            $option.attr('selected', 'selected');
            $select.eq(0).trigger('change.spice.linkage', ['default']);
        }
    }]);

    return Linkage;
}();

$.spice = $.spice || {};

$.spice.Linkage = function (selector, options) {
    if (!(selector && !$.isPlainObject(selector))) return false;

    var rtn = {};
    $(selector).each(function (index, self) {
        var $self = $(self),
            data = $self.data('spice.linkage');
        if (!data) $self.data('spice.linkage', data = new Linkage($self, options).init());
        rtn[index] = data;
    });

    if ($(selector).length == 1) {
        rtn = rtn[0];
    }
    return rtn;
};

module.exports = $.spice.Linkage;

/***/ })
/******/ ]);
});