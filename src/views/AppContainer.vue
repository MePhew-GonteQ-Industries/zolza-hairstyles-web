<template>
  <div
    id="app-wrapper"
    :data-theme="$store.state.settings.theme"
  >
    <main :class="{ collapsed: !onHomePage }">
      <div
        id="nav"
        :class="navbarClasses"
      >
        <navbarSection />
      </div>
      <CustomSidebar class="sidebar" />
      <div
        class="wrapper"
        v-if="onHomePage"
      >
        <section class="hero">
          <!-- eslint-disable max-len -->
          <svg
            class="wordmark"
            version="1.1"
            viewBox="0 0 181.29895 41.661442"
            id="svg88"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs id="defs92">
              <clipPath id="cp0">
                <path
                  transform="matrix(1,0,0,-1,0,99.2126)"
                  d="M 0,99.213 H 325.984 V 0 H 0 Z"
                  id="path4"
                />
              </clipPath>
            </defs>
            <path
              d="m 10.241474,1.2071369 c -0.5670001,-0.015 -6.6650001,-0.005 -7.1490001,0.035 -0.412,0.034 -0.761,-0.178 -0.706,-0.40799998 0.076,-0.318 0.345,-0.38 0.619,-0.388 0.487,-0.014 6.109,-0.026 8.4180001,-0.012 0.311,0.002 0.622,-0.004 0.932,0.02 0.417,0.032 0.61,0.345 0.511,0.77499998 -0.171,0.734 -10.0030001,31.6830001 -10.0960001,32.1170001 -0.094,0.435 0.096,0.665 0.557,0.698 0.31,0.022 5.194,-0.02 7.3240001,-0.029 0.146,-0.001 0.292,0.009 0.437,0.026 0.117,0.015 0.268,0.014 0.368,0.084 0.113,0.078 0.13,0.255 0.101,0.379 -0.009,0.041 -0.025,0.082 -0.055,0.11 -0.115,0.109 -0.304,0.12 -0.452,0.126 -0.184,0.008 -0.368,0.021 -0.551,0.021 -0.7460001,0 -8.2080001,-0.02 -8.9600001,-0.005 -0.22,0.004 -0.71700001,0.005 -0.93800001,0.005 -0.81,0 -0.634,-0.446 -0.43,-1.169 0.193,-0.683 0.397,-1.364 0.61,-2.039 C 1.5564739,29.098137 9.7674739,2.8521369 10.241474,1.2071369"
              fill="currentColor"
              id="path27"
            />
            <path
              d="m 30.533974,34.397538 c 1.382,-0.008 2.755,-0.273 4.021,-0.831 2.37,-1.045 4.225,-3.027 5.575,-5.238 2.507,-4.105 3.423,-9.156 2.518,-13.881 -1.409,-7.3550001 -7.533,-14.98400008 -15.754,-13.54200008 -2.823,0.49499998 -5.439,2.04099998 -7.287,4.23199998 -1.255,1.489 -2.158,3.254 -2.787,5.0970001 -2.092,6.136 -0.994,13.31 2.996,18.419 1.717,2.199 3.962,4.03 6.576,5.003 1.319,0.491 2.735,0.75 4.142,0.741 m -17.433,-16.688 c -0.018,-1.889 0.251,-3.78 0.807,-5.585 1.489,-4.8330001 5.103,-9.0290001 9.776,-10.9600001 3.659,-1.51199998 7.917,-1.55899998 11.599,-0.098 3.627,1.441 6.458,4.096 8.348,7.504 1.242,2.2380001 2.028,4.7330001 2.245,7.2840001 0.45,5.275 -1.532,10.709 -5.274,14.455 -3.131,3.134 -7.543,5.083 -11.964,4.808 -2.777,-0.173 -5.471,-1.201 -7.768,-2.773 -2.883,-1.973 -5.165,-4.812 -6.473,-8.052 -0.842,-2.087 -1.273,-4.333 -1.296,-6.583"
              fill="currentColor"
              id="path29"
            />
            <path
              d="m 52.197574,33.397538 c 0,0.317 0.035,0.512 0.412,0.512 0.451,0 4.247,0.029 5.452,0.037 0.25,0.001 0.514,0.055 0.514,0.43 0,0.262 -0.188,0.367 -0.447,0.367 h -7.791 c -0.948,0 -0.885,-0.307 -0.885,-0.851 0,-1.199 -0.088,-32.3690001 -0.058,-32.8840001 0.021,-0.37699998 0.2,-0.56999998 0.552,-0.59099998 0.471,-0.03 0.946,-0.037 1.418,-0.014 0.413,0.021 0.6,0.225 0.617,0.67499998 0.025,0.688 0.172,30.8590001 0.216,32.3190001"
              fill="currentColor"
              id="path31"
            />
            <path
              d="m 69.270274,1.2071369 c -0.567,-0.015 -6.664,-0.005 -7.149,0.035 -0.413,0.034 -0.76,-0.178 -0.705,-0.40799998 0.075,-0.318 0.344,-0.38 0.618,-0.388 0.488,-0.014 6.109,-0.026 8.419,-0.012 0.31,0.002 0.622,-0.004 0.93,0.02 0.418,0.032 0.612,0.345 0.511,0.77499998 -0.17,0.734 -10.002,31.6830001 -10.095,32.1170001 -0.093,0.435 0.096,0.665 0.557,0.698 0.31,0.022 5.193,-0.02 7.324,-0.029 0.147,-0.001 0.292,0.009 0.437,0.026 0.118,0.015 0.268,0.014 0.369,0.084 0.111,0.078 0.129,0.255 0.1,0.379 -0.009,0.041 -0.025,0.082 -0.055,0.11 -0.115,0.109 -0.304,0.12 -0.452,0.126 -0.183,0.008 -0.369,0.021 -0.551,0.021 -0.746,0 -8.207,-0.02 -8.96,-0.005 -0.22,0.004 -0.717,0.005 -0.939,0.005 -0.808,0 -0.633,-0.446 -0.428,-1.169 0.192,-0.683 0.396,-1.364 0.609,-2.039 0.775,-2.455 8.986,-28.7010001 9.46,-30.3460001"
              fill="currentColor"
              id="path33"
            />
            <path
              d="m 82.240074,17.053338 c -0.925,-4.626 -2.807,-14.4750001 -2.899,-14.4950001 -0.11,0.496 -0.311,1.574 -0.4,2.076 -0.709,4.01 -2.167,12.6470001 -2.272,13.1900001 -0.033,0.169 -0.141,0.479 0.073,0.479 1.303,0.009 4.233,0.009 5.536,0.001 0.131,-0.001 0.187,-0.215 -0.038,-1.251 m 5.662,17.048 c 0.064,0.334 -0.193,0.642 -0.532,0.642 h -1.373 c -0.349,0 -0.412,-0.413 -0.467,-0.641 -0.222,-0.928 -2.426,-12.313 -2.686,-13.941 -0.157,-0.988 -0.174,-1.253 -0.54,-1.253 -0.521,0.019 -5.518,-0.013 -5.691,-0.013 -0.141,0 -0.211,0.198 -0.294,0.623 -0.174,0.895 -1.762,10.137 -2.396,13.86 -0.05,0.29 -0.149,0.81 -0.207,1.118 -0.029,0.143 -0.154,0.247 -0.3,0.247 h -0.379 c -0.126,0 -0.052,-0.252 0.036,-0.711 0.211,-1.108 5.497,-30.3560001 5.919,-32.9480001 0.108,-0.66699998 0.41,-0.66499998 1.105,-0.66499998 1.019,0 1.089,-0.002 1.261,0.60099998 0.66,3.278 1.502,7.2 2.153,10.4790001 1.197,6.033 3.786,19.401 4.391,22.602"
              fill="currentColor"
              id="path35"
            />
            <path
              d="m 107.28207,19.381938 c 0,4.109 -0.012,14.404 -0.049,14.736 -0.033,0.298 -0.244,0.486 -0.54,0.543 -0.059,0.012 -0.121,0.016 -0.182,0.021 -0.681,0.054 -0.892,-0.113 -0.902,-0.807 -0.018,-1.341 -0.018,-10.533 -0.004,-14.555 0.003,-1.05 -0.136,-2.712 -1.386,-2.999 -1.176,-0.271 -2.179,0.852 -2.25,1.96 -0.024,0.364 -0.128,14.393 -0.128,15.916 0,0.332 -0.24,0.456 -0.576,0.484 -0.151,0.013 -0.304,0.013 -0.456,0.002 -0.3,-0.023 -0.458,-0.16 -0.487,-0.444 -0.022,-0.211 -0.02,-0.425 -0.02,-0.638 0.002,-7.607 0.005,-10.829 0.012,-21.509 0,-0.396 0.003,-0.793 0.03,-1.188 0.019,-0.284 0.183,-0.439 0.459,-0.483 0.121,-0.019 0.244,-0.027 0.365,-0.027 0.583,-0.001 0.754,0.152 0.758,0.764 0.013,1.981 0.01,-0.422 0.014,1.559 0.002,1.159 0.002,2.316 0.005,3.475 0,0.148 0.015,0.297 0.033,0.62 -0.008,-0.144 0.504,-0.507 0.62,-0.596 0.267,-0.201 0.561,-0.369 0.872,-0.49 0.583,-0.226 1.24,-0.296 1.839,-0.091 1.487,0.507 1.973,2.345 1.973,3.747"
              fill="currentColor"
              id="path37"
            />
            <path
              d="m 115.38557,22.430738 c 0,-0.427 -1.024,0.77 -1.172,0.922 -0.719,0.745 -1.439,1.489 -1.868,2.453 -0.942,2.121 -1.24,4.626 -0.518,6.857 0.25,0.773 0.599,1.9 1.617,1.681 1.891,-0.407 1.897,-2.865 1.927,-4.373 0.026,-1.277 0.007,-1.316 0.007,-2.594 h 0.003 c 0,-1.368 0.003,-2.738 -0.004,-4.106 -0.002,-0.202 0.008,-0.41 0.008,-0.84 m 1.361,2.249 c 0.006,0.847 -0.026,9.381 -0.049,9.623 -0.019,0.2 -0.143,0.344 -0.345,0.37 -0.21,0.027 -0.425,0.032 -0.636,0.019 -0.231,-0.015 -0.392,-0.173 -0.42,-0.409 -0.036,-0.298 -0.049,-0.351 -0.079,-0.747 -0.269,0.29 -0.425,0.448 -0.675,0.727 -0.841,0.936 -2.285,0.839 -3.023,0.336 -0.429,-0.293 -0.778,-0.687 -1.006,-1.157 -0.505,-1.045 -0.646,-2.207 -0.622,-3.356 0.016,-0.809 0.132,-1.641 0.411,-2.412 0.299,-0.828 0.806,-1.534 1.369,-2.202 0.46,-0.545 0.922,-1.088 1.452,-1.566 0.708,-0.639 1.444,-1.436 2.033,-2.17 0.323,-0.402 0.243,-0.825 0.238,-1.336 -0.007,-0.853 0.069,-2.798 -0.771,-3.637 -0.572,-0.573 -1.365,-0.742 -2.072,-0.348 -0.681,0.379 -1.007,1.111 -1.178,1.839 -0.25,1.067 -0.297,2.15 -0.345,3.24 -0.006,0.148 -0.024,0.312 -0.093,0.436 -0.076,0.135 -0.257,0.165 -0.394,0.111 -0.185,-0.073 -0.228,-0.231 -0.233,-0.414 -0.044,-1.868 0.308,-4.005 1.724,-5.354 0.846,-0.804 2.402,-1.061 3.395,-0.388 0.922,0.625 1.303,1.847 1.332,2.912 0.002,0.054 0.003,0.109 0.002,0.163 -0.015,2.041 -0.027,3.679 -0.015,5.72"
              fill="currentColor"
              id="path39"
            />
            <path
              d="m 121.35237,34.566538 c -0.305,0.167 -0.785,0.154 -1.104,0.029 -0.12,-0.047 -0.247,-0.198 -0.276,-0.324 -0.053,-0.233 -0.054,-17.601 -0.047,-17.753 0.027,-0.576 0.206,-0.739 0.803,-0.73 0.121,0.002 0.243,0.012 0.363,0.032 0.235,0.041 0.391,0.184 0.418,0.42 0.03,0.272 0.056,17.489 0.052,17.58 -0.01,0.267 0.082,0.586 -0.209,0.746 m -1.63,-23.211 c 0,-0.687 0.458,-1.245 1.024,-1.245 0.564,0 1.022,0.558 1.022,1.245 0,0.688 -0.458,1.245 -1.022,1.245 -0.566,0 -1.024,-0.557 -1.024,-1.245"
              fill="currentColor"
              id="path41"
            />
            <path
              d="m 130.86507,20.727638 c -0.002,0.458 -0.146,0.579 -0.611,0.602 -0.062,0.002 -0.122,0.002 -0.184,0.002 -0.598,-0.004 -0.734,-0.093 -0.734,-0.669 0,-0.699 0.005,-1.122 0.007,-1.822 10e-4,-0.516 0.017,-1.051 -0.154,-1.546 -0.158,-0.458 -0.506,-0.969 -1.039,-0.991 -0.807,-0.034 -1.78,0.758 -1.78,3.146 0.019,5.064 0.033,14.32 0.03,14.386 -0.011,0.268 0.082,0.586 -0.21,0.746 -0.304,0.167 -0.785,0.155 -1.104,0.03 -0.119,-0.047 -0.246,-0.198 -0.276,-0.324 -0.052,-0.234 -0.053,-17.629 -0.047,-17.781 0.027,-0.576 0.206,-0.739 0.802,-0.731 0.122,0.002 0.244,0.013 0.364,0.034 0.235,0.04 0.392,0.183 0.418,0.419 0.005,0.039 0.009,0.422 0.013,1.051 0.265,-0.517 0.265,-0.517 0.429,-0.739 0.756,-1.025 2.511,-1.48 3.403,-0.39 0.413,0.504 0.627,1.187 0.642,1.834 0.02,1.006 0.034,1.737 0.031,2.743"
              fill="currentColor"
              id="path43"
            />
            <path
              d="m 133.88067,18.432738 c -0.073,0.745 0.063,1.46 0.273,2.17 0.672,2.27 2.516,3.784 3.986,5.53 1.727,2.053 2.706,5.025 0.851,7.335 -0.711,0.887 -1.802,1.548 -2.966,1.504 -2.525,-0.095 -3.597,-2.649 -3.565,-4.854 0.006,-0.426 0.027,-0.851 0.027,-1.276 0,-0.348 0.53,-0.522 0.82,-0.289 0.059,0.047 0.105,0.149 0.107,0.226 0.003,0.175 -0.034,0.351 -0.04,0.527 -0.057,1.508 0.133,3.132 1.036,4.393 0.728,1.017 2.064,1.187 3.049,0.48 1.254,-0.9 1.369,-2.712 0.938,-4.08 -0.106,-0.333 -0.246,-0.655 -0.428,-0.953 -0.677,-1.11 -1.452,-2.154 -2.357,-3.092 -1.072,-1.112 -1.937,-2.164 -2.531,-3.584 -0.585,-1.4 -0.674,-2.848 -0.178,-4.299 0.253,-0.743 0.718,-1.418 1.336,-1.905 1.612,-1.268 3.782,-0.81 4.919,0.847 0.639,0.931 0.883,2.226 0.848,3.329 -0.005,0.174 0.005,0.351 -0.04,0.519 -0.062,0.23 -0.32,0.369 -0.559,0.315 -0.201,-0.046 -0.274,-0.201 -0.291,-0.389 -0.126,-1.427 -0.301,-3.112 -1.25,-4.258 -0.475,-0.576 -1.195,-0.803 -1.955,-0.741 -0.942,0.078 -1.541,0.823 -1.827,1.644 -0.101,0.291 -0.173,0.594 -0.203,0.901"
              fill="currentColor"
              id="path45"
            />
            <path
              d="m 148.19317,30.330238 c -0.09,1.948 -0.809,4.487 -2.768,4.638 -0.727,0.055 -1.379,-0.255 -1.767,-0.882 -0.55,-0.889 -0.593,-2.068 -0.593,-3.081 v -0.014 c -0.028,-1.588 -0.037,-9.341 -0.039,-14.689 h -0.983 c -0.153,0 -0.277,-0.123 -0.277,-0.276 0,-0.152 0.124,-0.276 0.277,-0.276 h 0.983 c -0.001,-2.669 0,-4.616 0.002,-4.663 0.026,-0.576 0.206,-0.739 0.803,-0.73 0.121,10e-4 0.244,0.012 0.362,0.032 0.236,0.041 0.393,0.184 0.419,0.42 0.01,0.087 0.019,2.16 0.026,4.941 h 1.904 c 0.152,0 0.275,0.124 0.275,0.276 0,0.153 -0.123,0.276 -0.275,0.276 h -1.902 c 0.016,5.907 0.027,14.465 0.025,14.527 -0.002,0.044 -10e-4,0.089 0.001,0.136 0.024,0.553 -0.028,1.123 0.12,1.665 0.116,0.429 0.392,0.871 0.824,1.036 0.883,0.337 1.561,-0.533 1.785,-1.282 0.201,-0.677 0.192,-1.39 0.303,-2.082 0.029,-0.18 0.032,-0.376 0.251,-0.44 0.155,-0.045 0.258,0.183 0.244,0.468"
              fill="currentColor"
              id="path47"
            />
            <path
              d="m 156.98317,16.154442 c -0.061,0.421 -0.12,0.844 -0.207,1.26 -0.702,3.369 -3.359,15.819 -3.974,18.677 -0.485,2.263 -1.083,5.149 -1.175,5.405 -0.035,0.095 -0.106,0.165 -0.313,0.165 -0.189,0 -0.3,-0.014 -0.283,-0.148 0.036,-0.301 0.639,-2.977 1.015,-5.042 0,0 -0.084,-0.542 -0.148,-1.015 -0.23,-1.689 -0.492,-3.372 -0.748,-5.057 -0.114,-0.753 -1.427,-9.111 -1.704,-10.915 -0.148,-0.963 -0.295,-1.925 -0.436,-2.889 -0.021,-0.148 -0.134,-0.808 0.2,-0.808 0.301,0 0.549,0.004 0.824,0.004 0.495,0 0.52,0.059 0.645,0.374 0.078,0.196 0.129,0.406 0.163,0.614 0.292,1.803 2.161,14.522 2.229,14.842 h -0.009 0.009 c 0.33,-1.639 2.346,-11.404 2.791,-13.488 0.101,-0.476 0.19,-0.955 0.301,-1.43 0.055,-0.236 0.134,-0.468 0.222,-0.694 0.062,-0.155 0.202,-0.238 0.368,-0.198 0.164,0.04 0.255,0.171 0.23,0.343"
              fill="currentColor"
              id="path49"
            />
            <path
              d="m 160.48217,34.572338 c -0.305,0.168 -0.785,0.155 -1.104,0.03 -0.12,-0.047 -0.247,-0.199 -0.276,-0.324 -0.053,-0.233 -0.054,-22.995 -0.047,-23.147 0.027,-0.576 0.205,-0.739 0.803,-0.73 0.121,10e-4 0.243,0.011 0.362,0.032 0.236,0.041 0.393,0.184 0.419,0.42 0.03,0.271 0.056,22.882 0.053,22.974 -0.011,0.266 0.081,0.586 -0.21,0.745"
              fill="currentColor"
              id="path51"
            />
            <path
              d="m 165.40217,22.142238 c 0.007,0.401 0.137,0.54 0.557,0.558 0.484,0.021 0.97,0.004 1.456,0.004 v 0.004 c 0.486,0 0.972,0.015 1.457,-0.005 0.354,-0.015 0.506,-0.015 0.509,-0.358 0,-1.119 -0.114,-2.239 -0.276,-3.345 -0.128,-0.864 -0.599,-3.963 -2.125,-2.765 -0.141,0.11 -0.274,0.249 -0.362,0.403 -0.135,0.234 -0.237,0.49 -0.337,0.744 -0.553,1.399 -0.718,2.806 -0.852,4.288 -0.032,0.362 -0.034,0.108 -0.027,0.472 m 5.852,7.967 c -0.285,1.153 -0.605,2.318 -1.231,3.326 -0.472,0.76 -1.186,1.455 -2.075,1.551 -0.692,0.074 -1.385,-0.233 -1.9,-0.701 -0.514,-0.468 -0.872,-1.083 -1.169,-1.712 -1.945,-4.117 -2.123,-9.734 -0.227,-13.897 0.402,-0.883 0.917,-1.724 1.604,-2.407 0.366,-0.362 0.803,-0.689 1.313,-0.753 0.855,-0.108 1.621,0.543 2.125,1.243 1.173,1.628 1.589,3.697 1.574,5.703 -0.001,0.209 -0.024,0.452 -0.199,0.567 -0.106,0.07 -0.242,0.072 -0.369,0.071 -0.799,-0.001 -1.599,-0.003 -2.399,-0.005 -0.763,-0.002 -1.528,-0.004 -2.293,-0.006 -0.195,0 -0.422,0.015 -0.534,0.176 -0.064,0.094 -0.071,0.216 -0.075,0.331 -0.051,1.61 0.028,3.295 0.172,4.927 0.125,1.413 0.345,7.145 3.115,5.613 1.044,-0.577 1.489,-1.951 1.726,-3.042 0.278,-1.285 0.303,-2.607 0.464,-3.909 0.035,-0.285 0.199,-0.658 0.476,-0.586 0.193,0.05 0.258,0.287 0.278,0.484 0.096,1.017 -0.13,2.035 -0.376,3.026"
              fill="currentColor"
              id="path53"
            />
            <path
              d="m 175.17067,18.432738 c -0.073,0.745 0.063,1.46 0.273,2.17 0.673,2.27 2.516,3.784 3.986,5.53 1.728,2.053 2.706,5.025 0.851,7.335 -0.711,0.887 -1.802,1.548 -2.966,1.504 -2.525,-0.095 -3.597,-2.649 -3.565,-4.854 0.006,-0.426 0.028,-0.851 0.028,-1.276 0,-0.348 0.529,-0.522 0.819,-0.289 0.059,0.047 0.105,0.149 0.107,0.226 0.003,0.175 -0.033,0.351 -0.04,0.527 -0.057,1.508 0.133,3.132 1.036,4.393 0.728,1.017 2.064,1.187 3.05,0.48 1.253,-0.9 1.368,-2.712 0.937,-4.08 -0.105,-0.333 -0.246,-0.655 -0.428,-0.953 -0.677,-1.11 -1.452,-2.154 -2.357,-3.092 -1.072,-1.112 -1.937,-2.164 -2.531,-3.584 -0.585,-1.4 -0.674,-2.848 -0.178,-4.299 0.254,-0.743 0.718,-1.418 1.336,-1.905 1.613,-1.268 3.782,-0.81 4.919,0.847 0.64,0.931 0.883,2.226 0.848,3.329 -0.005,0.174 0.005,0.351 -0.04,0.519 -0.062,0.23 -0.32,0.369 -0.558,0.315 -0.202,-0.046 -0.275,-0.201 -0.292,-0.389 -0.126,-1.427 -0.301,-3.112 -1.25,-4.258 -0.475,-0.576 -1.195,-0.803 -1.954,-0.741 -0.943,0.078 -1.542,0.823 -1.828,1.644 -0.101,0.291 -0.173,0.594 -0.203,0.901"
              fill="currentColor"
              id="path55"
            />
            <path
              d="m 45.469574,28.470338 v -0.001 c 0,-0.193 0.157,-0.35 0.35,-0.35 h 14.009 c 0.194,0 0.35,0.157 0.35,0.35 v 0.001 c 0,0.193 -0.156,0.35 -0.35,0.35 h -14.009 c -0.193,0 -0.35,-0.157 -0.35,-0.35"
              fill="currentColor"
              id="path57"
            />
          </svg>
          <!-- eslint-enable max-len -->
          <!-- <h1 class="description">
            {{ t("app.description") }}
          </h1> -->
        </section>
        <i
          class="ph-caret-down-light"
          @click="scrollToServices"
          @keyup.down="scrollToServices"
        ></i>

        <!-- eslint-disable max-len -->
        <svg
          class="divider"
          data-name="Layer 1"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="shape-fill"
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
        <!-- eslint-enable max-len -->
      </div>
    </main>

    <router-view
      :scrolledToServices="scrolledToServices"
      class="router-view"
    />

    <footer>
      <contactSection />
    </footer>

    <n-drawer
      :show="showCookiesBanner"
      placement="bottom"
      :height="showNotificationsBanner ? 320 : 200"
      :block-scroll="false"
      :mask-closable="false"
    >
      <n-alert
        title="Informacja o plikach cookie"
        type="info"
        :bordered="showNotificationsBanner"
        closable
        class="banner"
        @close="acceptCookies"
      >
        <div class="banner-wrapper">
          <div>
            Używamy plików cookie, w następujących celach:
            <ul>
              <li>Usprawnienie i ułatwienie dostępu do Serwisu</li>
              <li>Personalizacja Serwisu dla Użytkowników</li>
              <li>Umożliwienie Logowania do serwisu</li>
              <li>
                Prowadzenie statystyk (użytkowników, ilości odwiedzin, rodzajów urządzeń, łącze
                itp.)
              </li>
            </ul>
          </div>
          <n-divider vertical />
          <div class="buttons">
            <router-link
              class="link"
              to="/cookies-policy"
              >Więcej informacji</router-link
            >
            <NButton
              type="success"
              size="large"
              @click="acceptCookies"
              >Zgadzam się</NButton
            >
          </div>
        </div>

        <template #icon>
          <i class="ph-cookie-light"></i>
        </template>
      </n-alert>
    </n-drawer>

    <n-drawer
      :show="
        !cooldown &&
        showNotificationsBanner &&
        !hideNotificationsBanner &&
        !showEmailConfirmationBanner
      "
      placement="bottom"
      :height="150"
      :block-scroll="false"
      :show-mask="false"
    >
      <n-alert
        :title="
          notificationsPermissionDenied
            ? 'Nie wyrażono zgody na otrzymywanie powiadomień'
            : 'Czy chcesz otrzymywać powiadomienia?'
        "
        :type="notificationsPermissionDenied ? 'error' : 'info'"
        :bordered="false"
        closable
        class="banner"
        @close="hideNotificationsBanner = true"
      >
        <div
          class="banner-wrapper"
          v-if="!notificationsPermissionDenied"
        >
          Włącz powiadomienia, aby otrzymywać przypomnienia o nadchodzących wizytach i nowych
          funkcjonalnościach
          <n-divider vertical />
          <div class="buttons">
            <NButton
              type="success"
              size="large"
              @click="enableNotifications"
              >Włącz powiadomienia
            </NButton>
            <NButton
              type="error"
              size="large"
              @click="disableNotifications"
              >Nie, dziękuję
            </NButton>
          </div>
        </div>
        <div
          class="banner-wrapper"
          v-else
        >
          Jeśli chcesz włączyć powiadomienia, wyraź zgodę na otrzymywanie powiadomień w swojej
          przeglądarce, a następnie włącz powiadomienia korzystając z przycisku obok
          <n-divider vertical />
          <div class="buttons">
            <NButton
              type="success"
              size="large"
              @click="enableNotifications"
              >Włącz powiadomienia
            </NButton>
            <NButton
              type="error"
              size="large"
              @click="disableNotifications"
              >Nie, dziękuję
            </NButton>
          </div>
        </div>
        <template #icon>
          <i class="ph-bell-ringing-light"></i>
        </template>
      </n-alert>
    </n-drawer>

    <n-drawer
      :show="!cooldown && showEmailConfirmationBanner"
      placement="bottom"
      :height="170"
      :block-scroll="false"
      :show-mask="false"
    >
      <n-alert
        title="Potwierdź swój adres email"
        :type="verificationCooldownSecondsLeft ? 'success' : 'warning'"
        :bordered="false"
        class="email-confirmation-banner"
      >
        <div class="banner-wrapper">
          <div>
            Na twój adres email <span class="email">{{ $store.state.user.email }}</span> została
            przesłana wiadomość weryfikacyjna, skorzystaj z niej, aby potwierdzić swój adres email i
            móc umówić się na wizytę
          </div>
          <n-divider vertical />
          <div class="vertical-text">
            <span>Nie możesz znaleźć wiadomości?</span>
            <span>Sprawdź folder spam</span>
          </div>
          <n-divider vertical />
          <div class="action">
            <p v-if="!verificationCooldownSecondsLeft">Wiadomość nie dotarła?</p>
            <div
              v-else
              class="cooldown-notice"
            >
              <p>Wiadomość została wysłana</p>
              <p>
                Możesz spróbować ponownie za
                {{ Math.floor(verificationCooldownSecondsLeft / 60) }} m i
                {{ Math.ceil(verificationCooldownSecondsLeft % 60) }} s
              </p>
            </div>
            <NButton
              type="info"
              size="large"
              @click="resendVerificationEmail"
              :disabled="requestingVerification || !!verificationCooldownSecondsLeft"
            >
              Wyślij ponownie
            </NButton>
          </div>
        </div>
        <template #icon>
          <i class="ph-envelope-light"></i>
        </template>
      </n-alert>
    </n-drawer>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref, watch, computed, onBeforeMount } from "vue";
import { useWindowScroll } from "@vueuse/core";
import navbarSection from "@/components/Navbar/NavbarSection.vue";
import contactSection from "@/views/Contact/ContactSection.vue";
import { useRouter } from "vue-router";
import CustomSidebar from "@/components/CustomSidebar.vue";
import {
  useLoadingBar,
  useMessage,
  useNotification,
  NDrawer,
  NAlert,
  NButton,
  NDivider,
} from "naive-ui";
import { useStore } from "vuex";
import { getToken, onMessage } from "firebase/messaging";
import messaging from "@/firebase.js";
import {
  requestNotificationsPermission,
  notificationsSupported,
  createRequestErrorMessage,
} from "@/utils";
import axios from "axios";

export default {
  components: {
    navbarSection,
    contactSection,
    CustomSidebar,
    NDrawer,
    NAlert,
    NButton,
    NDivider,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const router = useRouter();
    const store = useStore();

    const loadingBar = useLoadingBar();
    const message = useMessage();
    const notification = useNotification();

    watch(
      () => store.getters.getNavigationStatus,
      (newValue) => {
        switch (newValue) {
          case "inProgress":
            loadingBar.start();
            break;
          case "success":
            loadingBar.finish();
            break;
          case "failure":
            loadingBar.error();
            break;
          default:
            loadingBar.error();
            break;
        }
      },
    );

    onBeforeMount(async () => {
      await store.dispatch("loadCookiesState");
      await store.dispatch("loadNotificationsDeniedState");
    });

    const onHomePage = computed(() => router.currentRoute.value.name === "home");

    const scrolledToServices = ref(false);

    const scrollToServices = () => {
      scrolledToServices.value = !scrolledToServices.value;
    };

    const { y } = useWindowScroll();

    const navbarClasses = computed(() => ({
      static: !onHomePage.value,
      translucent: y.value > 0 && onHomePage.value,
    }));

    const themeOverrides = {
      common: {
        primaryColor: "#FF0000",
      },
      Button: {
        textColor: "#FF0000",
      },
      Select: {
        peers: {
          InternalSelection: {
            textColor: "#FF0000",
          },
        },
      },
      // todo: finish
    };

    const acceptCookies = () => {
      store.dispatch("setCookiesState", true);
    };

    const disableNotifications = () => {
      store.dispatch("setNotificationsDeniedState", true);
      message.error("Powiadomienia zostały wyłączone");
    };

    const notificationsPermissionDenied = ref(false);

    const enableNotifications = async () => {
      const enablingNotificationsMessage = message.loading(
        "Wyraź zgodę na otrzymywanie powiadomień",
        {
          duration: 0,
        },
      );
      if (await requestNotificationsPermission()) {
        enablingNotificationsMessage.content = "Włączanie powiadomień";
        try {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BLMpEz50igRN6b0EZE5G_k02ua5eX-HU4H-CREyINg1pbgy73k0ith1QH4xTWtiYnZFe-fnjC0pke4ilErVRC0I",
          });
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log(currentToken);
            enablingNotificationsMessage.type = "success";
            enablingNotificationsMessage.content = "Włączono powiadomienia";
            setTimeout(() => {
              enablingNotificationsMessage.destroy();
            }, 2000);
            onMessage(messaging, (payload) => {
              console.log("Message received. ", payload);
              // ...
            });
          } else {
            enablingNotificationsMessage.type = "error";
            enablingNotificationsMessage.content = "Nie udało się włączyć powiadomień";
            setTimeout(() => {
              enablingNotificationsMessage.destroy();
            }, 5000);
            console.error(
              "An error occurred while retrieving token.",
              "The getToken function did not return a token",
            );
          }
        } catch (err) {
          enablingNotificationsMessage.type = "error";
          enablingNotificationsMessage.content = "Nie udało się włączyć powiadomień";
          setTimeout(() => {
            enablingNotificationsMessage.destroy();
          }, 5000);
          console.error("An error occurred while retrieving token.", err);
        }
      } else {
        notificationsPermissionDenied.value = true;
        enablingNotificationsMessage.type = "error";
        enablingNotificationsMessage.content = "Nie wyrażono zgody na otrzymywanie powiadomień";
        setTimeout(() => {
          enablingNotificationsMessage.destroy();
        }, 5000);
      }
    };

    const showCookiesBanner = computed(() => !store.state.utils.cookiesAccepted);

    const notificationsPermissionNotChecked = computed(() => Notification.permission === "default");

    const checkNotificationsPermission = computed(
      () => notificationsPermissionNotChecked.value && !store.state.utils.notificationsDenied,
    );

    const showNotificationsBanner = computed(
      () =>
        notificationsSupported() &&
        store.getters.isAuthenticated &&
        checkNotificationsPermission.value,
    );

    const showEmailConfirmationBanner = computed(
      () => store.getters.isAuthenticated && !store.state.user.verified,
    );

    const notificationsUnsupported = computed(
      () =>
        !notificationsSupported() &&
        notificationsPermissionNotChecked.value &&
        store.getters.isAuthenticated,
    );

    const hideNotificationsBanner = ref(false);

    watch(notificationsUnsupported, (newValue) => {
      if (newValue) {
        if (!store.state.utils.reducedFunctionalityNotification) {
          store.commit(
            "setReducedFunctionalityNotification",
            notification.error({
              duration: 0,
              title: "Ograniczona funkcjonalność",
              meta: "Ta przeglądarka nie obsługuje powiadomień",
              onClose: () => store.commit("setReducedFunctionalityNotification", null),
              // avatar ?
            }),
          );
        }
      }
    });

    const verificationCooldownEnd = ref(null);
    const verificationCooldownSecondsLeft = ref(0);

    const verificationIntervalTimerId = ref(null);

    const startVerificationCooldown = (cooldownEnd = null) => {
      if (cooldownEnd) {
        const cooldownEndDate = new Date(cooldownEnd);
        if (cooldownEndDate - new Date() < 999) return;
        verificationCooldownEnd.value = cooldownEndDate;
      } else {
        verificationCooldownEnd.value = new Date();

        verificationCooldownEnd.value.setMinutes(verificationCooldownEnd.value.getMinutes() + 5);

        localStorage.setItem(
          "verificationCooldownEnd",
          JSON.stringify(verificationCooldownEnd.value),
        );
      }

      verificationIntervalTimerId.value = setInterval(() => {
        verificationCooldownSecondsLeft.value = verificationCooldownEnd.value - new Date();

        if (verificationCooldownSecondsLeft.value < 999) {
          verificationCooldownSecondsLeft.value = 0;
          clearInterval(verificationIntervalTimerId);
        }

        verificationCooldownSecondsLeft.value /= 1000;
      }, 1000);
    };

    onBeforeMount(() => {
      const verificationCooldownEnd = JSON.parse(localStorage.getItem("verificationCooldownEnd"));
      if (verificationCooldownEnd) {
        startVerificationCooldown(verificationCooldownEnd);
      }
    });

    const requestingVerification = ref(false);

    const resendVerificationEmail = async () => {
      startVerificationCooldown();

      requestingVerification.value = true;

      const verificationEmailMessage = message.create("Wysyłanie wiadomości", {
        type: "loading",
        duration: 0,
      });

      try {
        const response = await axios.post("/users/request-email-verification", {
          email: store.state.user.email,
        });
        if (response.status === 202) {
          verificationEmailMessage.type = "success";
          verificationEmailMessage.content = t("snackBars.emailSent");
          setTimeout(() => verificationEmailMessage.destroy(), 2000);

          startVerificationCooldown();
        }
      } catch (error) {
        verificationEmailMessage.type = "error";
        verificationEmailMessage.content = `${t(
          "snackBars.emailSentError",
        )} - ${createRequestErrorMessage(error)}`;
        setTimeout(() => verificationEmailMessage.destroy(), 2000);
      }
      requestingVerification.value = false;
    };

    const cooldown = ref(true);

    const resetCooldown = () => {
      cooldown.value = true;
      setTimeout(() => (cooldown.value = false), 2000);
    };

    watch(showNotificationsBanner, resetCooldown, { immediate: true });
    watch(showEmailConfirmationBanner, resetCooldown, { immediate: true });

    return {
      scrollToServices,
      scrolledToServices,
      onHomePage,
      navbarClasses,
      themeOverrides,
      acceptCookies,
      enableNotifications,
      disableNotifications,
      showCookiesBanner,
      showNotificationsBanner,
      checkNotificationsPermission,
      notificationsPermissionDenied,
      showEmailConfirmationBanner,
      hideNotificationsBanner,
      resendVerificationEmail,
      cooldown,
      verificationCooldownSecondsLeft,
      requestingVerification,
      t,
    };
  },
};
</script>

<style lang="scss">
.banner {
  height: 100%;

  li {
    margin-left: 2rem;
    list-style-type: circle;
  }

  a {
    color: $accent-color;
    font-size: inherit;

    &:hover {
      text-decoration: underline;
    }
  }

  .n-divider {
    height: 100%;
  }

  .buttons {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1rem;
  }

  .banner-wrapper {
    display: grid;
    grid-template-columns: 1fr 20px 1fr;
    gap: 2rem;
  }
}

.email-confirmation-banner {
  height: 100%;

  .cooldown-notice {
    width: 100%;
    display: flex;
    flex-direction: column;

    p {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  .banner-wrapper {
    display: grid;
    grid-template-columns: 450px 20px 300px 20px 1fr;
    gap: 2rem;
  }

  .n-divider {
    height: 100%;
  }

  .email {
    font-weight: bold;
  }

  .vertical-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

.router-view {
  min-height: 92%;
  justify-content: space-between;
}

#app {
  #app-wrapper {
    height: 100vh;

    main {
      position: relative;
      height: 77vh;
      background-image: url("@/assets/hero-img.jpg");
      background-size: cover;
      background-position: 0 40%;
      color: $main-section-color;
      transition: none;

      .sidebar {
        height: 100vh;
        width: 100vw;
        z-index: 15;
        display: none;
        transform: translateX(-100vw);
      }

      &.collapsed {
        height: 80px;
        background-image: none;
      }

      a:not(.router-link-active) {
        color: inherit;
      }

      .wrapper {
        height: 100%;
        background-color: $translucent-color;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #nav {
        position: fixed;
        top: 0;
        height: 5rem;
        min-height: 40px;
        max-height: 80px;
        width: 100%;
        z-index: 10;
        transition: none;

        &.static {
          position: relative;
          background-color: $secondary-color;
          color: $secondary-text-color;
        }

        &.translucent {
          background-color: $translucent-color;
          transition: background-color $transition-duration;
        }

        * {
          font-family: "Open Sans", sans-serif;
        }
      }

      .ph-caret-down-light {
        color: $accent-color;
        font-size: 2rem;
        margin-bottom: 4%;
        cursor: pointer;
        animation-name: bounceArrow;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        padding: 40px 20px;

        @keyframes bounceArrow {
          0% {
            transform: translateY(2vh);
          }

          50% {
            transform: translateY(-2vh);
          }

          100% {
            transform: translateY(2vh);
          }
        }
      }

      .hero {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 10%;
        justify-content: center;

        .description {
          font-size: 3rem;
          font-family: "Poppins", sans-serif;
          margin-top: 0.75rem;
          font-weight: 700;
        }

        .wordmark {
          margin-top: 4rem;
          height: 8rem;
        }

        @media screen and (max-width: 575.98px) {
          .wordmark {
            height: 5rem;
          }
        }

        @media screen and (min-width: 576px) and (max-width: 767.98px) {
          .wordmark {
            height: 6rem;
          }
        }

        @media screen and (min-width: 768px) and (max-width: 991.98px) {
          .wordmark {
            height: 7rem;
          }
        }

        @media screen and (min-width: 992px) and (max-width: 1199.98px) {
          .wordmark {
            height: 8rem;
          }
        }

        @media screen and (min-width: 1200px) {
          .wordmark {
            height: 9rem;
          }
        }
      }

      footer {
        max-height: 80px;
      }
    }

    .divider {
      display: block;
      position: relative;
      bottom: -5px;
      left: 0;
      width: 100%;
      line-height: 0;
      transform: rotate(180deg);
      color: $primary-color;
      height: 120px;
    }
  }

  @media only screen and (max-width: $md) {
    #app-wrapper {
      main {
        #nav {
          min-height: 20px;
        }
      }
    }
  }

  @media only screen and (max-width: $xs) {
    #app-wrapper {
      main {
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
        }

        .wrapper {
          .description {
            max-width: 80vw;
          }

          .hero {
            padding: 0;
          }

          .divider {
            height: 80px;
          }
        }
      }
    }
  }
}
</style>
