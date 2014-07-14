'use strict';

var signals = signals || require('signals');

/*
 * StateMachine
 */

function StateMachine() {
	this._states = {};
	this._initial = null;
	this._currentState = null;
	this._previousState = null;
	this._cancelled = null;
	this._hasChanged = false;
	this._actionQueue = [];
	this._history = [];
	this._factory = new StateMachine.Factory(this);
	this._onChange = new signals.Signal();
}

StateMachine.prototype = {
	start: function() {
		if ( !this._initial ) {
			throw 'State Machine cannot start. No states defined.';
		}
		this._transitionTo( this._initial, null );
	},
	action: function(action, data) {
		// Check if current action transition is complete
		if(!this._hasChanged) {
			// Queue the new action and exit
			this._actionQueue.push({
				'action': action,
				'data': data
			});
			return;
		}
		// Check if we're already in the correct state
		if (this._currentState && this._currentState.getTarget(action) === this._currentState.name) {
			return;
		}
		var newStateTarget = this._currentState.getTarget( action );
		var newState = this._states[ newStateTarget ];
		// Only transition if there's a state associated with the action
		if( newState ) {
			this._transitionTo( newState, data );
		}
	},
	_transitionTo: function( nextState, data ) {
		this._hasChanged = false;

		if ( nextState === null ) {
			return;
		}

		this._cancelled = false;

		// Exit current
		if ( this._currentState && this._currentState.onExit.getNumListeners() > 0 ) {
			this._currentState.onExit.dispatch(data);
		}

		// Has transition been been cancelled on Exit guard?
		if ( this._cancelled ) {
			this._cancelled = false;
			return;
		}
		
		// Enter next State
		if ( nextState.onEnter.getNumListeners() > 0 ) {
			nextState.onEnter.dispatch(data);
		}
		
		// Has transition been been cancelled on Enter guard?
		if ( this._cancelled ) {
			this._cancelled = false;
			return;
		}

		// Set previous state and save name in history array
		if(this._currentState) {
			this._previousState = this._currentState;
			this._history.push(this._previousState.name);
		}

		// Update current state now both guards have been passed
		this._currentState = nextState;
		
		// Dispatch specific Change notification for this State 
		if ( nextState.onChange.getNumListeners() > 0 ) {
			nextState.onChange.dispatch(data);
		}

		// Dispatch general Change notification 
		this._onChange.dispatch(this._currentState.name, data);

		// Set hasChanged flag to true
		this._hasChanged = true;

		// Process action queue
		this._processActionQueue();
	},
	_processActionQueue: function() {
		if(this._actionQueue.length > 0) {
			var stateEvent = this._actionQueue.shift();

			// If currentState has no state for that action go to the next one
			if(!this._currentState.getTarget(stateEvent.action)) {
				this._processActionQueue();
			}
			else {
				this.action(stateEvent.action, stateEvent.data);
			}
		}
	},
	cancel: function() {
		this._cancelled = true;
	},
	addState: function( state, isInitial ) {
		if ( state === null || this._states[ state.name ]) {
			return null;
		}
		this._states[ state.name ] = state;
		if ( isInitial ) {
			this._initial = state;
		}
		return state;
	},
	removeState: function( stateName ) {
		var state = this._states[ stateName ];
		if ( state === null ) {
			return;
		}
		this._states[ stateName ] = null;
	},
	getState: function(stateName) {
		return this._states[stateName];
	}
};

Object.defineProperty(StateMachine.prototype, 'onChange', {
	get: function() {
		return this._onChange;
	}
});

Object.defineProperty(StateMachine.prototype, 'currentState', {
	get: function() {
		return this._currentState;
	}
});

Object.defineProperty(StateMachine.prototype, 'previousState', {
	get: function() {
		return this._previousState;
	}
});

Object.defineProperty(StateMachine.prototype, 'states', {
	get: function() {
		return this._states;
	}
});

Object.defineProperty(StateMachine.prototype, 'initial', {
	get: function() {
		return this._initial;
	}
});

Object.defineProperty(StateMachine.prototype, 'history', {
	get: function() {
		return this._history;
	}
});

Object.defineProperty(StateMachine.prototype, 'factory', {
	get: function() {
		return this._factory;
	}
});

/*
 * State
 */

StateMachine.State = function(name) {
	this._transitions = {};
	this._name = name;
	this._onChange = new signals.Signal();
	this._onEnter = new signals.Signal();
	this._onExit = new signals.Signal();
};

StateMachine.State.prototype = {
	addTransition: function(action, target) {
		if ( this.getTarget( action ) ) {
			return;
		}
		this._transitions[ action ] = target;
	},
	removeTransition: function(action) {
		this._transitions[ action ] = null;
	},
	getTarget: function(action)	{
		return this._transitions[ action ];
	}
};

Object.defineProperty(StateMachine.State.prototype, 'name', {
	get: function() {
		return this._name;
	}
});

Object.defineProperty(StateMachine.State.prototype, 'transitions', {
	get: function() {
		return this._transitions;
	}
});

Object.defineProperty(StateMachine.State.prototype, 'onChange', {
	get: function() {
		return this._onChange;
	}
});

Object.defineProperty(StateMachine.State.prototype, 'onEnter', {
	get: function() {
		return this._onEnter;
	}
});

Object.defineProperty(StateMachine.State.prototype, 'onExit', {
	get: function() {
		return this._onExit;
	}
});

/*
 * Factory
 */

StateMachine.Factory = function(fsm) {
	this.fsm = fsm;
};

StateMachine.Factory.prototype = {
	add: function(config) {
		var state = new StateMachine.State(config.name);
		var transitions = config.transitions;
		if(transitions) {
			for (var i = 0; i < transitions.length; i++) {
				state.addTransition(transitions[i].action, transitions[i].target);
				if(typeof config.onChange === 'function') {
					state.onChange.add(config.onChange);
				}
				if(typeof config.onEnter === 'function') {
					state.onEnter.add(config.onEnter);
				}
				if(typeof config.onExit === 'function') {
					state.onExit.add(config.onExit);
				}
			}
		}
		var isInitial = this.getTotal() === 0 || config.initial;
		this.fsm.addState(state, isInitial);
	},
	addMultiple: function(arr) {
		for (var i = 0; i < arr.length; i++) {
			this.add(arr[i]);
		}
	},
	create: function(name, transitions, isInitial) {
		var state = new StateMachine.State(name);
		if(transitions !== undefined) {
			for (var i = 0; i < transitions.length; i++) {
				state.addTransition(transitions[i].action, transitions[i].target);
			}
		}
		this.fsm.addState(state, isInitial);
		return state;
	},
	getTotal: function() {
		var i = 0;
		for(var key in this.fsm.states) {
			if(this.fsm.states.hasOwnProperty(key) && this.fsm.states[key] !== null){
				i++;
			}
		}
		return i;
	}
};

/*
 * Debug View
 */

StateMachine.DebugView = function(fsm) {

	var container = document.createElement('div');

	function updateState(name) {
		var all = container.querySelectorAll('div');
		for (var i = 0; i < all.length; i++) {
			all[i].style.display = all[i].getAttribute('data-state') === name ? 'block' : 'none';
		}
	}

	function createButton(action) {
		var b = document.createElement('button');
		b.setAttribute('data-action', action);
		b.addEventListener('click', function() {
			var a = this.getAttribute('data-action');
			fsm.action(a);
		});
		b.innerHTML = action;
		return b;
	}

	for(var key in fsm.states) {
		var s = fsm.states[key];
		var d = document.createElement('div');
		d.setAttribute('data-state', s.name);
		d.style.display = 'none';
		
		var h = document.createElement('h3');
		h.innerHTML = 'State: ' + s.name;
		d.appendChild(h);

		var transitions = s.transitions;
		if(transitions) {
			for(var a in transitions) {
				if(transitions.hasOwnProperty(a)) {
					d.appendChild(createButton(a));
				}
			}
		}
		container.appendChild(d);
	}

	fsm.onChange.add(function(name) {
		updateState(name);
	});

	if(fsm.currentState) {
		updateState(fsm.currentState.name);
	}

	return container;
};

if(typeof module === 'object' && module.exports) {
	module.exports = StateMachine;
}
