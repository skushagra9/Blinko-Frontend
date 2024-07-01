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
          Ignite Your SaaS Journey with a Complete Dynamic Solution
        </div>

        <div className="mx-auto mt-5 max-w-screen-md text-center text-lg md:text-xl text-muted-foreground px-4">
          Monorepo Starter Template with Next.js 14, PostgreSQL, OAuth
          (Google/GitHub), Shadcn, login/logout, navbar, footer components{" "}
        </div>

        <div className="mt-8 flex flex-row justify-center gap-x-5">
          <a href={`/stake`}>
            <Button>Get Started</Button>
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
