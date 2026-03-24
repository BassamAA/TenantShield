'use client';

import { useState, useEffect } from 'react';

export type CurrencyInfo = {
  currency: 'CAD' | 'USD';
  symbol: string;
  oneTimePrice: string;
  subPrice: string;
  country: string | null;
  loading: boolean;
};

const USD: Omit<CurrencyInfo, 'country' | 'loading'> = {
  currency: 'USD',
  symbol: '$',
  oneTimePrice: '9.99',
  subPrice: '19.99',
};

const CAD: Omit<CurrencyInfo, 'country' | 'loading'> = {
  currency: 'CAD',
  symbol: 'CA$',
  oneTimePrice: '13.99',
  subPrice: '26.99',
};

export function useCurrency(): CurrencyInfo {
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check sessionStorage cache first
    const cached = sessionStorage.getItem('ts_country');
    if (cached) {
      setCountry(cached);
      setLoading(false);
      return;
    }

    fetch('/api/geo')
      .then((r) => r.json())
      .then((data: { country: string }) => {
        sessionStorage.setItem('ts_country', data.country);
        setCountry(data.country);
      })
      .catch(() => setCountry('US'))
      .finally(() => setLoading(false));
  }, []);

  const pricing = country === 'CA' ? CAD : USD;

  return { ...pricing, country, loading };
}
