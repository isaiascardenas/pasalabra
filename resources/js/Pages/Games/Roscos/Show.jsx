import RoscoLayout from './RoscoLayout';
import React, { Component } from 'react';
import { Inertia } from '@inertiajs/inertia';

class RoscoShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 183,
      start: false,
      timerInterval: null,
    };
  }

  startRosco = () => {
    console.log('iniciar rosco');
    this.setState({
      start: true,
      timerInterval: this.setInterval(() => {
        console.log('update timer');
        this.setState({ time: this.state.time - 1 });
      }, 1000),
    });

    this.setInterval(() => {
      console.log('Interval triggered');
      this.setState({ time: this.state.time - 1 });
    }, 1000);

    this.useEffect(() => {
      setTimeout(() => {
        this.setState({ time: this.state.time - 1 });
        //setTimeLeft(calculateTimeLeft());
      }, 1000);
    });
    //Inertia.post(route('roscos.start', this.props.rosco.id));
  };

  stopRosco = () => {
    console.log('parar rosco');
    this.setState({ start: false });
    return;
    Inertia.post(route('roscos.stop', this.props.rosco.id));
  };

  changeEstado = (palabra, estado) => {
    console.log(palabra, estado);
    Inertia.post(
      route('roscos.palabras.estado', palabra.id),
      {
        estado: estado,
      },
      {
        preserveScroll: true,
      }
    );
  };

  getStateBadge = (estado) => {
    if (estado == 'pasapalabra') {
      return (
        <span className="inline-block flex-shrink-0 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
          Pasapalabra
        </span>
      );
    } else if (estado == 'correcto') {
      return (
        <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
          Correcta
        </span>
      );
    } else if (estado == 'incorrecto') {
      return (
        <span className="inline-block flex-shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
          Incorrecta
        </span>
      );
    }
    return (
      <span className="inline-block flex-shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
        Inicial
      </span>
    );
  };

  getLetraRosco = (letra) => {
    let buttons;

    if (letra.estado == 'inicial' || letra.estado == 'pasapalabra') {
      buttons = (
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            onClick={ () => this.changeEstado(letra, 'correcto') }
            className="inline-flex justify-center w-full px-4 py-2 text-base font-semibold text-green-600 border border-transparent border-green-500 bg-green-50 rounded-md shadow-sm hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
          >
            Correcto
          </button>
          <button
            type="button"
            onClick={ () => this.changeEstado(letra, 'incorrecto') }
            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-semibold text-red-600 border border-transparent border-red-500 bg-red-50 rounded-md shadow-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
          >
            Incorrecto
          </button>
          <button
            type="button"
            onClick={ () => this.changeEstado(letra, 'pasapalabra') }
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent col-span-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
          >
            Pasapalabra
          </button>
        </div>
      );
    }

    return (
      <li
        key={letra.id}
        className="bg-white rounded-lg shadow col-span-1 divide-y divide-gray-200"
      >
        <div className="items-center justify-between w-full p-6 space-x-6">
          <div className="inline-block w-full">
            <div className="flex items-center justify-between space-x-3">
              <h3 className="text-lg font-semibold text-gray-900 flex-3">
                <strong>
                  {letra.letra == letra.palabra.inicial
                    ? letra.letra
                    : 'contiene ' + letra.letra}
                  :
                </strong>{' '}
                {letra.palabra.palabra}
              </h3>
              {this.getStateBadge(letra.estado)}
            </div>
            <p className="inline-block mt-5 text-sm text-gray-500">
              {letra.definicion}
            </p>
          </div>
          {buttons}
        </div>
      </li>
    );
  };

  render() {
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
                  {this.props.rosco.palabras_roscos.map((letra) =>
                    this.getLetraRosco(letra)
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <RoscoLayout></RoscoLayout>
      </>
    );
  }
}

export default RoscoShow;
