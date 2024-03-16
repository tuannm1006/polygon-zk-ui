import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#151516',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#151516',
    borderRadius: 4,
    padding: '8px',
    color: '#fff',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    lineHeight: '22px',
    boxShadow: '0px 0px 12px rgba(255, 255, 255, 0.24)',
  },
}));
