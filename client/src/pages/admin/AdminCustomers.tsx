import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminCustomers() {
  const { data: customers, isLoading, refetch } = trpc.customers.list.useQuery();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold">Customer Management</h2>
        <Button variant="outline" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : customers && customers.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-border">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Card Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Visit Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{customer.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <a href={`tel:${customer.phone}`} className="text-primary hover:underline">
                      {customer.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a href={`mailto:${customer.email}`} className="text-primary hover:underline">
                      {customer.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-primary">
                    {customer.cardNumber}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {customer.preferredVisitDate
                      ? new Date(customer.preferredVisitDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(customer.cardNumber, customer.id)}
                      className="gap-1"
                    >
                      {copiedId === customer.id ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Card
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center border border-border">
          <p className="text-muted-foreground">No customers yet.</p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Total Customers:</strong> {customers?.length || 0}
        </p>
      </div>
    </div>
  );
}
