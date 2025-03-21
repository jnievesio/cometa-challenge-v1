import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fade,
  styled,
} from '@mui/material';
import {
  dialogPaperStyles,
  dialogTitleStyles,
  dialogContentStyles,
  dialogActionsStyles,
  dialogButtonStyles,
} from '../theme/dialogStyles';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const StyledDialog = styled(Dialog)(
  ({ theme }) => `
  & .MuiDialog-paper {
    ${dialogPaperStyles(theme)}
  }
`,
);

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => dialogTitleStyles(theme));

const StyledDialogContent = styled(DialogContent)(({ theme }) => dialogContentStyles(theme));

const StyledDialogActions = styled(DialogActions)(
  ({ theme }) => `
  ${dialogActionsStyles(theme)}
  & .MuiButton-root {
    ${dialogButtonStyles(theme)}
  }
`,
);

export function ConfirmModal({ open, title, message, onConfirm, onClose }: ConfirmModalProps) {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      TransitionProps={{
        timeout: {
          enter: 400,
          exit: 300,
        },
      }}
      maxWidth={false}
    >
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent>{message}</StyledDialogContent>
      <StyledDialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: 'text.secondary',
            borderColor: 'divider',
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            fontWeight: 600,
          }}
        >
          Confirmar
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
}
