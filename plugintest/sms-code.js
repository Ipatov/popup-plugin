(function() {
    this.Code = function(elem) {
        // попап, элемент dom 
        this.popup_block = null;
        // получение и запись в свойство popup_block - попап
        if(typeof elem != 'undefined' && elem !== null && elem.length != 0) {
            this.popup_block = elem;
        }else{
            throw "При инициализации не задан селектор"; 
        }
        
        // добавление событий
        addEventsPopup(this,elem);

        // добавление событий с клавиатуры
        addEventsKeyboardPopup(this,elem);
        $('.sms-inps .sms-inp-blk').each(function(index, el) {
            if (!$(this).find('input').hasClass('sms-inp')) {
             $(this).find('input').addClass('sms-inp');
            }
        })
    }

    // получение элемента dom-дерева по селектору
    // toDo сделать по-человечески для всех селекторов или подключить jQuery
    function getElementBySelector(popupSelector) {
        var realSelector = popupSelector;
        return realSelector;
    }

    // создание событий попапа
    function addEventsPopup(this_popup,elem){
        var _ = this_popup;
        elem.focus(function(event) {
            $(this).parent().addClass('sms-focus');
        });

        elem.blur(function(event) {
            $(this).parent().removeClass('sms-focus');
        });

        if (typeof $('.sms-inp') != 'undefined' && $('.sms-inp').length != 0) {
            $('.sms-inp').val().match(/[^0-9]/g);
        }
    }

    // создание событий по нажатию на клавиатуре
    function addEventsKeyboardPopup(this_popup,elem){
        elem.on('input', function(e){
            
            $(this).val(e.originalEvent.data);
            var $length = $(this).val().length;
            if ($length != 0) {
                $(this).parent().next().find('.sms-inp').focus();
                setTimeout(e=>{
                    $(this).blur();
                },10)
            } else {
                $(this).parent().prev().find('.sms-inp').focus();
                setTimeout(e=>{
                    $(this).blur();
                },10)
            }
        });
        document.addEventListener("paste", function(e) {
            var data = e.clipboardData.getData('Text');
            data = data.split('');
            $('.sms-inps .sms-inp-blk').each(function(index, el) {
                $(this).find('.sms-inp').val(data[index]);
            });
            e.preventDefault();
        });
    }   
}());