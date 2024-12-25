# State Management:

I used a custom hook with Zustand for state management. Zustand is a small, fast, and scalable out-of-the-box
state-management solution that works well with React. It will enable us to create a global state that can be accessed
and modified from any component without the boilerplate of more complex solutions like Redux.

To scale this approach for a larger application, I would:

1. Modularize State: The state should be divided into multiple stores concerning different parts of the app.
2. Side effects and asynchronous actions should be done with middleware.
3. Use selectors to minimize re-renders: subscribe only to parts of the state relevant for re-rendering.

# Performance Optimization:

To optimize the performance of the application, I used the following techniques:

1. **Memoization**: Using `React.memo` and `useMemo` to prevent unnecessary re-renders of components.
2. **Virtualization**: Using `react-virtuoso` to render only the visible items in the list.
3. **Move State Down**: Moving the state down to the lowest possible component to minimize re-renders.
4. **Lift Content Up**: Lifting the content up to the parent component to prevent re-renders of child components.

# Testing Strategy:

I decide which parts of the application need to be unit tested based on the following guidelines:

1. **Critical Logic**: Any part of the application that contains critical business logic.
2. **Reusable Components**: Components that are used in multiple places.
3. **State Management**: Functions that modify the global state.
4. **Edge Cases**: Test edge cases to ensure the application behaves as expected.
5. **UI Components**: Test UI components to ensure they render correctly.

# Code Structure:

Our project structure is organized as follows:

- `src/`: Contains all the source code.
    - `components/`: Reusable React components.
    - `hooks/`: Custom hooks.
    - `store/`: State management files.
    - `types/`: TypeScript type definitions.
    - `utils/`: Utility functions.
    - `styles/`: CSS and styling files.
    - `tests/`: Test files.

This structure is chosen to keep the codebase modular and maintainable. Each directory has a specific purpose, making it
easy to find and manage code. This organization also facilitates scalability as the project grows.
