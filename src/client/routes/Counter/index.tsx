import * as React from 'react';
import { Button } from 'components/Button';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Wrapper } from 'components/Wrapper';

import { actions, IState } from './reducer';

interface IProps extends IState {
  update: any;
  reset: any;
}

class Counter extends React.Component<IProps, null> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.props.reset();
  }

  updateCounter = () => {
    this.props.update(this.props.counter + 1);
  };

  resetCounter = () => {
    this.props.reset();
  };

  render() {
    const { counter } = this.props;
    return (
      <Wrapper>
        <div>{counter}</div>
        <Button onClick={this.updateCounter}>Update Counter</Button>
        <Button onClick={this.resetCounter} primary>
          Reset Counter
        </Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ counter }) => ({ ...counter });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  update: bindActionCreators(actions.update, dispatch),
  reset: bindActionCreators(actions.reset, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
