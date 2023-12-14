import { supabase } from "./supabase";

export async function getAllReviewsAndVisitorsCount() {
  try {
    const { data: reviews, reviewError } = await supabase
      .from("Reviews Table")
      .select("*");
    if (reviewError) throw new Error(reviewError);

    const { data: views, visitorsError } = await supabase
      .from("visitors")
      .select("*")
      .eq("id", 1);

    if (visitorsError) {
      throw new Error(visitorsError);
    }

    const [{ visitors }] = views;

    return { reviews, visitors };
  } catch (err) {
    throw new Error(err);
  }
}
