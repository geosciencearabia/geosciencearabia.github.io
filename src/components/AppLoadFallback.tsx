import { SiteShell } from "@/components/SiteShell";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type AppLoadFallbackProps = {
  variant?: "home" | "page";
};

const StatSkeleton = () => (
  <Card className="border-border/60">
    <CardContent className="space-y-3 p-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-3 w-28" />
    </CardContent>
  </Card>
);

const ListCardSkeleton = () => (
  <Card className="border-border/60">
    <CardContent className="space-y-3 p-4">
      <Skeleton className="h-5 w-40" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border border-border/50 px-3 py-3"
          >
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const AppLoadFallback = ({ variant = "page" }: AppLoadFallbackProps) => {
  return (
    <SiteShell>
      <main className="container mx-auto space-y-8 px-4 py-6">
        <section className="space-y-4">
          <div className="space-y-3">
            <Skeleton className="h-10 w-full max-w-2xl" />
            <Skeleton className="h-4 w-full max-w-3xl" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>

          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-9 w-32 rounded-full" />
            <Skeleton className="h-9 w-36 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </div>
        </section>

        {variant === "home" ? (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <StatSkeleton key={index} />
              ))}
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <ListCardSkeleton key={index} />
              ))}
            </section>
          </>
        ) : (
          <section className="space-y-4">
            <Card className="border-border/60">
              <CardContent className="space-y-4 p-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-72 w-full" />
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="space-y-3 p-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full" />
                ))}
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </SiteShell>
  );
};
