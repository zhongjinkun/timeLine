(function($) {
    var zp = {
        init: function(obj, pageinit) {
            return (function() {
                zp.addhtml(obj, pageinit);
                zp.bindEvent(obj);
                zp.waterfall(obj);
            }());
        },
        contentFn: function(data) {
            var oHtml = '';
            for (var i in data) {
                oHtml += '<p><i>'+(parseInt(i)+1)+'.</i><span>' + data[i] + '</span></p>';
            }
            return oHtml
        },
        addhtml: function(obj, pageinit) {
            obj.empty();
            if (pageinit.length > 0) {
                var oHtml = '';
                for (var i in pageinit) {
                    oHtml += '<li class="develop-content-li">\
                <div class="develop-info">\
                    ' + this.contentFn(pageinit[i].content) + '\
                </div>\
                <div class="develop-date">\
                    <span class="list"></span>\
                    <span class="line"></span>\
                    <span class="date"><i>'+pageinit[i].time+'</i></span>\
                </div>\
            </li>'
                }
                var wrap = '<div class="develop-box">\
        <div class="develop-center">\
            <div class="line-top">\
            </div>\
            <div class="line-center">\
            </div>\
            <div class="line-foot">\
            </div>\
        </div>\
        <ul class="develop-content">\
        ' + oHtml + '\
   </ul>\
</div>'
                obj.append(wrap)
            }
        },
        bindEvent: function(obj) {
            obj.find('.develop-info').each(function(i, dom) {
                $(dom).hover(function() {
                    $('.develop-info').removeClass('islive')
                    $(dom).addClass('islive')
                    var oLine = $('.islive').offset().top + $('.islive').height() - 100;
                    var newHeight = oLine;
                    $('.line-center').height(newHeight);
                }, function() {

                })
            })
        },
        waterfall: function(obj, num) {
            var hArray = [];
            var num = num || 2;
            var dom = obj.find('.develop-content-li');
            var domLength = dom.length - 1;
            dom.eq(1).css({ 'margin-top': '100px' });
            dom.each(function(i, value) {
                if (i < num) {
                    hArray[i] = $(value).outerHeight(true);
                } else {
                    var oMin = Math.min.apply(null, hArray);
                    var oIndex = $.inArray(oMin, hArray);
                    var oLeft = dom.eq(oIndex).offset().left - dom.eq(0).offset().left;

                    $(value).css({
                        'position': 'absolute',
                        'left': oLeft + 'px',
                        'top': oMin + 50 + 'px'
                    })
                    var oldNum = hArray[oIndex];
                    hArray[oIndex] += dom.eq(i).outerHeight(true);
                    //确保日期不重合显示
                    var oNewMin = Math.min.apply(null, hArray);
                    var oNewIndex = $.inArray(oNewMin, hArray);
                    if (oNewMin - oldNum < 50) {
                        hArray[oNewIndex] = oNewMin + 80;
                    }

                }
                console.log(dom.eq(i).offset().left)
                if (dom.eq(i).offset().left > 600) { dom.eq(i).addClass('develop-right') }
            })

            $('.develop-content').height(dom.eq(domLength).height() + dom.eq(domLength).offset().top);
        }

    }
    $.fn.timeLine = function(options) {
        zp.init(this, options);
    }

})(jQuery);