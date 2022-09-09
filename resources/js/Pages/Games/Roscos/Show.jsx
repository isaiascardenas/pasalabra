import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {
  console.log(props.rosco);

  const letras = props.rosco.palabras.map((letra) => (
    <li
      key={letra.id}
      className="bg-white rounded-lg shadow col-span-1 divide-y divide-gray-200"
    >
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">
              <strong>{letra.inicial == letra.pivot.letra ? letra.inicial : 'contiene ' + letra.pivot.letra}:</strong> {letra.palabra}
            </h3>
            <span className="inline-block flex-shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
              Nueva
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {letra.pivot.definicion}
          </p>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="h-screen grid place-items-center">
          <h3 className="text-xl font-semibold">Rosco</h3>
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {letras}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
