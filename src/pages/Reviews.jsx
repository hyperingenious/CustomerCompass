import { Dropdown } from "../components/ui/Dropdown";
import SegmentedButton from "../components/ui/SegmentedButton";

import ReviewCard from "../components/reviews/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import {
  changeReviewDataWithRating,
  changeReviewDataWithTime,
  setInitialData,
} from "../redux/reviews/filterReviewsSlice";

import { useEffect } from "react";
import { Text } from "@mantine/core";

function Reviews() {
  const { data: reviewData } = useSelector((store) => store.reviewData);
  const { reviewData: reviewState, ratingFilter } = useSelector(
    (store) => store.reviewsFilter 
  );
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(setInitialData(reviewData));
    },
    [dispatch, reviewData]
  );
  return (
    <>
      <div
        className="topSection"
        style={{
          display: "flex",
          gap: "var(--mantine-spacing-md)",
        }}
      >
        <Dropdown
          valueType={ratingFilter}
          name={"Rating"}
          argOptions={[1, 2, 3, 4, 5, 'All Stars']}
          dropdownOptions={[1, 2, 3, 4, 5, "All stars"]}
          onClick={(arg) => dispatch(changeReviewDataWithRating(arg))}
        />
        <SegmentedButton
          onChange={(arg) => dispatch(changeReviewDataWithTime(arg))}
          data={[
            { label: "All time", value: "all-time" },
            { label: "7D", value: "7-day-time" },
            { label: "1M", value: "30-day-time" },
          ]}
        />
      </div>
      {reviewState && reviewState.length === 0 && (
        <Text
          size="xl"
          fw={600}
          mt={100}
          display={"flex"}
          style={{
            justifyContent: "center",
          }}
        >
          No Data
        </Text>
      )}
      {reviewState && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--mantine-spacing-md)",
            marginTop: "var(--mantine-spacing-md)",
          }}
        >
          {reviewState.map((data, index) => (
            <ReviewCard data={data} key={data + index} />
          ))}
        </div>
      )}
    </>
  );
}

export default Reviews;
