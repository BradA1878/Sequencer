var sequence = function() {
    var _s = function() {
        var _i = this, _a = [], _end = null, _next = function(fail) {
            if (_a.length && !fail) {
                var o = _a.shift();
                o.args ? o.func.apply(o.scope, o.args.concat([o.callback])) : o.func(o.callback);
            } else {
                _end && (_end.args ? _end.func.apply(_end.scope, _end.args) : _end.func()), _a.splice(0), _i = _next = _end = _a = null;
            }
        };
        this.start = function(f, a, s) {
            this.next(f, a, s);
            return _i;
        };
        this.next = function(f, a, s) {
            _a.push({func:f, args:a, scope:s, callback:function() {
                _next();
            }});
            return _i;
        };
        this.finish = function(f, a, s) {
            _end = {func:f, args:a, scope:s};
            _next();
        };
        this.failed = function(f, a, s) {
            if(arguments.length) _end = {func:f, args:a, scope:s};
            _next(true);
        };
    };
    var i = (new _s);
    return { start:function(f, a, s){return i.start(f, a, s);}, failed:function(f, a, s){i.failed(f, a, s)} };
}();