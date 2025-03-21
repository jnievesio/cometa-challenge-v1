import { Theme } from '@mui/material';

export const dialogBaseStyles = (_: Theme) => `
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const dialogPaperStyles = (theme: Theme) => `
  border-radius: 12px;
  padding: ${theme.spacing(2)};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background-color: ${theme.palette.background.paper};
  width: 90%;
  max-width: 500px;
  margin: ${theme.spacing(2)};
  transform: scale(0.9);
  opacity: 1;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  &.MuiDialog-paperEnter-done {
    transform: scale(1);
    opacity: 1;
  }
`;

export const dialogTitleStyles = (theme: Theme) => `
  ${dialogBaseStyles(theme)}
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  font-weight: 600;
  color: ${theme.palette.text.primary};
  padding: ${theme.spacing(1)};
  text-align: center;
`;

export const dialogContentStyles = (theme: Theme) => `
  ${dialogBaseStyles(theme)}
  font-size: clamp(0.875rem, 3vw, 1rem);
  color: ${theme.palette.text.secondary};
  padding: ${theme.spacing(2, 1)};
  text-align: center;
`;

export const dialogActionsStyles = (theme: Theme) => `
  padding: ${theme.spacing(1)};
  justify-content: center;
  gap: ${theme.spacing(2)};
  flex-direction: ${theme.breakpoints.down('sm') ? 'column' : 'row'};
`;

export const dialogButtonStyles = (theme: Theme) => `
  ${dialogBaseStyles(theme)}
  border-radius: 8px;
  text-transform: none;
  padding: ${theme.spacing(1, 3)};
  min-width: ${theme.breakpoints.down('sm') ? '100%' : 'auto'};
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;
