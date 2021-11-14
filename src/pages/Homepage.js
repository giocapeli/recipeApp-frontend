import SearchForm from "../components/SearchForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearState } from "../store/recipes/actions";

export default function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState(true));
  }, []);

  return (
    <div style={{ textAlign: "center", zIndex: "-1" }}>
      <div className="centered">
        <SearchForm />
      </div>
    </div>
  );
}
