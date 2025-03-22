import { Footer as AntdFooter } from "antd/es/layout/layout";

function Footer() {
  return (
    <AntdFooter className=" p-0 bg-transparent h-[45px] flex items-center justify-center whitespace-nowrap overflow-hidden text-ellipsis">
       Dafea ©{new Date().getFullYear()} By Satr
    </AntdFooter>
  );
}

export default Footer;
