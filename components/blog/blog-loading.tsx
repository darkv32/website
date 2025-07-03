import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function BlogLoading() {
  return (
    <div className="space-y-8">
      {/* Header Loading */}
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>

      {/* Stats Loading */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Articles Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="aspect-video w-full" />
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function BlogArticleLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Loading */}
      <section className="py-20">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Loading */}
      <section className="py-12">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="aspect-video w-full rounded-xl" />
          </div>
        </div>
      </section>

      {/* Content Loading */}
      <section className="py-12">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto space-y-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}