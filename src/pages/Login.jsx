import { useEffect } from "react";
import SignIn from "../components/ui/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from "../redux/authSlice";

function Authentication() {
  const { authenticated } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (!authenticated) dispatch(fetchSession());
    },
    [dispatch, authenticated]
  );

  return <SignIn />;
}
export default Authentication;
