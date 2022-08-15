"use strict";
exports.__esModule = true;
exports.generateUnionTypesFile = void 0;
var fs_1 = require("fs");
var utilities_1 = require("../utilities");
var content_1 = require("./content");
function generateUnionTypesFile(path, types) {
    if ((0, utilities_1.getExtension)(path) !== "ts") {
        throw new Error("`path`'s file must be a .ts file.");
    }
    try {
        var content_2 = "";
        types.forEach(function (_a) {
            var name = _a.name, values = _a.values;
            content_2 += "".concat((0, content_1.getStringUnionTypeString)(name, values), "\n");
        });
        var dir = path.split("/").slice(0, -1).join("/");
        if (!(0, fs_1.existsSync)(dir))
            (0, fs_1.mkdirSync)(dir);
        (0, fs_1.writeFileSync)(path, content_2);
    }
    catch (err) {
        console.error(err); // eslint-disable-line no-console
    }
}
exports.generateUnionTypesFile = generateUnionTypesFile;
