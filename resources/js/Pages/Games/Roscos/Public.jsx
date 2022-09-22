import React, { Component } from 'react';

class RoscoPublic extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.rosco);
    this.state = {
      palabras: this.props.rosco.palabras_roscos,
      start: false,
      time: 183,
    };

    window.Echo.private(`roscos.${props.rosco.id}`)
    .listen(
      'PalabraStatusUpdated',
      (e) => {
        console.log(e['palabra-rosco']);
        this.setLetra(e['palabra-rosco']);
      }
    )
    .listen(
      'RoscoStart',
      (e) => {
        console.log(e['rosco']);
        this.startRosco();
      }
    )
    .listen(
      'RoscoStop',
      (e) => {
        console.log(e['rosco']);
        this.stopRosco();
      }
    );
  }

  startRosco = () => {
    console.log('iniciar rosco');
    this.setState({ start: true });
  };

  stopRosco = () => {
    console.log('parar rosco');
    this.setState({ start: false });
  };

  setLetra = (palabraRosco) => {
    this.setState((state) => {
      let palabras = this.state.palabras;
      let word = window._.remove(this.state.palabras, (l) => {
        return l.id == palabraRosco.id;
      })[0];

      word.estado = palabraRosco.estado;

      palabras.push(word);
      palabras = window._.orderBy(palabras, ['id']);

      return {
        palabras,
      };
    });
  };

  letraRosco = (letra) => {
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
  };

  render() {
    return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p className="justify-center py-12">Rosco</p>
        <div className="justify-center grid">
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="-mb-4 grid grid-cols-9 gap-2">
                <div className="mx-auto col-span-1 col-start-5">
                  {this.letraRosco(this.state.palabras[0])}
                </div>
              </div>
              <div className="mb-1 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-4">
                  {this.letraRosco(this.state.palabras[24])}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {this.letraRosco(this.state.palabras[1])}
                </div>
              </div>
              <div className="my-1 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-3">
                  {this.letraRosco(this.state.palabras[23])}
                </div>
                <div className="mx-auto col-span-1 col-start-8">
                  {this.letraRosco(this.state.palabras[2])}
                </div>
              </div>
              <div className="my-1 grid grid-cols-8 gap-2">
                <div className="mx-auto col-span-1 col-start-2">
                  {this.letraRosco(this.state.palabras[22])}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {this.letraRosco(this.state.palabras[3])}
                </div>
              </div>
              <div className="my-2 grid grid-cols-4 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {this.letraRosco(this.state.palabras[21])}
                </div>
                <div className="mx-auto col-span-1 col-start-4">
                  {this.letraRosco(this.state.palabras[4])}
                </div>
              </div>
              <div className="my-3 grid grid-cols-7 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {this.letraRosco(this.state.palabras[20])}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {this.letraRosco(this.state.palabras[5])}
                </div>
              </div>

              <div className="my-3 grid grid-cols-12 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {this.letraRosco(this.state.palabras[19])}
                </div>
                <div className="mx-auto col-span-1 col-start-12">
                  {this.letraRosco(this.state.palabras[6])}
                </div>
              </div>

              <div className="my-3 grid grid-cols-7 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {this.letraRosco(this.state.palabras[18])}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {this.letraRosco(this.state.palabras[7])}
                </div>
              </div>
              <div className="my-2 grid grid-cols-4 gap-2">
                <div className="mx-auto col-span-1 col-start-1">
                  {this.letraRosco(this.state.palabras[17])}
                </div>
                <div className="mx-auto col-span-1 col-start-4">
                  {this.letraRosco(this.state.palabras[8])}
                </div>
              </div>
              <div className="my-1 grid grid-cols-8 gap-2">
                <div className="mx-auto col-span-1 col-start-2">
                  {this.letraRosco(this.state.palabras[16])}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {this.letraRosco(this.state.palabras[9])}
                </div>
              </div>
              <div className="my-1 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-3">
                  {this.letraRosco(this.state.palabras[15])}
                </div>
                <div className="mx-auto col-span-1 col-start-8">
                  {this.letraRosco(this.state.palabras[10])}
                </div>
              </div>
              <div className="mb-1 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-4">
                  {this.letraRosco(this.state.palabras[14])}
                </div>
                <div className="mx-auto col-span-1 col-start-7">
                  {this.letraRosco(this.state.palabras[11])}
                </div>
              </div>
              <div className="-mt-4 grid grid-cols-10 gap-2">
                <div className="mx-auto col-span-1 col-start-5">
                  {this.letraRosco(this.state.palabras[13])}
                </div>
                <div className="mx-auto col-span-1 col-start-6">
                  {this.letraRosco(this.state.palabras[12])}
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
    );
  }
}

export default RoscoPublic;
