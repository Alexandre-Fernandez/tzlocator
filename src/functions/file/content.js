"use strict";
exports.__esModule = true;
exports.getStringUnionTypeString = void 0;
function getStringUnionTypeString(name, values) {
    if (values.length === 0)
        return undefined;
    var cur = "export type ".concat(name, "=");
    if (values.length === 1)
        return "".concat(cur, "\"").concat(values[0], "\"");
    var prev = {};
    values.forEach(function (val) {
        if (prev[val])
            return;
        cur += "|\"".concat(val, "\"");
        prev[val] = true;
    });
    return cur;
}
exports.getStringUnionTypeString = getStringUnionTypeString;
