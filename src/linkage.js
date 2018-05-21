class Linkage{
	constructor(selector, options){
		this.selector = selector;
		this.options = $.extend(true, {}, {
							// 类型，linkage：数据联动，date：年月日联动
							type: 'date'
							, defaultText: ['请选择', '请选择', '请选择']
							, linkageData: {}
							, linkageDataStart: '1'
							, btnClass: '.spice-btn'
							// , contentClass: ''
							, dataYear: [1910, 2018]
					}, options);
	}

	init(){
		let self = this
			, $selector = self.selector
			, options = self.options
			, linkageData = options.linkageData
			, linkageDataStart = options.linkageDataStart
			, type = options.type;

		// 如果是数据联动，先判断数据是否存在，不存在直接返回
		if(type == 'linkage' && (!options.linkageData || $.isEmptyObject(options.linkageData)) ) return self;

		let isDefault = self.isDefault = $('select', $selector).length > 0;

		if(isDefault){
			self.select = $('select', $selector);
		}else{

		}

		// 如果页面中没有找到元素，直接退出以下操作
		if(!self.select || self.select.length == 0) return self;

		$.each(self.select, (index, elem)=>{
			let $elem = $(elem)
				, curval = $elem.attr('data-spice-curval');

			// 设置默认参数，方便之后取值
			$elem
				.attr({'data-spice-index': index})
				.html(function(){
					if( type == 'linkage' ){
						return self._getOptionHtml(index, (index == 0 ? linkageData[linkageDataStart] : {}), curval);
					}else{
						return self._getOptionDatehtml(index, curval);
					}
				});

			// 绑定事件
			self._activate($elem);
		});

		if(isDefault){
			self.select.eq(0).trigger('change.spice.linkage', ['default']);
		}else{

		}
        return self;
	}

	_getOptionHtml(index, dataObj, curval){
		let self = this
			, options = self.options
			, defaultText = options.defaultText
			, optionsTemp = '';

		if( self.isDefault ){
			optionsTemp = defaultText ? '<option value="">' + (defaultText[index] || '') + '</option>' : '';
			$.each(dataObj, (i, o)=>{
				optionsTemp += '<option value="' + i + '" ' + ((i == curval || o == curval) ? 'selected' : '') + ' >' + o + '</option>';
			});
		}else{

		}
		return optionsTemp;
	}

	_activate($elem){
		let self = this;
		self[self.isDefault ? '_defaultSelect' : '_simulationSelect']($elem);
	}

	_defaultSelect($elem){
		let self = this
			, $selector = self.selector
			, options = self.options;

		$elem
			.on('change.spice.linkage', function(ev, whe){
				let $self = $(this)
					, $btn = $self.prev(options.btnClass)
					, index = +$self.attr('data-spice-index')
                    , val = $('option:selected', $self).attr('value')
                    , text = $('option:selected', $self).text();

                // 删除默认选中的值，防止影响之后的选择
                $self.removeAttr('data-spice-curval');

                // 如果选择框为半模拟的，则动态赋值
                if($btn.length != 0){
                	$btn.html( text );
                }

                let pcdObj = self.getLinkAgeObj(val);

                // 当前select change完成后，需要刷新相邻的select的数据
                let $nextSelect = $('[data-spice-index='+(++index)+']', $selector)
                    , curval = $nextSelect.attr('data-spice-curval');

                if($nextSelect.length == 0){
                    $selector.trigger('spice.linkage.change', {value: self.getSelectVal()});
                    return false;
                }
                if( options.type == 'linkage' ){
                	$nextSelect
                        .removeAttr('data-spice-curval')
                        .html( self._getOptionHtml(index, pcdObj, curval) )
                        .trigger('change.spice.linkage', [whe]);
                }else{
                	$nextSelect
                        .removeAttr('data-spice-curval')
                        .html( self._getOptionDatehtml(index, curval) )
                        .trigger('change.spice.linkage', [whe]);
                }

			});
	}

	_simulationSelect($elem){

	}

    _getDateOptionStr(text, curval, b){
    	let self = this
    		, isDefault = self.isDefault;

    	if( isDefault ){
    		return b 
    				? 
    				(text ? '<option value="">' + text + '</option>' : '')	
    				:
    				'<option value="' + text + '" ' + (curval == text ? 'selected' : '') + '>' + text + '</option>';
    	}else{

    	}
    }

    _getLeapYear(year){
    	if (year % 100 == 0) {
            if (year % 400 == 0) {
                return true;
            }
        } else {
            if ((year % 4) == 0) {
                return true;
            }
        }
        return false;
    }

	_getOptionDatehtml(index, curval){
		let self = this
			, options = self.options
			, defaultText = options.defaultText
			, dataYear = options.dataYear
			, selectVal = self.isDefault ? self.getSelectVal() : []
			, year = +selectVal[0]
            , month = +selectVal[1]
			, optionsTemp = '';

		optionsTemp = self._getDateOptionStr(defaultText[index] || '', curval, true);

		if( index === 0 && $.isArray(dataYear) && dataYear.length == 2){
			let yearStart = dataYear[0]
                , yearEnd = dataYear[1]
                , curYear = yearEnd + 1;

            if( yearStart <= yearEnd ){
                while( curYear-- > yearStart ){
                    optionsTemp += self._getDateOptionStr(curYear, curval);
                }
            }
		}else if(index === 1){
            if( year ){
                let monthStart = 0;
                while( ++monthStart <= 12 ){
                    optionsTemp += self._getDateOptionStr(monthStart, curval);
                }
            }
        }else if(index === 2){
            let day = 0
                , maxDay = 0;

            if(year && month){
                if( month == 2 ){
                    if (self._getLeapYear(year) ) { 
                        maxDay = 29; 
                    }else{
                        maxDay = 28;
                    }
                }else if( $.inArray(month, [1, 3, 5, 7, 8, 10, 12]) != -1 ){
                    maxDay = 31;
                }else{
                    maxDay = 30;
                }
                while( ++day <= maxDay ){
                    optionsTemp += self._getDateOptionStr(day, curval);
                }
            }
        }

		return optionsTemp;
	}

	getLinkAgeObj(val){
		let self = this
			, options = self.options
			, linkageData = options.linkageData;

		return val && !$.isEmptyObject(linkageData[val]) ? linkageData[val] : {};
	}

    getSelectVal(){
        let self = this
            , options = self.options
            , $selector = self.selector;

        return $.map($('select', $selector), function(n){
            let $self = $('option:selected', n);
            return $self.attr('value') + ( options.type == 'linkage' ? '-' + $self.text() : '' );
        });
    }

    setSelectVal(val){
        if(!$.isArray(val) || val.length == 0) return false;

        let self = this
            , $select = self.select;
        $select.attr('data-spice-curval', function(){
            return val[$(this).attr('data-spice-index')];
        });

        $('option', $select.eq(0)).removeAttr('selected');

        let $option = $('option:contains('+val[0]+')', $select.eq(0));
        if($option.length === 0){
            $option = $('option[value='+val[0]+']', $select.eq(0));
        }
        $option.attr('selected', 'selected');
        $select.eq(0).trigger('change.spice.linkage', ['default']);
    }

}

$.spice = $.spice || {};

$.spice.Linkage = (selector, options) => {
	if( !(selector && !$.isPlainObject(selector)) ) return false;

	let rtn = {}
	$(selector).each((index, self)=>{
		let $self = $(self)
			, data = $self.data('spice.linkage');
		if (!data) $self.data('spice.linkage', (data = new Linkage($self, options).init()));
		rtn[index] = data;
	})

	if( $(selector).length == 1 ){
        rtn = rtn[0];
    }
    return rtn;
}

module.exports = $.spice.Linkage