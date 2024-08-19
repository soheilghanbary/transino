import { Button } from "./ui/button";

export function FavoriteList() {
  return (
    <div className="hidden flex-wrap items-center gap-8 md:flex">
      <h3 className="font-medium">Your favorites</h3>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant={"outline"} size={"sm"} fullRound>
          Persian-English
        </Button>
        <Button variant={"outline"} size={"sm"} fullRound>
          Arabic-English
        </Button>
        <Button variant={"outline"} size={"sm"} fullRound>
          English-France
        </Button>
        <Button variant={"outline"} size={"sm"} fullRound>
          Germany-Turkish
        </Button>
      </div>
    </div>
  );
}
