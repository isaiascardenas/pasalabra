import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Rosco(props) {
  console.log(props.rosco);
  const letras = props.rosco.palabras.map((letra) =>
    <div className="col-span-1">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="truncate text-sm font-medium text-gray-900">{letra.pivot.letra}</h3>
        </div>
        <p class="mt-1 truncate text-sm text-gray-500">{letra.palabra}</p>
      </div>
    </div>
  );
    return (
        <>
<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p className="py-12">Rosco</p>
  <div className="grid h-screen place-items-center">
  <div className="overflow-hidden rounded-lg bg-white shadow">
  <div className="px-4 py-5 sm:p-6">
      <div className="grid grid-cols-12 gap-2">
      {letras}
      </div>
  </div>
  </div>
</div>
      </div>
        </>
    );
}
