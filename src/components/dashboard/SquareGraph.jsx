import { Group, Text } from "@mantine/core";
import styles from "./SquareGraph.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setInitialState } from "../../redux/dashboard/filterSquareGraphSlice";

const squareColor = [
  "#101010",
  "#072516",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];
const displaySquareColor = [
  "#072516",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

function SquareGraph({ reviewData }) {
  const dispatch = useDispatch();
  const { three100Squares } = useSelector(
    (store) => store.three100SquareFilter
  );

  useEffect(
    function () {
      dispatch(setInitialState(reviewData));
    },
    [dispatch, reviewData]
  );

  return (
    <Group justify="space-between">
      <Group justify="space-between" w={"100%"} gap={0}>
        <Text size="xs">Last 300</Text>
        <Group gap={2}>
          <Text size="xs">1 to 5</Text>
          <Group gap={0}>
            {displaySquareColor.map((sq) => (
              <div
                key={sq}
                className={styles.square}
                style={{ background: sq }}
              ></div>
            ))}
          </Group>
        </Group>
      </Group>

      {three100Squares && (
        <div className={styles.container1}>
          {three100Squares.map((rating, index) => (
            <div
              className={styles.square}
              style={{ background: squareColor[rating] }}
              key={index}
            ></div>
          ))}
        </div>
      )}
    </Group>
  );
}

export default SquareGraph;
