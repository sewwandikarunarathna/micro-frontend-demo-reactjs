import Button from '@mui/material/Button';

interface buttonProps {
  text: string,
  className?: string,
  variant?: 'text' | 'outlined' | 'contained',
  onClick: any
}
const SharedButton = (props: buttonProps) => {
  return (
    <div>
      <Button className={props.className} onClick={props.onClick} variant={props.variant ?? 'outlined'}>{props.text ? props.text : 'Demo Button'}</Button>
    </div>
  )
}

export default SharedButton
