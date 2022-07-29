import Image from "next/image";
import { styled } from "../../../stitches.config";
import ErrorSvg from "../../assets/errorSvg.svg";

const ErrorIcon = () => {
  return (
    <StyledContainer>
      <StyledImage layout="fill" objectFit="contain" src={ErrorSvg} />
    </StyledContainer>
  );
};
const StyledImage = styled(Image, {});
const StyledContainer = styled("div", {
  width: "40px",
  height: "40px",
  position: "relative",
});

export default ErrorIcon;
