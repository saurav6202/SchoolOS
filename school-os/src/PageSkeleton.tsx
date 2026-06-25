import Skeleton from "./Skeleton";

const SidebarItem = () => (
  <div className="flex items-center gap-3">
    <Skeleton className="h-5 w-5 rounded-md" />
    <Skeleton className="h-4 w-24" />
  </div>
);

const StatCard = () => (
  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-5 py-4">
    <Skeleton className="h-5 w-5" />
    <Skeleton className="h-4 w-28" />
  </div>
);

const ContentCard = () => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
    <div className="flex items-center justify-between border-b border-slate-100 p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-2xl" />

        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <Skeleton className="h-8 w-20 rounded-full" />
    </div>

    <div className="space-y-4 p-6">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const PageSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-80 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        <div className="space-y-10 p-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-16" />
            <SidebarItem />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <SidebarItem />
            <SidebarItem />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <SidebarItem />
            <SidebarItem />
            <SidebarItem />
            <SidebarItem />
          </div>
        </div>

        <div className="mt-auto border-t border-slate-200 p-5">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
          <Skeleton className="h-12 w-[550px] rounded-2xl" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-xl" />

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3">
              <Skeleton className="h-12 w-12 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-8">
          {/* Greeting */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-[500px]" />
            <Skeleton className="h-6 w-64" />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <StatCard />
            <StatCard />
            <StatCard />
          </div>

          {/* Notice */}
          <ContentCard />

          {/* Homework + Classwork */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ContentCard />
            <ContentCard />
          </div>

          {/* Attendance Chart */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="space-y-3">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-4 w-72" />
            </div>

            <div className="mt-8 flex items-end gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-10 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageSkeleton;
