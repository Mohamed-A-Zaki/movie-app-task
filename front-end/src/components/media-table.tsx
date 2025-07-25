import { Edit, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { useEffect, useState, useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  openDeleteConfirmModalAtom,
  openEditMediaModelAtom,
} from "@/atoms/open-atoms";
import { entriesAtom } from "@/atoms/entries-atom";
import { selectedEntryAtom } from "@/atoms/selected-entry-atom";

export default function MediaTable() {
  const { entries, isLoading, error, numberOfPages } = entriesAtom.useValue();

  const [currentPage, setCurrentPage] = useState(1);
  const hasMore = currentPage < numberOfPages;
  const lastScrollTop = useRef(0);

  // Fetch entries when currentPage changes
  useEffect(() => {
    entriesAtom.getAllEntries(currentPage);
  }, [currentPage]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const isScrollingDown = scrollTop > lastScrollTop.current;
      lastScrollTop.current = scrollTop;

      const nearBottom = scrollTop + windowHeight >= fullHeight - 100;

      if (isScrollingDown && nearBottom && hasMore && !isLoading) {
        setCurrentPage((prev) => (prev < numberOfPages ? prev + 1 : prev));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isLoading]);

  return (
    <div className="space-y-6">
      {/* Table */}
      <Card className="shadow-elegant-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-table-header border-b border-table-border">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-foreground">
                  Title
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Type
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Director
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Budget
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Location
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Duration
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Year/Time
                </th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-table-border hover:bg-table-row-hover transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-foreground">
                      {item.title}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={item.type === "movie" ? "default" : "secondary"}
                      className="font-medium"
                    >
                      {item.type}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {item.director}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {item.budget}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {item.location}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {item.duration}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {item.year}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          selectedEntryAtom.change("selectedEntry", item._id);
                          openEditMediaModelAtom.open();
                        }}
                        className="h-8 w-8 cursor-pointer p-0 hover:bg-primary hover:text-white transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          selectedEntryAtom.change("selectedEntry", item._id);
                          openDeleteConfirmModalAtom.open();
                        }}
                        className="h-8 w-8 p-0 cursor-pointer hover:bg-destructive hover:text-white transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show loading at bottom only when there are already entries (infinite scroll) */}
        {isLoading && entries.length > 0 && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-base">Loading more...</p>
          </div>
        )}

        {/* Show full-table loading only when entries are empty */}
        {isLoading && entries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Loading...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive text-lg">Error: {error}</p>
          </div>
        )}

        {entries.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No results found</p>
            <p className="text-muted-foreground text-sm mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
