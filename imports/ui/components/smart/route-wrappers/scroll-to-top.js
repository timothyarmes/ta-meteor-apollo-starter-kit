import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/**
 * @summary This component will scroll the window up on every navigation.
 */
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
};

// withRouter provides access to location
export default withRouter(ScrollToTop);
