import { Container, Loader as MantineLoader } from "@mantine/core";

export default function Loader({ color = "blue", size = "xl", type = "bars" }) {
  return (
    <>
      <Container>
        <MantineLoader color={color} size={size} type={type} />
      </Container>
    </>
  );
}
