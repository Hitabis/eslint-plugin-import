'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.isAbsolute = isAbsolute;
exports.isBuiltIn = isBuiltIn;
exports.isExternalModuleMain = isExternalModuleMain;
exports.isScopedMain = isScopedMain;
exports.default = resolveImportType;

var _cond = require('lodash/cond');

var _cond2 = _interopRequireDefault(_cond);

var _core = require('resolve/lib/core');

var _core2 = _interopRequireDefault(_core);

var _path = require('path');

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function constant(value) {
  return () => value;
}

function baseModule(name) {
  if (isScoped(name)) {
    var _name$split = name.split('/'),
        _name$split2 = _slicedToArray(_name$split, 2);

    const scope = _name$split2[0],
          pkg = _name$split2[1];

    return `${scope}/${pkg}`;
  }

  var _name$split3 = name.split('/'),
      _name$split4 = _slicedToArray(_name$split3, 1);

  const pkg = _name$split4[0];

  return pkg;
}

function isAbsolute(name) {
  return name.indexOf('/') === 0;
}

function isBuiltIn(name, settings) {
  const base = baseModule(name);
  const extras = settings && settings['import/core-modules'] || [];
  return _core2.default[base] || extras.indexOf(base) > -1;
}

function isExternalPath(path, name, settings) {
  const folders = settings && settings['import/external-module-folders'] || ['node_modules'];
  return !path || folders.some(folder => -1 < path.indexOf((0, _path.join)(folder, name)));
}

const externalModuleRegExp = /^\w/;
function isExternalModule(name, settings, path) {
  return externalModuleRegExp.test(name) && isExternalPath(path, name, settings);
}

const externalModuleMainRegExp = /^[\w]((?!\/).)*$/;
function isExternalModuleMain(name, settings, path) {
  return externalModuleMainRegExp.test(name) && isExternalPath(path, name, settings);
}

const scopedRegExp = /^@[^/]+\/[^/]+/;
function isScoped(name) {
  return scopedRegExp.test(name);
}

const scopedMainRegExp = /^@[^/]+\/?[^/]+$/;
function isScopedMain(name) {
  return scopedMainRegExp.test(name);
}

function isInternalModule(name, settings, path) {
  const folders = settings && settings['import/internal-module-folders'];
  const customInternalModule = folders && folders.some(folder => name.startsWith(folder));
  return customInternalModule || externalModuleRegExp.test(name) && !isExternalPath(path, name, settings);
}

function isRelativeToParent(name) {
  return name.indexOf('../') === 0;
}

const indexFiles = ['.', './', './index', './index.js'];
function isIndex(name) {
  return indexFiles.indexOf(name) !== -1;
}

function isRelativeToSibling(name) {
  return name.indexOf('./') === 0;
}

const typeTest = (0, _cond2.default)([[isInternalModule, constant('internal')], [isAbsolute, constant('absolute')], [isBuiltIn, constant('builtin')], [isExternalModule, constant('external')], [isScoped, constant('external')], [isRelativeToParent, constant('parent')], [isIndex, constant('index')], [isRelativeToSibling, constant('sibling')], [constant(true), constant('unknown')]]);

function resolveImportType(name, context) {
  return typeTest(name, context.settings, (0, _resolve2.default)(name, context));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvaW1wb3J0VHlwZS5qcyJdLCJuYW1lcyI6WyJpc0Fic29sdXRlIiwiaXNCdWlsdEluIiwiaXNFeHRlcm5hbE1vZHVsZU1haW4iLCJpc1Njb3BlZE1haW4iLCJyZXNvbHZlSW1wb3J0VHlwZSIsImNvbnN0YW50IiwidmFsdWUiLCJiYXNlTW9kdWxlIiwibmFtZSIsImlzU2NvcGVkIiwic3BsaXQiLCJzY29wZSIsInBrZyIsImluZGV4T2YiLCJzZXR0aW5ncyIsImJhc2UiLCJleHRyYXMiLCJjb3JlTW9kdWxlcyIsImlzRXh0ZXJuYWxQYXRoIiwicGF0aCIsImZvbGRlcnMiLCJzb21lIiwiZm9sZGVyIiwiZXh0ZXJuYWxNb2R1bGVSZWdFeHAiLCJpc0V4dGVybmFsTW9kdWxlIiwidGVzdCIsImV4dGVybmFsTW9kdWxlTWFpblJlZ0V4cCIsInNjb3BlZFJlZ0V4cCIsInNjb3BlZE1haW5SZWdFeHAiLCJpc0ludGVybmFsTW9kdWxlIiwiY3VzdG9tSW50ZXJuYWxNb2R1bGUiLCJzdGFydHNXaXRoIiwiaXNSZWxhdGl2ZVRvUGFyZW50IiwiaW5kZXhGaWxlcyIsImlzSW5kZXgiLCJpc1JlbGF0aXZlVG9TaWJsaW5nIiwidHlwZVRlc3QiLCJjb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQW1CZ0JBLFUsR0FBQUEsVTtRQUlBQyxTLEdBQUFBLFM7UUFpQkFDLG9CLEdBQUFBLG9CO1FBVUFDLFksR0FBQUEsWTtrQkFtQ1FDLGlCOztBQXJGeEI7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7QUFFQSxTQUFTQyxRQUFULENBQWtCQyxLQUFsQixFQUF5QjtBQUN2QixTQUFPLE1BQU1BLEtBQWI7QUFDRDs7QUFFRCxTQUFTQyxVQUFULENBQW9CQyxJQUFwQixFQUEwQjtBQUN4QixNQUFJQyxTQUFTRCxJQUFULENBQUosRUFBb0I7QUFBQSxzQkFDR0EsS0FBS0UsS0FBTCxDQUFXLEdBQVgsQ0FESDtBQUFBOztBQUFBLFVBQ1hDLEtBRFc7QUFBQSxVQUNK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QUE2QixDQUFDLENBQXJDO0FBQ0Q7O0FBRUQsU0FBUzJCLG1CQUFULENBQTZCM0IsSUFBN0IsRUFBbUM7QUFDakMsU0FBT0EsS0FBS0ssT0FBTCxDQUFhLElBQWIsTUFBdUIsQ0FBOUI7QUFDRDs7QUFFRCxNQUFNdUIsV0FBVyxvQkFBSyxDQUNwQixDQUFDUCxnQkFBRCxFQUFtQnhCLFNBQVMsVUFBVCxDQUFuQixDQURvQixFQUVwQixDQUFDTCxVQUFELEVBQWFLLFNBQVMsVUFBVCxDQUFiLENBRm9CLEVBR3BCLENBQUNKLFNBQUQsRUFBWUksU0FBUyxTQUFULENBQVosQ0FIb0IsRUFJcEIsQ0FBQ21CLGdCQUFELEVBQW1CbkIsU0FBUyxVQUFULENBQW5CLENBSm9CLEVBS3BCLENBQUNJLFFBQUQsRUFBV0osU0FBUyxVQUFULENBQVgsQ0FMb0IsRUFNcEIsQ0FBQzJCLGtCQUFELEVBQXFCM0IsU0FBUyxRQUFULENBQXJCLENBTm9CLEVBT3BCLENBQUM2QixPQUFELEVBQVU3QixTQUFTLE9BQVQsQ0FBVixDQVBvQixFQVFwQixDQUFDOEIsbUJBQUQsRUFBc0I5QixTQUFTLFNBQVQsQ0FBdEIsQ0FSb0IsRUFTcEIsQ0FBQ0EsU0FBUyxJQUFULENBQUQsRUFBaUJBLFNBQVMsU0FBVCxDQUFqQixDQVRvQixDQUFMLENBQWpCOztBQVllLFNBQVNELGlCQUFULENBQTJCSSxJQUEzQixFQUFpQzZCLE9BQWpDLEVBQTBDO0FBQ3ZELFNBQU9ELFNBQVM1QixJQUFULEVBQWU2QixRQUFRdkIsUUFBdkIsRUFBaUMsdUJBQVFOLElBQVIsRUFBYzZCLE9BQWQsQ0FBakMsQ0FBUDtBQUNEIiwiZmlsZSI6ImNvcmUvaW1wb3J0VHlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25kIGZyb20gJ2xvZGFzaC9jb25kJ1xuaW1wb3J0IGNvcmVNb2R1bGVzIGZyb20gJ3Jlc29sdmUvbGliL2NvcmUnXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCdcblxuaW1wb3J0IHJlc29sdmUgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9yZXNvbHZlJ1xuXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gKCkgPT4gdmFsdWVcbn1cblxuZnVuY3Rpb24gYmFzZU1vZHVsZShuYW1lKSB7XG4gIGlmIChpc1Njb3BlZChuYW1lKSkge1xuICAgIGNvbnN0IFtzY29wZSwgcGtnXSA9IG5hbWUuc3BsaXQoJy8nKVxuICAgIHJldHVybiBgJHtzY29wZX0vJHtwa2d9YFxuICB9XG4gIGNvbnN0IFtwa2ddID0gbmFtZS5zcGxpdCgnLycpXG4gIHJldHVybiBwa2dcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWJzb2x1dGUobmFtZSkge1xuICByZXR1cm4gbmFtZS5pbmRleE9mKCcvJykgPT09IDBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQnVpbHRJbihuYW1lLCBzZXR0aW5ncykge1xuICBjb25zdCBiYXNlID0gYmFzZU1vZHVsZShuYW1lKVxuICBjb25zdCBleHRyYXMgPSAoc2V0dGluZ3MgJiYgc2V0dGluZ3NbJ2ltcG9ydC9jb3JlLW1vZHVsZXMnXSkgfHwgW11cbiAgcmV0dXJuIGNvcmVNb2R1bGVzW2Jhc2VdIHx8IGV4dHJhcy5pbmRleE9mKGJhc2UpID4gLTFcbn1cblxuZnVuY3Rpb24gaXNFeHRlcm5hbFBhdGgocGF0aCwgbmFtZSwgc2V0dGluZ3MpIHtcbiAgY29uc3QgZm9sZGVycyA9IChzZXR0aW5ncyAmJiBzZXR0aW5nc1snaW1wb3J0L2V4dGVybmFsLW1vZHVsZS1mb2xkZXJzJ10pIHx8IFsnbm9kZV9tb2R1bGVzJ11cbiAgcmV0dXJuICFwYXRoIHx8IGZvbGRlcnMuc29tZShmb2xkZXIgPT4gLTEgPCBwYXRoLmluZGV4T2Yoam9pbihmb2xkZXIsIG5hbWUpKSlcbn1cblxuY29uc3QgZXh0ZXJuYWxNb2R1bGVSZWdFeHAgPSAvXlxcdy9cbmZ1bmN0aW9uIGlzRXh0ZXJuYWxNb2R1bGUobmFtZSwgc2V0dGluZ3MsIHBhdGgpIHtcbiAgcmV0dXJuIGV4dGVybmFsTW9kdWxlUmVnRXhwLnRlc3QobmFtZSkgJiYgaXNFeHRlcm5hbFBhdGgocGF0aCwgbmFtZSwgc2V0dGluZ3MpXG59XG5cbmNvbnN0IGV4dGVybmFsTW9kdWxlTWFpblJlZ0V4cCA9IC9eW1xcd10oKD8hXFwvKS4pKiQvXG5leHBvcnQgZnVuY3Rpb24gaXNFeHRlcm5hbE1vZHVsZU1haW4obmFtZSwgc2V0dGluZ3MsIHBhdGgpIHtcbiAgcmV0dXJuIGV4dGVybmFsTW9kdWxlTWFpblJlZ0V4cC50ZXN0KG5hbWUpICYmIGlzRXh0ZXJuYWxQYXRoKHBhdGgsIG5hbWUsIHNldHRpbmdzKVxufVxuXG5jb25zdCBzY29wZWRSZWdFeHAgPSAvXkBbXi9dK1xcL1teL10rL1xuZnVuY3Rpb24gaXNTY29wZWQobmFtZSkge1xuICByZXR1cm4gc2NvcGVkUmVnRXhwLnRlc3QobmFtZSlcbn1cblxuY29uc3Qgc2NvcGVkTWFpblJlZ0V4cCA9IC9eQFteL10rXFwvP1teL10rJC9cbmV4cG9ydCBmdW5jdGlvbiBpc1Njb3BlZE1haW4obmFtZSkge1xuICByZXR1cm4gc2NvcGVkTWFpblJlZ0V4cC50ZXN0KG5hbWUpXG59XG5cbmZ1bmN0aW9uIGlzSW50ZXJuYWxNb2R1bGUobmFtZSwgc2V0dGluZ3MsIHBhdGgpIHtcbiAgY29uc3QgZm9sZGVycyA9IHNldHRpbmdzICYmIHNldHRpbmdzWydpbXBvcnQvaW50ZXJuYWwtbW9kdWxlLWZvbGRlcnMnXVxuICBjb25zdCBjdXN0b21JbnRlcm5hbE1vZHVsZSA9IGZvbGRlcnMgJiYgZm9sZGVycy5zb21lKGZvbGRlciA9PiBuYW1lLnN0YXJ0c1dpdGgoZm9sZGVyKSlcbiAgcmV0dXJuIGN1c3RvbUludGVybmFsTW9kdWxlIHx8IChleHRlcm5hbE1vZHVsZVJlZ0V4cC50ZXN0KG5hbWUpICYmICFpc0V4dGVybmFsUGF0aChwYXRoLCBuYW1lLCBzZXR0aW5ncykpXG59XG5cbmZ1bmN0aW9uIGlzUmVsYXRpdmVUb1BhcmVudChuYW1lKSB7XG4gIHJldHVybiBuYW1lLmluZGV4T2YoJy4uLycpID09PSAwXG59XG5cbmNvbnN0IGluZGV4RmlsZXMgPSBbJy4nLCAnLi8nLCAnLi9pbmRleCcsICcuL2luZGV4LmpzJ11cbmZ1bmN0aW9uIGlzSW5kZXgobmFtZSkge1xuICByZXR1cm4gaW5kZXhGaWxlcy5pbmRleE9mKG5hbWUpICE9PSAtMVxufVxuXG5mdW5jdGlvbiBpc1JlbGF0aXZlVG9TaWJsaW5nKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUuaW5kZXhPZignLi8nKSA9PT0gMFxufVxuXG5jb25zdCB0eXBlVGVzdCA9IGNvbmQoW1xuICBbaXNJbnRlcm5hbE1vZHVsZSwgY29uc3RhbnQoJ2ludGVybmFsJyldLFxuICBbaXNBYnNvbHV0ZSwgY29uc3RhbnQoJ2Fic29sdXRlJyldLFxuICBbaXNCdWlsdEluLCBjb25zdGFudCgnYnVpbHRpbicpXSxcbiAgW2lzRXh0ZXJuYWxNb2R1bGUsIGNvbnN0YW50KCdleHRlcm5hbCcpXSxcbiAgW2lzU2NvcGVkLCBjb25zdGFudCgnZXh0ZXJuYWwnKV0sXG4gIFtpc1JlbGF0aXZlVG9QYXJlbnQsIGNvbnN0YW50KCdwYXJlbnQnKV0sXG4gIFtpc0luZGV4LCBjb25zdGFudCgnaW5kZXgnKV0sXG4gIFtpc1JlbGF0aXZlVG9TaWJsaW5nLCBjb25zdGFudCgnc2libGluZycpXSxcbiAgW2NvbnN0YW50KHRydWUpLCBjb25zdGFudCgndW5rbm93bicpXSxcbl0pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc29sdmVJbXBvcnRUeXBlKG5hbWUsIGNvbnRleHQpIHtcbiAgcmV0dXJuIHR5cGVUZXN0KG5hbWUsIGNvbnRleHQuc2V0dGluZ3MsIHJlc29sdmUobmFtZSwgY29udGV4dCkpXG59XG4iXX0=