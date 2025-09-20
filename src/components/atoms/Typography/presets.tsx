/**
 * Typography Preset Components
 * Convenient components for common text styles
 */

import { memo } from 'react';
import { Typography } from './Typography';
import { ITypographyProps } from './Typography.types';

// Heading Components
export const H1 = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="h1" {...props} />
));

export const H2 = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="h2" {...props} />
));

export const H3 = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="h3" {...props} />
));

export const H4 = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="h4" {...props} />
));

export const H5 = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="h5" {...props} />
));

export const H6 = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="h6" {...props} />
));

// Text Components
export const Subtitle = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="subtitle1" {...props} />
));

export const SubtitleSmall = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="subtitle2" {...props} />
));

export const Text = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="body1" {...props} />
));

export const Body = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="body2" {...props} />
));

export const Caption = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="caption" {...props} />
));

export const Overline = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="overline" {...props} />
));

export const Label = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="label" {...props} />
));

export const ButtonText = memo<Omit<ITypographyProps, 'variant'>>(props => (
  <Typography variant="button" {...props} />
));

// Semantic Components
export const ErrorText = memo<Omit<ITypographyProps, 'error'>>(props => (
  <Typography error {...props} />
));

export const SuccessText = memo<Omit<ITypographyProps, 'success'>>(props => (
  <Typography success {...props} />
));

export const WarningText = memo<Omit<ITypographyProps, 'warning'>>(props => (
  <Typography warning {...props} />
));

export const InfoText = memo<Omit<ITypographyProps, 'info'>>(props => (
  <Typography info {...props} />
));

export const Link = memo<Omit<ITypographyProps, 'link'>>(props => (
  <Typography link underline {...props} />
));
