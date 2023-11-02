import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
} from '@tabler/icons-react';
import classes from '../../assets/styles/StatsGrid.module.css';

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: 'Total stars', icon: 'receipt', value: '13,456⭐', diff: 14 },
  { title: '1 stars', icon: 'coin', value: '4,145⭐', diff: -13 },
  { title: '5 stars', icon: 'discount', value: '745⭐', diff: 18 },
  { title: 'Growth', icon: 'user', value: '188⭐', diff: -30 },
] 

export default function StatsGrid() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    // const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          since last month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
}