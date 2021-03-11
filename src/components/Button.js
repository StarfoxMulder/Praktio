import React from 'react';
import classNames from 'classnames';
import { cloneDeep, omit } from 'lodash';

import './Button.scss';

const Button = (props) => {
  const {
    children,
    href,
    btnStyle,
    outline,
    size,
    onClick,
    disabled,
    active,
    toggled,
    className,
    unstyledIcon,
  } = props;
  const Component = href ? 'a' : unstyledIcon ? 'i' : 'button';

  const styleClass = unstyledIcon
    ? 'material-icons'
    : `btn-${outline ? 'outline-' : ''}${btnStyle || 'default'}`;

  const sizeClass = size ? `btn-${size}` : null;
  const elementProps = cloneDeep(
    omit(props, [
      'className',
      'disabled',
      'size',
      'outline',
      'children',
      'btnStyle',
      'active',
      'onClick',
      'toggled',
      'unstyledIcon',
    ]),
  );

  if (href) {
    elementProps.role = 'button';
  } else {
    elementProps.type = 'button';
  }

  return (
    <Component
      {...elementProps}
      onClick={!disabled ? onClick : undefined}
      className={classNames(
        { btn: !unstyledIcon, Button: !unstyledIcon },
        styleClass,
        sizeClass,
        {
          active,
          disabled,
          toggled,
        },
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default Button;
