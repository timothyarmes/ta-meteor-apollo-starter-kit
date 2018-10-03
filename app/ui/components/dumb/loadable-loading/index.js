import React from 'react';
import PropTypes from 'prop-types';
import Loading from '/app/ui/components/dumb/loading';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoadableLoading = ({ error, pastDelay }) => {
  if (error) {
    console.log(error);
    return <div>Error loading component!</div>;
  }

  if (pastDelay) {
    return <Loading />;
  }
  return null;
};

LoadableLoading.propTypes = {
  error: PropTypes.object, // eslint-disable-line
  pastDelay: PropTypes.bool.isRequired,
};

LoadableLoading.defaultProps = {
  error: null,
};

export default LoadableLoading;
