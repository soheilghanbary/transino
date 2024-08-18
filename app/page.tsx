"use client";
import { FavoriteList } from "@/components/favorite-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import t from "translate";
import { useDebounce } from "use-debounce";

type TranslateProps = {
  text: string;
  from: string;
  into: string;
};

async function translate(props: TranslateProps) {
  return await t(props.text, { from: props.from, to: props.into });
}

export default () => {
  const [state, setState] = useState({
    text: "",
    from: "en",
    into: "fa",
  });
  const [result, setResult] = useState("");
  const [queryText] = useDebounce(state.text, 500);

  const handleTranslate = async () => {
    const response = await translate(state);
    setResult(response);
  };

  useEffect(() => {
    if (queryText) handleTranslate();
  }, [queryText, state.from, state.into]);

  return (
    <div className="grid gap-4">
      <FavoriteList />
      <section className="grid grid-cols-2 gap-4">
        <section>
          <div className="grid border-separate gap-4 rounded-lg border bg-card p-4">
            <div className="flex items-center gap-6">
              <span>From: </span>
              <Select
                value={state.from}
                onValueChange={(e) => {
                  if (e === state.into) {
                    return setState({
                      ...state,
                      from: state.into,
                      into: state.from,
                    });
                  }
                  setState({ ...state, from: e });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fa">Persian</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="type any thing ..."
              className="min-h-32"
              value={state.text}
              onChange={(e) => setState({ ...state, text: e.target.value })}
            />
          </div>
        </section>
        <section>
          <div className="grid border-separate gap-4 rounded-lg border bg-card p-4">
            <div className="flex items-center gap-6">
              <span>Into: </span>
              <Select
                value={state.into}
                onValueChange={(e) => {
                  if (e === state.from) {
                    return setState({
                      ...state,
                      from: state.into,
                      into: state.from,
                    });
                  }
                  setState({ ...state, into: e });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fa">Persian</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-h-32 border-separate rounded-md border bg-muted/30 p-4">
              {result}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
