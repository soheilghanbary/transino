"use client";
import { FavoriteList } from "@/components/favorite-list";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BookmarkIcon, CopyIcon, ShareIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import t from "translate";
import { useDebounce } from "use-debounce";

type TranslateProps = {
  text: string;
  from: string;
  into: string;
};

const languages = [
  { value: "fa", label: "Persian" },
  { value: "en", label: "English" },
  { value: "fr", label: "France" },
  { value: "ar", label: "Arabic" },
];

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
    if (result && !queryText) return setResult("");
  }, [queryText, state.from, state.into]);

  return (
    <div className="grid gap-4">
      <FavoriteList />
      <section className="grid gap-4 md:grid-cols-2">
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
                  {languages.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
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
                  {languages.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex min-h-32 border-separate flex-col justify-between rounded-md border bg-muted/30 p-2">
              {result && (
                <>
                  {result}
                  <div className="mt-auto flex items-center gap-2">
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => {
                        navigator.clipboard.writeText(result);
                        toast.success("Copy Text to clipboard!");
                      }}
                    >
                      <CopyIcon className="size-4" />
                    </Button>
                    <Button variant={"ghost"} size={"icon"}>
                      <BookmarkIcon className="size-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
