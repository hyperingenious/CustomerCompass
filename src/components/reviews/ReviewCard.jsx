import { IconStar } from "@tabler/icons-react";
import { Card, Text, Group, Center, useMantineTheme, rem } from "@mantine/core";
import { formatDate } from "../../helpers/helper";
import classes from "../../assets/styles/ArticleCard.module.css";

export default function ReviewCard({ data }) {
  const theme = useMantineTheme();
  const emptyArrayOf5 = Array.from({ length: 5 }, (len) => len);
  const starRatingMaker = emptyArrayOf5.map((_, index) => (
    <IconStar
      key={index}
      fill={data.rating >= index + 1 ? "yellow" : "none"}
      style={{ width: rem(16), height: rem(16) }}
      color={theme.colors.yellow[6]}
    />
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Text fz="sm">
        {data.review}
      </Text>
      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Text fz="sm" inline c={'dimmed'}>
            {formatDate(data.created_at)}
          </Text>
        </Center>
        <Group gap={3} mr={0}>
          {starRatingMaker}
          <Text>{data.rating}</Text>
        </Group>
      </Group>
    </Card>
  );
}
