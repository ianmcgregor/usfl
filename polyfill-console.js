'use strict';

var fn = function() {};

if (console === undefined) {
  window.console = {};
}

console.log = console.log || fn;
console.debug = console.debug || console.log;
console.dir = console.dir || fn;
console.error = console.error || fn;
console.group = console.group || fn;
console.groupCollapsed = console.groupCollapsed || fn;
console.info = console.info || fn;
console.profile = console.profile || fn;
console.profileEnd = console.profileEnd || fn;
console.table = console.table || fn;
console.timeStamp = console.timeStamp || fn;
console.trace = console.trace || fn;
console.warn = console.warn || fn;
