import { ReactNode } from "react";
import Navbar from "./Navbar";
import { useAppSelector } from "../redux/hooks";
import Alert from "./Alert";
import BackgroundImage from "../assets/images/house1.jpg";

interface Props {
  children: ReactNode;
}
const Layout = (props: Props) => {
  const { message, alertType } = useAppSelector((state) => state.alert);

  return (
    <>
      <Navbar />
      <div
        className="mt-[76px] md:mt-[84px]"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {message && alertType && (
          <Alert message={message} alertType={alertType} />
        )}

        {props.children}
      </div>
    </>
  );
};

export default Layout;
