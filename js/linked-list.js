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
			function add(item) {
				if(!first) {
					first = last = item;
				}
				else {
					var i = first;
					while(i.next) {
						i = i.next;
					}
					insertAfter(item, i);
				}
				return item;
			}

			function remove(item) {
				if (item.next) {
					item.next.prev = item.prev;
				}
				if (item.prev) {
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
				
				if (!after.next) {
					last = item;
				}
				else {
					after.next.prev = item;
				}

				after.next = item;

				return item;
			}

			function insertBefore(item, before) {
				item.prev = before.prev;
				item.next = before;

				if (!before.prev) {
					first = item;
				}
				else {
					before.prev.next = item;
				}

				before.prev = item;

				return item;
			}

			return {
				getFirst: function() {
					return first;
				},
				getLast: function() {
					return last;
				},
				getCount: function() {
					var count = 0;
					var i = first;
					while(i) {
						count ++;
						i = i.next;
					}
					return count;
				},
				'add': add,
				'remove': remove,
				'insertAfter': insertAfter,
				'insertBefore': insertBefore
			};
		}

		return LinkedList;
	}
);
