import React, { Component, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

class RoscoLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 200,
      start: false,
      timerInterval: null,
    };
  }

  startRosco = () => {
    this.setState({
      start: true,
      timerInterval: setInterval(() => {
        this.setState({ time: this.state.time - 1 });
      }, 1000),
    });
    Inertia.post(route('roscos.start', this.props.rosco.id));
  };

  stopRosco = () => {
    this.setState({
      start: false,
      timerInterval: clearInterval(this.state.timerInterval),
    });
    Inertia.post(route('roscos.stop', this.props.rosco.id), {
      time: this.state.time,
    });
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

  render() {
    return (
      <>
        <div className="flex justify-between items-center fixed bottom-0 right-0 left-0 mx-auto my-12 max-w-7xl sm:px-0">
          <span className="items-center p-4 text-white text-lg font-semibold bg-indigo-600 border border-transparent rounded-full shadow-xl">
          { this.state.time }
          </span>

            {this.state.start ? (
              <button
                type="button"
                onClick={this.stopRosco}
                className="items-center p-4 text-white bg-yellow-500 border border-transparent rounded-full shadow-xl hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={this.startRosco}
                className="items-center p-4 text-white bg-green-500 border border-transparent rounded-full shadow-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </button>
            )}
            <span className="ml-3 items-center px-5 py-4 text-white text-lg font-semibold bg-green-600 border border-transparent rounded-full shadow-xl">
              12
            </span>
        </div>
      </>
    );
  }
}

export default RoscoLayout;
