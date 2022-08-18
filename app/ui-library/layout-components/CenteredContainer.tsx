import { styled } from "~/stitches.config";
import { GappedBox } from "~/ui-library";
import { FC } from "react";

const CenteredDiv = styled("div", {
  maxWidth: 800,
  margin: "0 auto",
  px: "$2",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxSizing: "border-box",
});

type CenteredContainerProps = {
  children: React.ReactNode;
  width?: number;
};

export const CenteredContainer: FC<CenteredContainerProps> = ({
  children,
  width,
}) => {
  return (
    <CenteredDiv css={{ maxWidth: width }}>
      <GappedBox css={{ flexDirection: "column", marginTop: 20 }}>
        {children}
      </GappedBox>
    </CenteredDiv>
  );
};
