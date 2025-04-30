import { Image } from "antd";


type Props = {
  width?: number;
  className?: string;
  onClick?: any;
  preview?: boolean;
  src: string;
};

const SharedImage = (props: Props) => {
  return (
    <>
      <Image
        className={props.className}
        onClick={props.onClick}
        width={props.width}
        preview={props.preview ?? false}
        src={props.src}
      />
    </>
  );
};

export default SharedImage;
