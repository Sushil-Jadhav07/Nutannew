import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';
import cn from 'classnames';
import Image from '@/components/shared/image';
import { productPlaceholder } from '@/assets/placeholders';
import { siteNavigation } from '@/data/navigation-settings';

function normalize(str?: string) {
  return (str || '').trim().toLowerCase();
}

export default function SubcategoryBar() {
  const { pathname } = useLocation();

  // Determine active main category from navbar config (by label match)
  const active = useMemo(() => {
    // current slug last segment
    const parts = pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || '';

    // map expected labels to slugs we set earlier
    const labelBySlug: Record<string, string> = {
      'bags-carry-items': 'Bags & Carry Items',
      'tech-gadgets': 'Tech & Gadgets',
      'office-stationery': 'Office & Stationery',
      'drinkware': 'Drinkware',
      'gift-sets-kits': 'Gift Sets & Kits',
      'eco-lifestyle': 'Eco Lifestyle',
      'events-conference-essentials': 'Events & Conference Essentials',
    };

    const label = labelBySlug[normalize(last)] || '';
    if (!label) return null;

    const item = siteNavigation.menu.find((m: any) => m.label === label);
    return item || null;
  }, [pathname]);

  if (!active?.subMenu?.length) return null;

  return (
    <div className="mb-4">
      <div className="flex gap-4 overflow-x-auto py-2">
        {active.subMenu.map((s: any, idx: number) => (
          <RouterLink
            key={idx}
            to={`/category/${(pathname.split('/').filter(Boolean).pop()||'')}/${(s.label||'').toLowerCase().replace(/\s+/g,'-')}`}
            className={cn('min-w-[200px] bg-white rounded-md border border-border-base hover:shadow transition')}
          >
            <div className="p-3 flex flex-col items-start">
              <div className="w-full h-[110px] overflow-hidden rounded">
                <Image
                  src={s.image?.original || s.image?.thumbnail || productPlaceholder}
                  alt={s.label}
                  width={220}
                  height={110}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2 text-sm font-medium text-brand-dark">{s.label}</div>
            </div>
          </RouterLink>
        ))}
      </div>
    </div>
  );
}


