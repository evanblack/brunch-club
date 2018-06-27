import React from 'react';
import { observer } from 'mobx-react';
import Transition from 'react-transition-group/Transition';

const AnimatedPanel = observer(({ in: inProp, render, animation, timeout }) => {
  return (
    <Transition in={inProp} timeout={timeout} mountOnEnter={true} unmountOnExit={true}>
      {(status) => render({ animationClass: `${animation}-${status}` })}
    </Transition>
  )
});

export default AnimatedPanel;
