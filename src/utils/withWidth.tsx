import React, { FunctionComponent } from 'react';

const withWidth = (Component: FunctionComponent) =>
  class WithWidth extends React.Component {
    constructor(props: object) {
      super(props);
      this.state = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }

    public componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }

    public componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    public handleResize = () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    public render(): JSX.Element {
      return <Component {...this.props} {...this.state} />;
    }
  };

export default withWidth;
