import { BsThreeDots } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useUI } from '@/contexts/useUI';
import { useModalAction } from '@/components/common/modal/modalContext';

const ActionsButton: React.FC<{ item?: any }> = ({ item }) => {
  const { openDrawer, setDrawerView } = useUI();
  const { openModal } = useModalAction();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{top: number; left: number}>({ top: 0, left: 0 });
  
  function handleOpenDetails(item: any) {
    // Open in drawer (right side)
    setDrawerView('ORDER_DETAILS');
    openDrawer(item);
    setOpen(false);
  }
  function handleOpenCancel(item: any) {
    openModal('CONFIRM_CANCEL_ORDER', item);
    setOpen(false);
  }

  function toggleMenu() {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    // Position near the button, adjust for viewport
    const top = rect.bottom + 8;
    const left = Math.max(8, rect.right - 180);
    setCoords({ top, left });
    setOpen((v) => !v);
  }

  // Close on scroll/resize/outside ESC
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggleMenu}
        className="px-3 py-2 rounded-md inline-flex items-center text-base focus:outline-none"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <BsThreeDots style={{ color: 'rgba(140, 150, 159, 1)' }} size={20} />
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div
            className="absolute z-50 bg-white drop-shadow rounded py-2 table-more-menu"
            style={{ top: coords.top, left: coords.left, minWidth: 180 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="text-[14px] whitespace-nowrap text-brand-dark py-2 px-5 hover:bg-[#F6F9FC] transition-all cursor-pointer"
              onClick={() => handleOpenDetails(item)}
              role="menuitem"
            >
              Order Details
            </div>
            <div
              className="text-[14px] whitespace-nowrap text-[#F35C5C] py-2 px-5 hover:bg-[#F6F9FC] transition-all cursor-pointer"
              onClick={() => handleOpenCancel(item)}
              role="menuitem"
            >
              Cancel Order
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ActionsButton;
