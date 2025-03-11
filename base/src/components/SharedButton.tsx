import Button from '@mui/material/Button';

interface buttonProps {
  text: string,
  variant: 'text' | 'outlined' | 'contained',
  onClick: any
}
const SharedButton = (props: buttonProps) => {
  return (
    <div>
      <Button onClick={props.onClick} variant={props.variant ?? 'outlined'}>{props.text ? props.text : 'Demo Button'}</Button>
    </div>
  )
}

export default SharedButton
