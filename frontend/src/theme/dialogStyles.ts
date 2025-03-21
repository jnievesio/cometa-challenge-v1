import { Theme } from '@mui/material';

export const dialogBaseStyles = (theme: Theme) => `
  font-family: ${theme.typography.fontFamily};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${theme.palette.text.primary};
`;

export const dialogPaperStyles = (theme: Theme) => `
  border-radius: 20px;
  padding: ${theme.spacing(3)};
  box-shadow: 0 20px 40px rgba(0, 0, 0, ${theme.palette.mode === 'dark' ? '0.4' : '0.15'});
  background-color: ${theme.palette.background.paper};
  width: 95%;
  max-width: 550px;
  margin: ${theme.spacing(2)};
  transform: scale(0.95) translateY(20px);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  &.MuiDialog-paperEnter-done {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  @media (max-width: ${theme.breakpoints.values.sm}px) {
    width: 100%;
    margin: ${theme.spacing(1)};
    border-radius: 16px;
    padding: ${theme.spacing(2)};
  }
`;

export const dialogTitleStyles = (theme: Theme) => `
  ${dialogBaseStyles(theme)}
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${theme.palette.text.primary};
  padding: ${theme.spacing(1, 1, 2)};
  text-align: center;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${theme.palette.primary.main};
    border-radius: 2px;
    opacity: 0.7;
  }
`;

export const dialogContentStyles = (theme: Theme) => `
  ${dialogBaseStyles(theme)}
  font-size: clamp(0.875rem, 3vw, 1rem);
  color: ${theme.palette.text.secondary};
  padding: ${theme.spacing(3, 2)};
  text-align: center;
  line-height: 1.6;
  letter-spacing: 0.01em;
`;

export const dialogActionsStyles = (theme: Theme) => `
  padding: ${theme.spacing(2, 1, 1)};
  justify-content: center;
  gap: ${theme.spacing(2)};
  flex-direction: row;
  @media (max-width: ${theme.breakpoints.values.sm}px) {
    flex-direction: column;
    padding: ${theme.spacing(2, 0, 0)};
  }
`;

export const dialogButtonStyles = (theme: Theme) => `
  ${dialogBaseStyles(theme)}
  border-radius: 10px;
  text-transform: none;
  font-weight: 500;
  font-size: 0.9375rem;
  padding: ${theme.spacing(1.25, 3.5)};
  min-width: 120px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  @media (max-width: ${theme.breakpoints.values.sm}px) {
    width: 100%;
    padding: ${theme.spacing(1.5, 3)};
  }
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease-out, height 0.6s ease-out;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    &:before {
      width: 300px;
      height: 300px;
    }
  }
  &:active {
    transform: translateY(1px);
  }
`;
