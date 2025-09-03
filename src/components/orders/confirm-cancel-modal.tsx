import { useModalAction, useModalState } from '@/components/common/modal/modalContext';
import { cancelOrder } from '@/services/order/firebase-orders';
import { useQueryClient } from '@tanstack/react-query';

const ConfirmCancelOrderModal: React.FC = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    const id: string | undefined = data?.id;
    if (!id) return closeModal();
    const ok = await cancelOrder(id);
    if (ok) {
      // Refresh both firebase order queries
      queryClient.invalidateQueries({ queryKey: ['firebase-user-orders'] });
      queryClient.invalidateQueries({ queryKey: ['firebase-user-orders-by-email'] });
    }
    closeModal();
  };

  return (
    <div className="bg-white rounded-md w-full max-w-md p-6">
      <h3 className="text-lg font-semibold text-brand-dark mb-2">Cancel Order</h3>
      <p className="text-sm text-brand-dark/80 mb-6">
        Are you sure you want to cancel order {data?.tracking_number || ''}? This action cannot be undone.
      </p>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={closeModal}
          className="py-2 px-4 text-sm bg-white border border-[#DEE5EA] rounded hover:border-[#333]"
        >
          No, keep it
        </button>
        <button
          onClick={onConfirm}
          className="py-2 px-4 text-sm bg-[#F35C5C] text-white rounded hover:bg-[#e14e4e]"
        >
          Yes, cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmCancelOrderModal;

