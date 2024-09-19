
/*function counter(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }
*/
console.log("Banana",)
//counter();

function createStore(reducer) {
  let state;
  let listeners = [];

  // Method to get the current state
  const getState = () => state;

  // Method to subscribe listeners to state changes
  const subscribe = (listener) => {
      listeners.push(listener);
  };

  // Dispatch method to update state and notify subscribers
  const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
  };

  // Initialize the store with the initial state
  dispatch({});

  return { getState, dispatch, subscribe };
}

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
      case 'ADD':
          return { count: state.count + 1 };
      case 'SUBTRACT':
          return { count: state.count - 1 };
      case 'RESET':
          return { count: 0 };
      default:
          return state;
  }
}

const store = createStore(counterReducer);

store.subscribe(() => {//calls to those who are interested
  console.log('State is:', store.getState());
});

console.log(store.getState()); // { count: 0 }

store.dispatch({ type: 'ADD' });
store.dispatch({ type: 'ADD' }); // { count: 2 }

store.dispatch({ type: 'SUBTRACT' }); // { count: 1 }

store.dispatch({ type: 'RESET' }); // { count: 0 }