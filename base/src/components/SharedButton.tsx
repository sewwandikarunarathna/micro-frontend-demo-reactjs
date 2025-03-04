import Button from '@mui/material/Button';

interface buttonProps {
  text: string,
  variant: 'text' | 'outlined' | 'contained'
}
const SharedButton = (props: buttonProps) => {
  return (
    <div>
      <Button variant={props.variant ?? 'outlined'}>{props.text ? props.text : 'Demo Button'}</Button>
    </div>
  )
}

export default SharedButton
