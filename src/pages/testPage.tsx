import React, { useState, useCallback, memo } from 'react';

// ChildComponent için prop tipleri
interface ChildComponentProps {
  onClick: () => void;
  label: string;
}

// Memoize edilmiş alt bileşen
const ChildComponent = memo(({ onClick, label }: ChildComponentProps) => {
  console.log(`${label} bileşeni render edildi`);
  return <button onClick={onClick}>{label}</button>;
});

export const TESTT = () => {
  const [count, setCount] = useState<number>(0);
  const [randomNumber, setRandomNumber] = useState<number>(Math.random());

  // useCallback kullanılmadan fonksiyon tanımlanıyor
  const increment = () => {
    setCount(count + 1);
  };

  // useCallback kullanarak fonksiyon memoize ediliyor
  const incrementWithCallback = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
    console.log("örnek");
  }, []); // Bağımlılık dizisi boş, çünkü setCount fonksiyonu değişmiyor

  // Rastgele bir sayı üreten fonksiyon
  const generateRandomNumber = () => {
    setRandomNumber(Math.random());
  };

  console.log('ParentComponent render edildi');

  return (
    <div>
      <p>Sayı: {count}</p>
      <p>Rastgele Sayı: {randomNumber}</p>

      {/* useCallback kullanılmayan buton */}
      <ChildComponent onClick={increment} label="Artır (Callback Yok)" />
      <br></br>
      {/* useCallback kullanılan buton */}
      <ChildComponent onClick={incrementWithCallback} label="Artır (Callback Var)" />
        <br></br>
      {/* Rastgele sayı üreten buton */}
      <button onClick={generateRandomNumber}>Rastgele Sayı Üret</button>
    </div>
  );
};
export default TESTT;