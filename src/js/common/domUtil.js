const type = require('./type');
const util = require('./util');

// 엘리먼트 타입
const ELEMENT_NODE = Node.ELEMENT_NODE;

/**
* 돔조작 객체
*/
const domUtil = {

    /**
     * querySelector 래퍼 함수.
     */
    sel(selector = '', el = document){
        return el.querySelector(selector);
    },
    /**
     * querySelectorAll 래퍼 함수
     */
    sels(selector = '', el = document){
        return el.querySelectorAll(selector);
    },
    /**
     * 새로운 엘리먼트를 생성한다.
     */
    el(tagName = '', prop = {}){

        const el = document.createElement(tagName);

        this.prop(el, prop);

        return el;
    },
    /**
     * 전달받은 엘리먼트에 어트리뷰트를 할당한다.
     */
    attr(target = null, attr = null, val = null){

        let ret = null;

        if (type.isPlainObject(attr)){

            util.map(attr, (v, k) => { _attr.apply(this, [target, k, v]); });

            ret = target;
        }
        else if (type.isString(attr) && type.isNull(val)){

            if (this._isStyleMarked(attr)) ret = target.style[attr.substr(1)];
            else ret = target.getAttribute(attr);
        }
        else if (type.isString(attr)){
            ret = _attr.apply(this, [target, attr, val]);
        }

        return ret;

        /**
         *
         * 어튜리브트를 설정한다.
         *
         * @param target
         * @param k
         * @param v
         * @private
         */
        function _attr(target, k, v){

            if (this._isStyleMarked(k)) target.style[k.substr(1)] = v;
            else target.setAttribute(k, v);

            return target;
        }
    },
    /**
     * 전달받은 엘리먼트에 프로퍼티를 할당한다.
     */
    prop(target = null, prop = null, val = null){

        let ret = null;

        if (type.isPlainObject(prop)){

            util.map(prop, (v, k) => { _prop.apply(this, [target, k, v]); });

            ret = target;
        }
        else if (type.isString(prop) && type.isNull(val)){

            if (this._isStyleMarked(prop)){
                // 계산되어 정의된 스타일 정보를 가져온다.
                ret = window.getComputedStyle(target).getPropertyValue(prop.substr(1));
            }
            else{
                ret = target[prop];
            }
        }
        else if (type.isString(prop)){
            ret = _prop.apply(this, [target, prop, val]);
        }


        return ret;

        /**
         *
         * 프로퍼티를 설정한다.
         *
         * @param target
         * @param k
         * @param v
         * @private
         */
        function _prop(target, k, v){

            if (this._isStyleMarked(k)){
                target.style[k.substr(1)] = v;
            }
            else{

                // 엘리먼트 속성이 함수인 경우, 네이티브 속성을 원형 그대로 사용한다.(꼭 이벤트만이 아니다)
                if (type.isFunction(target[k])) target[k](...(type.isArray(v) ? v : [v]));
                else target[k] = v;
            }

            return target;
        }
    },
    /**
     * 전달받은 부모 엘리먼트의 마지막 자식으로 새로운 엘리먼트를 추가한다.
     */
    append(parent = null, el = []){

        el = type.isArray(el) ? el : [el];

        el.forEach(v => { parent.appendChild(v); });

        return this;
    },
    /**
     * 전달받은 부모 엘리먼트의 첫번째 자식으로 새로운 엘리먼트를 추가한다.
     */
    prepend(parent = null, el = []){

        el = type.isArray(el) ? el : [el];

        // 전달받은 배열 요소를 리버스시킨후, 할당시킨다(사용자에게 전달받은 요소 순서를 그대로 할당시키기위함이다)
        el.reverse().forEach(v => {
            parent.insertBefore(v, parent.firstChild);
        });

        return this;
    },
    /**
     * target 엘리먼트의 이전 형제로 새로운 엘리먼트를 추가한다.
     */
    before(target = null, el = []){

        el = type.isArray(el) ? el : [el];

        el.reverse().forEach(v => { target.parentNode.insertBefore(v, target); });

        return this;
    },
    /**
     * target 엘리먼트의 다음 형제로 새로운 엘리먼트를 추가한다.
     */
    after(target = null, el = []){

        el = type.isArray(el) ? el : [el];

        // 전달받은 target 엘리먼트의, 다음 형제 엘리먼트를 반환한다.
        const next = this.next(target);

        // 반환된 형제 엘리먼트가 있을 경우
        el = next ? el.reverse() : el;

        el.forEach(v => {

            // 다음 형제 엘리먼트가 있을 경우, 해당 형제 엘리먼트 이전 위치(target 엘리먼트 다음 위치)에 새로운 엘리먼트를 할당한다.
            if (next) target.parentNode.insertBefore(v, next);
            else target.parentNode.appendChild(v);
        });

        return this;
    },
    /**
     * 전달받은 엘리먼트를 삭제한다.
     */
    remove(target = null, selector = ''){

        if (selector){

            let elems = this.sels(selector, target);
            elems = this._nodeListToArray(elems);

            elems.forEach(v => {

                const parents = this.parent(v);

                if (parents.length) parents[0].removeChild(v);
            });
        }
        else{

            const parents = this.parent(target);
            if (parents.length) parents[0].removeChild(target);
        }

        return this;
    },
    /**
     * 전달받은 엘리먼트의 절대 좌표를 반환한다.
     */
    offset(target = null){

        // getBoundingClientRect 메서드를 통해, 가져오는 좌표값의 기준은 부모 엘리먼트가 아닌, 절대 좌표가된다.
        return target.getBoundingClientRect();
    },
    /**
     * 전달받은 엘리먼트의 (부모 엘리먼트를 기준으로한)상대 좌표를 반환한다.
     */
    position(target = null){

        let left = 0;
        let top = 0;

        let x = 0;
        let y = 0;

        const parentNode = target.parentNode;

        // 부모 엘리먼트의 position 값이, `static` 이 아닌경우(absolute, relative, fixed 등), 자식 엘리먼트의 좌표는 그 부모 엘리먼트를 기준으로 정해지게된다.
        // 즉 자식 엘리먼트의 offsetTop, offsetLeft 값은 부모 엘리먼트의 상대적 위치를 기준으로 반환된다.

        // 즉 this.offset(target).top - this.offset(parentNode).top <-- 이 공식과 같다.
        if (parentNode === target.offsetParent){
            x = left = target.offsetLeft;
            y = top = target.offsetTop;
        }
        else{

            let targetLeft = this.offset(target).left;
            let parentLeft = this.offset(parentNode).left;

            let targetTop = this.offset(target).top;
            let parentTop = this.offset(parentNode).top;

            if (targetLeft > parentLeft){
                x = left = this.offset(target).left - this.offset(parentNode).left;
            }

            if (targetTop > parentTop){
                y = top = this.offset(target).top - this.offset(parentNode).top;
            }
        }

        const width = this.outerWidth(target);
        const height = this.outerHeight(target);

        const right = left + width;
        const bottom = top + height;

        return {
            x,
            y,
            right,
            bottom,
            width,
            height,
            top,
            left
        };
    },
    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(padding, border, margin 사이즈가 제외된 값)
     */
    width(target = null){

        const width = parseFloat(this.prop(target, '@width')) || 0;
        const padding = parseFloat(this.prop(target, '@padding-left')) * 2;
        const border = parseFloat(this.prop(target, '@border-width')) * 2;

        return width - (padding + border);
    },
    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(padding, margin 사이즈가 제외된 값)
     */
    innerWidth(target = null){

        const width = parseFloat(this.prop(target, '@width')) || 0;
        const border = parseFloat(this.prop(target, '@border-width')) * 2;

        return width - border;
    },
    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(기본적으로는 margin 사이즈가 제외된 값)
     *
     * 만약 두 번째 인자값이 true 일 경우, 적용된 margin 값을 포함한다.
     */
    outerWidth(target = null, isMargin = false){

        const width = parseFloat(this.prop(target, '@width')) || 0;
        const margin = parseFloat(this.prop(target, '@margin-left')) * 2;

        let ret = width;

        if (isMargin) ret += margin;

        return ret;
    },
    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(padding, border, margin 사이즈가 제외된 값)
     */
    height(target = null){

        const height = parseFloat(this.prop(target, '@height')) || 0;
        const padding = parseFloat(this.prop(target, '@padding-top')) * 2;
        const border = parseFloat(this.prop(target, '@border-width')) * 2;

        return height - (padding + border);
    },
    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(padding, margin 사이즈가 제외된 값)
     */
    innerHeight(target = null){

        const height = parseFloat(this.prop(target, '@height')) || 0;
        const border = parseFloat(this.prop(target, '@border-width')) * 2;

        return height - border;
    },
    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(기본적으로는 margin 사이즈가 제외된 값)
     *
     * 만약 두 번째 인자값이 true 일 경우, 적용된 margin 값을 포함한다.
     */
    outerHeight(target = null, isMargin = false){

        const height = parseFloat(this.prop(target, '@height')) || 0;
        const margin = parseFloat(this.prop(target, '@margin-top')) * 2;

        let ret = height;

        if (isMargin) ret += margin;

        return ret;
    },
    /**
     * target 엘리먼트의, 다음 형제 엘리먼트를 반환한다.
     * https://developer.mozilla.org/ko/docs/Web/API/Node/nodeType
     */
    next(target = null){

        let next = (target && target.nextSibling) ? target.nextSibling : null;

        // <p>, <div> 와 같은 `엘리먼트 노드` 타입이 탐색될 경우, 해당 엘리먼트를 반환한다.
        while (next && next.nodeType !== ELEMENT_NODE){
            next = next.nextSibling;
        }

        return next;
    },
    /**
     * target 엘리먼트의 이전 형제 엘리먼트를 반환한다.
     */
    prev(target = null){

        let prev = (target && target.previousSibling) ? target.previousSibling : null;

        // <p>, <div> 와 같은 `엘리먼트 노드` 타입이 탐색될 경우, 해당 엘리먼트를 반환한다.
        while (prev && prev.nodeType !== ELEMENT_NODE){
            prev = prev.previousSibling;
        }

        return prev;
    },
    /**
     * target 엘리먼트의 모든 부모 엘리먼트를 반환한다.
     */
    parents(target = null, selector = ''){

        const ret = [];
        let parent = target;

        // selector 값이 일을 경우, 필터할 엘리먼트 목록을 가져온다.
        const all = selector ? this._nodeListToArray(this.sels(selector)) : [];

        while (parent){

            parent = parent.parentNode;

            // <p>, <div> 와 같은 엘리먼트가 탐색될 경우, 해당 엘리먼트를 반환한다.
            if (parent && parent.nodeType === ELEMENT_NODE){

                if (selector) all.indexOf(parent) > -1 && ret.push(parent);
                else ret.push(parent);
            }
        }

        return ret;
    },
    /**
     * target 엘리먼트의 부모 엘리먼트를 반환한다.
     */
    parent(target = null, selector = ''){

        const ret = [];
        let parent = target;

        // selector 값이 일을 경우, 필터할 엘리먼트 목록을 가져온다.
        const all = selector ? this._nodeListToArray(this.sels(selector)) : [];

        while (parent){

            parent = parent.parentNode;

            // <p>, <div> 와 같은 엘리먼트가 탐색될 경우, 해당 엘리먼트를 반환한다.
            if (parent && parent.nodeType === ELEMENT_NODE){

                if (selector) all.indexOf(parent) > -1 && ret.push(parent);
                else ret.push(parent);

                break;
            }
        }

        return ret;
    },
    /**
     * target 엘리먼트의 모든 자식 엘리먼트를 반환한다.
     */
    children(target = null, selector = ''){

        const ret = [];

        let child = null;
        const children = target && target.childNodes ? this._nodeListToArray(target.childNodes) : [];

        const all = selector ? this._nodeListToArray(this.sels(selector)) : [];

        // 자식 엘리먼트가 존재할때까지
        while (child = children.shift()){

            // <p>, <div> 와 같은 엘리먼트가 탐색될 경우, 해당 엘리먼트를 반환한다.
            if (child.nodeType === ELEMENT_NODE){

                if (selector) all.indexOf(child) > -1 && ret.push(child);
                else ret.push(child);
            }

            let length = child.childNodes ? child.childNodes.length : 0;

            for (let i = 0; i < length; i++){
                children.push(child.childNodes[i]);
            }
        }

        return ret;
    },
    /**
     * 노드리스트를 Array 객체로 변환한다.
     */
    _nodeListToArray(v = null){

        const ret = [];

        const length = v.length;

        for (let i = 0; i < length; i++){
            ret.push(v[i]);
        }

        return ret;
    },
    /**
     * 스타일 속성값 여부를 반환한다.(@ 문자열은, 내부적으로 지정한 플래그)
     */
    _isStyleMarked(k = ''){
        // k 문자열의 0번째 문자가 `@`인 경우(style 속성)
        return k && k[0] === '@';
    }
};


module.exports = domUtil;