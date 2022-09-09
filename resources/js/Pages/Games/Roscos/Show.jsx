import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {
  console.log(props.rosco);

  const letras = props.rosco.palabras.map((letra) => (
    <li
      key={letra.id}
      className="bg-white rounded-lg shadow col-span-1 divide-y divide-gray-200"
    >
      <div className="items-center justify-between w-full p-6 space-x-6">
        <div className="inline-block w-full">
          <div className="flex items-center justify-between space-x-3">
            <h3 className="text-lg font-semibold text-gray-900 flex-3">
              <strong>{letra.inicial == letra.pivot.letra ? letra.inicial : 'contiene ' + letra.pivot.letra}:</strong> {letra.palabra}
            </h3>
            <span className="inline-block flex-shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
              Nueva
            </span>
          </div>
          <p className="inline-block mt-5 text-sm text-gray-500">
            {letra.pivot.definicion}
          </p>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-semibold text-green-600 border border-transparent border-green-500 bg-green-50 rounded-md shadow-sm hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 sm:col-start-2 sm:text-sm">Correcto</button>
          <button type="button" className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-semibold text-red-600 border border-transparent border-red-500 bg-red-50 rounded-md shadow-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm">Incorrecto</button>
          <button type="button" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent col-span-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">Pasapalabra</button>

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
