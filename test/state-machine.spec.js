'use strict';

var StateMachine = require('../src/lib/state-machine.js');

describe('state machine', function() {

	var stateMachine = new StateMachine(),
		stateChangedTo = '',
		stateData,
		gotEnterNotification = false,
		gotChangeNotification = false,
		gotExitNotification = false;

	var State = {
		CLOSED: 'CLOSED',
		OPENED: 'OPENED',
		LOCKED: 'LOCKED'
	};

	var Action = {
		CLOSE: 'CLOSE',
		OPEN: 'OPEN',
		LOCK: 'LOCK',
		UNLOCK: 'UNLOCK'
	};

	var config = [
		{
			initial: true,
			name: State.CLOSED,
			transitions: [
				{ action: Action.OPEN, target: State.OPENED },
				{ action: Action.LOCK, target: State.LOCKED }
			],
			onEnter: function() {
				gotEnterNotification = true;
			},
			onChange: function() {
				gotChangeNotification = true;
			},
			onExit: function() {
				gotExitNotification = true;
			}
		},
		{
			name: State.OPENED,
			transitions: [
				{ action: Action.CLOSE, target: State.CLOSED }
			]
		},
		{
			name: State.LOCKED,
			transitions: [
				{ action: Action.UNLOCK, target: State.CLOSED }
			]
		}
	];
	
	stateMachine.factory.addMultiple(config);
	stateMachine.onChange.add(function(state, data) {
		stateChangedTo = state;
		stateData = data;
	});
	stateMachine.start();

	it('should have 3 states', function() {
		expect(stateMachine.factory.getTotal()).to.eql(3);
	});

	it('should return initial state', function() {
		expect(stateMachine.currentState.name).to.eql(State.CLOSED);
	});

	it('should have received general onChange signal', function() {
		expect(stateChangedTo).to.eql(State.CLOSED);
	});

	it('should have changed state to LOCKED', function() {
		stateMachine.action(Action.LOCK);
		expect(stateMachine.currentState.name).to.eql(State.LOCKED);
	});

	it('should have got individual state notifications', function() {
		expect(gotEnterNotification).to.be.true;
		expect(gotChangeNotification).to.be.true;
		expect(gotExitNotification).to.be.true;
	});

	it('should have changed state to CLOSED with data', function() {
		stateMachine.action(Action.UNLOCK, { info: 'Hello' });
		expect(stateMachine.currentState.name).to.eql(State.CLOSED);
		expect(stateData.info).to.eql('Hello');
	});

	it('should have changed state to OPENED', function() {
		stateMachine.action(Action.OPEN);
		expect(stateMachine.currentState.name).to.eql(State.OPENED);
	});
});