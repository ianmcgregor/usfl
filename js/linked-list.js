/* linked-list.js */

define(
	[],
	function() {

		'use strict';

		function LinkedList() {

			var first,
				last;

			/*
				item = {
					'next': null,
					'prev': null
				}

				var item = linkedList.getFirst();
				while(item !== null) {
					// do stuff
					item = item.next;
				}
			*/

			function remove(item) {
				if (null !== item.next) {
					item.next.prev = item.prev;
				}
				if (null !== item.prev) {
					item.prev.next = item.next;
				}
				if (item === first) {
					first = item.next;
				}
				if (item === last) {
					last = item.prev;
				}
				item.next = item.prev = null;
				return item;
			}

			function insertAfter(item, after) {
				item.prev = after;
				item.next = after.next;
				
				if (after.next === null) {
					last = item;
				} else {
					after.next.prev = item;
				}
				
				after.next = item;
			}

			function insertBefore(item, before) {
				item.prev = before.prev;
				item.next = before;

				if (before.prev === null) {
					first = item;
				} else {
					before.prev.next = item;
				}
				
				before.prev = item;
			}

			return {
				getFirst: function() {
					return first;
				},
				getLast: function() {
					return last;
				},
				'remove': remove,
				'insertAfter': insertAfter,
				'insertBefore': insertBefore
			};
		}

		return LinkedList;
	}
);
