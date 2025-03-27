import Button from '@mui/material/Button';

type Props = {
  color?: 'inherit'| 'primary' | 'secondary' | 'error'| 'warning'| 'info'| 'success' | any;
  children: any;
  type?: 'button' | 'reset' | 'submit';
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained' | any;
  bgcolor?: string;
  className?: string;
  component?: any;
  disabled?: boolean;
  onClick?: any;
};

const SharedButton = (props: Props) => {
  return (
    <div>
      <Button
      className={props.className}
      component={props.component}
      type={props.type}
      size={props.size}
      color={props.color}
      variant={props.variant ?? 'contained'}
      disabled={props.disabled}
      onClick={props.onClick}
      sx={{
        ':hover': {
          bgcolor: props.bgcolor,
        },
      }}
    >
      {props.children}
    </Button>
    </div>
  )
}

export default SharedButton
