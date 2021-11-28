(function() {

    this.Popup = function() {
        // объект для параметров
        this.options = null;
        // попап, элемент dom 
        this.popup_block = null;
        // оверлей, элемент dom 
        this.popup_overlay = null;
        
        // Дефолтные значения параметров
        var defaults = {
            // селектор попапа
            popupSelector: null,
            // включать оверлей
            overlay: false, 
            // селектор попапа
            overlaySelector: null,
            // скорость анимации открытия
            animateShowSpeed: 300, 
            // анимация появления
            animateShow: "fadeIn", 
            // скорость анимации закрытия
            animateCloseSpeed: 300,
            // анимация закрытия
            animateClose: "fadeOut", 
            // обработка клавиш
            keyboard: {
                "ESC_close": true 
            },
        }
        
        // если есть пользовательские параметры, то добавляются в объект параметров
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = mergeDefaults(defaults, arguments[0]);
        } else {
            this.options = defaults;
        }

        // получение и запись в свойство popup_block - попап
        if(this.options.popupSelector !== null) {
            this.popup_block = getElementBySelector(this.options.popupSelector);
        }else{
            throw "При инициализации не задан popupSelector"; 
        }

        // получение и запись в свойство popup_overlay - оверлей
        if(this.options.overlay) {
            if(this.options.overlaySelector !== null){
                this.popup_overlay = getElementBySelector(this.options.overlaySelector);
            }else{
                throw "При инициализации не задан overlaySelector"; 
            }
        }

        // добавление событий
        addEventsPopup(this);

        // добавление событий с клавиатуры
        if(this.options.keyboard) {
            addEventsKeyboardPopup(this);
        }
    }

    // получение элемента dom-дерева по селектору
    // toDo сделать по-человечески для всех селекторов или подключить jQuery
    function getElementBySelector(popupSelector) {
        var firstChar = popupSelector.charAt(0);
        var realSelector = popupSelector.substr(1);
        var dom_el = false;
        switch(firstChar){
            case "#":
                dom_el  = document.getElementById(realSelector);
                break;
            case ".":
                var dom_el_array  = document.getElementsByClassName(realSelector);
                dom_el = dom_el_array[0];
                break;
            default:
                throw "Неизвестный селектор: " + popupSelector;
        }
        return dom_el;
    }

    // мерж дефолтных и пользовательских параметров
    function mergeDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    // создание событий попапа
    function addEventsPopup(this_popup){
        var _ = this_popup;
        // клик по оверлею
        if (_.options.overlay) {
            _.popup_overlay.addEventListener('click', _.close.bind(_));
        }
    }

    // создание событий по нажатию на клавиатуре
    function addEventsKeyboardPopup(this_popup){
        var _ = this_popup;
        var keyboard_key = _.options.keyboard;
        document.addEventListener("keydown", function(event){
            // если есть обработка ESC для закрытия попапа
            if (keyboard_key.ESC_close) {
                var ESC_btn_code = 27;
                if (event.keyCode == ESC_btn_code) {
                    _.close(_);
                }
            }
        });
    }

    // метод открытия попапа
    Popup.prototype.open = function() {
        this.popup_block.style.display = "block"
        // если есть оверлей
        if(this.options.overlay){
            this.popup_overlay.style.display = "block"
        }
    }

    // метод закрытия попапа
    Popup.prototype.close = function() {
        this.popup_block.style.display = "none" 
        // если есть оверлей
        if(this.options.overlay){
            this.popup_overlay.style.display = "none"
        }
    }
    

}());