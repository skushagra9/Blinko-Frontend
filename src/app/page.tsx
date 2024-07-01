import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageContainer from "@/components/ImageContainer";

export default async function LandingPage() {

  return (
    <div>
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-center justify-center mx-auto gap-x-4 mt-36">
        <a href="https:twitter.com/skushagrasharma">
          <Badge
            variant="outline"
            className="tracking-tight border-indigo-300 bg-indigo-50 dark:bg-indigo-950 text-indigo-500 dark:text-indigo-300 text-sm font-medium"
          >
            <TwitterLogoIcon />
            &nbsp; Follow @skushagrasharma on Twitter
          </Badge>
        </a>
        <div className="mt-3 text-center  text-5xl md:text-7xl font-bold tracking-tighter">
          Welcome to BetBlink: Your Ultimate Gambling Destination
        </div>

        <div className="mx-auto mt-5 max-w-screen-md text-center text-lg md:text-xl text-muted-foreground px-4">
          Dive into the excitement with BetBlink, a premier gambling platform featuring cutting-edge technology and thrilling games, explore our newest sensation: Blinko!
        </div>

        <div className="mt-8 flex flex-row justify-center gap-x-5">
          <a href={`/stake`}>
            <Button>Start Betting</Button>
          </a>
          <a href="https://github.com/skushagra9/">
            {" "}
            <Button variant={"outline"}>
              <GitHubLogoIcon />
              &nbsp; Star On Github
            </Button>
          </a>
        </div>
        {/* <ImageContainer /> */}
      </div>
    </div>
  );
}
