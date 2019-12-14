import App1 from "../App-1";
import App2 from "../App-2";
import App3 from "../App-3";
import App4 from "../App-4";

describe('store1', () => {
  let store;

  beforeEach(() => {
    store = App1.createStore(App1.reducer, App1.initialState)
  })

  const addMessageAction1 = {
    type: 'ADD_MESSAGE',
    message: 'How does it look, Neil?',
  };

  const addMessageAction2 = {
    type: 'ADD_MESSAGE',
    message: 'Looking good.',
  };

  test('dispatching actions', () => {
    store.dispatch(addMessageAction1);
    expect(
      store.getState()
    ).toMatchSnapshot()
    store.dispatch(addMessageAction2);
    expect(
      store.getState()
    ).toMatchSnapshot()
  });
});

describe('store2', () => {
  let store;
  beforeEach(() => {
    store = App2.createStore(App2.reducer, App2.initialState)
  })

  const addMessageAction1 = {
    type: 'ADD_MESSAGE',
    message: 'How does it look, Neil?',
  };

  const addMessageAction2 = {
    type: 'ADD_MESSAGE',
    message: 'Looking good.',
  };

  const deleteMessageAction = {
    type: 'DELETE_MESSAGE',
    index: 0,
  };

  test('dispatching actions', () => {
    store.dispatch(addMessageAction1);
    expect(
      store.getState()
    ).toMatchSnapshot()

    store.dispatch(addMessageAction2);
    expect(
      store.getState()
    ).toMatchSnapshot()

    store.dispatch(deleteMessageAction);
    expect(
      store.getState()
    ).toMatchSnapshot()
  });
});

describe('store3', () => {
  let store;
  beforeEach(() => {
    store = App3.createStore(App3.reducer, App3.initialState)
  })
  const listener = jest.fn()

  const addMessageAction1 = {
    type: 'ADD_MESSAGE',
    message: 'How does it look, Neil?',
  };

  const addMessageAction2 = {
    type: 'ADD_MESSAGE',
    message: 'Looking good.',
  };

  const deleteMessageAction = {
    type: 'DELETE_MESSAGE',
    index: 0,
  };

  test('handling dispatched actions', () => {
    store.dispatch(addMessageAction1);
    expect(
      store.getState()
    ).toMatchSnapshot()

    store.dispatch(addMessageAction2);
    expect(
      store.getState()
    ).toMatchSnapshot()

    store.dispatch(deleteMessageAction);
    expect(
      store.getState()
    ).toMatchSnapshot()
  });

  test('calling listener', () => {
    store.subscribe(listener)

    store.dispatch(addMessageAction1);
    expect(
      listener.mock.calls.length
    ).toEqual(1)

    store.dispatch(addMessageAction1);
    expect(
      listener.mock.calls.length
    ).toEqual(2)
  });
});

describe('store4', () => {
  let store;
  beforeEach(() => {
    store = App4.createStore(App4.reducer, App4.initialState)
  })
  const listener = jest.fn()

  const addMessageAction1 = {
    type: 'ADD_MESSAGE',
    message: 'How does it look, Neil?',
  };

  const addMessageAction2 = {
    type: 'ADD_MESSAGE',
    message: 'Looking good.',
  };

  const deleteMessageAction = {
    type: 'DELETE_MESSAGE',
    index: 0,
  };

  test('handling dispatched actions', () => {
    store.dispatch(addMessageAction1);
    expect(
      store.getState()
    ).toMatchSnapshot()

    store.dispatch(addMessageAction2);
    expect(
      store.getState()
    ).toMatchSnapshot()

    store.dispatch(deleteMessageAction);
    expect(
      store.getState()
    ).toMatchSnapshot()
  });

  test('calling listener', () => {
    store.subscribe(listener)

    store.dispatch(addMessageAction1);
    expect(
      listener.mock.calls.length
    ).toEqual(1)

    store.dispatch(addMessageAction1);
    expect(
      listener.mock.calls.length
    ).toEqual(2)
  });
});
