import Image from "next/image";
import { styled } from "../../../stitches.config";
import SuccessSvg from "../../assets/successSvg.svg";

const SuccessIcon = () => {
  return (
    <StyledContainer>
      <StyledImage layout="fill" objectFit="contain" src={SuccessSvg} />
    </StyledContainer>
  );
};
const StyledImage = styled(Image, {});
const StyledContainer = styled("div", {
  width: "40px",
  height: "40px",
  position: "relative",
});

export default SuccessIcon;
