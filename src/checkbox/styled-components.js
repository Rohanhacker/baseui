/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {STYLE_TYPE} from './constants.js';

function getBorderColor(props) {
  const {$disabled, $checked, $isError, $isIndeterminate, $theme} = props;
  const {colors} = $theme;
  if ($disabled) {
    return colors.tickFillDisabled;
  } else if ($checked || $isIndeterminate) {
    return 'transparent';
  } else if ($isError) {
    return colors.negative400;
  } else {
    return colors.tickBorder;
  }
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

function getBackgroundColor(props) {
  const {
    $disabled,
    $checked,
    $isIndeterminate,
    $isFocused,
    $isError,
    $isHovered,
    $isActive,
    $theme,
    $checkmarkType,
  } = props;
  const isToggle = $checkmarkType === STYLE_TYPE.toggle;
  const {colors} = $theme;
  if ($disabled) {
    return isToggle ? colors.sliderTrackFillDisabled : colors.tickFillDisabled;
  } else if ($isError && ($isIndeterminate || $checked)) {
    if ($isActive || $isFocused) {
      return colors.negative600;
    } else if ($isHovered) {
      return colors.negative500;
    } else {
      return colors.negative400;
    }
  } else if ($isError) {
    if ($isActive || $isFocused) {
      return colors.negative200;
    } else if ($isHovered) {
      return colors.negative100;
    } else {
      return colors.negative50;
    }
  } else if ($isIndeterminate || $checked) {
    if ($isActive || $isFocused) {
      return colors.primary600;
    } else if ($isHovered) {
      return colors.primary500;
    } else {
      return colors.primary400;
    }
  } else {
    if ($isActive || $isFocused) {
      return isToggle ? colors.sliderTrackFillActive : colors.tickFillActive;
    } else if ($isHovered) {
      return isToggle ? colors.sliderTrackFillHover : colors.tickFillHover;
    } else {
      return isToggle ? colors.sliderTrackFill : colors.tickFill;
    }
  }
}

function getLabelColor(props) {
  const {$disabled, $theme} = props;
  const {colors} = $theme;
  return $disabled ? colors.foregroundAlt : colors.foreground;
}

export const Root = styled('label', props => {
  const {$disabled, $labelPlacement} = props;
  return {
    flexDirection:
      $labelPlacement === 'top' || $labelPlacement === 'bottom'
        ? 'column'
        : 'row',
    display: 'flex',
    alignItems:
      $labelPlacement === 'top' || $labelPlacement === 'bottom'
        ? 'center'
        : 'flex-start',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };
});

export const Checkmark = styled('span', props => {
  const {$checked, $disabled, $isIndeterminate, $theme} = props;
  const {sizing, animation} = $theme;

  const tickColor = $disabled
    ? $theme.colors.mono600
    : $theme.colors.tickMarkFill;

  const indeterminate = encodeURIComponent(`
    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line
      x1="1"
      y1="-1"
      x2="11"
      y2="-1"
      transform="translate(0 2)"
      stroke="${tickColor}"
      stroke-width="2"
      stroke-linecap="round"
    />
    </svg>
  `);

  const check = encodeURIComponent(`
    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.6 0.200059C11.0418 0.53143 11.1314 1.15823 10.8 1.60006L4.8 9.60006C4.62607 9.83197 4.36005 9.97699 4.07089 9.99754C3.78173 10.0181 3.49788 9.91215 3.29289 9.70717L0.292893 6.70717C-0.0976311 6.31664 -0.0976311 5.68348 0.292893 5.29295C0.683417 4.90243 1.31658 4.90243 1.70711 5.29295L3.89181 7.47765L9.2 0.400059C9.53137 -0.0417689 10.1582 -0.131312 10.6 0.200059Z"
        fill="${tickColor}"
      />
    </svg>
  `);

  return {
    flex: '0 0 auto',
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
    width: sizing.scale700,
    height: sizing.scale700,
    left: '4px',
    top: '4px',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: getBorderColor(props),
    borderRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius200
      : null,
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundImage: $isIndeterminate
      ? `url('data:image/svg+xml;charset=utf8,${indeterminate}');`
      : $checked
        ? `url('data:image/svg+xml;charset=utf8,${check}');`
        : null,
    backgroundColor: getBackgroundColor(props),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop: $theme.sizing.scale0,
    marginBottom: $theme.sizing.scale0,
    marginLeft: $theme.sizing.scale0,
    marginRight: $theme.sizing.scale0,
  };
});

export const Label = styled('div', props => {
  const {$theme, $checkmarkType} = props;
  const {typography} = $theme;
  return {
    flex: $checkmarkType === STYLE_TYPE.toggle ? 'auto' : null,
    verticalAlign: 'middle',
    ...getLabelPadding(props),
    color: getLabelColor(props),
    ...typography.font350,
    lineHeight: '24px',
  };
});

// tricky style for focus event cause display: none doesn't work
export const Input = styled('input', {
  opacity: 0,
  width: 0,
  height: 0,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  position: 'absolute',
});

export const Toggle = styled('div', props => ({
  ...props.$theme.borders.border300,
  alignItems: 'center',
  backgroundColor: props.$theme.colors.mono100,
  borderRadius: props.$theme.borders.useRoundedCorners
    ? props.$theme.borders.radius200
    : null,
  boxShadow: props.$theme.lighting.shadow400,
  display: 'flex',
  justifyContent: 'center',
  height: props.$theme.sizing.scale800,
  width: props.$theme.sizing.scale800,
}));

export const ToggleInner = styled('div', props => {
  function backgroundColor($theme) {
    if (props.$disabled) return props.$theme.colors.mono400;
    if (props.$isActive) return props.$theme.colors.primary500;
    if (props.$isHovered || props.$checked) return props.$theme.colors.primary;

    return props.$theme.colors.mono600;
  }

  return {
    height: props.$theme.sizing.scale300,
    width: props.$theme.sizing.scale0,
    borderRadius: props.$theme.borders.radius100,
    backgroundColor: backgroundColor(),
  };
});

export const ToggleTrack = styled('div', props => ({
  alignItems: 'center',
  backgroundColor: getBackgroundColor(props),
  borderRadius: props.$theme.borders.useRoundedCorners
    ? props.$theme.borders.radius200
    : null,
  display: 'flex',
  height: props.$theme.sizing.scale600,
  justifyContent: props.$checked ? 'flex-end' : 'flex-start',
  marginTop: props.$theme.sizing.scale100,
  marginBottom: props.$theme.sizing.scale100,
  marginLeft: props.$theme.sizing.scale100,
  marginRight: props.$theme.sizing.scale100,
  width: props.$theme.sizing.scale1000,
}));
