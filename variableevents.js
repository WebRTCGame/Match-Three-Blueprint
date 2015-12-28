/*jshint curly:true, debug:true, eqeqeq:true, undef:true, unused:strict, strict:true */
/*iffy*/
var something = 100;
var ObserveObject = (() => {
    'use strict';

    let _Change = (theObject, propname, newValue, toChange) => {
        theObject["_" + propname][toChange] = newValue;
    };

    let setFunc = ((obj, propname, defaultValue) => {
        //console.log(param);
        let i = "_" + propname.toString();

        obj[i] = {
            val: defaultValue || 0,
            getModifier: x => x,
            setModifier: x => x,
            onUpdate: (x) => {
                //console.log(x);
            },
            onRead: (x) => {
                //console.log(x);
            },
            onNoChange: (x) => {
                //console.log(x);
            },
            _raiseOnGet: true,
            _raiseOnSet: true,
            _raiseOnNoUpdate: true,
        };

        obj[i].ob = changes => {
            let doEvent = (eventType, theChange) => {
                switch (eventType) {
                    case 'update':
                        obj[i].onUpdate(theChange);
                        break;
                    case 'read':
                        obj[i].onRead(theChange);
                        break;
                    case 'no change':
                        obj[i].onNoChange(theChange);
                        break;
                    default:
                }
            };
            changes.forEach((change, i) => {
                doEvent(change.type, change);
            });
        };
        obj[i].notifier = Object.getNotifier(obj);

        Object.defineProperty(obj, propname, {
            get: () => {
                var computedReturn;
                obj[i]._raiseOnGet ? (obj[i].notifier.performChange('read', () =>
                        computedReturn = obj[i].getModifier(obj[i].val), obj),
                    obj[i].notifier.notify({
                        object: obj,
                        type: "read",
                        name: propname,
                        value: computedReturn,
                        oldValue: obj[i].val
                    })) : computedReturn = obj[i].getModifier(obj[i].val);

                return computedReturn;
            },
            set: (value) => {
                var computedSet;
                obj[i]._raiseOnSet ? obj[i].notifier.performChange('update', () =>
                    computedSet = obj[i].setModifier(value), obj) : computedSet = obj[i].setModifier(value);

                computedSet === obj[i].val ? obj[i]._raiseOnNoUpdate && obj[i].notifier.notify({
                    object: obj,
                    type: 'no change',
                    name: propname,
                    value: computedSet,
                    oldValue: obj[i].val
                }) : obj[i]._raiseOnSet ? (obj[i].notifier.notify({
                    object: obj,
                    type: 'update',
                    name: propname,
                    value: computedSet,
                    oldValue: obj[i].val
                }), obj[i].val = computedSet) : obj[i].val = computedSet;
            },
            enumerable: true,
            configurable: true
        });

        Object.observe(obj, obj[i].ob, ['read', 'update', 'no change', 'add', 'delete', 'reconfigure', 'preventExtensions']);

    });

    var a = 5;

    return a === 5 ? function(){
        this.set= setFunc;
        this.changeGetModifier = (theObject, propname, newFunction) => {
            _Change(theObject, propname, ('function' === typeof newFunction) ? newFunction : x => x, "getModifier");
        };
        this.changeSetModifier = (theObject, propname, newFunction) => {
            _Change(theObject, propname, ('function' === typeof newFunction) ? newFunction : x => x, "setModifier");
        };
        this.changeOnUpdate = (theObject, propname, newFunction) => {
            _Change(theObject, propname, ('function' === typeof newFunction) ? newFunction : x => x, "onUpdate");
        };
        this.changeOnRead = (theObject, propname, newFunction) => {
            _Change(theObject, propname, ('function' === typeof newFunction) ? newFunction : x => x, "onRead");
        };
        this.changeOnNoChange = (theObject, propname, newFunction) => {
            _Change(theObject, propname, ('function' === typeof newFunction) ? newFunction : x => x, "onNoChange");
        };
        this.changeRaiseOnGet = (theObject, propname, newValue) => {
            _Change(theObject, propname, newValue, "_raiseOnGet");
        };
        this.changeRaiseOnSet = (theObject, propname, newValue) => {
            _Change(theObject, propname, newValue, "_raiseOnSet");
        };
        this.changeRaiseOnNoChange = (theObject, propname, newValue) => {
            _Change(theObject, propname, newValue, "_raiseOnNoUpdate");
        };
    } : 0;


}(something));



var o = {};
var t = {};
var pBar = document.getElementById('p');
var lbl1a = document.getElementById('label1a');

console.log(ObserveObject(5));

ObserveObject.set(o, "fun", 5);

ObserveObject.changeGetModifier(o, "fun", x => {
    lbl1a.textContent = x * 5;

    return x;
});
ObserveObject.changeSetModifier(o, "fun", (x) => {
    if (x >= pBar.max) {
        x = 0;
    }
    pBar.value = x;
    return x;
});



setInterval(function() {
    o.fun += 1;
    o.fun = o.fun;
    //console.log(o.fun);
}, 500);