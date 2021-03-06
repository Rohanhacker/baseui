/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';

function getBorderColor(props) {
  const {$checked, $isError, $theme} = props;
  const {colors} = $theme;
  return $isError
    ? colors.negative400
    : $checked
      ? colors.primary400
      : colors.mono700;
}

function getLabelPadding(props) {
  const {$labelPlacement = '', $theme} = props;
  let paddingDirection;
  switch ($labelPlacement) {
    case 'top':
      paddingDirection = 'Bottom';
      break;
    case 'bottom':
      paddingDirection = 'Top';
      break;
    case 'left':
      paddingDirection = 'Right';
      break;
    default:
    case 'right':
      paddingDirection = 'Left';
      break;
  }
  const {sizing} = $theme;
  const {scale300} = sizing;
  return {
    [`padding${paddingDirection}`]: scale300,
  };
}

function getLabelColor(props) {
  const {$disabled, $theme} = props;
  const {colors} = $theme;
  return $disabled ? colors.foregroundAlt : colors.foreground;
}

export const RadioGroupRoot = styled('div', props => {
  const {$disabled, $align} = props;
  return {
    flexDirection: $align === 'horizontal' ? 'row' : 'column',
    display: 'flex',
    alignItems: $align === 'horizontal' ? 'center' : 'flex-start',
    cursor: $disabled ? 'not-allowed' : 'pointer',
  };
});

export const Root = styled('label', props => {
  const {$disabled, $labelPlacement, $theme} = props;
  const {sizing} = $theme;
  return {
    flexDirection:
      $labelPlacement === 'top' || $labelPlacement === 'bottom'
        ? 'column'
        : 'row',
    display: 'flex',
    alignItems: 'center',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    marginTop: sizing.scale200,
    marginBottom: sizing.scale200,
  };
});

export const RadioMarkInner = styled('div', props => {
  const {$checked, $disabled, $theme, $isFocused, $isError} = props;
  const {animation, colors, sizing} = $theme;

  const activeStyle = {
    backgroundColor:
      $checked || $isError
        ? null
        : $isFocused
          ? colors.mono500
          : !$disabled && !$checked
            ? colors.mono400
            : null,
  };

  return {
    backgroundColor: 'white',
    borderRadius: '50%',
    height: $checked ? sizing.scale100 : sizing.scale600,
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
    width: $checked ? sizing.scale100 : sizing.scale600,
    ':hover': activeStyle,
    ':active': activeStyle,
  };
});

export const RadioMarkOuter = styled('div', props => {
  const {sizing} = props.$theme;

  return {
    alignItems: 'center',
    backgroundColor: getBorderColor(props),
    borderRadius: '50%',
    display: 'flex',
    height: sizing.scale700,
    justifyContent: 'center',
    marginTop: sizing.scale0,
    marginRight: sizing.scale0,
    marginBottom: sizing.scale0,
    marginLeft: sizing.scale0,
    verticalAlign: 'middle',
    width: sizing.scale700,
    flexShrink: 0,
  };
});

export const Label = styled('div', props => {
  const {
    $theme: {typography},
  } = props;
  return {
    verticalAlign: 'middle',
    ...getLabelPadding(props),
    color: getLabelColor(props),
    ...typography.font450,
  };
});

// tricky style for focus event cause display: none doesn't work
export const Input = styled('input', {
  opacity: 0,
  width: 0,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  position: 'absolute',
});
