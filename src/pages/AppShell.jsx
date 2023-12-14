import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useDisclosure } from "@mantine/hooks";
import { AppShell as MantineAppShell, Burger, Text } from "@mantine/core";

import NavbarSimple from "../components/ui/NavbarSimple";
import ActionToggle from "../components/ui/ActionToggle";
import { useSelector } from "react-redux";

export default function AppShell() {
  const [opened, { toggle }] = useDisclosure();
  const { authenticated } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(
    function () {
      if (window.location.pathname === "/" && authenticated)
        navigate("/dashboard");
      if (!authenticated) navigate("/login");
    },
    [navigate, authenticated]
  );

  return (
    <>
      <MantineAppShell
        header={{ height: 40 }}
        navbar={{
          width: 230,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="lg"
      >
        <MantineAppShell.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 10px",
          }}
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text size="xs" fw={"normal"} >CUSTOMER COMPASS</Text>
          <ActionToggle />
        </MantineAppShell.Header>

        <MantineAppShell.Navbar p="md">
          <NavbarSimple toggle={toggle} />
        </MantineAppShell.Navbar>

        <MantineAppShell.Main>
          <Outlet />
        </MantineAppShell.Main>
      </MantineAppShell>
    </>
  );
}
