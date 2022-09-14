import React from 'react';

export default function Rosco(props) {
  window.Echo.private(`roscos.${props.rosco.id}`).listen(
    'PalabraStatusUpdated',
    (e) => {
      console.log('event', e);
    }
  );
  console.log(window.Echo);

  //window.Echo.private(`App.Roscos.${props.rosco.id}`).notification((data) => {
  //console.log(data);
  //});

  const letras = props.rosco.palabras_roscos.map((letra) => {
    if (letra.estado == 'pasapalabra') {
      return (
        <div key={letra.id} className="flex items-center space-x-3">
          <span className="text-lg font-bold text-center text-white uppercase bg-yellow-500 rounded-full w-7 h-7">
            {letra.letra}
          </span>
        </div>
      );
    } else if (letra.estado == 'correcto') {
      return (
        <div key={letra.id} className="flex items-center space-x-3">
          <span className="text-lg font-bold text-center text-white uppercase bg-green-600 rounded-full w-7 h-7">
            {letra.letra}
          </span>
        </div>
      );
    } else if (letra.estado == 'incorrecto') {
      return (
        <div key={letra.id} className="flex items-center space-x-3">
          <span className="text-lg font-bold text-center text-white uppercase bg-red-600 rounded-full w-7 h-7">
            {letra.letra}
          </span>
        </div>
      );
    }
    return (
      <div key={letra.id} className="flex items-center space-x-3">
        <span className="text-lg font-bold text-center text-white uppercase bg-indigo-600 rounded-full w-7 h-7">
          {letra.letra}
        </span>
      </div>
    );
  });

  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p className="py-12">Rosco</p>
        <div className="justify-center grid">
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="-mb-4 grid grid-cols-9 gap-2">
                <div className="mx-auto col-span-1 col-start-5">
                  {letras[0]}
                </div>
              </div>
              <div className="mb-1 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-4">
                  {letras[24]}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {letras[1]}
                </div>
              </div>
              <div className="my-1 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-3">
                  {letras[23]}
                </div>
                <div className="mx-auto col-span-1 col-start-8">
                  {letras[2]}
                </div>
              </div>
              <div className="my-1 grid grid-cols-8 gap-2">
                <div className="mx-auto col-span-1 col-start-2">
                  {letras[22]}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {letras[3]}
                </div>
              </div>
              <div className="my-2 grid grid-cols-4 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {letras[21]}
                </div>
                <div className="mx-auto col-span-1 col-start-4">
                  {letras[4]}
                </div>
              </div>
              <div className="my-3 grid grid-cols-7 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {letras[20]}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {letras[5]}
                </div>
              </div>

              <div className="my-3 grid grid-cols-12 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {letras[19]}
                </div>
                <div className="mx-auto col-span-1 col-start-12">
                  {letras[6]}
                </div>
              </div>

              <div className="my-3 grid grid-cols-7 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {letras[18]}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {letras[7]}
                </div>
              </div>
              <div className="my-2 grid grid-cols-4 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {letras[17]}
                </div>
                <div className="mx-auto col-span-1 col-start-4">
                  {letras[8]}
                </div>
              </div>
              <div className="my-1 grid grid-cols-8 gap-2">
                <div className="mx-auto col-span-1 col-start-2">
                  {letras[16]}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {letras[9]}
                </div>
              </div>
              <div className="my-1 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-3">
                  {letras[15]}
                </div>
                <div className="mx-auto col-span-1 col-start-8">
                  {letras[10]}
                </div>
              </div>
              <div className="mb-1 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-4">
                  {letras[14]}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {letras[1]}
                </div>
              </div>
              <div className="-mt-4 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-5">
                  {letras[13]}
                </div>
                <div className="mx-auto col-span-1 col-start-6">
                  {letras[12]}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <span className="flex items-center justify-center w-16 h-16 text-xl font-bold text-center text-white uppercase bg-indigo-600 rounded-full">
              183
            </span>
          </div>
          <div className="flex space-x-3">
            <span className="flex items-center justify-center w-16 h-16 text-xl font-bold text-center text-white uppercase bg-green-600 rounded-full">
              0
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
