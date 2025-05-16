import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categoryService";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function Categories() {
  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryFn: () => getCategories({ page: 1, limit: 6 }),
    queryKey: ["siteCategories"],
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });
  if (isError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error fetching Categories data</p>
        <p>{error?.response?.data?.message || "Error"}</p>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="h-full mt-5 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full p-6 lg:px-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
        <p className="text-muted-foreground mt-2 max-w-[700px] mx-auto">
          Browse our wide range of products across popular categories
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 md:gap-6">
        {categoriesData?.results?.map((category, index) => (
          <Card
            className="border-border/40 h-full transition-all hover:shadow-md"
            key={index}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
              <div className={`rounded-full p-4 mb-4 `}>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={category?.image} />
                  <AvatarFallback>{category?.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
