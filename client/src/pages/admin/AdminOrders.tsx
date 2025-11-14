import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminOrders() {
  const { data: orders, isLoading, refetch } = trpc.orders.list.useQuery();
  const updateStatusMutation = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Order status updated!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "Pending":
        return "In Progress";
      case "In Progress":
        return "Ready";
      case "Ready":
        return "Pending";
      default:
        return "Pending";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold">Order Management</h2>
        <Button variant="outline" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-border">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Card Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-primary">
                    {order.cardNumber}
                  </td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate">
                    {order.description || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Button
                      size="sm"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          cardNumber: order.cardNumber,
                          status: getNextStatus(order.status) as "Pending" | "In Progress" | "Ready",
                        })
                      }
                      disabled={updateStatusMutation.isPending}
                      className="gap-1"
                    >
                      <Check className="w-4 h-4" />
                      {getNextStatus(order.status)}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center border border-border">
          <p className="text-muted-foreground">No orders yet.</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Pending:</strong>{" "}
            {orders?.filter((o) => o.status === "Pending").length || 0}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>In Progress:</strong>{" "}
            {orders?.filter((o) => o.status === "In Progress").length || 0}
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Ready:</strong>{" "}
            {orders?.filter((o) => o.status === "Ready").length || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
