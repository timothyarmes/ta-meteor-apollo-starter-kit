import PropTypes from 'prop-types';
import MeteorLoadable from 'meteor/nemms:meteor-react-loadable';
import LoadableLoading from '/app/ui/components/dumb/loadable-loading';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoadableWrapper = ({ loader, moduleId, delay }) => (
  MeteorLoadable({
    loading: LoadableLoading,
    loader,
    moduleId,
    delay,
  })
);

LoadableWrapper.propTypes = {
  loader: PropTypes.func.isRequired,
  moduleId: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

LoadableWrapper.defaultProps = {
  delay: 300,
};

export default LoadableWrapper;
