import { compose, branch, renderComponent } from 'recompose';

// Renders non-optimal states if a condition matches, otherwise the base component
//
// Example:
//
// const enhance = compose(
//  withUserData,
//  nonOptimalStates([
//    { when: hasErrorCode, render: AuthError },
//    { when: hasNoUsers, render: NoUsersMessage }
//  ])
// );

const nonOptimalStates = states => compose(...states.map(state => branch(state.when, renderComponent(state.render))));

export default nonOptimalStates;
