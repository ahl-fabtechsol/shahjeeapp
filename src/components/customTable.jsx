"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableFooter,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function CustomTable({
  data = [],
  columns = [],
  loading = false,
  page = 1,
  limit = 10,
  total = 0,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  editable = true,
  onCellEdit = () => {},
  pagination = true,
}) {
  const [editing, setEditing] = useState({ rowIndex: null, columnId: null });

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / limit),
    state: { pagination: { pageIndex: page - 1, pageSize: limit } },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: limit })
          : updater;
      onPageChange(next.pageIndex + 1);
      onPageSizeChange(next.pageSize);
    },
  });

  useEffect(() => {
    table.setPageIndex(page - 1);
    table.setPageSize(limit);
  }, [page, limit]);

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="w-full overflow-x-auto relative ">
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur flex items-center justify-center z-10 rounded-lg">
          <Loader2 className="animate-spin h-10 w-10 text-gray-400" />
        </div>
      )}

      <Table className={`${loading ? "opacity-60" : ""} min-w-full`}>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="">
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-600"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: limit }).map((_, i) => (
                <TableRow key={i} className="bg-white border-b border-gray-200">
                  {columns.map((col) => (
                    <TableCell
                      key={col.id || col.accessorKey}
                      className="px-4 py-3"
                    >
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : table.getRowModel().rows.map((row, ri) => (
                <TableRow
                  key={row.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {row.getVisibleCells().map((cell) => {
                    const isEditing =
                      editable &&
                      editing.rowIndex === ri &&
                      editing.columnId === cell.column.id;
                    return (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-3 whitespace-nowrap text-sm text-gray-800"
                        onDoubleClick={() => {
                          if (!editable) return;
                          setEditing({
                            rowIndex: ri,
                            columnId: cell.column.id,
                          });
                        }}
                      >
                        {isEditing ? (
                          <Input
                            defaultValue={cell.getValue()}
                            autoFocus
                            onBlur={(e) => {
                              onCellEdit(ri, cell.column.id, e.target.value);
                              setEditing({ rowIndex: null, columnId: null });
                            }}
                            className="w-full"
                          />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
        </TableBody>
        {pagination && (
          <TableFooter>
            <TableRow className="bg-white">
              <TableCell
                colSpan={columns.length}
                className="px-4 py-3 bg-white border-t border-gray-200"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-medium">{start}</span>–{" "}
                    <span className="font-medium">{end}</span> of{" "}
                    <span className="font-medium">{total}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!table.getCanPreviousPage()}
                      onClick={() => table.previousPage()}
                    >
                      Prev
                    </Button>

                    <div className="flex items-center space-x-1">
                      <Input
                        type="number"
                        value={page}
                        onChange={(e) => {
                          const p = e.target.value ? Number(e.target.value) : 1;
                          onPageChange(
                            Math.min(Math.max(1, p), table.getPageCount())
                          );
                        }}
                        className="w-16 text-center"
                      />
                      <span className="text-sm text-gray-600">
                        / {table.getPageCount()}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!table.getCanNextPage()}
                      onClick={() => table.nextPage()}
                    >
                      Next
                    </Button>

                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">
                        Items per page:
                      </span>
                      <Select
                        value={limit.toString()}
                        onValueChange={(v) => onPageSizeChange(Number(v))}
                      >
                        <SelectTrigger className="w-20 h-8 text-sm">
                          <SelectValue placeholder={limit.toString()} />
                        </SelectTrigger>
                        <SelectContent align="end">
                          {[5, 10, 20, 50].map((sz) => (
                            <SelectItem key={sz} value={sz.toString()}>
                              {sz}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
