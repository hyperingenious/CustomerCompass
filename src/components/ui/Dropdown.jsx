import { Button, Menu, rem, useMantineTheme } from "@mantine/core";
import { IconChevronDown, IconGraph } from "@tabler/icons-react";

export function Dropdown({
  name,
  valueType = "",
  dropdownOptions,
  onClick,
  argOptions,
}) {
  const theme = useMantineTheme();
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={140}
    >
      <Menu.Target>
        <Button
          size="xs"
          variant="default"
          style={{
            fontSize: "12px",
            fontWeight: "normal",
          }}
          rightSection={
            <IconChevronDown
              style={{
                paddingRight: "0 !important",
                width: rem(12),
                height: rem(12),
              }}
              stroke={1.5}
            />
          }
          pr={12}
        >
          {name}
          {valueType && `: ${valueType}`}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {dropdownOptions.map((data, index) => (
          <Menu.Item
            onClick={() => onClick(argOptions[index])}
            key={data}
            leftSection={
              <IconGraph
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.gray[5]}
                stroke={1.5}
              />
            }
          >
            {data}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
