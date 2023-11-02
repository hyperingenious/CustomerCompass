import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center" >
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size={30}
        aria-label="Toggle color scheme"
      >
        {computedColorScheme === "light" ? (
          <IconSun size={18} stroke={1.5} />
        ) : (
          <IconMoon size={18} stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  );
}
