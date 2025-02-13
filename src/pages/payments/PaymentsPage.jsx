import { useQuery } from '@tanstack/react-query';
import { payments } from '@/lib/api';
import { Button } from '@/components/ui/Button';

export function PaymentsPage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['payments'],
    queryFn: () => payments.getAll(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const paymentsData = data?.data;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
        <Button>Add Payment</Button>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Method</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">From</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paymentsData && Array.isArray(paymentsData) ? (
              paymentsData.map((payment) => (
                <tr key={payment.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    #{payment.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    ${payment.amount?.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      {
                        cash: 'bg-green-100 text-green-800',
                        uzcard: 'bg-blue-100 text-blue-800',
                        humo: 'bg-purple-100 text-purple-800',
                        bank_transfer: 'bg-yellow-100 text-yellow-800',
                      }[payment.payment_method]
                    }`}>
                      {payment.payment_method.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {payment.client?.name || payment.dealer?.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
