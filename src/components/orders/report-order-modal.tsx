import { useModalAction, useModalState } from '@/components/common/modal/modalContext';
import { createOrderReturnRequest } from '@/services/order/firebase-orders';
import { useState } from 'react';
import { storage } from '@/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ReportOrderModal: React.FC = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files ? Array.from(e.target.files) : [];
    setFiles(list.slice(0, 6));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.id || !data?.tracking_number || !reason.trim()) {
      return;
    }
    setSubmitting(true);
    try {
      // Upload selected images to Firebase Storage and collect URLs
      const uploaded: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const path = `return-requests/${data.id}/${Date.now()}-${i}-${f.name}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, f);
        const url = await getDownloadURL(storageRef);
        uploaded.push(url);
      }

      await createOrderReturnRequest({
        orderId: data.id,
        tracking_number: data.tracking_number,
        reason: reason.trim(),
        notes: notes.trim(),
        images: uploaded,
        type: 'return',
      });
    } finally {
      setSubmitting(false);
      closeModal();
    }
  };

  return (
    <div className="bg-white rounded-xl w-full max-w-lg">
      <div className="bg-[#3B3310] text-white rounded-t-xl px-6 py-4">
        <h3 className="text-lg font-semibold">Report Order</h3>
        <p className="text-xs opacity-90">Order #{data?.tracking_number}</p>
      </div>
      <form onSubmit={onSubmit} className="px-6 py-5 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., wrong item received"
            className="w-full border border-[#E3E8EC] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B3310]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full border border-[#E3E8EC] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B3310]"
            placeholder="Add any details that can help us resolve this"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload images (max 6)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onFiles}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold  file:bg-[#3B3310] file:text-white hover:file:bg-[#3B3310]"
          />
          {files.length > 0 && (
            <div className="mt-3 grid grid-cols-6 gap-2">
              {files.map((f, i) => (
                <div key={i} className="w-16 h-16 rounded-md overflow-hidden border">
                  <img src={URL.createObjectURL(f)} alt="preview" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={closeModal}
            className="py-2 px-4 text-sm bg-white border border-[#DEE5EA] rounded-lg hover:border-[#333]"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 text-sm bg-[#3B3310] text-white rounded-lg hover:bg-[#3B3310] disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportOrderModal;


